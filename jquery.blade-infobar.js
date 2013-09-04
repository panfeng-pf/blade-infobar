/*
*/
(function($) {
	$.fn.bladeInfoBar = function(options) {
		if(options === 'show') {
			$requester = $(this);
			if($requester.attr('data-toggle') === 'infobar') {
				//get elements
				var $infoBar = $($requester.attr('bar-id'));
				var $upTriangle = $infoBar.children('div.up-triangle');
				var $downTriangle = $infoBar.children('div.down-triangle');
				var $frame = $infoBar.children('div.frame');
				var $title = $frame.children('div.title');
				var $name = $title.children('div.name');
				var $content = $frame.children('div.content');
				
				//show
				$infoBar.css('display', 'block');
				
				//arrow triangle poistion
				var reqLeft = $requester.offset().left;
				var reqWidth = $requester.width();
				var barLeft = $infoBar.offset().left;
				var triangleWidth = 15;
				var borderRadius = 7;
				var marginLeft = reqLeft - barLeft + Math.abs(reqWidth / 2 - triangleWidth / 2);
				$upTriangle.css('margin-left', max(marginLeft, borderRadius) + 'px');
				$downTriangle.css('margin-left', max(marginLeft, borderRadius) + 'px');
				
				//title
				var titleName = $requester.attr('bar-title');
				if(titleName != undefined) {
					$name.text($requester.attr('bar-title'));
				} else {
					$name.text('undefined');
				}
				
				//content
				var contenttype = $requester.attr('bar-contenttype');
				if(contenttype === 'html') {
					$content.html($requester.attr('bar-content'));
				} else if(contenttype === 'ajax') {
					$content.load($requester.attr('bar-content'));
				} else {
					$content.text($requester.attr('bar-content'));
				}
				
				//event
				$infoBar.trigger('shown');
			}
		} else if(options === 'hide') {
			$(this).css('display', 'none');
			$(this).trigger('hidden');
		} else {
			var opts = $.extend({}, $.fn.bladeInfoBar.defaults, options);
			return this.each(function() {
				var $infoBar = $(this);
				if($infoBar.hasClass('infobar')) {
					//
					var barHtml = '\n\
<div class="up-triangle"></div>\n\
<div class="frame">\n\
	<div class="title">\n\
		<div class="close">&times;</div>\n\
		<div class="name">Title</div>\n\
	</div>\n\
	<div class="content">content</div>\n\
</div>\n\
<div class="down-triangle"></div>\n'
					$infoBar.html(barHtml);
					
					//get elements
					$upTriangle = $infoBar.children('div.up-triangle');
					$downTriangle = $infoBar.children('div.down-triangle');
					$frame = $infoBar.children('div.frame');
					$title = $frame.children('div.title');
					$close = $title.children('div.close');
					
					//close
					$infoBar.find('div.close').click(function() {
						$infoBar.css('display', 'none');
						$infoBar.trigger('hidden');
					});
					
					//arrow
					if(opts.arrow === 'up') {
						$upTriangle.css('display', 'block');
						$downTriangle.css('display', 'none');
					} else if(opts.arrow === 'down') {
						$upTriangle.css('display', 'none');
						$downTriangle.css('display', 'block');
					} else {
						$upTriangle.css('display', 'none');
						$downTriangle.css('display', 'none');
					}
					
					//size
					if(typeof(opts.width) == 'number') {
						$frame.css('width', opts.width + 'px');
					}
					if(typeof(opts.height) == 'number') {
						$frame.css('height', opts.height + 'px');
					}
					
					//color
					$upTriangle.css('border-bottom-color', opts.color);
					$downTriangle.css('border-top-color', opts.color);
					$frame.css('border-color', opts.color);
					$title.css('background', opts.color);
				}
			});
		}
	};
	
	function max(n1, n2) {
		return n1 > n2 ? n1 : n2;
	}
	
	function min(n1, n2) {
		return n1 > n2 ? n2 : n1;
	}
	
	$.fn.bladeInfoBar.defaults = {
		color: 'SkyBlue'	//color name, color code like #??????, or RGB(?,?,?)
		, width: 800		//'auto', integer
		, height: 'auto'	//'auto', integer
		, arrow: 'up'		//up, down, none
	};
})(jQuery);
