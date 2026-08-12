/* ============================================================
   DICCIONARIO ES/EN — SECTOR ESPACIO CÍVICO
   Instituto de Justicia, ASJ Honduras — Estado del País 2026

   Convención del proyecto (la misma de i18n.js / DICT_COMMON):
     clave = cadena en español tal cual aparece en la interfaz
     valor = su traducción al inglés

   Carga (después de i18n.js):
     <script src="i18n.js"></script>
     <script src="dict_espacio_civico.js"></script>
   ============================================================ */

/* El título solo se aplica en el dashboard del sector: index.html
   carga todos los dict_*.js y no debe cambiar su propio título. */
if (/espacio_civico/i.test(location.pathname)) {
  window.PAGE_TITLE = {
    es: "Espacio Cívico — Estado del País Honduras 2026",
    en: "Civic Space — State of the Country Honduras 2026"
  };
}

/* Se fusiona en lugar de sobrescribir: index.html carga varios
   diccionarios de sector seguidos. */
window.DICT_SECTOR = Object.assign(window.DICT_SECTOR || {}, {
  "Espacio Cívico": "Civic Space",
  "Buscar indicador...": "Search indicator...",
  "Sin resultados": "No results",
  "Descargar todos": "Download all",
  "Descargar mapa": "Download map",
  "LIBERTADES CÍVICAS Y DE PRENSA": "CIVIC AND PRESS FREEDOMS",
  "INSTITUCIONALIDAD Y ESTADO DE DERECHO": "INSTITUTIONS AND RULE OF LAW",
  "DERECHOS CIVILES Y POLÍTICOS": "CIVIL AND POLITICAL RIGHTS",
  "VIOLENCIA CONTRA GRUPOS EN RIESGO": "VIOLENCE AGAINST AT-RISK GROUPS",
  "PROTECCIÓN Y ALERTA TEMPRANA": "PROTECTION AND EARLY WARNING",
  "Puntaje del CIVICUS Monitor en Centroamérica": "CIVICUS Monitor Score in Central America",
  "Índice de Libertades Civiles (Freedom House)": "Civil Liberties Index (Freedom House)",
  "Índice de Libertad de Prensa en Centroamérica": "Press Freedom Index in Central America",
  "Índice de Percepción de la Corrupción (IPC)": "Corruption Perceptions Index (CPI)",
  "Índice de Estado de Derecho (World Justice Project)":
    "Rule of Law Index (World Justice Project)",
  "Índice de Democracia de Honduras": "Democracy Index of Honduras",
  "Índice de Democracia en Centroamérica": "Democracy Index in Central America",
  "Índice de Desarrollo del Servicio Civil": "Civil Service Development Index",
  "Quejas por violaciones al derecho a la vida e integridad personal":
    "Complaints of violations of the right to life and personal integrity",
  "Quejas por violaciones a la libertad de pensamiento, expresión, asociación y reunión":
    "Complaints of violations of freedom of thought, expression, association and assembly",
  "Muertes violentas de mujeres": "Violent deaths of women",
  "Muertes violentas de personas LGTBIQ+": "Violent deaths of LGBTIQ+ people",
  "Recomendaciones derivadas de alertas tempranas por situación de conflictividad":
    "Recommendations arising from early warnings by conflict situation",
  "Medidas preventivas y de protección otorgadas": "Preventive and protective measures granted",
  "CIVICUS Monitor": "CIVICUS Monitor",
  "Libertades Civiles": "Civil Liberties",
  "Libertad de Prensa": "Press Freedom",
  "Percepción de Corrupción": "Corruption Perceptions",
  "Estado de Derecho": "Rule of Law",
  "Índice de Democracia": "Democracy Index",
  "Democracia — Región": "Democracy — Region",
  "Servicio Civil": "Civil Service",
  "Quejas — Vida e Integridad": "Complaints — Life and Integrity",
  "Quejas — Expresión": "Complaints — Expression",
  "Muertes Violentas — Mujeres": "Violent Deaths — Women",
  "Muertes Violentas — LGTBIQ+": "Violent Deaths — LGBTIQ+",
  "Alertas Tempranas": "Early Warnings",
  "Medidas de Protección": "Protection Measures",
  "Puntaje (0-100)": "Score (0-100)",
  "Índice (0-1)": "Index (0-1)",
  "Índice (0-10)": "Index (0-10)",
  "Índice (0-100)": "Index (0-100)",
  "Número de quejas": "Number of complaints",
  "Número de casos": "Number of cases",
  "Número de recomendaciones": "Number of recommendations",
  "Número de medidas": "Number of measures",
  "Elaboración propia con datos de CIVICUS Monitor (2024).":
    "Own elaboration with data from CIVICUS Monitor (2024).",
  "Elaboración propia con datos de Freedom House (2013-2024).":
    "Own elaboration with data from Freedom House (2013-2024).",
  "Elaboración propia con datos de Reporteros sin Fronteras (2003-2025).":
    "Own elaboration with data from Reporters Without Borders (2003-2025).",
  "Elaboración propia con datos de Transparencia Internacional (2015-2025).":
    "Own elaboration with data from Transparency International (2015-2025).",
  "Elaboración propia con datos de World Justice Project (2015-2025).":
    "Own elaboration with data from the World Justice Project (2015-2025).",
  "Elaboración propia con datos de The Economist Intelligence Unit (2015-2024).":
    "Own elaboration with data from The Economist Intelligence Unit (2015-2024).",
  "Elaboración propia con datos de The Economist Intelligence Unit (2024).":
    "Own elaboration with data from The Economist Intelligence Unit (2024).",
  "Elaboración propia con datos del Banco Interamericano de Desarrollo (BID). Diagnóstico institucional del servicio civil en América Latina. Honduras (2024).":
    "Own elaboration with data from the Inter-American Development Bank (IDB). Institutional diagnosis of the civil service in Latin America. Honduras (2024).",
  "Elaboración propia con datos del Informe Anual 2025 del CONADEH.":
    "Own elaboration with data from the CONADEH 2025 Annual Report.",
  "Elaboración propia con datos del Instituto Universitario en Democracia, Paz y Seguridad (IUDPAS) y del Sistema Estadístico Policial en Línea (SEPOL).":
    "Own elaboration with data from the University Institute for Democracy, Peace and Security (IUDPAS) and the Online Police Statistics System (SEPOL).",
  "Elaboración propia con datos de Cattrachas (2016-2025).":
    "Own elaboration with data from Cattrachas (2016-2025).",
  "Puntaje del espacio cívico medido por CIVICUS Monitor: evalúa las libertades de asociación, reunión pacífica y expresión. A mayor puntaje, mayor apertura cívica.":
    "Civic space score measured by CIVICUS Monitor: it assesses freedom of association, peaceful assembly and expression. The higher the score, the more open the civic space.",
  "Puntaje global de Honduras en el índice Freedom in the World de Freedom House. A mayor puntaje, mayor garantía de derechos políticos y libertades civiles.":
    "Honduras's overall score in Freedom House's Freedom in the World index. The higher the score, the stronger the guarantees of political rights and civil liberties.",
  "Puntaje de la Clasificación Mundial de la Libertad de Prensa de Reporteros sin Fronteras. A mayor puntaje, mejores condiciones para el ejercicio periodístico.":
    "Score from the World Press Freedom Index of Reporters Without Borders. The higher the score, the better the conditions for practising journalism.",
  "Percepción de corrupción en el sector público según Transparencia Internacional. 0 indica altamente corrupto y 100 muy transparente.":
    "Perceived public-sector corruption according to Transparency International. 0 means highly corrupt and 100 very clean.",
  "Índice global de Estado de Derecho del World Justice Project. Mide límites al poder gubernamental, ausencia de corrupción, gobierno abierto y justicia. A mayor valor, mayor vigencia.":
    "Overall Rule of Law Index from the World Justice Project. It measures constraints on government powers, absence of corruption, open government and justice. Higher values mean stronger rule of law.",
  "Índice de Democracia elaborado por The Economist Intelligence Unit. Evalúa proceso electoral, funcionamiento del gobierno, participación política, cultura política y libertades civiles.":
    "Democracy Index produced by The Economist Intelligence Unit. It assesses the electoral process, functioning of government, political participation, political culture and civil liberties.",
  "Comparativo regional del Índice de Democracia en su última medición disponible. Permite ubicar a Honduras frente a sus pares centroamericanos.":
    "Regional comparison of the Democracy Index in its latest available measurement. It places Honduras alongside its Central American peers.",
  "Mide la calidad institucional del servicio civil: mérito, capacidad funcional e integración estratégica de la gestión del empleo público.":
    "Measures the institutional quality of the civil service: merit, functional capacity and strategic integration of public employment management.",
  "Quejas recibidas por el CONADEH según modalidad violatoria del derecho a la vida y a la integridad personal.":
    "Complaints received by CONADEH by type of violation of the right to life and personal integrity.",
  "Quejas recibidas por el CONADEH sobre libertad de pensamiento, expresión, asociación y reunión, y protección de la honra y la dignidad.":
    "Complaints received by CONADEH regarding freedom of thought, expression, association and assembly, and protection of honour and dignity.",
  "Registro anual de muertes violentas de mujeres. La serie 2013-2021 proviene del IUDPAS y la serie 2022-2025 del SEPOL, por lo que puede haber diferencias metodológicas entre ambos tramos.":
    "Annual record of violent deaths of women. The 2013-2021 series comes from IUDPAS and the 2022-2025 series from SEPOL, so methodological differences between the two segments are possible.",
  "Registro anual de muertes violentas de personas LGTBIQ+ documentadas por la organización Cattrachas.":
    "Annual record of violent deaths of LGBTIQ+ people documented by the organisation Cattrachas.",
  "Recomendaciones emitidas para disminuir la conflictividad en materia de derechos humanos, clasificadas por situación. Cada recomendación se dirige a una o varias instituciones receptoras.":
    "Recommendations issued to reduce human rights conflict, classified by situation. Each recommendation is addressed to one or more receiving institutions.",
  "Medidas preventivas y de protección otorgadas a personas en situación de riesgo. El dato de 2026 corresponde a un año en curso y no es comparable con un año completo.":
    "Preventive and protective measures granted to people at risk. The 2026 figure corresponds to a year in progress and is not comparable with a full year.",
  "Prevención": "Prevention",
  "Protección": "Protection",
  "Honduras": "Honduras",
  "Costa Rica": "Costa Rica",
  "El Salvador": "El Salvador",
  "Guatemala": "Guatemala",
  "Nicaragua": "Nicaragua",
  "Panamá": "Panama",
  "Amenazas a muerte": "Death threats",
  "Amenaza, coacción o intimidación por servidor público":
    "Threat, coercion or intimidation by a public official",
  "Tratos crueles, inhumanos o degradantes": "Cruel, inhuman or degrading treatment",
  "Maltrato por omisión por particulares": "Mistreatment by omission by private individuals",
  "Malos tratos": "Mistreatment",
  "Desplazamiento interno por violencia": "Internal displacement due to violence",
  "Asesinato": "Murder",
  "Desaparición involuntaria de personas": "Enforced disappearance of persons",
  "Otras modalidades violatorias": "Other types of violation",
  "Allanamiento de morada": "Unlawful entry into the home",
  "Calumnia o injuria": "Slander or libel",
  "Violación a la imagen, honor y reputación": "Violation of image, honour and reputation",
  "Divulgación de información personal": "Disclosure of personal information",
  "Restricción al derecho de expresión": "Restriction of the right to expression",
  "Censura de prensa": "Press censorship",
  "Derecho al acceso a la salud de la población general":
    "Right of the general population to access health care",
  "Conflictividad agraria y territorial": "Agrarian and territorial conflict",
  "Conflictividad en la Tribu de San Francisco de Locomapa, Yoro":
    "Conflict in the San Francisco de Locomapa Tribe, Yoro",
  "Derecho a la educación de la niñez": "Right of children to education",
  "Conflictividad en la comunidad de Azacualpa, La Unión, Copán":
    "Conflict in the community of Azacualpa, La Unión, Copán"
});

/* ============================================================
   Cadenas de index.html (tarjeta del sector y guía de uso).
   Se fusiona sobre DICT_INDEX; por eso este archivo debe cargarse
   DESPUÉS de dict_index.js.
   ============================================================ */
window.DICT_INDEX = Object.assign(window.DICT_INDEX || {}, {
  "Espacio Cívico": "Civic Space",
  "Información sobre libertades cívicas, libertad de prensa, estado de derecho y derechos humanos en Honduras.":
    "Information on civic freedoms, press freedom, the rule of law and human rights in Honduras.",
  "Honduras obtiene 37 de 100 en el CIVICUS Monitor 2024":
    "Honduras scores 37 out of 100 in the 2024 CIVICUS Monitor",
  "Cada tarjeta representa un sector temático con un <strong>dato destacado</strong>. Hay 8 sectores disponibles. Haz clic en \"Explorar\" para abrir el dashboard completo de ese sector.":
    "Each card represents a thematic sector with a <strong>featured figure</strong>. There are 8 sectors available. Click \"Explorar\" to open that sector's full dashboard."
});
