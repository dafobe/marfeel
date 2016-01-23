define(function(){
	
	//	<div class="gallery-nav">
	//	</div>
	
    function GalleryNavigationView(scrollableContainer, activeEvent, active){
    	this.domNode;
    	this.position;
    	this.active = active;
    	this.scrollableContainer = scrollableContainer,
    	this.activeEvent = activeEvent;
    }
    
    GalleryNavigationView.prototype.create = function(){
    	var item = document.createElement("div");
    	item.setAttribute("class", "gallery-nav-dot");
    	this.domNode = item;
    	
    	return this;
    }
    
    GalleryNavigationView.prototype.getDomNode = function(){
    	return this.domNode;
    }
    GalleryNavigationView.prototype.setPosition = function(position){
    	
    	var _this = this; 
    	this.position = position;
    	this.domNode.addEventListener('click', function () {
			_this.scrollableContainer.scrollLeft = position;
			_this.setActive(true);
        }, false);
    	return this;
    }
    GalleryNavigationView.prototype.setActive = function(active){
    	var activeClass = 'active';
    	
    	this.domNode.classList[active?'add':'remove'](activeClass);
    	active && this.activeEvent && this.domNode.dispatchEvent(this.activeEvent);
    	this.active = active;
    	return this;
    }
    return GalleryNavigationView;
});
