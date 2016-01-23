define(['services/entities/GalleryItemView', 'services/entities/GalleryNavigationView'], function(GalleryItemView, GalleryNavigationView){
	
//	<div class="gallery">
	//	<div class="gallery-container">
	//		<div class="gallery-content"> GalleryItemView </div>
	//		<div class="gallery-nav-dots">60%</div>
	//	</div>
//	</div>
	
    function GalleryView(){
    	this.domNode;
    	this.content;
    	this.nav;
    	this.galleryItems = [];
    	this.galleryNav = [];
    }
    
    var activeEvent = new Event('active');
    
    var refreshNavigation = function(){
    	console.log('this', this)
    }
    GalleryView.prototype.create = function(charts /*Array*/){
    	var gallery = document.createElement("div"),
    		container = document.createElement("div"),
    		content = document.createElement("div"),
    		nav = document.createElement("div"),
    		galleryItems;
    	
    	gallery.setAttribute("class", "gallery");
    	container.setAttribute("class", "gallery-container");
    	content.setAttribute("class", "gallery-content");
    	nav.setAttribute("class", "gallery-nav");
    	
    	gallery.appendChild(container);
    	container.appendChild(content);
    	container.appendChild(nav);

    	this.domNode = gallery;
    	this.content = content;
    	this.nav = nav;
    	
    	galleryItems = this.createGalleryItems(charts);
    	
    	//Create Gallery containers and Navigation bar
    	galleryItems.forEach(function(gItemView, i){
    		var _this = this,
    			navigationDot = new GalleryNavigationView(this.content, activeEvent).create();
    		
    		(i===0) && navigationDot.setActive(true);
    		navigationDot.getDomNode().addEventListener('active', function(){
    			_this._refreshNavigation(this);
    		});
    		
    		this.galleryNav.push(navigationDot);
    		this.galleryItems.push(gItemView);
    		//Place at dom
    		content.appendChild(gItemView.getDomNode())
    		nav.appendChild(navigationDot.getDomNode());
    	}, this);
    	return this;
    }
    
    GalleryView.prototype.createGalleryItems = function(charts /*Array*/){
    		return charts.map(function(chart){return new GalleryItemView().create(chart)});
    }
    GalleryView.prototype.initNavigation = function(){
    	var _this = this;
		this.galleryItems.forEach(function(view, index){
			_this.galleryNav[index].setPosition(view.getPosition());
		}, this);
    }
    
    GalleryView.prototype.getDomNode = function(){
    	return this.domNode;
    }
    GalleryView.prototype.getContent = function(){
    	return this.content;
    }
    
    GalleryView.prototype._refreshNavigation = function(activeDomNav){
    	this.galleryNav.filter(function(nav){
    		return nav.domNode !== activeDomNav;
    	}).forEach(function(n){n.setActive(false)});
    }
    
    return GalleryView;
});
