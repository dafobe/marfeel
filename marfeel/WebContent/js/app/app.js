define(['controllers/GraphController', 'controllers/GalleryController'],function (graphController, galleryController) {
	
	var graphs,
		gallery;
	
	graphs = graphController.getGraphs();
	gallery = galleryController.initGallery('.graph-wrapper', graphs);
	gallery = graphController.renderGraphs(graphs);
	
});