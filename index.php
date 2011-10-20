<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="description" content="Video Chat and the lollapalooza stream" />
<meta name="keywords" content="OpenTok TokBox Lollapalooza HackLolla" />
<meta name="author" content="Ezra Velazquez" />
<!-- 
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
 -->
<title>Lollapaloobox</title>
<!-- 
 _            _ _                   _             _                
| |          | | |                 | |           | |               
| |      ___ | | | __ _ _ __   __ _| | ___   ___ | |__   ___ __  __
| |     / _ \| | |/ _` | '_ \ / _` | |/ _ \ / _ \| '_ \ / _ \\ \/ /
| |____| (_) | | | (_| | |_) | (_| | | (_) | (_) | |_) | (_) |>  < 
\_____/ \___/|_|_|\__,_| .__/ \__,_|_|\___/ \___/|_.__/ \___//_/\_\
                       | |                                         
                       |_|                                         
                       
 -->
<link rel="stylesheet" type="text/css" href="css/stage.css" />
<link rel="stylesheet" type="text/css" href="css/map.css" />
<script type="text/javascript" src="js/jquery-1.5.1.min.js"></script>
<script src="http://staging.tokbox.com/v0.91/js/TB.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	var id_map = 0;
	var twitter_link_text = "http://twitter.com/share?original_referer=http%3A%2F%2Flocalhost%2FTokBox%2Fconcert%2Findex_2.html&source=tweetbutton&text=BLAH%20title%20here&url=http%3A%2F%2Flocalhost%2FTokBox%2Fconcert%2Findex_2.html";
</script>
<script type="text/javascript">
<?php
if ($_GET[stage] == 'y') {
	echo <<<_END
	
	$(document).ready(function() {
		$("#map_container").fadeOut('fast', function() {
		
		$("#concert_container").fadeIn('fast', function() {
			$("#stage_floor").html('$_GET[name]');
		});
	});
		$.getScript("js/map.js");
		$.getScript("js/stage.js", function() {
			participate($_GET[just_watch], $_GET[user_type], $_GET[stage_num]);
		});		
	});

_END;
}
else {
echo <<<_END
	$(document).ready(function() {
		$.getScript("js/map.js");
		$.getScript("js/stage.js");
	});
_END;
}

?>
</script> 
</head>
<body OnUnload="remove_user()">
	
	<div id="more_info_name">
		<div id="more_info_info">
			<div id="more_info_button">
				close
			</div>
		</div>
	</div>
	<div id="more_info_close">x</div>
	<div id="more_info_div"></div>
	<div id="container">
		<div id="map_container">
			
			<img src="assets/logo.png" style="position: relative; margin-left: auto; margin-right: auto; margin-top: -10px; z-index:20" />
			<div id="map_container_proper">
			<div id="stem"></div>
			<div class="circle_map" id="map_stage_22867">bud light</div>
			<div class="circle_map" id="map_stage_22866">playstation</div>
			<div class="circle_map" id="map_stage_22863">grove</div>
			<div class="circle_map" id="map_stage_22869">perry's</div>
			<div class="circle_map" id="map_stage_22870">kidzapalooza</div>
			<div class="circle_map" id="map_stage_22868">music unlimited</div>
			<div class="circle_map" id="map_stage_22864">sony</div>
			<div class="circle_map" id="map_stage_22862">bmi</div>
			
			
			
			<div id="map_stage_9">
				<div id="map_stage_9_name">
					
				</div>
				<div id="map_stage_9_image">
					<br/>Choose A Stage
				</div>
			</div>
			
		<div class="circle_map_cover" id="map_stage_c22867"></div>
			<div class="circle_map_cover" id="map_stage_c22866"></div>
			<div class="circle_map_cover" id="map_stage_c22863"></div>
			<div class="circle_map_cover" id="map_stage_c22869"></div>
			<div class="circle_map_cover" id="map_stage_c22870"></div>
			<div class="circle_map_cover" id="map_stage_c22868"></div>
			<div class="circle_map_cover" id="map_stage_c22864"></div>
			<div class="circle_map_cover" id="map_stage_c22862"></div>
			
		<div id="base_top"></div>
		<div id="base_body">
			<div id="more_info"></div>
		</div>
		</div>	
		
		</div>
		<div id="concert_container">
			<div id="user_camera_container_backdrop"></div>
			<div id="user_camera_container">
				<!--<div id="user_camera"></div>
				<div id="button_confirm">let's go</div>-->
			</div>
			<div id="stage_container">
				<div class="stage_speakers"></div>
				<div id="stage_feed">
					<div id="button_view" class="start_button">hang back<br/>and just watch</div>
					<div id="button_participate" class="start_button">dive into<br/>the mosh pit</div>
				</div>
				<div class="stage_speakers"></div>
				<div id="stage_floor"></div>
				<div id="back_button_pole"></div>
				<div id="back_button">back to fairgrounds</div>
				<div id="smb_pole"></div>
				<div id="smb_holder">
					<iframe src="http://www.facebook.com/plugins/like.php?app_id=136653463073838&amp;href=http%3A%2F%2Fezraezraezra.com%2Flollapaloobox&amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font=arial&amp;height=21" 
						scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:25px; position:relative; margin-left:auto; margin-right:auto;" allowTransparency="true">
					</iframe>
					<a id="twitter_button" href="http://twitter.com/share" class="twitter-share-button" data-text="Live Streaming the Lollapalooza Experience" data-count="horizontal">Tweet</a>
					<script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
					<img id="chat_button" src="assets/live_chat.png" width="80" height="18" border="0" style="margin-top: 5px; margin-left:0px;"/>
				</div>
				
			</div>
			<div id="audience_container">
				<div class="audience_member" style="margin-left:90px;" id="audience_member_3">
					<div class="audience_head" id="audience_head_3"></div>
					<img class="audience_body" src="assets/audience_3.png"/>
				</div>
				<div class="audience_member" id="audience_member_1">
					<div class="audience_head" id="audience_head_1"></div>
					<img class="audience_body" src="assets/audience_2.png"/>
				</div>
				<div class="audience_member" id="user_member" id="audience_member_0">
					<div class="audience_head" id="audience_head_0"></div>
					<img class="audience_body" src="assets/audience.png"/>
				</div>
				<div class="audience_member" id="audience_member_2">
					<div class="audience_head" id="audience_head_2"></div>
					<img class="audience_body" src="assets/audience_1.png"/>
				</div>
				<div class="audience_member" id="audience_member_4">
					<div class="audience_head" id="audience_head_4"></div>
					<img class="audience_body" src="assets/audience_1.png"/>
				</div>
				<div class="audience_member" style="margin-left:90px;" id="audience_member_8">
					<div class="audience_head" id="audience_head_8"></div>
					<img class="audience_body" src="assets/audience_3.png"/>
				</div>
				<div class="audience_member" id="audience_member_6">
					<div class="audience_head" id="audience_head_6"></div>
					<img class="audience_body" src="assets/audience_2.png"/>
				</div>
				<div class="audience_member" id="audience_member_5">
					<div class="audience_head" id="audience_head_5"></div>
					<img class="audience_body" src="assets/audience_1.png"/>
				</div>
				<div class="audience_member" id="audience_member_7">
					<div class="audience_head" id="audience_head_7"></div>
					<img class="audience_body" src="assets/audience_2.png"/>
				</div>
				<div class="audience_member" id="audience_member_9">
					<div class="audience_head" id="audience_head_9"></div>
					<img class="audience_body" src="assets/audience.png"/>
				</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>