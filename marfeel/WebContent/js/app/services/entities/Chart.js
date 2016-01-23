define(["services/DataFormatterService"], function(dataFormatter){
    function Chart(label, description, segments, trendValues, type){
    	this.label = label;
    	this.type = type;
    	this.description = description;
    	this.segments = segments || [];
    	this.value;
    	this.trendValues = trendValues || [];
    	this.domContainer;
    	this.sort;
    	this.view;
    }
    
    Chart.prototype.setDomContainer = function(domContainer /*String*/){
    	this.domContainer = domContainer;
    }
    Chart.prototype.setView = function(graphView /*Object*/){
    	this.view = graphView;
    }
    Chart.prototype.getSegments = function(){
    	return this.segments;
    }
    Chart.prototype.getTrendValues = function(){
    	return this.trendValues.map(function(value, i){return {'x':i,'y':value}});
    }
    Chart.prototype.getDomContainer = function(){
    	return this.domContainer;
    }
    Chart.prototype.getWidth = function(){
    	return this.view.graphContainer.clientWidth;
    }
    Chart.prototype.getHeight = function(){
    	return this.view.graphContainer.clientHeight;
    }
    Chart.prototype.getRadius = function(){
    	return Math.min(this.getWidth(), this.getHeight()) / 2;
    }
    Chart.prototype.getSort = function(){
    	return this.sort;
    }
    Chart.prototype.getValue = function(){
    	if(!this.value && this.segments.length){
    		this.value = this.segments.reduce(function(prevSegment, nextSegment){
    			  return prevSegment.value + nextSegment.value;
    		});
    	}
    	return this.value;
    }
    Chart.prototype.getPrintValue = function(){
    	if(!this.value && this.segments.length){
    		this.value = this.segments.reduce(function(prevSegment, nextSegment){
    			  return prevSegment.value + nextSegment.value;
    		});
    	}
    	return dataFormatter[this.type=='amount'?'addCurrency':'numberWithSeparator'](this.value, 'EUR');
    }
    Chart.prototype.getView = function(){
    	return this.view;
    }
    Chart.prototype.getColorPalette = function(){
    	return this.segments.map(function(s){return s.color});
    }
    return Chart;
});
