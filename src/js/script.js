
$(window).on({
    load: function () {
        elResize()
        getUserAgent();
        $('.sel-type a').on({
            click: function () {
                $('.sel-type a').removeClass('on');
                $(this).addClass('on');
                var tyClass = $(this).attr('class').substring($(this).attr('class').indexOf('-') + 1, $(this).attr('class').indexOf('on') - 1);
                $('.con-list').removeClass('ty-inline ty-box').addClass('ty-' + tyClass)
            }
        })
    }
})


function getUserAgent() {
    var userAgent = navigator.userAgent.toLowerCase();
    var browserName;

    if (userAgent.match('msie')) {
        var verStr = userAgent.substr(userAgent.indexOf('msie'));
        var ieVer = verStr.substring(5, verStr.indexOf('.'));
        browserName = 'ie' + ieVer;
    }
    else if (userAgent.match('firefox')) browserName = 'firefox';
    else if (userAgent.match('chrome')) browserName = 'chrome';
    else if (userAgent.match('safari')) browserName = 'safari';

    $('html').addClass(browserName);
}


/* lnb */
var $lnb = $('.lnb');
var $mDepth1 = $lnb.find('>ul>li>a');
var $mDepth2 = $lnb.find('>ul>li>ul>li>a')
var $submenu = $('.lnb>ul>li ul');
var $path = $('.path ul li');
var depth1 = $.trim($path.eq(1).text());
var depth2 = $.trim($path.eq(2).text());

$mDepth1.each(function () {
    var el = $(this).next('ul');
    if ($(this).text() == depth1) {
        $(this.parentNode).addClass('on');
        el.slideDown();
    }
});
$mDepth2.each(function () {
    if ($(this).text() == depth2) $(this.parentNode).addClass('on');
});
$mDepth1.on({
    click: function () {
        var el = $(this).next('ul');
        if (el.is(':visible')) {
        } else {
            $submenu.slideUp();
            $('.lnb>ul>li.on').removeClass('on');
            isVisible = el.is(':visible') ? el.slideUp() : el.slideDown();
            $(this.parentNode).addClass('on');
        }
    }
});
$mDepth2.on({
    click: function () {
        $lnb.find('>ul>li>ul>li').removeClass('on');
        $(this.parentNode).addClass('on')
    }
})

/* tab */
var $tabControl = $('.tab .tab-control a');
$tabControl.on({
    click: function () {
        var clsName = $(this).attr('class').split(" ");
        for (var i = 0; i < clsName.length; i++) {
            if (clsName[i].indexOf('tabIndex') != -1) var viewCont = clsName[i];
        }
        $tabControl.parent('li').removeClass('on');
        $(this.parentNode).addClass('on');
        $('.tab-content div').hide();
        $('.tab-content .' + viewCont).show();
    }
})
$('.tab .tab-control li').first().children('a').trigger('click');


/* parallax */
var winScroll;
var $window = $(window);
var winHeight = $window.height();
var $contents = $('.content>div');
$contents.height(winHeight);

$window.scroll(function () {
    winScroll = $window.scrollTop();

    scrollAddClass(10, $('.title'), 'move');
    paraY($('.bgimage'))
});


function scrollAddClass(offsetTop, obj, adCls) {
    offsetTop < winScroll ? obj.addClass(adCls) : obj.removeClass(adCls);
}
function paraX(offsetTop, obj, targetPos) {
    var SPEED = 1.5;
    var progress = (winScroll / $(window).height());
    var opacity = 1 - (progress * (0.8 * 1));
    var offset = progress * SPEED;

    if (winScroll > offsetTop) {
        obj.css({
            'background-position': '50% ' + ((targetPos - winScroll) / 1.5) * -1 + 'px',
            'opacity': opacity
        })
    };
}

function paraY(tgt) {
    tgt.each(function () {
        var $this = $(this),
            spped = $this.attr('data-spped'),
            posX = winScroll * spped,
            direction = $this.attr('data-direction') == 'left' ? '+' : '-';
        $this.css({
            'background-position': direction + posX + '% 0'
        })
    })
}

/* tab portfolio */
var $win = $(window);
var mod = null;
function portfolioTab() {
    $win.on({
        resize: function () {
            if ($win.width() < 480) mod = 'mobile';
            else mod = 'pc';
        }
    }).trigger('resize');

    if (mod == 'mobile') return;

    var $tabtitWrap = $('.block1 .tab-tit');
    var $tabtit = $('.block1 .tab-tit li a');
    var $diamond = $('.diamond');
    var diamondWIDTH;
    var $selectItem;
    var $tabConItem = $('.tab-content .con-list>li');
    diamondWIDTH = ($diamond.width() / 2) + 5;

    $tabtit.on({
        mouseenter: function () {
            $selectItem = $(this);
            tabOn($selectItem);
        },
        click: function () {
            var $tisPrnt = $(this).parent();
            var $tgtCls = $tisPrnt.attr('class').substr($tisPrnt.attr('class').indexOf('-') + 1);
            tabOn($(this));
            $selectItem = $(this);
            $tabConItem.fadeOut(100);

            if ($tgtCls == 'all') $tabConItem.fadeIn(300);
            else $('.' + $tgtCls).fadeIn(300);
            return false;
        }
    }).first().trigger('mouseenter');
    $tabtitWrap.on({
        mouseleave: function () {
            if (!$selectItem) return;
            tabOn($selectItem);
        }
    });
    $(window).resize(function () {
        tabOn($selectItem);
        diamondWIDTH = $diamond.width() / 2;
    })
    function tabOn(tgt) {
        var pos = (tgt.position().left) + (tgt.width() / 2) - diamondWIDTH;
        var diaClass = null;
        var $tgtCls = tgt.parent().attr('class').substr(tgt.parent().attr('class').indexOf('-') + 1);
        var Idx = tgt.parent().index() + 1;

        $diamond.stop(true, false).animate({
            'left': pos
        }, 300);
        $diamond.attr('class', 'diamond ' + 't' + Idx);
        return;
    }
}

portfolioTab()
function portfolioInit() {
    if ($win.width() > 480) portfolioTab();

    $win.on({
        resize: function () {
            if ($win.width() > 480) mod = 'mobile';
            else mod = 'pc';
        }
    }).trigger('resize');

}








/* RWD 
var phoneMaxWidth = 480;
var tabletMaxWidth = 1000;
var RWD;
(function($) {
	$(window).load(function() {
		$(window).resize(function() {
			var width = $(this).width();
			var currentRWD = null;

			if (tabletMaxWidth <= width) {
				currentRWD = 'desktop';
			} else if (phoneMaxWidth <= width) {
				currentRWD = 'tablet';
			} else {
				currentRWD = 'phone';
			}

			if (RWD != currentRWD) {
				RWD = currentRWD;
				$(this).trigger('RWD');
			}
		}).trigger('resize');
	});
})(jQuery);


$(function(){
	$(window).on({
		RWD: function(){
			switch(RWD){
			case 'phone':
				//phone에서 할 내용
				break;
				
			case  'tablet':
				//phone에서 할 내용
				portfolioTab()
				break;
				
			case 'desktop':
				//desktop에서 할 내용'
				portfolioTab()
				break;
			}
		}
	});
});

 RWD */