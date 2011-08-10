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
function data_object(b_img, b_name) {
	this.image = b_img;
	this.name = b_name;	
}

var stage_info = new Array();
	// Find who's currently playing for all stages
	for(x = 22862; x <= 22870; x++) {
		
		if(x == 22865) {
			continue;
		}
		else {
			load_json(x);
		}	
	}
function load_json(file_name){
	file_name = file_name + ".json.json";
	$.getJSON("json/"+file_name, function(data){
		for (x = 0; x < data.venue.events.event.length; x++) {
			day_string = data.venue.events.event[x].date.split(" ");
			date_split = day_string[1].split("/");
			month = date_split[0];
			day = date_split[1];
			year = date_split[2];
			
			end_string = data.venue.events.event[x].end_time.split(" ");
			time_string = end_string[4].split(":");
			hour = time_string[0];
			minute = time_string[1];
			console.log(hour);
			console.log(minute);
			
			currentTime = new Date();
			
			if (currentTime.getFullYear() - 2000 == 11) {
				// Show hasn't started yet
				if ((currentTime.getMonth() < 8) || (currentTime.getMonth() == 8 && currentTime.getDate < 5)) {
					//Get Data from first show
					stage_info[file_name] = new data_object(data.venue.events.event[0].photo_thumb, data.venue.events.event[0].title);
					break_loop = true;
				}
				// Show has started, but not ended
				else 
					if (currentTime.getMonth() == 8 && currentTime.getDate >= 5 && currentTime.getDate <= 7) {
						// Friday-Sunday
						if (currentTime.getDate == 5 || currentTime.getDate == 6 || currentTime.getDate == 0) {
							if ((currentTime.getHours() < hour) || (currentTime.getHours() == hour && currentTime.getMinutes <= minute)) {	
								//Current Showing
								stage_info[file_name] = new Array();
								stage_info[file_name][0] = data.venue.events.event[0].photo_thumb;
								stage_info[file_name][1] = data.venue.events.event[0].title;
								console.log(stage_info[file_name][1]);
								
								break_loop = true;
							}
						}
					}
					// Show has ended
					else {
						// SHOW HAS ENDED
						//console.log("SORRY SHOW HAS ENDED");
						break_loop = true;
					}
			}
			if (break_loop == true) {
				break;
			}
		}
	});
}