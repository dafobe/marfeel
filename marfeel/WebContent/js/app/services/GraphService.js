define(['d3', 
        'services/entities/Chart',
        'services/entities/ChartSegment',
        'services/entities/GraphView',
        'services/entities/GraphInfoView'], function (d3, Chart, ChartSegment, GraphView, GraphInfoView) {
	var mockData = [{	label: 'Revenue', 
						type: 'amount',
						totalTrendData: [10000, 7000, 25000, 10000, 50000, 10000, 25000, 20000, 50000],
						segments: [{label: 'Tablet', value: 120000},{label: 'Smartphone', value: 80000}]},
					{	label: 'Impressions',
						type: 'number',
						totalTrendData: [10000, 50000, 60000, 150000, 200000, 10000, 50000, 60000, 150000, 200000],
						segments: [{label: 'Tablet', value: 20000000},{label: 'Smartphone', value: 30000000}]},
					{	label: 'Visits', 
						totalTrendData: [10000, 50000, 60000, 150000, 50000, 10000, 7000, 25000, 10000, 50000],
						segments: [{label: 'Tablet', value: 48000000},{label: 'Smartphone', value: 12000000}]}
					];
	
	var _getData = function(){
		//Retrieve Data from backend (REST/SOAP/Others).
		return mockData || [];
	}
	var _getCharts = function(){
		var data = _getData();
		return data.map(_getChartEntry);
	}
	var _getChartEntry = function(input){
		var chartSegments = input.segments.map(_getChartSegmentEntry)
		return new Chart(input.label, input.description, chartSegments, input.totalTrendData, input.type);
	}
	var _getChartSegmentEntry = function(input){
		return new ChartSegment(input.label, input.value);
	}
	var _getGraphView = function(chart){
		var view = new GraphView().create(chart); 
		chart.setView(view);
		return view;
	}
	
	var _getColorPalette = function(){
		return d3.scale.category20();
	};
	
	var _addColor = function(chartEntries /*Array<Chart>*/){
		var colors = _getColorPalette(),
			counter = 0;
		chartEntries.forEach(function(chart){
			chart.segments.forEach(function(segment){segment.setColor(colors(counter++))});
		})
	}
	var _getCanvas = function(chart /*Object (Chart)*/){
		var container = chart.getView().getGraphContainer(),
			width = chart.getWidth(),
			height = chart.getHeight();
		
		return d3.select(container)
	       .append('svg')
	       .attr('width', width)
	       .attr('height', height);
	       
	};
	var _getArc = function(chart /*Object (Chart)*/){
		var radius = chart.getRadius(),
			width = radius * 0.10;
		
		return d3.svg.arc().outerRadius(radius).innerRadius(radius - width);
	}
	
	var _getPie = function(){
		return d3.layout.pie().value(function(d) { return d.value; }).sort(null);
	}
	
	var _getArea = function(){
		return d3.layout.pie().value(function(d) { return d.value; }).sort(null);
	}
	
	var _getGraph = function(){
		return d3.layout.pie().value(function(d) { return d.value; }).sort(null);
	}
	
	var _createAreaChart = function(svg, chart, arc, colors, pie){
		var pieChart,
			pieChartTransform,
			pieRadius = chart.getRadius(),
			pieMaskedRadius = pieRadius - pieRadius * 0.20,
			height,
			width,
			data;
		
		data = chart.getTrendValues();
		if(!data){return;}
		pieChart = pie.selectAll('g'); 
		pieChartTransform = d3.transform(pieChart.attr("transform"));
		height = pieChart.node().getBBox().height;
		width = pieChart.node().getBBox().width;
	
		//Create Mask for chart, must be fit to the 
		svg
		.append("clipPath")
        .attr('id', 'circleMask')
        .append("circle")
        .attr("cx", pieMaskedRadius)
        .attr("cy", pieChartTransform.translate[1] - pieMaskedRadius)
        .attr("r", pieMaskedRadius);
		
        var x = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.x; })])
            .range([0, (2*pieMaskedRadius)]);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y; })])
            .range([pieMaskedRadius, (pieRadius * 0.20)]);

        var area = d3.svg.area()
            .x(function(d) { return x(d.x); })
            .y0(pieRadius + 5)
            .y1(function(d) { return y(d.y); });

        return svg.append('g')
        	.attr("clip-path", "url(#circleMask)")
         	.attr('transform', 'translate('+ (pieChartTransform.translate[0] - pieMaskedRadius) +','+ pieMaskedRadius+')')
	        .append("path")
            .datum(data)
            .attr("class", "graph-area")
            .attr("d", area)
            .attr("stroke",function(d,i){return colors[i]})
            .attr("fill", function(d,i){return colors[i]});
	}
	var _createPieChart = function(svg, d3chart, arc, colors, label, description){
		
		var width = svg[0][0].clientWidth,
			height = svg[0][0].clientHeight;
		
		svg.append('g')
	       .attr('transform', 'translate(' + width/2 + 
	         ',' + height/2 + ')')
	       .selectAll('path')
	       .data(d3chart)
	       .enter()
	       .append('path')
	       .attr('d', arc)
	       .attr('fill', function(d,i){return colors[i]});
		
		svg.append("text")
		   .attr("class", "graph-title")
		   .attr('transform', 'translate(' + width/2 + 
	         ',' + (height/2 - 25) + ')')
	       .attr("text-anchor", "middle")
		   .text(label);
		svg.append("text")
		   .attr("class", "graph-description")
		   .attr('transform', 'translate(' + width/2 + 
			         ',' + (height/2) +')')
	       .attr("text-anchor", "middle")
		   .text(description)
		
		return svg;
	}
	// ===== Public API ==== // 
	return {
		getChartEntries: _getCharts,
		getGraphView: _getGraphView,
		getColorPalette: _getColorPalette,
		addColor: _addColor,
		getCanvas: _getCanvas,
		getArc: _getArc,
		getPie: _getPie,
		createPieChart: _createPieChart,
		createAreaChart: _createAreaChart
	}
});