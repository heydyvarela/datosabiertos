/*
 * hn-choropleth — mapa coropleta de los departamentos de Honduras.
 * Requiere que window.HN_GEO esté definido (incluir hn-geo.js antes).
 *
 * Uso:
 *   renderChoropleth('#mapa', {
 *     data: { 'Atlántida': 45, 'Colón': 62, ... },  // por nombre (con o sin tilde)
 *     title: 'Microcuencas por departamento',
 *     unit: 'microcuencas',
 *     onClick: dep => { ... }   // dep = { name, code, value }
 *   });
 */
(function (global) {
  'use strict';

  // Normaliza nombres: quita tildes, minúsculas, colapsa espacios.
  function norm(s) {
    return String(s)
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().trim().replace(/\s+/g, ' ');
  }

  var DEFAULT_RAMP = ['#EAF1F6', '#B7D0E1', '#7FA9C6', '#4E7FA6', '#2B577C', '#173952'];
  var NODATA = '#E4E4E0';

  // Devuelve el color para un valor dentro de [min,max] usando escala por tramos.
  function makeScale(min, max, ramp) {
    var stops = ramp || DEFAULT_RAMP;
    return function (v) {
      if (v == null || isNaN(v)) return NODATA;
      if (max === min) return stops[stops.length - 1];
      var t = (v - min) / (max - min);
      if (t >= 1) return stops[stops.length - 1];
      var idx = Math.floor(t * stops.length);
      if (idx > stops.length - 1) idx = stops.length - 1;
      return stops[idx];
    };
  }

  function fmt(v) {
    if (v == null || v === '' || isNaN(v)) return 'sin dato';
    return Number(v).toLocaleString('es-HN');
  }

  function renderChoropleth(target, opts) {
    opts = opts || {};
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) throw new Error('hn-choropleth: contenedor no encontrado (' + target + ')');
    if (!global.HN_GEO) throw new Error('hn-choropleth: falta window.HN_GEO (incluye hn-geo.js antes).');

    var raw = opts.data || {};
    var byName = {};
    Object.keys(raw).forEach(function (k) { byName[norm(k)] = raw[k]; });

    var ramp = opts.ramp || DEFAULT_RAMP;
    var unit = opts.unit || '';
    var title = opts.title || '';

    var values = global.HN_GEO
      .map(function (g) { return byName[norm(g[0])]; })
      .filter(function (v) { return v != null && v !== '' && !isNaN(v); })
      .map(Number);
    var min = values.length ? Math.min.apply(null, values) : 0;
    var max = values.length ? Math.max.apply(null, values) : 0;
    var scale = makeScale(min, max, ramp);

    var paths = global.HN_GEO.map(function (g) {
      var name = g[0], code = g[1], d = g[2];
      var v = byName[norm(name)];
      var has = v != null && v !== '' && !isNaN(v);
      return '<path d="' + d + '" fill="' + scale(has ? Number(v) : null) + '"'
        + ' data-name="' + name.replace(/"/g, '&quot;') + '"'
        + ' data-code="' + code + '"'
        + ' data-value="' + (has ? v : '') + '"'
        + ' tabindex="0" role="button"'
        + ' aria-label="' + name + ': ' + fmt(has ? v : null) + (unit ? ' ' + unit : '') + '"></path>';
    }).join('');

    var legend = '';
    if (values.length) {
      var n = ramp.length;
      for (var i = 0; i < n; i++) {
        var lo = Math.round(min + (max - min) * (i / n));
        var hi = Math.round(min + (max - min) * ((i + 1) / n));
        legend += '<span class="hn-leg-item"><i style="background:' + ramp[i] + '"></i>'
          + lo + (i === n - 1 ? '+' : ' – ' + hi) + '</span>';
      }
      legend += '<span class="hn-leg-item"><i style="background:' + NODATA + '"></i>sin dato</span>';
    }

    el.innerHTML =
      '<div class="hn-choro">'
      + (title ? '<div class="hn-title">' + title + '</div>' : '')
      + '<div class="hn-stage">'
      + '<svg viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'
      + (title || 'Mapa de departamentos de Honduras') + '">' + paths + '</svg>'
      + '<div class="hn-tip" hidden></div>'
      + '</div>'
      + (legend ? '<div class="hn-legend">' + legend + '</div>' : '')
      + '</div>';

    var stage = el.querySelector('.hn-stage');
    var tip = el.querySelector('.hn-tip');
    var svg = el.querySelector('svg');

    function showTip(p, e) {
      var val = p.getAttribute('data-value');
      var r = stage.getBoundingClientRect();
      tip.innerHTML = '<b>' + p.getAttribute('data-name') + '</b><br>'
        + fmt(val) + (unit && val !== '' ? ' ' + unit : '');
      tip.style.left = (e.clientX - r.left) + 'px';
      tip.style.top = (e.clientY - r.top) + 'px';
      tip.hidden = false;
    }

    svg.querySelectorAll('path').forEach(function (p) {
      p.addEventListener('mousemove', function (e) { showTip(p, e); });
      p.addEventListener('mouseleave', function () { tip.hidden = true; });
      function fire() {
        if (typeof opts.onClick === 'function') {
          var v = p.getAttribute('data-value');
          opts.onClick({
            name: p.getAttribute('data-name'),
            code: p.getAttribute('data-code'),
            value: v === '' ? null : Number(v)
          });
        }
      }
      p.addEventListener('click', fire);
      p.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); }
      });
    });

    return { min: min, max: max, matched: values.length, total: global.HN_GEO.length };
  }

  global.renderChoropleth = renderChoropleth;
})(window);
