define(["services/DataFormatterService"],function(formatter){
	
	//	<span class="graph-info">
	//		<div class="graph-info-title">Tablet</div>
	//		<span class="graph-info-percentatge">60%</span>
	//		<span class="graph-info-value">$120.000</span>
	//	</span>
	
    function GraphInfoView(title, value, percentatge, color){
    	this.domNode;
    	this.titleContainer;
    	this.percentatgeContainer;
    	this.valueContainer;
    	this.color = color;
    	this.title = title;
    	this.percentantge = percentatge && percentatge.toFixed(0);
    	this.value = value && value.toFixed(0);
    }
    
    GraphInfoView.prototype.create = function(){
    	var spanGraphInfo = document.createElement("span"),
    		div = document.createElement("div"),
    		spanPerc = document.createElement("span"),
    		spanValue = document.createElement("span");
    	
    	spanGraphInfo.setAttribute("class", "graph-info");
    	div.setAttribute("class", "graph-info-title");
    	if(this.color){div.style.color = this.color}
    	div.innerHTML = this.title;
    	spanPerc.setAttribute("class", "graph-info-percentatge");
    	spanPerc.innerHTML = formatter.addPercentage(this.percentantge);
    	spanValue.setAttribute("class", "graph-info-value");
    	spanValue.innerHTML = formatter.addCurrency(this.value, 'USD');
    	
    	
    	this.domNode = spanGraphInfo;
    	this.titleContainer = div;
    	this.percentatgeContainer = spanPerc;
    	this.valueContainer = spanValue;
    	
    	spanGraphInfo.appendChild(div);
    	spanGraphInfo.appendChild(spanPerc);
    	spanGraphInfo.appendChild(spanValue);
    }
    
    GraphInfoView.prototype.getDomNode = function(){
    	return this.domNode;
    }
    
    GraphInfoView.prototype.setTitle = function(title){
    	this.titleContainer.innerHTML = title;
    }
    GraphInfoView.prototype.setPercentatge = function(value){
    	this.percentatgeContainer.innerHTML = value;
    }
    GraphInfoView.prototype.setTitle = function(value){
    	this.valueContainer.innerHTML = value;
    }
    
    return GraphInfoView;
});
