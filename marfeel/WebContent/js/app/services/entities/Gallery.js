define(["services/entities/GalleryItem"],function(GalleryItem){
    function Gallery(charts){
    	this.charts = charts || [];
    	this.galleryItems;
    	this.galleryActive;
    	this.view;
    }
    
    Gallery.prototype.init = function(){
    	this.galleryItems = this.charts.map(function(chart){return new GalleryItem(chart)});
    }
    
    Gallery.prototype.setView = function(galleryView){
    	this.view = galleryView;
    	return this;
    }
    
    Gallery.prototype.getView = function(){
    	return this.view;
    }
    
    return Gallery;
});
