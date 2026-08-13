/* ============================================================
   resumen.js — Generador de resumen automático
   Estado del País Honduras 2026 · ASJ

   Uso:
     RESUMEN.generar({
       ind      : INDS[cid],        // objeto del indicador
       cid      : cid,              // su clave
       DATA     : DATA,             // series
       MAP      : MAP_DATA_H,       // opcional, mapa departamental
       mapKey   : 'hom',            // opcional, clave dentro de MAP
       t        : t                 // opcional, función de traducción
     })  ->  { titulo, parrafos:[...], texto }

   No depende de Chart.js ni del DOM. Funciona igual en navegador y en Node.
   ============================================================ */
(function (root) {
  'use strict';

  /* ---------- utilidades numéricas ---------- */

  function esNum(x) { return typeof x === 'number' && isFinite(x); }

  // Decimales adaptativos: los índices 0-1 necesitan más precisión que los conteos.
  function nf(v, den) {
    if (!esNum(v)) return '—';
    var abs = Math.abs(v), dec;
    if (abs >= 1000) dec = 0;
    else if (abs >= 100) dec = 0;
    else if (abs >= 10) dec = 1;
    else if (abs >= 1) dec = 2;
    else dec = 3;
    var s = v.toFixed(dec);
    // quita ceros finales innecesarios (23.30 -> 23.3)
    if (s.indexOf('.') > -1) s = s.replace(/0+$/, '').replace(/\.$/, '');
    var p = s.split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return p.join('.');
  }

  // "Por 100,000 hab." + "." produce doble punto: se limpia el sufijo.
  function limpiaDen(den) {
    return String(den || '').trim().replace(/\.+$/, '');
  }

  // "81.6 Porcentaje (%)" se lee mal dentro de un paréntesis: se acorta a "81.6%".
  function unidadCorta(den) {
    var d = limpiaDen(den);
    if (/^porcentaje/i.test(d) || d === '%' || /\(%\)$/.test(d)) return '%';
    return d ? ' ' + d : '';
  }

  function pct(a, b) {
    if (!esNum(a) || !esNum(b) || a === 0) return null;
    return (b - a) / Math.abs(a) * 100;
  }

  /* ---------- extracción de series ---------- */

  // Devuelve las claves de DATA que corresponden al indicador.
  function clavesDe(ind, cid, DATA) {
    if (ind && ind.keys && ind.keys.length) {
      return ind.keys.filter(function (k) { return DATA[k]; });
    }
    if (DATA[cid]) return [cid];
    if (ind && ind.grp && DATA[ind.grp]) return [ind.grp];
    return [];
  }

  // Serie temporal limpia: años numéricos, sin nulos, ordenada, deduplicada
  // (se queda con la última ocurrencia de cada año) y sin los años parciales.
  function serieTemporal(arr, parciales) {
    var mapa = {};
    (arr || []).forEach(function (p) {
      if (!p || !esNum(p.v) || !esNum(Number(p.a))) return;
      var a = Number(p.a);
      if (parciales && parciales.indexOf(a) > -1) return;
      mapa[a] = p.v;
    });
    return Object.keys(mapa)
      .map(function (a) { return { a: Number(a), v: mapa[a] }; })
      .sort(function (x, y) { return x.a - y.a; });
  }

  // Serie categórica: eje X de texto (departamentos, países, causas...).
  function serieCategorica(arr) {
    return (arr || [])
      .filter(function (p) { return p && esNum(p.v) && !esNum(Number(p.a)); })
      .map(function (p) { return { a: String(p.a), v: p.v }; });
  }

  function estadisticas(serie) {
    if (!serie.length) return null;
    var pri = serie[0], ult = serie[serie.length - 1];
    var max = serie[0], min = serie[0];
    serie.forEach(function (p) {
      if (p.v > max.v) max = p;
      if (p.v < min.v) min = p;
    });
    return { primero: pri, ultimo: ult, max: max, min: min, n: serie.length,
             delta: pct(pri.v, ult.v) };
  }

  /* ---------- textos ---------- */

  var PAISES = ['honduras', 'costa rica', 'guatemala', 'el salvador', 'nicaragua', 'panamá', 'panama'];

  var UMBRAL_ESTABLE = 1.5; // % por debajo del cual se considera "sin cambios"

  // Devuelve el juicio (mejoró/empeoró) y la dirección (subió/bajó) por separado,
  // porque decir solo "mejoró un 24%" oculta si el número subió o bajó.
  function verboTendencia(delta, sentido) {
    if (delta === null) return null;
    var sube = delta > 0;
    var dir = sube ? 'aumentó' : 'se redujo';
    if (Math.abs(delta) < UMBRAL_ESTABLE) return { juicio: 'estable', dir: dir };
    if (sentido === 'mayor_mejor') return { juicio: sube ? 'mejoró' : 'empeoró', dir: dir };
    if (sentido === 'menor_mejor') return { juicio: sube ? 'empeoró' : 'mejoró', dir: dir };
    return { juicio: null, dir: dir };
  }

  /* ---------- reconocimiento de categorías ---------- */

  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toUpperCase().replace(/\s+/g, ' ').trim();
  }

  var DEPTOS = ['ATLANTIDA', 'CHOLUTECA', 'COLON', 'COMAYAGUA', 'COPAN', 'CORTES',
    'EL PARAISO', 'FRANCISCO MORAZAN', 'GRACIAS A DIOS', 'INTIBUCA', 'ISLAS DE LA BAHIA',
    'LA PAZ', 'LEMPIRA', 'OCOTEPEQUE', 'OLANCHO', 'SANTA BARBARA', 'VALLE', 'YORO'];

  function esDepartamental(cats) {
    if (cats.length < 10) return false;
    var hit = cats.filter(function (c) { return DEPTOS.indexOf(norm(c.a)) > -1; }).length;
    return hit >= cats.length * 0.8;
  }

  function esPaises(cats) {
    if (cats.length < 3) return false;
    var hit = cats.filter(function (c) {
      return PAISES.indexOf(String(c.a).toLowerCase().trim()) > -1;
    }).length;
    return hit >= 3;
  }

  // Sumar rankings, tasas o puntajes no significa nada: solo los conteos son aditivos.
  function esAditivo(ind) {
    var d = String(ind.den || '').toLowerCase();
    return !/ranking|puntaje|score|índice|indice|tasa|por cada|por 100|porcentaje|%|promedio|prom\.|por usuario|por hora/.test(d);
  }

  /* ---------- bloque departamental ---------- */

  function bloqueMapa(MAP, mapKey, ind, paresDirectos, anioMapa) {
    var pares = paresDirectos;
    if (!pares) {
      if (!MAP || !mapKey || !MAP[mapKey]) return null;
      var obj = MAP[mapKey];
      pares = Object.keys(obj)
        .filter(function (d) { return esNum(obj[d]); })
        .map(function (d) { return { d: d, v: obj[d] }; });
    }
    pares = pares.slice().sort(function (a, b) { return b.v - a.v; });
    if (pares.length < 3) return null;

    var alto = pares.slice(0, 3), bajo = pares.slice(-3).reverse();
    var suma = pares.reduce(function (s, p) { return s + p.v; }, 0);
    var prom = suma / pares.length;
    var sobre = pares.filter(function (p) { return p.v > prom; }).length;
    // el mínimo real es el último de la lista ordenada, no el último del top-3 bajo
    var minReal = pares[pares.length - 1];
    var razon = (minReal.v > 0) ? pares[0].v / minReal.v : null;

    var den = limpiaDen(ind.den);
    var menorMejor = ind.sentido === 'menor_mejor';

    var etiquetaAnio = anioMapa ? ' (' + anioMapa + ')' : '';
    var f1 = 'Por departamento' + etiquetaAnio + ', los valores más altos se registran en ' +
      alto.map(function (p) { return p.d + ' (' + nf(p.v) + ')'; }).join(', ') +
      '; los más bajos en ' +
      bajo.map(function (p) { return p.d + ' (' + nf(p.v) + ')'; }).join(', ') + '.';
    if (menorMejor) f1 += ' En este indicador un valor más bajo es mejor, ' +
      'por lo que la situación más crítica está en ' + alto[0].d + '.';

    var f2 = '';
    if (razon && razon >= 1.2) {
      f2 = 'La brecha entre el departamento con mayor y menor valor es de ' +
        nf(razon) + ' veces';
      f2 += ', y ' + sobre + ' de ' + pares.length +
        ' departamentos están por encima del promedio nacional (' + nf(prom) + ' ' + den + ').';
    } else {
      f2 = sobre + ' de ' + pares.length + ' departamentos están por encima del promedio nacional (' +
        nf(prom) + ' ' + den + ').';
    }
    return [f1, f2];
  }

  /* ---------- comparativo regional ---------- */

  function esComparativoPais(ind) {
    if (!ind.multi || !ind.series) return false;
    var hn = ind.series.some(function (s) { return String(s).toLowerCase().indexOf('honduras') > -1; });
    var otros = ind.series.filter(function (s) {
      return PAISES.indexOf(String(s).toLowerCase()) > -1;
    }).length;
    return hn && otros >= 2;
  }

  function bloqueRegional(ind, DATA) {
    var claves = ind.keys || [];
    var ultimos = [];
    claves.forEach(function (k, i) {
      var s = serieTemporal(DATA[k], ind.parcial);
      if (s.length) ultimos.push({ nombre: ind.series[i], v: s[s.length - 1].v, a: s[s.length - 1].a });
    });
    if (ultimos.length < 3) return null;
    var mayorMejor = ind.sentido === 'mayor_mejor';
    ultimos.sort(function (a, b) { return mayorMejor ? b.v - a.v : a.v - b.v; });
    var pos = ultimos.findIndex(function (u) {
      return String(u.nombre).toLowerCase().indexOf('honduras') > -1;
    });
    if (pos < 0) return null;
    var anio = ultimos[0].a;
    var txt = 'En el comparativo regional (' + anio + '), Honduras ocupa la posición ' +
      (pos + 1) + ' de ' + ultimos.length + ': ' +
      ultimos.map(function (u) { return u.nombre + ' ' + nf(u.v); }).join(', ') + '.';
    return txt;
  }

  /* ---------- generador principal ---------- */

  function generar(cfg) {
    var ind = cfg.ind, cid = cfg.cid, DATA = cfg.DATA || {};
    if (!ind) return null;
    var t = cfg.t || function (s) { return s; };
    var den = ind.den || '';
    var parciales = ind.parcial || null;
    var claves = clavesDe(ind, cid, DATA);
    var parrafos = [];

    if (!claves.length) return null;

    var crudo = DATA[claves[0]] || [];
    var yaDepartamental = false;
    var cat = serieCategorica(crudo);
    var temporal = serieTemporal(crudo, parciales);

    /* --- caso 0: indicador con varias series --- */
    // Con dos o más series, resumir solo la primera daría un dato incompleto
    // aunque el título nombre las dos (p. ej. "Pobreza total y pobreza extrema").
    if (ind.multi && ind.series && claves.length > 1) {
      var ss = [];
      claves.forEach(function (k, i) {
        var s = serieTemporal(DATA[k], parciales);
        if (!s.length) return;
        var todosCero = s.every(function (p) { return p.v === 0; });
        if (todosCero) return; // serie sin datos reales cargados
        ss.push({ nombre: (ind.series[i] || k), st: estadisticas(s) });
      });
      if (ss.length > 1) {
        var anio = ss[0].st.ultimo.a;
        parrafos.push('En ' + anio + ', ' + ss.map(function (x) {
          return x.nombre + ': ' + nf(x.st.ultimo.v);
        }).join('; ') + ' (' + limpiaDen(den) + ').');

        // Si al excluir el año en curso queda un solo año, no hay tendencia que reportar.
        var conHistoria = ss.filter(function (x) { return x.st.n > 1; });
        if (!conHistoria.length) {
          parrafos.push('La serie cuenta con un solo año completo (' + ss[0].st.ultimo.a +
            '), por lo que todavía no es posible calcular una tendencia.');
        }

        var desdes = ss.map(function (x) {
          var vv = verboTendencia(x.st.delta, ind.sentido);
          if (!vv) return x.nombre + ' no admite variación porcentual';
          if (vv.juicio === 'estable') return x.nombre + ' se mantuvo estable';
          return x.nombre + ' ' + vv.dir + ' un ' + nf(Math.abs(x.st.delta)) + '%';
        });
        if (conHistoria.length) {
          parrafos.push('Desde ' + ss[0].st.primero.a + ', ' +
            desdes.slice(0, -1).join(', ') + ' y ' + desdes[desdes.length - 1] + '.');
        }

        if (ind.sentido === 'neutro' && conHistoria.length) {
          parrafos.push('Las series de este indicador no apuntan en la misma dirección ' +
            'valorativa, por lo que el resumen no las califica como mejora o retroceso.');
        }

        if (esComparativoPais(ind)) {
          var regM = bloqueRegional(ind, DATA);
          if (regM) parrafos.push(regM);
        }

        var mapaM = bloqueMapa(cfg.MAP, cfg.mapKey, ind, null, cfg.mapAnio);
        if (mapaM) parrafos = parrafos.concat(mapaM);
        if (parciales && parciales.length) {
          parrafos.push('Nota: el dato de ' + parciales.join(', ') +
            ' corresponde a un año en curso y se excluyó del cálculo de tendencia.');
        }
        if (ind.nota) parrafos.push('Nota: ' + ind.nota);
        var rangoM = ' (' + ss[0].st.primero.a + '–' + ss[0].st.ultimo.a + ')';
        return {
          titulo: t(ind.n) + rangoM,
          parrafos: parrafos,
          fuente: ind.src ? 'Fuente: ' + ind.src : '',
          texto: t(ind.n) + rangoM + '\n\n' + parrafos.join(' ') +
                 (ind.src ? '\n\nFuente: ' + ind.src : '')
        };
      }
    }

    /* --- caso A: indicador categórico (sin eje temporal) --- */
    if (cat.length && !temporal.length) {
      if (esDepartamental(cat)) {
        yaDepartamental = true;
        // Si hay mapa cargado se usa ese, porque refleja el año que el usuario
        // tiene seleccionado; la serie de DATA es de un año fijo.
        var usarMapa = cfg.MAP && cfg.mapKey && cfg.MAP[cfg.mapKey];
        var bm = usarMapa
          ? bloqueMapa(cfg.MAP, cfg.mapKey, ind, null, cfg.mapAnio)
          : bloqueMapa(null, null, ind, cat.map(function (c) { return { d: c.a, v: c.v }; }), cfg.mapAnio);
        if (bm) parrafos = parrafos.concat(bm);
      } else if (esPaises(cat)) {
        var mayorMejorC = ind.sentido === 'mayor_mejor';
        var ordC = cat.slice().sort(function (a, b) {
          return mayorMejorC ? b.v - a.v : a.v - b.v;
        });
        var posC = ordC.findIndex(function (c) {
          return String(c.a).toLowerCase().indexOf('honduras') > -1;
        });
        var listaC = ordC.map(function (c) { return c.a + ' ' + nf(c.v); }).join(', ');
        if (posC > -1) {
          parrafos.push('Honduras ocupa la posición ' + (posC + 1) + ' de ' + ordC.length +
            ' en el comparativo regional: ' + listaC + '.');
        } else {
          parrafos.push('Comparativo regional: ' + listaC + '.');
        }
      } else {
        var orden = cat.slice().sort(function (a, b) { return b.v - a.v; });
        var tres = orden.slice(0, 3);
        parrafos.push('El indicador se desagrega en ' + cat.length + ' categorías. ' +
          'La mayor es ' + tres[0].a + ' con ' + nf(tres[0].v) + ' ' + limpiaDen(ind.den) +
          (tres[1] ? ', seguida de ' + tres[1].a + ' (' + nf(tres[1].v) + ')' : '') +
          (tres[2] ? ' y ' + tres[2].a + ' (' + nf(tres[2].v) + ')' : '') + '.');
        if (cat.length > 3 && esAditivo(ind)) {
          var total = cat.reduce(function (s, p) { return s + p.v; }, 0);
          if (total > 0) {
            var partic = tres.reduce(function (s, p) { return s + p.v; }, 0) / total * 100;
            parrafos.push('Las tres primeras concentran el ' + nf(partic) +
              '% del total registrado (' + nf(total) + ' ' + limpiaDen(ind.den) + ').');
          }
        }
      }
    }

    /* --- caso B: serie temporal --- */
    if (temporal.length) {
      var st = estadisticas(temporal);
      var p1 = 'El último dato disponible es de ' + st.ultimo.a + ': ' +
        nf(st.ultimo.v) + ' ' + limpiaDen(den) + '.';
      parrafos.push(p1);

      if (st.n === 1) {
        parrafos.push('La serie registra un solo año, por lo que no es posible calcular una tendencia.');
      }

      if (st.n > 1) {
        var v = verboTendencia(st.delta, ind.sentido);
        // delta indefinido: el primer valor es cero y el porcentaje no tiene sentido.
        if (!v) {
          parrafos.push('El primer año de la serie (' + st.primero.a +
            ') registra valor cero, por lo que no se calcula la variación porcentual. ' +
            'La diferencia absoluta es de ' + nf(st.ultimo.v - st.primero.v) + ' ' + limpiaDen(den) + '.');
        }
        var base = 'Respecto a ' + st.primero.a + ' (' + nf(st.primero.v) + ') ';
        var magnitud = nf(Math.abs(st.delta)) + '%';
        var p2;
        if (!v) { p2 = null; }
        else if (v.juicio === 'estable') {
          p2 = base + 'se mantuvo prácticamente sin cambios (' +
            (st.delta > 0 ? '+' : '') + nf(st.delta) + '%).';
        } else if (!v.juicio) {
          p2 = base + v.dir + ' un ' + magnitud + '.';
        } else {
          p2 = base + 'el indicador ' + v.juicio + ': ' + v.dir + ' un ' + magnitud + '.';
        }
        if (p2) parrafos.push(p2);

        // extremos: solo si aportan algo que no esté ya dicho
        var extremosUtiles = (st.max.a !== st.ultimo.a || st.min.a !== st.primero.a) &&
                             (st.max.a !== st.primero.a || st.min.a !== st.ultimo.a);
        if (extremosUtiles && st.n >= 4) {
          parrafos.push('El valor más alto de la serie se registró en ' + st.max.a +
            ' (' + nf(st.max.v) + ') y el más bajo en ' + st.min.a + ' (' + nf(st.min.v) + ').');
        }
      }

      if (esComparativoPais(ind)) {
        var reg = bloqueRegional(ind, DATA);
        if (reg) parrafos.push(reg);
      }
    }

    /* --- bloque departamental --- */
    // Si el propio indicador ya es departamental (caso A), no se repite el mapa.
    var mapa = yaDepartamental ? null : bloqueMapa(cfg.MAP, cfg.mapKey, ind, null, cfg.mapAnio);
    if (mapa) parrafos = parrafos.concat(mapa);

    /* --- advertencias --- */
    if (parciales && parciales.length) {
      parrafos.push('Nota: el dato de ' + parciales.join(', ') +
        ' corresponde a un año en curso y no es comparable con años completos, ' +
        'por lo que se excluyó del cálculo de tendencia.');
    }
    if (ind.nota) parrafos.push('Nota: ' + ind.nota);

    /* --- título y fuente --- */
    var rango = temporal.length > 1
      ? ' (' + temporal[0].a + '–' + temporal[temporal.length - 1].a + ')' : '';
    var titulo = t(ind.n) + rango;
    var fuente = ind.src ? 'Fuente: ' + ind.src : '';

    return {
      titulo: titulo,
      parrafos: parrafos,
      fuente: fuente,
      texto: titulo + '\n\n' + parrafos.join(' ') + (fuente ? '\n\n' + fuente : '')
    };
  }

  var API = { generar: generar, _nf: nf, _serieTemporal: serieTemporal };
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  root.RESUMEN = API;
})(typeof window !== 'undefined' ? window : globalThis);
