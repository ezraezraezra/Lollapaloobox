/*
 * Project:     Lollapaloobox
 * Description: Video Chat with live-stream of Lollapalooza
 * Website:     http://lolla.opentok.com
 * 
 * Author:      Ezra Velazquez
 * Website:     http://ezraezraezra.com
 * Date:        June 2011
 * 
 */
	var apiKey = 1157291;
	var sessionId;
	var token;
	var session;
	var publisher;
	var subscribers = {};
	var unique_id;	

	var just_watch = false;
	var user_type;
	var subscribers_array = new Array();
	timer_counter = 1;
	
	t=setTimeout("timedCount()",1000);
	
	for (i = 0; i < 10; i++) {
		subscribers_array[i] = false;
	}
	
	var feed_id = new Array();
	feed_id[22862] = 'KQ6zr6kCPj8';
	feed_id[22863] = 'GBZIUlG21zk';
	feed_id[22864] = 'mBOU0dafnlA';
	feed_id[22866] = 'SPKJY4D-iXI';
	feed_id[22867] = 'qQYpF2pCkLI';
	feed_id[22868] = 'dU9hrd35Dsg';
	feed_id[22869] = '0kQC0MtkcGs';
	feed_id[22870] = '6LKR2bDvV0Y';

function timedCount() {
	if(timer_counter == 1) {
		timer_counter = 2;
		$(".stage_speakers").css("background-image", "url('assets/speakers.png')");
	}
	else {
		$(".stage_speakers").css("background-image", "url('assets/speakers_1.png')");
		timer_counter = 1;
	}
	
	t=setTimeout("timedCount()",2000);
}
	
function remove_user(){
	jQuery.ajaxSetup({async:false});
	$.get('php/join.php',
					{comm: 'leave' , table_id: unique_id, viewer_type: user_type});
	jQuery.ajaxSetup({async:true});
	return;
}
	
$("#chat_button").click(function() {
	window.open( "http://lolla.opentok.com/chat.html", "myWindow", 'status=no,height=525,width=425,toolbar=no,location=no,resizable=no,scrollbars=no');
});
	
$("#back_button").click(function() {
	window.location = 'http://lolla.opentok.com/index.php';
});

$("#user_member").click(function() {
	if (user_type == 1) {
		name_pass = stage_info[id_map].name.replace(" ", "%20");
		window.location = 'http://lolla.opentok.com/index.php?stage=y&just_watch=true&user_type=2&stage_num=' + id_map + '&name=' + name_pass;
	}
});
$("#user_member").mouseover(function() {
	if (user_type == 1) {
	}
});

