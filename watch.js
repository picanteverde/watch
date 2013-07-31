var spawn = require("child_process").spawn,
	connect = require("connect"),
	app = connect().use(connect.static("watch")).listen(3000);
	io = require("socket.io").listen(app);
	buffer = "";

io.configure("development", function(){
	io.set("log level", 0);
});

io.sockets.on("connection", function(socket){
	var watch;

	socket.on("init", function(data){
		watch = spawn("grunt", ["watch"]);
		watch.stdout.on("data", function(data){
			console.log(data.toString());
			socket.emit("data", data.toString());
		});		
	});

	socket.on("disconnect", function(){
		console.log("finishing watch");
		watch.kill('SIGHUP');
	});
});



console.log('Server running at port 3000');

