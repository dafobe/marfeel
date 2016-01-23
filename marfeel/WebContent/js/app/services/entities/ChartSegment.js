define(function(){
    function ChartSegment(label, value){
    	this.label = label;
    	this.value = value;
    	this.color;
    }
    
    ChartSegment.prototype.setColor = function(color /*String*/){
    	this.color = color;
    }
    
    return ChartSegment;
});
