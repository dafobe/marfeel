define(['services/entities/GraphInfoView'], function(GraphInfoView){
	
//	<article class="graph-item">
	//	<div class="graph-container"></div>
	//	<span class="graph-info">
	//		<div class="graph-info-title">Tablet</div>
	//		<span class="graph-info-percentatge">60%</span>
	//		<span class="graph-info-value">$120.000</span>
	//	</span>
//	</article>
	
    function GraphView(){
    	this.domNode;
    	this.graphContainer;
    	this.graphInfos;
    }
    
    GraphView.prototype.create = function(chart /*Chart*/){
    	var article = document.createElement("article"),
    		div = document.createElement("div");
    	
    	article.setAttribute("class", "graph-item");
    	div.setAttribute("class", "graph-container");
    	
    	article.appendChild(div);

    	this.domNode = article;
    	this.graphContainer = div;
    	
    	this.createGraphInfos(chart.getSegments(), chart.getValue());
    	
    	return this;
    }
    
    GraphView.prototype.createGraphInfos = function(segments /*Array*/, total /*Number*/){
    	var _this = this,
    		graphInfos = segments.map(function(seg){return new GraphInfoView(seg.label, seg.value, ((seg.value/total)*100), seg.color )});
    	
    	graphInfos.forEach(function(gInfoView){
    		gInfoView.create();
    		_this.domNode.appendChild(gInfoView.getDomNode())
    	}) 
    	
    	this.graphInfos = graphInfos;
    }
    GraphView.prototype.getDomNode = function(){
    	return this.domNode;
    }
    GraphView.prototype.getGraphContainer = function(){
    	return this.graphContainer;
    }
    GraphView.prototype.getGraphContainerWidth = function(){
    	return this.graphContainer && this.graphContainer.clientWidth
    }
    GraphView.prototype.getGraphContainerHeight = function(){
    	return this.graphContainer && this.graphContainer.clientHeight
    }
    
    return GraphView;
});
