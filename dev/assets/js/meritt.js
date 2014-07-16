var sli = null;

t = function(){
	clearTimeout(sli);
	sli = setTimeout(GetServerInfoService, 5000);
}

GetLoading = function(){
	$("body").css({"opacity" : ".5"})
	$("body").append('<div class="loader">Loading...</div>')
}

GetLoaded = function(){
	$("body").animate({"opacity" : "1"})
	$(".loader").fadeOut("slow",function(){
		$(this).remove()
	})
}

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
				if( obj.type[0] === "c" ){
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
				if( obj.type[0] === "c" ){
					$("#db1-cpu").css({"width" : obj.value + "%"});
				} else {
					$("#db1-ram").css({"width" : obj.value + "%"});
				}
			});
		});

		// t();
	});
}

var requests = {
	init: function(){
		var self = this;

		self.parseRequests();
	},

	parseRequests: function(){
		var self = this;

		$.when(
			self.getRequests(RequestsServiceGet01),
			self.getRequests(RequestsServiceGet02),
			self.getRequests(RequestsServiceGet03),
			self.getRequests(RequestsServiceGet04)
		)
        .fail(function(a,b,c,d){
            console.log("error")
        })
        .done(function(a,b,c,d){
            var allRequests = [].concat(a[0]).concat(b[0]).concat(c[0]).concat(d[0]);

            self.showRequests(allRequests);
        });
	},

	getRequests: function(url){
		return $.getJSON(url);
	},

	literalToDate: function(obj){
		var exp = /(\d{4})\-(\d{2})\-(\d{2})T(\d{2}):(\d{2}):(\d{2}) ([\+\-])(\d{2}):(\d{2})/;
		var dateString = obj.replace(exp, '$1/$2/$3 $4:$5:$6 $7$8$9')
		return new Date(dateString);

        // exec literalToDate
        // ms = self.literalToDate(inicialDate).getTime() - self.literalToDate(dt).getTime();
    },

    showRequests: function(requests){
        var self = this;
        var cd   = 0, td = 0, md = 0, cw = 0, tw = 0, mw = 0, cm = 0, tm = 0, mm = 0;
        var inicialDate = new Date("2014-07-16T01:00:00+03:00");

        $.each(requests, function(i, item){
            var rt = this.response_time,
                dt = new Date(this.date);

            ms = inicialDate.getTime() - dt.getTime();

			if( ms <= 86400000 ){
				cd++
				td = td + parseInt(rt)
				md = td / requests.length
			}
			else if( ms <= 604800000 ){
				cw++
				tw = tw + parseInt(rt)
				mw = tw / requests.length
			}
			else if( ms <= 2592000000 ){
				cm++
				tm = tm + parseInt(rt)
				mm = tm / requests.length
			}
		});

		$("#cd").text(cd);
		$("#md span").text(md.toFixed(2));
		$("#cw").text(cw);
		$("#mw span").text(mw.toFixed(2));
		$("#cm").text(cm);
		$("#mm span").text(mm.toFixed(2));

		GetLoaded();
	}
}

$(function(){
	GetLoading()
	GetMonsterAppService()
	GetServerInfoService()
	requests.init()

	// setTimeout(GetServerInfoService, 5000)
	// setTimeout(requests.init, 5000)

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
            //TODO
		})
        .fail(function(jqXHR){
			jAlert(InternalErrorMessage, InternalErrorTitle);
		});

		e.preventDefault();
	});

	setStorage = function(){
		if (localStorage["input_1"]) {
			$('#input_1').val(localStorage["input_1"]);
		}
		if (localStorage["input_2"]) {
			$('#input_2').val(localStorage["input_2"]);
		}
		if (localStorage["input_3"]) {
			$('#input_3').val(localStorage["input_3"]);
		}
		if (localStorage["input_4"]) {
			$('#input_4').val(localStorage["input_4"]);
		}
	}();

    $(".input").change(function () {
        localStorage[$(this).attr("name")] = $(this).val();
    });

    $("#salvar").click(function() {
        localStorage.clear();

        $("#variables").each(function(){
            this.reset();
        });
    });
});
