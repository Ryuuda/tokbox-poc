// Initialize an OpenTok Session object
var session = OT.initSession(apiKey, sessionId);

var streams = [];

// Initialize a Publisher, and place it into the element with id="publisher"

// Attach event handlers
session.on({

	// This function runs when session.connect() asynchronously completes
	sessionConnected: function (event) {
		// Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
		// clients)

		//creates the publisher video
		console.log("Pubstream", event)
		var publisherProperties = {width: 400, height: 300, name: "pub-stream", insertMode: "replace"};
		var publisher = OT.initPublisher('publisher', publisherProperties);
		session.publish(publisher);
	},

	// This function runs when another client publishes a stream (eg. session.publish())
	streamCreated: function (event) {
		// Create a container for a new Subscriber, assign it an id using the streamId, put it inside
		// the element with id="subscribers"

		//pushes stream to array of current streams, allows access to current streams
		streams.push(event.stream);

		//creates the subscriber container and video output
		var subContainer = document.createElement('div');
		subContainer.id = 'stream-id-' + event.stream.streamId;
		document.getElementById('subscribers').appendChild(subContainer);
		var subProperties = {width: 400, height: 300, name: "sub-stream-"+event.stream.streamId, insertMode: "replace"};

		//creates button
		var subButton = document.createElement('button');
		subButton.innerHTML = "Take screenshot for: " + event.stream.streamId;
		subButton.id = 'stream-' + event.stream.streamId;

		//button that takes screenshot
		subButton.onclick = function (){
			session.signal({
					type: "screenshot",
					data: event.stream.streamId
				},
				function (error) {
					if (error) {
						console.log("signal error: " + error.message);
					} else {
						console.log("signal sent");
					}
				}
			);
		};
		//attatches the sub button to the div
		document.getElementById('subscribers').appendChild(subButton);

		// Subscribe to the stream that caused this event, put it inside the container we just made
		session.subscribe(event.stream, subContainer, subProperties);
	},

	signal: function (event) {
		switch(event.type){
			case 'signal:screenshot': {
				console.log("Event", event)
				console.log("Streams", streams)
				//finds the subscriber for the stream
				var subscriber = session.getSubscribersForStream(streams.find( stream => stream.id === event.data ))[0];
				//generates screenshot based off of the subscriber
				var imgData = subscriber.getImgData();
				//spawns the screenshot
				var img = document.createElement("img");
				img.setAttribute("src", "data:image/png;base64," + imgData);
				document.getElementById('screenshots').appendChild(img)

			}

		}
	}

});





// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
session.connect(token);