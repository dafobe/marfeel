define(["d3",
        "services/entities/Gallery",
        "services/entities/GalleryItem",
        "services/entities/GalleryView",
        "services/entities/GraphInfoView"],function (d3, Gallery, GalleryItem, GalleryView, GraphInfoView) {
	
	var _createGallery = function(referenceNode, charts){
		var g,
			view;
		g = new Gallery(charts);
		//Create containers and place at dom
		view = new GalleryView().create(charts);
		referenceNode && document.querySelector(referenceNode).appendChild(view.getDomNode())
		//Set scroll positions for navigation
		view.initNavigation();
		
		g.init();
		g.setView(view);
		return g;
	}
	
	// ===== Public API ==== // 
	return {
		createGallery: _createGallery
	}
});