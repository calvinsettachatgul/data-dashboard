// DataDashboard
// Controller

dataDashboard.controller = {
   showPanel: (panelElem) => {
      const showWidget = (i, elem) => {
         const widgetElem = $(elem);
         const widget = dna.getModel(widgetElem);
         widgetElem.find('>widget-body').remove();
         widgetElem.append(dna.clone(widget.code, {}));
         const widgetController = dataDashboard.widget[dna.util.toCamel(widget.code)];
         if (!widgetController)
            throw Error('DataDashboard - Widget controller missing: ' + widget.code);
         widgetController.show(widgetElem);
         };
      panelElem.find('>dashboard-widgets').children().each(showWidget);
      },
   setup: () => {
      fetchJson.enableLogger(dataDashboard.network.logEvent);
      const getColorValue = (color) => dataDashboard.chartColor[color];
      dataDashboard.chartColors = Object.keys(dataDashboard.chartColor).map(getColorValue);
      dataDashboard.widgetsMap = dna.array.toMap(dataDashboard.widgets);
      const makeWidgetList = (codes) => codes.map(code => dataDashboard.widgetsMap[code]);
      dataDashboard.panels.forEach(panel => panel.widgetList = makeWidgetList(panel.widgets));
      library.ui.autoDisableButtons();
      const onLoadSetup = () => {
         dna.clone('dashboard-menu-item', dataDashboard.panels);
         dna.clone('dashboard-panel',     dataDashboard.panels);
         };
      $(onLoadSetup);
      }
   };

dataDashboard.controller.setup();