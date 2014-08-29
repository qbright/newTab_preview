(function(){

	/* 常用访问的菜单交互	 */
	var most_visit_toggler = document.querySelector(".most_visit_toggler");
	var most_visit = document.querySelector(".most_visit");
	var background =document.querySelector(".background");

	var mainNavOutAnim = "";
	var mainNavInAnim = "";
	var menuButtonEnable = true;
	var subListButtonEnable = true;

	var most_visit_width = 1600;
	var resizeTimeHandler = 0;
	var delAminTimeHandler = 0;
	most_visit_toggler.addEventListener("click",function(){
		
		if(!most_visit.classList.contains("hide")){
			most_visit.classList.add("hide");
			most_visit_toggler.classList.add("open");
			/*background.classList.add("blur");*/
		}else{
			most_visit.
			classList.remove("hide");
	
			most_visit_toggler.classList.remove("open");
			/*background.classList.remove("blur");*/
		}

	});
	most_visit.addEventListener("webkitTransitionEnd",function(e){


		//console.log("end");
	});
	/* end  常用访问的菜单交互	 */

	/* 搜索框交互 */

	var search_input = document.querySelector(".search_input");

	amin(document.querySelector(".search_text .char:first-child"),true,500);

	function amin(target,fx,time){

		setTimeout(function(){
			var target_ = fx ? target.nextElementSibling:target.previousElementSibling;
			time = 300;	
			
			if(fx){
				target.classList.add("amin");
			}else{
				target.classList.remove("amin");
			}

			if(!target_){
				target_ = target;
				fx = !fx;
				time = 2000;
			}
			if(fx){
				amin(target_,fx,time);
			}
			


		},time);
	}

	var search_container = document.querySelector(".search_container");
	var search_normal = document.querySelector(".search_normal");
	var search_min = document.querySelector(".search_min");
	var search_text = document.querySelector(".search_text");
	search_input.addEventListener("focus",function(){

		background.classList.add("blur");

		var sPos = getSearchPos();
		console.log(sPos);

		var tY = sPos.top - 100;
		search_container.style.webkitTransform = "translateY(-" + tY + "px)";

		//search_container.classList.add("showUp");
	});

	search_input.addEventListener("blur",function(){
		background.classList.remove("blur");
		search_container.style.webkitTransform = "";
		//search_container.classList.remove("showUp");
	});

	search_text.addEventListener("click",function(){
		var menu = document.querySelector(".menu");
		if(menu.classList.contains("expand")){
			menu.click();
		}

		search_container.classList.remove("showMin");
		search_container.style.webkitTransform = "";
	});


	/* end 搜索框交互 */


/* 菜单交互 */
	var menu = document.querySelector(".menu");
	var app_list_container = document.querySelector(".app_list_container.main");
	menu.addEventListener("click",function(){
		if(!menuButtonEnable)return;
		menuButtonEnable = false;
		mainNavOutAnim = menu.dataset["outamin"];
		mainNavInAnim = menu.dataset["inamin"];

		if(app_list_container.classList.contains("hidden")){
			

			setSearchPos();
		

			app_list_container.classList.remove("hidden");
			app_list_container.classList.add("show");
			console.log("show Menu");
			appAmin(".app_list.main li",".app_list_container.main");

			menu.classList.add("expand");
			most_visit_toggler.click();

		}else{
			appAmin(".app_list.main li",".app_list_container.main",true);

			var app_list_container_sub = document.querySelector(".app_list_container.sub");

			if(!app_list_container_sub.classList.contains("hidden")){

				appAmin(".app_list.sub li",".app_list_container.sub",true);
			}

			menu.classList.remove("expand");


			setTimeout(function(){
				search_container.classList.remove("showMin");
				search_container.style.webkitTransform = "";
				most_visit_toggler.click();
			},500);

			
		}
		
		
	});
	

	function setSearchPos(){
			if(!search_container.classList.contains("showMin")){
				search_container.classList.add("showMin");
			}

			var sPos = getSearchPos(),
				dSize = getDocumentSize();
			var tX = dSize.width - sPos.left - 130,
				tY = -( sPos.top - 155);

			search_container.style.webkitTransform = "translateX(" + tX +
												 "px) translateY(" + tY+ "px)";
	}

	var appList = document.querySelector(".app_list_container.main");

	appList.addEventListener("webkitAnimationEnd",function(e){
		if(e.animationName == mainNavInAnim){
			var imgTarget = e.target.querySelector("img");
			var amin_ = imgTarget.dataset["anim"];

			imgTarget.classList.remove("animated");
			imgTarget.classList.remove(amin_);


			setTimeout(function(){
				imgTarget.classList.add("animated")
				imgTarget.classList.add(amin_);
			},10);

		}
		if(e.animationName == mainNavOutAnim){ 
			e.target.classList.add("hidden");
			e.target.classList.remove("animated");
			e.target.classList.remove(mainNavOutAnim);
			if(e.target.classList.contains("last")){
				appList.classList.remove("show");

				appList.classList.add("hidden");
			}


		}
		 if(e.target.classList.contains("last")){
			menuButtonEnable = true;		
		}
	});

	var appList_sub = document.querySelector(".app_list_container.sub");

		appList_sub.addEventListener("webkitAnimationEnd",function(e){
		if(e.animationName == mainNavOutAnim){ 
			e.target.classList.add("hidden");
			e.target.classList.remove("animated");
			var cL = e.target.classList;
			for(var i = 0;i < cL.length; i ++){
				var c_ = cL.item(i);
				if(/Out/.test(c_)){
					e.target.classList.remove(c_);
				}

			}

			e.target.classList.remove(mainNavOutAnim);
			if(e.target.classList.contains("last")){
				appList_sub.classList.remove("show");
				appList_sub.classList.add("hidden");
				
			}
		}	
		if(e.target.classList.contains("last")){
			subListButtonEnable = true;
		}
	});



	function appAmin(appList,app_list_container,isHidden){
		var appList = document.querySelectorAll(appList);
		var app_list_container = document.querySelector(app_list_container);
		var cpt = 50;

		if(!isHidden){
			for(var i = 0,app; app = appList[i]; i ++){
			(function(app){
				setTimeout(function(){
					app.classList.remove("hidden");
					app.classList.remove("animated");

					var cL = app.classList;
						for(var i = 0;i < cL.length; i ++){
							var c_ = cL.item(i);
							if(/Out/.test(c_)){
								app.classList.remove(c_);
							}

						}

					app.classList.add("animated");
					app.classList.add(mainNavInAnim);
				},cpt);
			})(app);

			cpt += 50;
			}
		}else{
			for(var i = 0,app; app = appList[i]; i ++){
				(function(app){
					setTimeout(function(){
						app.classList.remove("animated");
						var cL = app.classList;
						for(var i = 0;i < cL.length; i ++){
							var c_ = cL.item(i);
							if(/In/.test(c_)){
								app.classList.remove(c_);
							}

						}


						app.classList.add("animated");
						app.classList.add(mainNavOutAnim);
					},cpt);

				})(app);

				cpt += 50;
			}
		}
		

	}


/* end 菜单交互	*/
	

var sub_app_list_menu = document.querySelector(".app_list_container.main .app_list");


sub_app_list_menu.addEventListener("click",function(e){
	var target = e.target;
	if(!target.classList.contains("app_list")){
		if(target.nodeName == "IMG"){
			target = target.parentElement;
		}

		if(!subListButtonEnable)return;
		subListButtonEnableb = false;

		mainNavOutAnim = target.dataset["outamin"] || mainNavOutAnim;
		mainNavInAnim = target.dataset["inamin"] || mainNavInAnim;





		var app_list_container_sub = document.querySelector(".app_list_container.sub");

		if(app_list_container_sub.classList.contains("hidden")){
		

			app_list_container_sub.classList.remove("hidden");
			app_list_container_sub.classList.add("show");

			appAmin(".app_list.sub li",".app_list_container.sub");
		}else{

			appAmin(".app_list.sub li",".app_list_container.sub",true);
		}

		
		console.log(target);
	}
	
});

var mainImgs = document.querySelectorAll(".app_list_container.main img");


for(var i = 0, img; img = mainImgs[i]; i ++){
	img.addEventListener("mouseover",function(e){

		var target = e.target;
		var anim = target.dataset["anim"];

		target.classList.remove("animated");
		target.classList.remove(anim);

		setTimeout(function(){
			target.classList.add("animated")
			target.classList.add(anim);
		},100);
		

	});
}

most_visit.addEventListener("click",function(e){
	console.log(e.target);
});


window.onresize = function(e){
	
	clearTimeout(resizeTimeHandler);
	resizeTimeHandler = setTimeout(function(){
		var target = e.target;
		resetMostVisit(target);
		
	},50);
}
	

	function resetMostVisit(mTarget){
			var width = mTarget.innerWidth;
		var target = document.querySelector(".most_visit");
		if(!target.classList.contains("hide")){
			if(width < 1700){
			var p = (width - 100) / most_visit_width;
			
			target.style.webkitTransform = "scale(" + p + ")";

			}else{
					target.style.webkitTransform = "scale(" + 1 + ")";
			}	

			
		}
	}
	
	function getSearchPos(){
		return document.
		       querySelector(".search_container").
		       getBoundingClientRect();
	}

	function getDocumentSize(){
		 var cH = document.documentElement.clientHeight,
        cW = document.documentElement.clientWidth;
        return {
        	width:cW,
        	height:cH
        }
	}

	resetMostVisit(window);

})();