/* ============================================================
   MOTOR DE TRADUCCIÓN ES/EN — Instituto de Justicia, ASJ Honduras
   Compartido por todos los dashboards.

   USO EN CADA HTML (antes de </head>):
     <script src="i18n.js"></script>
     <script src="dict_salud.js"></script>   <-- diccionario del sector

   El archivo del sector debe definir:  window.DICT_SECTOR = { ... }
   ============================================================ */

var LANG = (function () {
  try { return localStorage.getItem('ij_lang') || 'es'; } catch (e) { return 'es'; }
})();

/* Términos comunes a TODOS los dashboards.
   El diccionario del sector se fusiona encima y puede sobrescribir
   cualquiera de estas entradas si un sector necesita otra redacción. */
var DICT_COMMON = {
  /* --- Interfaz --- */
  "Metodolog\u00eda": "Methodology",
  "Indicadores": "Indicators",
  "Gu\u00eda de uso": "How to use",
  "Inicio": "Home",
  "Barras": "Bars",
  "L\u00edneas": "Lines",
  "Comparar indicadores": "Compare indicators",
  "Comparando\u2026": "Comparing\u2026",
  "Limpiar": "Clear",
  "Descargar": "Download",
  "Imagen PNG": "PNG image",
  "Imagen JPG": "JPG image",
  "Documento PDF": "PDF document",
  "Datos Excel": "Excel data",
  "Fuente": "Source",
  "Denominaci\u00f3n": "Unit of measure",
  "Mide": "Measures",
  "A\u00f1o": "Year",
  "Valor": "Value",
  "Total": "Total",

  /* --- Metodología (idéntica en los 8 dashboards) --- */
  "El Instituto de Justicia recopila informaci\u00f3n proveniente de fuentes oficiales nacionales e internacionales, registros administrativos, publicaciones especializadas y mecanismos de acceso a la informaci\u00f3n p\u00fablica. Posteriormente esta informaci\u00f3n es sometida a un proceso t\u00e9cnico de revisi\u00f3n, depuraci\u00f3n, validaci\u00f3n y sistematizaci\u00f3n y consolidaci\u00f3n con el prop\u00f3sito de garantizar su calidad, consistencia y comparabilidad.":
    "The Institute for Justice compiles information from official national and international sources, administrative records, specialized publications, and public information access mechanisms. This information is then subjected to a technical process of review, cleaning, validation, systematization, and consolidation in order to guarantee its quality, consistency, and comparability.",

  /* --- Toasts y mensajes --- */
  "\u2713 Imagen PNG descargada": "\u2713 PNG image downloaded",
  "\u2713 Imagen JPG descargada": "\u2713 JPG image downloaded",
  "\u2713 PDF descargado": "\u2713 PDF downloaded",
  "\u2713 Datos Excel descargados": "\u2713 Excel data downloaded",
  "\u2713 Gr\u00e1fica copiada al portapapeles": "\u2713 Chart copied to clipboard",
  "No se pudo generar la imagen": "The image could not be generated",
  "Librer\u00eda PDF no disponible": "PDF library unavailable",
  "Error al generar PDF": "Error generating PDF",
  "Instituto de Justicia \u2013 ASJ Honduras 2026": "Institute for Justice \u2013 ASJ Honduras 2026",

  /* --- Guía de uso --- */
  "Gr\u00e1fica": "Chart",
  "Ver el detalle exacto": "See the exact detail",
  "Tipo de gr\u00e1fica": "Chart type",
  "Comparar": "Compare",
  "Mapa departamental": "Departmental map",
  "Aqu\u00ed est\u00e1n todos los indicadores de este sector. Haz clic en cualquiera para ver su gr\u00e1fica.":
    "Here are all the indicators for this sector. Click any one to see its chart.",
  "Ac\u00e1 se muestra la gr\u00e1fica del indicador seleccionado, junto con su fuente y denominaci\u00f3n.":
    "This shows the chart for the selected indicator, along with its source and unit of measure.",
  "Pasa el mouse sobre cualquier barra o punto para ver el valor exacto y el a\u00f1o correspondiente.":
    "Hover over any bar or point to see the exact value and corresponding year.",
  "Cambia entre gr\u00e1fica de barras o de l\u00edneas.": "Switch between a bar chart and a line chart.",
  "Activa este bot\u00f3n y luego haz clic en <strong>otro indicador de la lista</strong> (a la izquierda) para verlos juntos en la misma gr\u00e1fica.":
    "Turn on this button and then click <strong>another indicator in the list</strong> (on the left) to see them together in the same chart.",
  "Descarga la gr\u00e1fica en PNG, JPG, PDF o los datos en formato Excel.":
    "Download the chart as PNG, JPG, PDF, or the data in Excel format.",
  "Algunos indicadores incluyen un mapa interactivo por departamento. Pasa el mouse sobre \u00e9l para ver el detalle.":
    "Some indicators include an interactive map by department. Hover over it to see the detail.",
  "Modo comparar activado: haz clic en <strong>otro indicador de la lista</strong>, a la izquierda, para agregarlo a la gr\u00e1fica.":
    "Compare mode on: click <strong>another indicator in the list</strong> on the left to add it to the chart.",

  /* --- Departamentos de Honduras (para mapas y desagregaciones) --- */
  "Atl\u00e1ntida": "Atl\u00e1ntida",
  "Col\u00f3n": "Col\u00f3n",
  "Comayagua": "Comayagua",
  "Cop\u00e1n": "Cop\u00e1n",
  "Cort\u00e9s": "Cort\u00e9s",
  "Choluteca": "Choluteca",
  "El Para\u00edso": "El Para\u00edso",
  "Francisco Moraz\u00e1n": "Francisco Moraz\u00e1n",
  "Gracias a Dios": "Gracias a Dios",
  "Intibuc\u00e1": "Intibuc\u00e1",
  "Islas de la Bah\u00eda": "Bay Islands",
  "La Paz": "La Paz",
  "Lempira": "Lempira",
  "Ocotepeque": "Ocotepeque",
  "Olancho": "Olancho",
  "Santa B\u00e1rbara": "Santa B\u00e1rbara",
  "Valle": "Valle",
  "Yoro": "Yoro",

  /* --- Términos institucionales frecuentes --- */
  "Secretar\u00eda de Salud": "Ministry of Health",
  "Secretar\u00eda de Finanzas": "Ministry of Finance",
  "Secretar\u00eda de Educaci\u00f3n": "Ministry of Education",
  "Instituto Nacional de Estad\u00edstica": "National Institute of Statistics",
  "Banco Central de Honduras": "Central Bank of Honduras",
  "Banco Mundial": "World Bank",
  "Nacional": "National",
  "Urbano": "Urban",
  "Rural": "Rural",
  "Hombres": "Men",
  "Mujeres": "Women"
};

