define(['services/GalleryService'],function (galleryService) {
	
	var _initGallery = function(domReference, charts){
		galleryService.createGallery(domReference, charts);
	}
	
	// ===== Public API ==== // 
	return {
		initGallery: _initGallery
	}
});