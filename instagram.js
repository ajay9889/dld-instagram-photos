!window.jQuery && document.write('<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"><\/script>');

function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function instagram(widget,username,token,limit,setSize){
	jQuery(document).ready(function($) { instagram.init(); });
	var instagram = function() {
		return {
			
			init: function() {
				instagram.getUser();
			},

			getUser: function() {
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					cache: false,
					url: 'https://api.instagram.com/v1/users/search?q='+username+'&access_token='+token+'',
					success: function(data) {
						var getUserID = data.data[0].id;
						instagram.loadImages(getUserID);
					}
				});
			}, 

			loadImages: function(userID) {
				$.ajax({
					type: "GET",
					dataType: "jsonp",
					cache: false,
					url: 'https://api.instagram.com/v1/users/'+userID+'/media/recent/?access_token='+token+'',
					success: function(data) {
						for(var i = 0; i < limit; i+=1) {
							var linkurl = data.data[i].link;
							var caption = htmlEntities(data.data[i].caption.text);
							
							if(setSize == "small") {
								var size = data.data[i].images.thumbnail.url;
							} else if(setSize == "medium") {
								var size = data.data[i].images.low_resolution.url;
							} else {
								var size = data.data[i].images.standard_resolution.url;
							}

							if (limit == 1) {
								var img_class = ' singleimg';
							} else {
								var img_class = '';
							}

							$("#"+widget).append('<li class="photo-'+i+img_class+'"><a href="'+linkurl+'" target="_blank" title="'+caption+'"><img src="'+size+'" alt="" /></a></li>');
						}
					}
				});
			}
		}
	}();
}