/* Fusiona: común primero, sector encima (el sector gana). */
/* DICT se arma de forma perezosa: los diccionarios de sector se cargan
   DESPUES de este archivo, asi que no podemos fusionarlos aqui todavia.
   buildDict() se llama en cada traduccion y se recalcula si aparecen
   diccionarios nuevos. */
var DICT = {};
var _dictBuiltFrom = null;

function buildDict() {
  var stamp = (window.DICT_SECTOR ? Object.keys(window.DICT_SECTOR).length : 0)
            + ':' + (window.DICT_INDEX ? Object.keys(window.DICT_INDEX).length : 0);
  if (stamp === _dictBuiltFrom) return DICT;
  DICT = Object.assign({}, DICT_COMMON, window.DICT_SECTOR || {}, window.DICT_INDEX || {});
  _dictBuiltFrom = stamp;
  return DICT;
}

/* Título de la página por sector. Definir en el archivo del sector:
   window.PAGE_TITLE = {es:'Salud — ...', en:'Health — ...'};  */


/* t() — traduce una cadena.
   Si no hay entrada, devuelve el original: nunca rompe la interfaz. */
function t(s) {
  if (LANG !== 'en') return s;
  if (s === null || s === undefined) return s;
  var d = buildDict();
  var k = String(s);
  if (d[k] !== undefined) return d[k];
  var trimmed = k.trim();
  if (d[trimmed] !== undefined) return d[trimmed];
  return s;
}

/* Traduce los nodos estáticos marcados con data-i18n */
function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    var out = t(key);
    if (el.hasAttribute('data-i18n-html')) el.innerHTML = out;
    else el.textContent = out;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
  document.documentElement.lang = LANG;
  var pt = window.PAGE_TITLE;
  if (pt) document.title = pt[LANG] || pt.es;
  /* La etiqueta muestra el idioma ACTIVO de la pagina:
     si dice ES, el contenido esta en espanol; si dice EN, en ingles. */
  var lb = document.getElementById('langLabel');
  if (lb) lb.textContent = (LANG === 'en') ? 'EN' : 'ES';
}

function setLang(l) {
  LANG = l;
  try { localStorage.setItem('ij_lang', l); } catch (e) {}
  applyStaticI18n();

  if (typeof buildList === 'function') {
    var il = document.getElementById('indList');
    if (il) il.innerHTML = '';
    buildList();
  }
  /* Cada dashboard usa un nombre distinto para redibujar la grafica:
     draw() en la mayoria, render() en cambio climatico,
     renderPanel() en el inicio. Llamamos al que exista. */
  if (typeof draw === 'function') draw();
  else if (typeof render === 'function') render();
  if (typeof renderPanel === 'function' && typeof currentPanelInd !== 'undefined'
      && currentPanelInd) renderPanel(currentPanelInd);
  /* El mapa departamental tambien lleva textos traducibles. */
  if (typeof showCCMap === 'function' && typeof aid !== 'undefined') {
    try { showCCMap(aid); } catch (e) {}
  }

  var b = document.getElementById('btnCmp');
  if (b) {
    b.textContent = (typeof cmpOn !== 'undefined' && cmpOn)
      ? '\u2295 ' + t('Comparando\u2026')
      : '\u2295 ' + t('Comparar indicadores');
  }
  var ctl = document.getElementById('chartTypeLabel');
  if (ctl) {
    ctl.textContent = (typeof currentChartType !== 'undefined' && currentChartType === 'line')
      ? t('L\u00edneas') : t('Barras');
  }
  var aidBtn = (typeof aid !== 'undefined') ? document.getElementById('ib' + aid) : null;
  if (aidBtn) aidBtn.classList.add('active');
}

function toggleLang() { setLang(LANG === 'es' ? 'en' : 'es'); }
