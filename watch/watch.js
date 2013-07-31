(function(){
	var socket = io.connect(),
		body = document.body;

	socket.emit("init");
	socket.on("data", function(data){
		var pre = document.createElement("pre"),
			i;
		pre.innerHTML = data;
		if(body.childNodes.length >0){
			body.insertBefore(pre, body.firstChild);
		}else{
			body.appendChild(pre);
		}
		if(body.childNodes.length > 100){
			for (i = 0; i< 50; i += 1){
				body.removeChild(body.childNodes[body.childNodes.length]);
			}
		}
	});
}());