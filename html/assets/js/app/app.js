$(function() {
    /********************************
    Toggle Aside Menu
    ********************************/
    $(document).on('click', '.navbar-toggle', function() {
        $('aside.left-panel').toggleClass('collapsed');
    });
    /********************************
    Aside Navigation Menu
    ********************************/
    $("aside.left-panel nav.navigation > ul > li:has(ul) > a").click(function() {
        if ($("aside.left-panel").hasClass('collapsed') == false || $(window).width() < 768) {
            $("aside.left-panel nav.navigation > ul > li > ul").slideUp(300);
            $("aside.left-panel nav.navigation > ul > li").removeClass('active');
            if (!$(this).next().is(":visible")) {
                $(this).next().slideToggle(300, function() {
                    $("aside.left-panel:not(.collapsed)").getNiceScroll().resize();
                });
                $(this).closest('li').addClass('active');
            }
            return false;
        }
    });
    /********************************
    Input Mask
    ********************************/
    if( $.isFunction($.fn.inputmask) ){
        $(".inputmask").inputmask();
    }
    /********************************
    DateTime Picker
    ********************************/
    if ($.isFunction($.fn.datetimepicker)) {
        $('.datetimepicker').datetimepicker();
        $('.datepicker').datetimepicker({
            pickTime: false
        });
        $('.timepicker').datetimepicker({
            pickDate: false
        });
    }
    /********************************
    wysihtml5
    ********************************/
    if ($.isFunction($.fn.wysihtml5)) {
        $('.wysihtml').wysihtml5();
    }
    /********************************
    wysihtml5
    ********************************/
    if ($.isFunction($.fn.ckeditor)) {
        CKEDITOR.disableAutoInline = true;
        $('#ckeditor').ckeditor();
        $('.inlineckeditor').ckeditor();
    }
    /********************************
    Scroll To Top
    ********************************/
    $('.scrollToTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});
/********************************
Toggle Full Screen
********************************/
function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}