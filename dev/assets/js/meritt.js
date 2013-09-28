GetMonsterAppService = function(){
	$.getJSON(MenuMonsterAppServiceGet, function(data){
		var tpl  = $("#tpl-app").html();
		var html = Mustache.to_html(tpl, data);
		
		$("#app-menu").html(html);
	});
}

GetServerInfoService = function(){
	$.getJSON(Web1AppServiceGet, function(data){
		$.each(data, function(i, item){
			$.each(item.stats, function(x, obj){
				if( obj.type[0] === "C" ){
					$("#web1app-cpu").css({"width" : obj.value + "%"});
				} else {
					$("#web1app-ram").css({"width" : obj.value + "%"});
				}
			});
		});
	});

	$.getJSON(Db1LucyServiceGet, function(data){
		$.each(data, function(i, item){
			$.each(item.stats, function(x, obj){
				if( obj.type[0] === "C" ){
					$("#db1-cpu").css({"width" : obj.value + "%"});
				} else {
					$("#db1-ram").css({"width" : obj.value + "%"});
				}
			});
		});

		t();
	});
}

var sli = null;

t = function(){
	clearTimeout(sli);
	sli = setTimeout(GetServerInfoService, 5000);
}

$(function(){
	GetMonsterAppService()
	GetServerInfoService()

	setTimeout(GetServerInfoService, 5000)

	$("#app").click(function(e){
		$("#app-menu").toggle(200);

		e.preventDefault();
	});

	$("#mrt-body, nav, #app-menu").click(function(e){
		$("#app-menu").hide(200);

		e.preventDefault();
	});

	$("#git").click(function(e){
		$.getJSON(GitCloneServiceGet, function(data){
			//
		}).fail(function(jqXHR){
			jAlert(InternalErrorMessage, InternalErrorTitle);
		});

		e.preventDefault();
	});
});





