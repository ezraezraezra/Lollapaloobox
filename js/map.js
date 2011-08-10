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
var stage_info = new Array();
var band_playing_index;
var id_map_prev = 'blah';

	// Find who's currently playing for all stages
	load_json('22862');
	var docHeight = $(document).height();
	
$("#base_body").click(function() {
	$("#more_info_div").height(docHeight).css( {
		'opacity' : 0.4,
		'position': 'absolute',
		'top' : 0,
		'left' : 0,
		'background-color': 'black',
		'width': '100%',
		'z-index': 5000,
		'display': 'block'
	});
	$("#more_info_name").css("display","block");
	$("#more_info_close").css("display", "block");
})

$("#more_info_close").click(function() {
	$("#more_info_name").css("display","none");
	$("#more_info_close").css("display", "none");
	$("#more_info_div").css("display", "none");
});
	
$(".circle_map_cover").mouseover(function() {
	if (id_map_prev != 'blah') {
		$("#map_stage_" + id_map_prev).css("background-color", "#58AD19");
	}
	id_map = $(this).attr("id").substring(11);
	$("#map_stage_9_name").html(stage_info[$(this).attr("id").substring(11)].name);
	$("#map_stage_9_image").html("<img src='"+stage_info[$(this).attr("id").substring(11)].image + "' height='90' width='90' />");
	$("#map_stage_"+id_map).css("background-color", "yellow");
	
	if(stage_info[$(this).attr("id").substring(11)].desc.indexOf("No info") != 0) {
		if(stage_info[$(this).attr("id").substring(11)].desc.length > 140) {
			$("#base_body").html(stage_info[$(this).attr("id").substring(11)].desc.substring(0,140)+"...<br/><span id='more_info'>(read more)</span>");
			$("#more_info_name").html(stage_info[$(this).attr("id").substring(11)].name);
			$("#more_info_name").append('<div id="more_info_info">'+ stage_info[$(this).attr("id").substring(11)].desc +'</div>');
		}
		else {
			$("#base_body").html(stage_info[$(this).attr("id").substring(11)].desc);
		}
	}
	else {
		$("#base_body").html(stage_info[$(this).attr("id").substring(11)].desc);
	}
});
$(".circle_map_cover").mouseout(function() {
	id_map = $(this).attr("id").substring(11);
	id_map_prev = $(this).attr("id").substring(11);
});

$(".circle_map_cover").click(function() {
	stage_clicked = $(this).attr("id").substring(11);
	$("#map_container").fadeOut('slow', function() {
		$("#stage_floor").html($("#map_stage_"+stage_clicked).html().toUpperCase() + " <font style='color:#cccccc;'>presents:</font> <a class='band_link' href='"+ stage_info[stage_clicked].url +"' target='_blank'>"+ stage_info[stage_clicked].name.toUpperCase()+"</a>");
		$("#concert_container").fadeIn('slow', function() {
		});
	});
});

function data_object(b_img, b_name, b_url, b_desc) {
	this.image = b_img;
	this.url = b_url;
	this.name = b_name;
	this.desc = b_desc;		
}	
function load_json(file_name){
	file_name_original = file_name;
	file_name = file_name + ".json.json";
	$.getJSON("json/" + file_name, function(data){
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
			currentTime = new Date();
			
			if (currentTime.getFullYear() - 2000 == 11) {
				// Show hasn't started yet
				if ((currentTime.getMonth() < 8) || (currentTime.getMonth() == 8 && currentTime.getDate < 5)) {
					//Get Data from first show
					if (typeof(data.venue.events.event[x].bands) != "undefined") {
						stage_info[file_name_original] = new data_object(data.venue.events.event[0].photo_thumb, data.venue.events.event[0].title, data.venue.events.event[0].bands.band.homepage, data.venue.events.event[0].bands.band.description);
					}
					else {
						stage_info[file_name_original] = new data_object(data.venue.events.event[0].photo_thumb, data.venue.events.event[0].title, "#", "No information currently available");
					}
					
					break_loop = true;
				}
				// Show has started, but not ended
				else 
					if (currentTime.getMonth() == 8 && currentTime.getDate >= 5 && currentTime.getDate <= 7) {
					
						// Friday-Sunday
						if (currentTime.getDate == 5 || currentTime.getDay == 6 || currentTime.getDay == 0) {
							if ((currentTime.getHours() < hour) || (currentTime.getHours() == hour && currentTime.getMinutes <= minute)) {
								if (typeof(data.venue.events.event[x].bands) != "undefined") {
									stage_info[file_name_original] = new data_object(data.venue.events.event[x].photo_thumb, data.venue.events.event[x].title, data.venue.events.event[x].bands.band.homepage, data.venue.events.event[x].bands.band.description);
								}
								else {
									stage_info[file_name_original] = new data_object(data.venue.events.event[x].photo_thumb, data.venue.events.event[x].title, "#", "No information currently available");
								}
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
		file_name_original = parseInt(file_name_original) + 1;
		if (file_name_original == 22865) {
			file_name_original = parseInt(file_name_original) + 1;
		}
		if (file_name_original != 22871) {
			load_json(file_name_original);
		}
		
		
	});
}