$("#button_view").click(function() {
			just_watch = false;
			user_type = 1;
			$.post('php/join.php', {
				comm: 'join',
				user_type: '1',
				stage_num: id_map
			}, function(data){
				sessionId = data.tb_id;
				token = data.tb_token;
				unique_id = data.unique_id;
				load_video_feed();
				connect();
			});
		});
		$("#button_participate").click(function() {
			participate('true', 2, id_map);
		});
	
	function participate(a, b, c){
		just_watch = true;
		user_type = b;
		id_map = c;
		
		$.post('php/join.php', {
			comm: 'join',
			user_type: b,
			stage_num: c
		}, function(data){
			sessionId = data.tb_id;
			token = data.tb_token;
			unique_id = data.unique_id;
			load_video_feed();
			connect();
		});
	}
	
	function load_video_feed(){
		$("#stage_feed").html('<object width="640" height="390"><param name="movie" value="http://www.youtube.com/v/'+ feed_id[id_map] +'?version=3&amp;hl=en_US&amp;rel=0"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/'+ feed_id[id_map] +'?version=3&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" width="640" height="390" allowscriptaccess="always" allowfullscreen="true"></embed></object>');

		/*
		 * TOKBOX CODE
		 */
		TB.addEventListener("exception", exceptionHandler);
		
		if (TB.checkSystemRequirements() != TB.HAS_REQUIREMENTS) {
			alert("You don't have the minimum requirements to run this application." +
			"Please upgrade to the latest version of Flash.");
		}
		else {
			session = TB.initSession(sessionId);
			session.addEventListener('sessionConnected', sessionConnectedHandler);
			session.addEventListener('sessionDisconnected', sessionDisconnectedHandler);
			session.addEventListener('connectionCreated', connectionCreatedHandler);
			session.addEventListener('connectionDestroyed', connectionDestroyedHandler);
			session.addEventListener('streamCreated', streamCreatedHandler);
			session.addEventListener('streamDestroyed', streamDestroyedHandler);
		}
	}

		//--------------------------------------
		//  LINK CLICK HANDLERS
		//--------------------------------------
		function connect() {
			session.connect(apiKey, token);
		}

		function disconnect() {
			session.disconnect();
		}

		// Called when user wants to start publishing to the session
		function startPublishing() {
			if (!publisher) {
				$("#user_member").css("visibility", "visible");
				var parentDiv = document.getElementById("audience_head_0");
				var publisherDiv = document.createElement('div'); // Create a div for the publisher to replace
				publisherDiv.setAttribute('id', 'opentok_publisher');
				parentDiv.appendChild(publisherDiv);
				var publisherProps = {
				width: 130,
				height: 120,
				publishAudio: false
			};
				publisher = session.publish(publisherDiv.id, publisherProps); // Pass the replacement div id to the publish method
				publisher.addEventListener('settingsButtonClick', settingsButtonClickHandler);
			}
		}

		function stopPublishing() {
			if (publisher) {
				session.unpublish(publisher);
			}
			publisher = null;
		}

		//--------------------------------------
		//  OPENTOK EVENT HANDLERS
		//--------------------------------------

		function sessionConnectedHandler(event) {
			if(just_watch == true) {
				startPublishing();
			}
			else {
			}
			// Subscribe to all streams currently in the Session
			for (var i = 0; i < event.streams.length; i++) {
				addStream(event.streams[i]);
			}
		}

		function streamCreatedHandler(event) {
			// Subscribe to the newly created streams
			for (var i = 0; i < event.streams.length; i++) {
				addStream(event.streams[i]);
			}
		}

		function streamDestroyedHandler(event) {
			// This signals that a stream was destroyed. Any Subscribers will automatically be removed.
			// This default behaviour can be prevented using event.preventDefault()
			for (var i = 1; i < 10; i++) {
				if ($("#audience_head_" + i).children().size() != 0) {
					subscribers_array[i] = false;
					$("#audience_member_" + i).css("visibility", "hidden");
				}
				else {
					subscribers_array[i] = true;
				}
			}
		}

		function sessionDisconnectedHandler(event) {
			publisher = null;
		}

		function connectionDestroyedHandler(event) {
			// This signals that connections were destroyed
		}

		function connectionCreatedHandler(event) {
			// This signals new connections have been created.
		}

		function exceptionHandler(event) {
			alert("Exception: " + event.code + "::" + event.message);
		}

		//--------------------------------------
		//  HELPER METHODS
		//--------------------------------------

		function addStream(stream) {
			// Check if this is the stream that I am publishing, and if so do not publish.
			if (stream.connection.connectionId == session.connection.connectionId) {
				return;
			}
			var subscriberDiv = document.createElement('div');
			subscriberDiv.setAttribute('id', stream.streamId);
			found_empty_div = false;
			index = 1;
			while(found_empty_div == false && index < 10) {
				if(subscribers_array[index] == true) {
					found_empty_div = false;
					index = index + 1;
				}
				else {
					found_empty_div = true;
					subscribers_array[index] = true;
					index = index;
					$("#audience_member_" + index).css("visibility", "visible");
				}
			}
			$("#audience_head_"+index).append(subscriberDiv);
			var subscriberProps = {width: 130, height: 120, subscribeToAudio: false};
			subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id,subscriberProps);
			
			if (user_type == '1') {
				$("#user_member").html("join the mosh pit");
				$("#user_member").css("font-size", "57px");
				$("#user_member").css("line-height", '42px');
				$("#user_member").css("border", "2px solid");
				$("#user_member").css("color", "black");
				$("#user_member").css("visibility", "visible");
				$("#user_member").css("cursor", "pointer");
			}
		}

		function show(id) {
			document.getElementById(id).style.display = 'block';
		}

		function hide(id) {
			document.getElementById(id).style.display = 'none';
		}
		
		function settingsButtonClickHandler(event) {
    			event.preventDefault();
    			var newDiv = document.createElement('div');
    			newDiv.id = 'devicePanel';
    			document.getElementById('user_camera_container').appendChild(newDiv);

    			deviceManager = TB.initDeviceManager(apiKey);
    			devicePanel = deviceManager.displayPanel('devicePanel', publisher);
				devicePanel.addEventListener('closeButtonClick', closeButtonClickHandler);
				$("#user_camera_container_backdrop").css("display", "block");
				$("#user_camera_container").css("display", "block");
			}

			function closeButtonClickHandler(event) {
				event.preventDefault();
				$("#user_camera_container").css("display", "none");
				$("#user_camera_container_backdrop").css("display", "none");
			}