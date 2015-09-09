function popup(){
	playerWindow = window.open("player", "player", "location=no,width=365,height=487");
}		

/* START: LEAVE WINDOW */
function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}
addEvent(window,"load",function(e) {
    addEvent(document, "mouseout", function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            $("span").stop(true).animate( {color: "#ffffff"}, "200" ); 
			$("a").removeClass( "active" );
        }
    });
});
/* END: LEAVE WINDOW */