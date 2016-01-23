define(function(){
	
	//	<div class="gallery-item">
	//			chartDom
	//	</div>
	
    function GalleryItemView(){
    	this.domNode;
    }
    
    GalleryItemView.prototype.create = function(chart){
    	var item = document.createElement("div");
    	
    	item.setAttribute("class", "gallery-item");
    	//item.appendChild(chart.getView().getDomNode());
    	this.domNode = item;
    	
    	chart.setDomContainer(this.domNode);
    	return this;
    }
    
    GalleryItemView.prototype.getDomNode = function(){
    	return this.domNode;
    }
    
    GalleryItemView.prototype.getPosition = function(){
    	return this.domNode.getBoundingClientRect().left;
    }
    
    return GalleryItemView;
});
