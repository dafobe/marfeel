define(['services/GraphService'],function (graphService) {
	var _getGraphs = function(){
		var chartEntries = graphService.getChartEntries()
		graphService.addColor(chartEntries);
		
		return chartEntries;
	}
	var _renderGraphs = function(chartEntries /* String */){
		var views;
		views = chartEntries.map(function(chart){
									return graphService.getGraphView(chart)});
		//if there is a dom reference Add to Dom
		chartEntries.forEach(function(chart){
			var view = chart.getView(),
				domReference = chart.getDomContainer();
			if(view && domReference){
				domReference.appendChild(view.domNode);
			}
		});
		//Add d3 charts to each view
		chartEntries.forEach(function(chart){
			var width = chart.getWidth(),
				height = chart.getHeight(),
				pieCanvas,
				pieArc,
				pie,
				pieChart, 
				areaCanvas,
				areaArc,
				area;
			
			pieCanvas = graphService.getCanvas(chart);
			pieArc = graphService.getArc(chart);
			pie = graphService.getPie();
			
			pieChart = graphService.createPieChart(pieCanvas, pie(chart.getSegments()), pieArc, chart.getColorPalette(), chart.label, chart.getPrintValue());
			
			graphService.createAreaChart(pieCanvas, chart, pieArc, chart.getColorPalette(), pieChart);
			
		});
		return chartEntries;
		//Get width and height of container
	     
	}
	
	// ===== Public API ==== // 
	return {
		renderGraphs: _renderGraphs,
		getGraphs: _getGraphs,
		test: function(){return graphService.getChartEntries()
											.map(function(chart){return graphService.getGraphView(chart)})}
	}
});