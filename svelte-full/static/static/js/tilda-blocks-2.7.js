function t142_checkSize(recid) {
    var el = $("#rec" + recid).find(".t142__submit");
    if (el.length) {
        var btnheight = el.height() + 5;
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t142__submit-overflowed");
            el.html("<span class=\"t142__text\">" + btntext + "</span>")
        }
    }
}

function t190_scrollToTop() {
    $('html, body').animate({
        scrollTop: 0
    }, 700)
}

function t228__init(recid) {
    var el = $('#rec' + recid);
    var mobile = el.find('.t228__mobile');
    var fixedBlock = mobile.css('position') === 'fixed' && mobile.css('display') === 'block';
    setTimeout(function() {
        el.find('.t-menu__link-item:not(.t-menusub__target-link):not(.tooltipstered):not(.t794__tm-link)').on('click', function() {
            if ($(this).is(".t-menu__link-item.tooltipstered, .t-menu__link-item.t-menusub__target-link, .t-menu__link-item.t794__tm-link")) {
                return
            }
            if (fixedBlock) {
                mobile.trigger('click')
            }
        });
        el.find('.t-menusub__link-item').on('click', function() {
            if (fixedBlock) {
                mobile.trigger('click')
            }
        })
    }, 500)
}

function t228_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t228__list_item a[href='" + url + "']").addClass("t-active");
    $(".t228__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t228__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t228__list_item a[href='/" + pathname + "/']").addClass("t-active")
}

function t228_checkAnchorLinks(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        var t228_navLinks = el.find(".t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function() {
                t228_catchScroll(t228_navLinks)
            }, 500)
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = [],
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection)
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this)
    });
    t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function(a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top")
    });
    $(window).bind('resize', t_throttle(function() {
        t228_updateSectionsOffsets(t228_sections)
    }, 200));
    $('.t228').bind('displayChanged', function() {
        t228_updateSectionsOffsets(t228_sections)
    });
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
    t228_navLinks.click(function() {
        var clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
            }, t228_interval - (t228_now - t228_lastCall))
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId)
        }
    })
}

function t228_updateSectionsOffsets(sections) {
    $(sections).each(function() {
        var t228_curSection = $(this);
        t228_curSection.attr("data-offset-top", t228_curSection.offset().top)
    })
}

function t228_getSectionByHref(curlink) {
    var curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + curLinkValue + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + curLinkValue + "']")
    }
}

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop();
    var t228_valueToReturn = t228_clickedSectionId;
    if (t228_sections.length !== 0 && t228_clickedSectionId === null && t228_sections[t228_sections.length - 1].attr("data-offset-top") > (t228_scrollPosition + 300)) {
        t228_navLinks.removeClass('t-active');
        return null
    }
    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null
                }
            }
            return !1
        }
    });
    return t228_valueToReturn
}

function t228_setWidth(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            var left_exist = el.find('.t228__leftcontainer').length;
            var left_w = el.find('.t228__leftcontainer').outerWidth(!0);
            var max_w = left_w;
            var right_exist = el.find('.t228__rightcontainer').length;
            var right_w = el.find('.t228__rightcontainer').outerWidth(!0);
            var items_align = el.attr('data-menu-items-align');
            if (left_w < right_w) max_w = right_w;
            max_w = Math.ceil(max_w);
            var center_w = 0;
            el.find('.t228__centercontainer').find('li').each(function() {
                center_w += $(this).outerWidth(!0)
            });
            var padd_w = 40;
            var maincontainer_width = el.find(".t228__maincontainer").outerWidth();
            if (maincontainer_width - max_w * 2 - padd_w * 2 > center_w + 20) {
                if (items_align == "center" || typeof items_align === "undefined") {
                    el.find(".t228__leftside").css("min-width", max_w + "px");
                    el.find(".t228__rightside").css("min-width", max_w + "px");
                    el.find(".t228__list").removeClass("t228__list_hidden")
                }
            } else {
                el.find(".t228__leftside").css("min-width", "");
                el.find(".t228__rightside").css("min-width", "")
            }
        })
    }
}

function t228_setBg(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        el.find(".t228").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t228_appearMenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
                }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        var topoffset = el.data('top-offset');
                        if (topoffset && parseInt(topoffset) > 0) {
                            el.animate({
                                "opacity": "1",
                                "top": topoffset + "px"
                            }, 200, function() {})
                        } else {
                            el.animate({
                                "opacity": "1",
                                "top": "0px"
                            }, 200, function() {})
                        }
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden");
                    el.css("opacity", "0")
                }
            }
        })
    }
}

function t228_changebgopacitymenu(recid) {
    var el = $('#rec' + recid);
    if ($(window).width() > 980) {
        el.find(".t228").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow
            } else {
                var menushadowvalue = '0.' + menushadow
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || (typeof menushadow == "undefined" && menushadow == !1)) {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || (typeof menushadow == "undefined" && menushadow == !1)) {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            }
        })
    }
}

function t228_createMobileMenu(recid) {
    var el = $("#rec" + recid);
    var menu = el.find(".t228");
    var burger = el.find(".t228__mobile");
    burger.on('click', function(e) {
        menu.fadeToggle(300);
        burger.toggleClass("t228_opened")
    });
    $(window).bind('resize', t_throttle(function() {
        if ($(window).width() > 980) {
            menu.fadeIn(0)
        }
    }))
}

function t232_expandtext(recid) {
    $("#rec" + recid).find(".t232__text").toggle()
}
window.t266showvideo = function(recid) {
    $(document).ready(function() {
        var el = $('#coverCarry' + recid);
        var videourl = '';
        var youtubeid = $("#rec" + recid + " .t266__video-container").attr('data-content-popup-video-url-youtube');
        if (youtubeid > '') {
            videourl = 'https://www.youtube.com/embed/' + youtubeid
        }
        $("body").addClass("t266__overflow");
        $("#rec" + recid + " .t266__cover").addClass("t266__hidden");
        $("#rec" + recid + " .t266__video-container").removeClass("t266__hidden");
        $("#rec" + recid + " .t266__video-carier").html("<iframe id=\"youtubeiframe" + recid + "\" class=\"t266__iframe\" width=\"100%\" height=\"540\" src=\"" + videourl + "?rel=0&autoplay=1\" frameborder=\"0\" allowfullscreen></iframe><a class=\"t266__close-link\" href=\"javascript:t266hidevideo('" + recid + "');\"><div class=\"t266__close\"></div></a>")
    })
}
window.t266hidevideo = function(recid) {
    $(document).ready(function() {
        $("body").removeClass("t266__overflow");
        $("#rec" + recid + " .t266__cover").removeClass("t266__hidden");
        $("#rec" + recid + " .t266__video-container").addClass("t266__hidden");
        $("#rec" + recid + " .t266__video-carier").html("<div class=\"t266__video-bg2\"></div>")
    })
}

function t282_showMenu(recid) {
    var el = $("#rec" + recid);
    el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function() {
        if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link")) {
            return
        }
        $('body').toggleClass('t282_opened');
        el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
        el.find(".t282__menu__container").css({
            'top': (el.find(".t282__container").height() + 'px')
        })
    });
    $('.t282').bind('clickedAnchorInTooltipMenu', function() {
        $('body').removeClass('t282_opened');
        $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
    });
    if (el.find('.t-menusub__link-item')) {
        el.find('.t-menusub__link-item').on('click', function() {
            $('body').removeClass('t282_opened');
            $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
        })
    }
}

function t282_changeSize(recid) {
    var el = $("#rec" + recid);
    var bottomheight = el.find(".t282__menu__container");
    var headerheight = el.find(".t282__container");
    var menu = bottomheight.height() + headerheight.height();
    var win = $(window).height();
    if (menu > win) {
        $("#nav" + recid).addClass('t282__menu_static')
    } else {
        $("#nav" + recid).removeClass('t282__menu_static')
    }
}

function t282_changeBgOpacityMenu(recid) {
    var window_width = $(window).width();
    var record = $("#rec" + recid);
    record.find(".t282__container__bg").each(function() {
        var el = $(this);
        var bgcolor = el.attr("data-bgcolor-rgba");
        var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
        var bgopacity = el.attr("data-bgopacity");
        var bgopacity_afterscroll = el.attr("data-bgopacity2");
        var menu_shadow = el.attr("data-menu-shadow");
        if ($(window).scrollTop() > 20) {
            el.css("background-color", bgcolor_afterscroll);
            if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
                el.css('box-shadow', menu_shadow)
            } else {
                el.css('box-shadow', 'none')
            }
        } else {
            el.css("background-color", bgcolor);
            if (bgopacity != "0" && bgopacity != "0.0") {
                el.css('box-shadow', menu_shadow)
            } else {
                el.css('box-shadow', 'none')
            }
        }
    })
}

function t282_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t282__menu a[href='" + url + "']").addClass("t-active");
    $(".t282__menu a[href='" + url + "/']").addClass("t-active");
    $(".t282__menu a[href='" + pathname + "']").addClass("t-active");
    $(".t282__menu a[href='/" + pathname + "']").addClass("t-active");
    $(".t282__menu a[href='" + pathname + "/']").addClass("t-active");
    $(".t282__menu a[href='/" + pathname + "/']").addClass("t-active")
}

function t282_appearMenu(recid) {
    var window_width = $(window).width();
    $(".t282").each(function() {
        var el = $(this);
        var appearoffset = el.attr("data-appearoffset");
        if (appearoffset != "") {
            if (appearoffset.indexOf('vh') > -1) {
                appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
            }
            appearoffset = parseInt(appearoffset, 10);
            if ($(window).scrollTop() >= appearoffset) {
                if (el.css('visibility') == 'hidden') {
                    el.finish();
                    el.css("top", "-50px");
                    el.css("visibility", "visible");
                    el.animate({
                        "opacity": "1",
                        "top": "0px"
                    }, 200, function() {})
                }
            } else {
                el.stop();
                el.css("visibility", "hidden")
            }
        }
    })
}

function t391_checkSize(recid) {
    var el = $("#rec" + recid);
    var cover = el.find('.t-cover');
    var carrier = el.find('.t-cover__carrier');
    var filter = el.find('.t-cover__filter');
    var height = el.find('.t391__firstcol').height() + el.find('.t391__secondcol').height();
    if (window.matchMedia('(max-width: 960px)').matches && height > 0) {
        cover.css('height', height);
        carrier.css('height', height);
        filter.css('height', height)
    }
}

function t396_init(recid) {
    var data = '';
    var res = t396_detectResolution();
    t396_initTNobj();
    t396_switchResolution(res);
    t396_updateTNobj();
    t396_artboard_build(data, recid);
    window.tn_window_width = $(window).width();
    $(window).resize(function() {
        tn_console('>>>> t396: Window on Resize event >>>>');
        t396_waitForFinalEvent(function() {
            if ($isMobile) {
                var ww = $(window).width();
                if (ww != window.tn_window_width) {
                    t396_doResize(recid)
                }
            } else {
                t396_doResize(recid)
            }
        }, 500, 'resizeruniqueid' + recid)
    });
    $(window).on("orientationchange", function() {
        tn_console('>>>> t396: Orient change event >>>>');
        t396_waitForFinalEvent(function() {
            t396_doResize(recid)
        }, 600, 'orientationuniqueid' + recid)
    });
    $(window).load(function() {
        var ab = $('#rec' + recid).find('.t396__artboard');
        t396_allelems__renderView(ab)
    });
    var rec = $('#rec' + recid);
    if (rec.attr('data-connect-with-tab') == 'yes') {
        rec.find('.t396').bind('displayChanged', function() {
            var ab = rec.find('.t396__artboard');
            t396_allelems__renderView(ab)
        })
    }
}

function t396_doResize(recid) {
    var ww = $(window).width();
    window.tn_window_width = ww;
    var res = t396_detectResolution();
    var ab = $('#rec' + recid).find('.t396__artboard');
    t396_switchResolution(res);
    t396_updateTNobj();
    t396_ab__renderView(ab);
    t396_allelems__renderView(ab)
}

function t396_detectResolution() {
    var ww = $(window).width();
    var res;
    res = 1200;
    if (ww < 1200) {
        res = 960
    }
    if (ww < 960) {
        res = 640
    }
    if (ww < 640) {
        res = 480
    }
    if (ww < 480) {
        res = 320
    }
    return (res)
}

function t396_initTNobj() {
    tn_console('func: initTNobj');
    window.tn = {};
    window.tn.canvas_min_sizes = ["320", "480", "640", "960", "1200"];
    window.tn.canvas_max_sizes = ["480", "640", "960", "1200", ""];
    window.tn.ab_fields = ["height", "width", "bgcolor", "bgimg", "bgattachment", "bgposition", "filteropacity", "filtercolor", "filteropacity2", "filtercolor2", "height_vh", "valign"]
}

function t396_updateTNobj() {
    tn_console('func: updateTNobj');
    if (typeof window.zero_window_width_hook != 'undefined' && window.zero_window_width_hook == 'allrecords' && $('#allrecords').length) {
        window.tn.window_width = parseInt($('#allrecords').width())
    } else {
        window.tn.window_width = parseInt($(window).width())
    }
    window.tn.window_height = parseInt($(window).height());
    if (window.tn.curResolution == 1200) {
        window.tn.canvas_min_width = 1200;
        window.tn.canvas_max_width = window.tn.window_width
    }
    if (window.tn.curResolution == 960) {
        window.tn.canvas_min_width = 960;
        window.tn.canvas_max_width = 1200
    }
    if (window.tn.curResolution == 640) {
        window.tn.canvas_min_width = 640;
        window.tn.canvas_max_width = 960
    }
    if (window.tn.curResolution == 480) {
        window.tn.canvas_min_width = 480;
        window.tn.canvas_max_width = 640
    }
    if (window.tn.curResolution == 320) {
        window.tn.canvas_min_width = 320;
        window.tn.canvas_max_width = 480
    }
    window.tn.grid_width = window.tn.canvas_min_width;
    window.tn.grid_offset_left = parseFloat((window.tn.window_width - window.tn.grid_width) / 2)
}
var t396_waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId"
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId])
        }
        timers[uniqueId] = setTimeout(callback, ms)
    }
})();

function t396_switchResolution(res, resmax) {
    tn_console('func: switchResolution');
    if (typeof resmax == 'undefined') {
        if (res == 1200) resmax = '';
        if (res == 960) resmax = 1200;
        if (res == 640) resmax = 960;
        if (res == 480) resmax = 640;
        if (res == 320) resmax = 480
    }
    window.tn.curResolution = res;
    window.tn.curResolution_max = resmax
}

function t396_artboard_build(data, recid) {
    tn_console('func: t396_artboard_build. Recid:' + recid);
    tn_console(data);
    var ab = $('#rec' + recid).find('.t396__artboard');
    t396_ab__renderView(ab);
    ab.find('.tn-elem').each(function() {
        var item = $(this);
        if (item.attr('data-elem-type') == 'text') {
            t396_addText(ab, item)
        }
        if (item.attr('data-elem-type') == 'image') {
            t396_addImage(ab, item)
        }
        if (item.attr('data-elem-type') == 'shape') {
            t396_addShape(ab, item)
        }
        if (item.attr('data-elem-type') == 'button') {
            t396_addButton(ab, item)
        }
        if (item.attr('data-elem-type') == 'video') {
            t396_addVideo(ab, item)
        }
        if (item.attr('data-elem-type') == 'html') {
            t396_addHtml(ab, item)
        }
        if (item.attr('data-elem-type') == 'tooltip') {
            t396_addTooltip(ab, item)
        }
        if (item.attr('data-elem-type') == 'form') {
            t396_addForm(ab, item)
        }
        if (item.attr('data-elem-type') == 'gallery') {
            t396_addGallery(ab, item)
        }
    });
    $('#rec' + recid).find('.t396__artboard').removeClass('rendering').addClass('rendered');
    if (ab.attr('data-artboard-ovrflw') == 'visible') {
        $('#allrecords').css('overflow', 'hidden')
    }
    if ($isMobile) {
        $('#rec' + recid).append('<style>@media only screen and (min-width:1366px) and (orientation:landscape) and (-webkit-min-device-pixel-ratio:2) {.t396__carrier {background-attachment:scroll!important;}}</style>')
    }
}

function t396_ab__renderView(ab) {
    var fields = window.tn.ab_fields;
    for (var i = 0; i < fields.length; i++) {
        t396_ab__renderViewOneField(ab, fields[i])
    }
    var ab_min_height = t396_ab__getFieldValue(ab, 'height');
    var ab_max_height = t396_ab__getHeight(ab);
    var offset_top = 0;
    if (ab_min_height == ab_max_height) {
        offset_top = 0
    } else {
        var ab_valign = t396_ab__getFieldValue(ab, 'valign');
        if (ab_valign == 'top') {
            offset_top = 0
        } else if (ab_valign == 'center') {
            offset_top = parseFloat((ab_max_height - ab_min_height) / 2).toFixed(1)
        } else if (ab_valign == 'bottom') {
            offset_top = parseFloat((ab_max_height - ab_min_height)).toFixed(1)
        } else if (ab_valign == 'stretch') {
            offset_top = 0;
            ab_min_height = ab_max_height
        } else {
            offset_top = 0
        }
    }
    ab.attr('data-artboard-proxy-min-offset-top', offset_top);
    ab.attr('data-artboard-proxy-min-height', ab_min_height);
    ab.attr('data-artboard-proxy-max-height', ab_max_height)
}

function t396_addText(ab, el) {
    tn_console('func: addText');
    var fields_str = 'top,left,width,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addImage(ab, el) {
    tn_console('func: addImage');
    var fields_str = 'img,width,filewidth,fileheight,top,left,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    el.find('img').on("load", function() {
        t396_elem__renderViewOneField(el, 'top');
        if (typeof $(this).attr('src') != 'undefined' && $(this).attr('src') != '') {
            setTimeout(function() {
                t396_elem__renderViewOneField(el, 'top')
            }, 2000)
        }
    }).each(function() {
        if (this.complete) $(this).load()
    });
    el.find('img').on('tuwidget_done', function(e, file) {
        t396_elem__renderViewOneField(el, 'top')
    })
}

function t396_addShape(ab, el) {
    tn_console('func: addShape');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addButton(ab, el) {
    tn_console('func: addButton');
    var fields_str = 'top,left,width,height,container,axisx,axisy,caption,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    return (el)
}

function t396_addVideo(ab, el) {
    tn_console('func: addVideo');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    var viel = el.find('.tn-atom__videoiframe');
    var viatel = el.find('.tn-atom');
    viatel.css('background-color', '#000');
    var vihascover = viatel.attr('data-atom-video-has-cover');
    if (typeof vihascover == 'undefined') {
        vihascover = ''
    }
    if (vihascover == 'y') {
        viatel.click(function() {
            var viifel = viel.find('iframe');
            if (viifel.length) {
                var foo = viifel.attr('data-original');
                viifel.attr('src', foo)
            }
            viatel.css('background-image', 'none');
            viatel.find('.tn-atom__video-play-link').css('display', 'none')
        })
    }
    var autoplay = t396_elem__getFieldValue(el, 'autoplay');
    var showinfo = t396_elem__getFieldValue(el, 'showinfo');
    var loop = t396_elem__getFieldValue(el, 'loop');
    var mute = t396_elem__getFieldValue(el, 'mute');
    var startsec = t396_elem__getFieldValue(el, 'startsec');
    var endsec = t396_elem__getFieldValue(el, 'endsec');
    var tmode = $('#allrecords').attr('data-tilda-mode');
    var url = '';
    var viyid = viel.attr('data-youtubeid');
    if (typeof viyid != 'undefined' && viyid != '') {
        url = '//www.youtube.com/embed/';
        url += viyid + '?rel=0&fmt=18&html5=1';
        url += '&showinfo=' + (showinfo == 'y' ? '1' : '0');
        if (loop == 'y') {
            url += '&loop=1&playlist=' + viyid
        }
        if (startsec > 0) {
            url += '&start=' + startsec
        }
        if (endsec > 0) {
            url += '&end=' + endsec
        }
        if (mute == 'y') {
            url += '&mute=1'
        }
        if (vihascover == 'y') {
            url += '&autoplay=1';
            viel.html('<iframe id="youtubeiframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>')
        } else {
            if (typeof tmode != 'undefined' && tmode == 'edit') {} else {
                if (autoplay == 'y') {
                    url += '&autoplay=1'
                }
            }
            if (window.lazy == 'y') {
                viel.html('<iframe id="youtubeiframe" class="t-iframe" width="100%" height="100%" data-original="' + url + '" frameborder="0" allowfullscreen data-flag-inst="lazy"></iframe>');
                el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>')
            } else {
                viel.html('<iframe id="youtubeiframe" width="100%" height="100%" src="' + url + '" frameborder="0" allowfullscreen data-flag-inst="y"></iframe>')
            }
        }
    }
    var vivid = viel.attr('data-vimeoid');
    if (typeof vivid != 'undefined' && vivid > 0) {
        url = '//player.vimeo.com/video/';
        url += vivid + '?color=ffffff&badge=0';
        if (showinfo == 'y') {
            url += '&title=1&byline=1&portrait=1'
        } else {
            url += '&title=0&byline=0&portrait=0'
        }
        if (loop == 'y') {
            url += '&loop=1'
        }
        if (mute == 'y') {
            url += '&muted=1'
        }
        if (vihascover == 'y') {
            url += '&autoplay=1';
            viel.html('<iframe data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
        } else {
            if (typeof tmode != 'undefined' && tmode == 'edit') {} else {
                if (autoplay == 'y') {
                    url += '&autoplay=1'
                }
            }
            if (window.lazy == 'y') {
                viel.html('<iframe class="t-iframe" data-original="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                el.append('<script>lazyload_iframe = new LazyLoad({elements_selector: ".t-iframe"});</script>')
            } else {
                viel.html('<iframe src="' + url + '" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            }
        }
    }
}

function t396_addHtml(ab, el) {
    tn_console('func: addHtml');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addTooltip(ab, el) {
    tn_console('func: addTooltip');
    var fields_str = 'width,height,top,left,';
    fields_str += 'container,axisx,axisy,widthunits,heightunits,leftunits,topunits,tipposition';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el);
    var pinEl = el.find('.tn-atom__pin');
    var tipEl = el.find('.tn-atom__tip');
    var tipopen = el.attr('data-field-tipopen-value');
    if (isMobile || (typeof tipopen != 'undefined' && tipopen == 'click')) {
        t396_setUpTooltip_mobile(el, pinEl, tipEl)
    } else {
        t396_setUpTooltip_desktop(el, pinEl, tipEl)
    }
    setTimeout(function() {
        $('.tn-atom__tip-img').each(function() {
            var foo = $(this).attr('data-tipimg-original');
            if (typeof foo != 'undefined' && foo != '') {
                $(this).attr('src', foo)
            }
        })
    }, 3000)
}

function t396_addForm(ab, el) {
    tn_console('func: addForm');
    var fields_str = 'width,top,left,';
    fields_str += 'inputs,container,axisx,axisy,widthunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_addGallery(ab, el) {
    tn_console('func: addForm');
    var fields_str = 'width,height,top,left,';
    fields_str += 'imgs,container,axisx,axisy,widthunits,heightunits,leftunits,topunits';
    var fields = fields_str.split(',');
    el.attr('data-fields', fields_str);
    t396_elem__renderView(el)
}

function t396_elem__setFieldValue(el, prop, val, flag_render, flag_updateui, res) {
    if (res == '') res = window.tn.curResolution;
    if (res < 1200 && prop != 'zindex') {
        el.attr('data-field-' + prop + '-res-' + res + '-value', val)
    } else {
        el.attr('data-field-' + prop + '-value', val)
    }
    if (flag_render == 'render') elem__renderViewOneField(el, prop);
    if (flag_updateui == 'updateui') panelSettings__updateUi(el, prop, val)
}

function t396_elem__getFieldValue(el, prop) {
    var res = window.tn.curResolution;
    var r;
    if (res < 1200) {
        if (res == 960) {
            r = el.attr('data-field-' + prop + '-res-960-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-value')
            }
        }
        if (res == 640) {
            r = el.attr('data-field-' + prop + '-res-640-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-960-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-value')
                }
            }
        }
        if (res == 480) {
            r = el.attr('data-field-' + prop + '-res-480-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-640-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-res-960-value');
                    if (typeof r == 'undefined') {
                        r = el.attr('data-field-' + prop + '-value')
                    }
                }
            }
        }
        if (res == 320) {
            r = el.attr('data-field-' + prop + '-res-320-value');
            if (typeof r == 'undefined') {
                r = el.attr('data-field-' + prop + '-res-480-value');
                if (typeof r == 'undefined') {
                    r = el.attr('data-field-' + prop + '-res-640-value');
                    if (typeof r == 'undefined') {
                        r = el.attr('data-field-' + prop + '-res-960-value');
                        if (typeof r == 'undefined') {
                            r = el.attr('data-field-' + prop + '-value')
                        }
                    }
                }
            }
        }
    } else {
        r = el.attr('data-field-' + prop + '-value')
    }
    return (r)
}

function t396_elem__renderView(el) {
    tn_console('func: elem__renderView');
    var fields = el.attr('data-fields');
    if (!fields) {
        return !1
    }
    fields = fields.split(',');
    for (var i = 0; i < fields.length; i++) {
        t396_elem__renderViewOneField(el, fields[i])
    }
}

function t396_elem__renderViewOneField(el, field) {
    var value = t396_elem__getFieldValue(el, field);
    if (field == 'left') {
        value = t396_elem__convertPosition__Local__toAbsolute(el, field, value);
        el.css('left', parseFloat(value).toFixed(1) + 'px')
    }
    if (field == 'top') {
        value = t396_elem__convertPosition__Local__toAbsolute(el, field, value);
        el.css('top', parseFloat(value).toFixed(1) + 'px')
    }
    if (field == 'width') {
        value = t396_elem__getWidth(el, value);
        el.css('width', parseFloat(value).toFixed(1) + 'px');
        var eltype = el.attr('data-elem-type');
        if (eltype == 'tooltip') {
            var pinSvgIcon = el.find('.tn-atom__pin-icon');
            if (pinSvgIcon.length > 0) {
                var pinSize = parseFloat(value).toFixed(1) + 'px';
                pinSvgIcon.css({
                    'width': pinSize,
                    'height': pinSize
                })
            }
            el.css('height', parseInt(value).toFixed(1) + 'px')
        }
        if (eltype == 'gallery') {
            var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');
            var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');
            if (borderStyle == 'none' || typeof borderStyle == 'undefined' || typeof borderWidth == 'undefined' || borderWidth == '') borderWidth = 0;
            value = value * 1 - borderWidth * 2;
            el.css('width', parseFloat(value).toFixed(1) + 'px');
            el.find('.t-slds__main').css('width', parseFloat(value).toFixed(1) + 'px');
            el.find('.tn-atom__slds-img').css('width', parseFloat(value).toFixed(1) + 'px')
        }
    }
    if (field == 'height') {
        var eltype = el.attr('data-elem-type');
        if (eltype == 'tooltip') {
            return
        }
        value = t396_elem__getHeight(el, value);
        el.css('height', parseFloat(value).toFixed(1) + 'px');
        if (eltype === 'gallery') {
            var borderWidth = t396_elem__getFieldValue(el, 'borderwidth');
            var borderStyle = t396_elem__getFieldValue(el, 'borderstyle');
            if (borderStyle == 'none' || typeof borderStyle == 'undefined' || typeof borderWidth == 'undefined' || borderWidth == '') borderWidth = 0;
            value = value * 1 - borderWidth * 2;
            el.css('height', parseFloat(value).toFixed(1) + 'px');
            el.find('.tn-atom__slds-img').css('height', parseFloat(value).toFixed(1) + 'px');
            el.find('.t-slds__main').css('height', parseFloat(value).toFixed(1) + 'px')
        }
    }
    if (field == 'container') {
        t396_elem__renderViewOneField(el, 'left');
        t396_elem__renderViewOneField(el, 'top')
    }
    if (field == 'width' || field == 'height' || field == 'fontsize' || field == 'fontfamily' || field == 'letterspacing' || field == 'fontweight' || field == 'img') {
        t396_elem__renderViewOneField(el, 'left');
        t396_elem__renderViewOneField(el, 'top')
    }
    if (field == 'inputs') {
        value = el.find('.tn-atom__inputs-textarea').val();
        try {
            t_zeroForms__renderForm(el, value)
        } catch (err) {}
    }
}

function t396_elem__convertPosition__Local__toAbsolute(el, field, value) {
    value = parseInt(value);
    if (field == 'left') {
        var el_container, offset_left, el_container_width, el_width;
        var container = t396_elem__getFieldValue(el, 'container');
        if (container == 'grid') {
            el_container = 'grid';
            offset_left = window.tn.grid_offset_left;
            el_container_width = window.tn.grid_width
        } else {
            el_container = 'window';
            offset_left = 0;
            el_container_width = window.tn.window_width
        }
        var el_leftunits = t396_elem__getFieldValue(el, 'leftunits');
        if (el_leftunits == '%') {
            value = t396_roundFloat(el_container_width * value / 100)
        }
        value = offset_left + value;
        var el_axisx = t396_elem__getFieldValue(el, 'axisx');
        if (el_axisx == 'center') {
            el_width = t396_elem__getWidth(el);
            value = el_container_width / 2 - el_width / 2 + value
        }
        if (el_axisx == 'right') {
            el_width = t396_elem__getWidth(el);
            value = el_container_width - el_width + value
        }
    }
    if (field == 'top') {
        var ab = el.parent();
        var el_container, offset_top, el_container_height, el_height;
        var container = t396_elem__getFieldValue(el, 'container');
        if (container == 'grid') {
            el_container = 'grid';
            offset_top = parseFloat(ab.attr('data-artboard-proxy-min-offset-top'));
            el_container_height = parseFloat(ab.attr('data-artboard-proxy-min-height'))
        } else {
            el_container = 'window';
            offset_top = 0;
            el_container_height = parseFloat(ab.attr('data-artboard-proxy-max-height'))
        }
        var el_topunits = t396_elem__getFieldValue(el, 'topunits');
        if (el_topunits == '%') {
            value = (el_container_height * (value / 100))
        }
        value = offset_top + value;
        var el_axisy = t396_elem__getFieldValue(el, 'axisy');
        if (el_axisy == 'center') {
            el_height = t396_elem__getHeight(el);
            value = el_container_height / 2 - el_height / 2 + value
        }
        if (el_axisy == 'bottom') {
            el_height = t396_elem__getHeight(el);
            value = el_container_height - el_height + value
        }
    }
    return (value)
}

function t396_ab__setFieldValue(ab, prop, val, res) {
    if (res == '') res = window.tn.curResolution;
    if (res < 1200) {
        ab.attr('data-artboard-' + prop + '-res-' + res, val)
    } else {
        ab.attr('data-artboard-' + prop, val)
    }
}

function t396_ab__getFieldValue(ab, prop) {
    var res = window.tn.curResolution;
    var r;
    if (res < 1200) {
        if (res == 960) {
            r = ab.attr('data-artboard-' + prop + '-res-960');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '')
            }
        }
        if (res == 640) {
            r = ab.attr('data-artboard-' + prop + '-res-640');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-960');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '')
                }
            }
        }
        if (res == 480) {
            r = ab.attr('data-artboard-' + prop + '-res-480');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-640');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '-res-960');
                    if (typeof r == 'undefined') {
                        r = ab.attr('data-artboard-' + prop + '')
                    }
                }
            }
        }
        if (res == 320) {
            r = ab.attr('data-artboard-' + prop + '-res-320');
            if (typeof r == 'undefined') {
                r = ab.attr('data-artboard-' + prop + '-res-480');
                if (typeof r == 'undefined') {
                    r = ab.attr('data-artboard-' + prop + '-res-640');
                    if (typeof r == 'undefined') {
                        r = ab.attr('data-artboard-' + prop + '-res-960');
                        if (typeof r == 'undefined') {
                            r = ab.attr('data-artboard-' + prop + '')
                        }
                    }
                }
            }
        }
    } else {
        r = ab.attr('data-artboard-' + prop)
    }
    return (r)
}

function t396_ab__renderViewOneField(ab, field) {
    var value = t396_ab__getFieldValue(ab, field)
}

function t396_allelems__renderView(ab) {
    tn_console('func: allelems__renderView: abid:' + ab.attr('data-artboard-recid'));
    ab.find(".tn-elem").each(function() {
        t396_elem__renderView($(this))
    })
}

function t396_ab__filterUpdate(ab) {
    var filter = ab.find('.t396__filter');
    var c1 = filter.attr('data-filtercolor-rgb');
    var c2 = filter.attr('data-filtercolor2-rgb');
    var o1 = filter.attr('data-filteropacity');
    var o2 = filter.attr('data-filteropacity2');
    if ((typeof c2 == 'undefined' || c2 == '') && (typeof c1 != 'undefined' && c1 != '')) {
        filter.css("background-color", "rgba(" + c1 + "," + o1 + ")")
    } else if ((typeof c1 == 'undefined' || c1 == '') && (typeof c2 != 'undefined' && c2 != '')) {
        filter.css("background-color", "rgba(" + c2 + "," + o2 + ")")
    } else if (typeof c1 != 'undefined' && typeof c2 != 'undefined' && c1 != '' && c2 != '') {
        filter.css({
            background: "-webkit-gradient(linear, left top, left bottom, from(rgba(" + c1 + "," + o1 + ")), to(rgba(" + c2 + "," + o2 + ")) )"
        })
    } else {
        filter.css("background-color", 'transparent')
    }
}

function t396_ab__getHeight(ab, ab_height) {
    if (typeof ab_height == 'undefined') ab_height = t396_ab__getFieldValue(ab, 'height');
    ab_height = parseFloat(ab_height);
    var ab_height_vh = t396_ab__getFieldValue(ab, 'height_vh');
    if (ab_height_vh != '') {
        ab_height_vh = parseFloat(ab_height_vh);
        if (isNaN(ab_height_vh) === !1) {
            var ab_height_vh_px = parseFloat(window.tn.window_height * parseFloat(ab_height_vh / 100));
            if (ab_height < ab_height_vh_px) {
                ab_height = ab_height_vh_px
            }
        }
    }
    return (ab_height)
}

function t396_hex2rgb(hexStr) {
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b]
}
String.prototype.t396_replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement)
};

function t396_elem__getWidth(el, value) {
    if (typeof value == 'undefined') value = parseFloat(t396_elem__getFieldValue(el, 'width'));
    var el_widthunits = t396_elem__getFieldValue(el, 'widthunits');
    if (el_widthunits == '%') {
        var el_container = t396_elem__getFieldValue(el, 'container');
        if (el_container == 'window') {
            value = parseFloat(window.tn.window_width * parseFloat(parseInt(value) / 100))
        } else {
            value = parseFloat(window.tn.grid_width * parseFloat(parseInt(value) / 100))
        }
    }
    return (value)
}

function t396_elem__getHeight(el, value) {
    if (typeof value == 'undefined') value = t396_elem__getFieldValue(el, 'height');
    value = parseFloat(value);
    if (el.attr('data-elem-type') == 'shape' || el.attr('data-elem-type') == 'video' || el.attr('data-elem-type') == 'html' || el.attr('data-elem-type') == 'gallery') {
        var el_heightunits = t396_elem__getFieldValue(el, 'heightunits');
        if (el_heightunits == '%') {
            var ab = el.parent();
            var ab_min_height = parseFloat(ab.attr('data-artboard-proxy-min-height'));
            var ab_max_height = parseFloat(ab.attr('data-artboard-proxy-max-height'));
            var el_container = t396_elem__getFieldValue(el, 'container');
            if (el_container == 'window') {
                value = parseFloat(ab_max_height * parseFloat(value / 100))
            } else {
                value = parseFloat(ab_min_height * parseFloat(value / 100))
            }
        }
    } else if (el.attr('data-elem-type') == 'button') {
        value = value
    } else {
        value = parseFloat(el.innerHeight())
    }
    return (value)
}

function t396_roundFloat(n) {
    n = Math.round(n * 100) / 100;
    return (n)
}

function tn_console(str) {
    if (window.tn_comments == 1) console.log(str)
}

function t396_setUpTooltip_desktop(el, pinEl, tipEl) {
    var timer;
    pinEl.mouseover(function() {
        $('.tn-atom__tip_visible').each(function() {
            var thisTipEl = $(this).parents('.t396__elem');
            if (thisTipEl.attr('data-elem-id') != el.attr('data-elem-id')) {
                t396_hideTooltip(thisTipEl, $(this))
            }
        });
        clearTimeout(timer);
        if (tipEl.css('display') == 'block') {
            return
        }
        t396_showTooltip(el, tipEl)
    });
    pinEl.mouseout(function() {
        timer = setTimeout(function() {
            t396_hideTooltip(el, tipEl)
        }, 300)
    })
}

function t396_setUpTooltip_mobile(el, pinEl, tipEl) {
    pinEl.on('click', function(e) {
        if (tipEl.css('display') == 'block' && $(e.target).hasClass("tn-atom__pin")) {
            t396_hideTooltip(el, tipEl)
        } else {
            t396_showTooltip(el, tipEl)
        }
    });
    var id = el.attr("data-elem-id");
    $(document).click(function(e) {
        var isInsideTooltip = ($(e.target).hasClass("tn-atom__pin") || $(e.target).parents(".tn-atom__pin").length > 0);
        if (isInsideTooltip) {
            var clickedPinId = $(e.target).parents(".t396__elem").attr("data-elem-id");
            if (clickedPinId == id) {
                return
            }
        }
        t396_hideTooltip(el, tipEl)
    })
}

function t396_hideTooltip(el, tipEl) {
    tipEl.css('display', '');
    tipEl.css({
        "left": "",
        "transform": "",
        "right": ""
    });
    tipEl.removeClass('tn-atom__tip_visible');
    el.css('z-index', '')
}

function t396_showTooltip(el, tipEl) {
    var pos = el.attr("data-field-tipposition-value");
    if (typeof pos == 'undefined' || pos == '') {
        pos = 'top'
    };
    var elSize = el.height();
    var elTop = el.offset().top;
    var elBottom = elTop + elSize;
    var elLeft = el.offset().left;
    var elRight = el.offset().left + elSize;
    var winTop = $(window).scrollTop();
    var winWidth = $(window).width();
    var winBottom = winTop + $(window).height();
    var tipElHeight = tipEl.outerHeight();
    var tipElWidth = tipEl.outerWidth();
    var padd = 15;
    if (pos == 'right' || pos == 'left') {
        var tipElRight = elRight + padd + tipElWidth;
        var tipElLeft = elLeft - padd - tipElWidth;
        if ((pos == 'right' && tipElRight > winWidth) || (pos == 'left' && tipElLeft < 0)) {
            pos = 'top'
        }
    }
    if (pos == 'top' || pos == 'bottom') {
        var tipElRight = elRight + (tipElWidth / 2 - elSize / 2);
        var tipElLeft = elLeft - (tipElWidth / 2 - elSize / 2);
        if (tipElRight > winWidth) {
            var rightOffset = -(winWidth - elRight - padd);
            tipEl.css({
                "left": "auto",
                "transform": "none",
                "right": rightOffset + "px"
            })
        }
        if (tipElLeft < 0) {
            var leftOffset = -(elLeft - padd);
            tipEl.css({
                "left": leftOffset + "px",
                "transform": "none"
            })
        }
    }
    if (pos == 'top') {
        var tipElTop = elTop - padd - tipElHeight;
        if (winTop > tipElTop) {
            pos = 'bottom'
        }
    }
    if (pos == 'bottom') {
        var tipElBottom = elBottom + padd + tipElHeight;
        if (winBottom < tipElBottom) {
            pos = 'top'
        }
    }
    tipEl.attr('data-tip-pos', pos);
    tipEl.css('display', 'block');
    tipEl.addClass('tn-atom__tip_visible');
    el.css('z-index', '1000')
}

function t396_hex2rgba(hexStr, opacity) {
    var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
    return [r, g, b, parseFloat(opacity)]
}

function t400_init(recid) {
    var el = $('#rec' + recid);
    var btn = el.find('.t400__submit');
    var hideBackText = btn.attr("data-hide-back-text");
    var showMoreText = btn.html();
    el.find('.t400__submit').click(function() {
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0 && $(this).hasClass('t400__submit_hide-back')) {
            t400_alltabs_updateContent(recid);
            $(this).removeClass('t400__submit_hide-back');
            btn.html(showMoreText);
            $('.t396').trigger('displayChanged');
            return
        }
        var recids = $(this).attr('data-hidden-rec-ids').split(',');
        recids.forEach(function(recid) {
            var el = $('#rec' + recid);
            el.removeClass('t400__off');
            el.css('opacity', '');
            var video = el.find('.t-video-lazyload');
            if (video.length > 0) {
                if (video.parents('.t121').length > 0 || video.parents('.t223').length > 0 || video.parents('.t230').length > 0 || video.parents('.t368').length > 0) {
                    t400_updateVideoLazyLoad(video)
                }
            }
            el.find('.t-feed, .t-store, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t538, .t539, .t544, .t545, .t552, .t554, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t902, .t912, .t923, .t937').trigger('displayChanged')
        });
        if (typeof hideBackText != 'undefined' && hideBackText.length > 0) {
            btn.addClass('t400__submit_hide-back');
            btn.html(hideBackText)
        } else {
            el.addClass('t400__off').hide()
        }
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    t400_alltabs_updateContent(recid);
    t400_checkSize(recid)
}

function t400_alltabs_updateContent(recid) {
    var el = $('#rec' + recid);
    el.find(".t400__submit").each(function(i) {
        var recids = $(this).attr('data-hidden-rec-ids').split(',');
        recids.forEach(function(recid) {
            var el = $('#rec' + recid);
            el.attr('data-animationappear', 'off');
            el.attr('data-connect-with-tab', 'yes');
            el.addClass('t400__off')
        })
    })
}

function t400_checkSize(recid) {
    var el = $("#rec" + recid).find(".t400__submit");
    if (el.length) {
        var btnheight = el.height();
        var textheight = el[0].scrollHeight;
        if (btnheight < textheight) {
            var btntext = el.text();
            el.addClass("t400__submit-overflowed");
            el.html("<span class=\"t400__text\">" + btntext + "</span>")
        }
    }
}

function t400_updateVideoLazyLoad(video) {
    setTimeout(function() {
        video.each(function() {
            var div = $(this);
            var height = div.attr('data-videolazy-height') ? $(this).attr('data-videolazy-height') : '100%';
            if (height.indexOf('vh') != -1) {
                height = '100%'
            }
            var videoId = div.attr('data-videolazy-id').trim();
            var blockId = div.attr('data-blocklazy-id') || '';
            if (typeof div.attr('data-videolazy-two-id') != 'undefined') {
                var videoTwoId = '_' + div.attr('data-videolazy-two-id') + '_'
            } else {
                var videoTwoId = ''
            }
            if (div.attr('data-videolazy-type') == 'youtube') {
                div.find('iframe').remove();
                div.prepend('<iframe id="youtubeiframe' + videoTwoId + blockId + '" width="100%" height="' + height + '" src="//www.youtube.com/embed/' + videoId + '?rel=0&fmt=18&html5=1&showinfo=0" frameborder="0" allowfullscreen></iframe>')
            }
        })
    }, 300)
}

function t431_init(recid) {
    var tableHead = t431__escapeHTML($('#rec' + recid + ' .t431 .t431__data-part1').html() || "");
    var tableBody = t431__escapeHTML($('#rec' + recid + ' .t431 .t431__data-part2').html() || "");
    var tableColSize = $('#rec' + recid + ' .t431 .t431__table').attr("data-table-width");
    var hasTargetBlank = $('#rec' + recid + ' .t431 .t431__table').attr("data-target-blank");
    var tHead = t431_parseData(tableHead);
    var tBody = t431_parseData(tableBody);
    var colSize = t431_parseData(tableColSize);
    var maxColNum = t431__findMaxRowLengthInTable(tHead, tBody);
    var colWidth = t431__setColumnsWidth(colSize, maxColNum, recid);
    var container = $('#rec' + recid + ' .t431 .t431__table');
    var html = "";
    if (tHead) {
        html += t431__generateTable(tHead, "th", hasTargetBlank, colWidth, maxColNum)
    }
    if (tBody) {
        html += t431__generateTable(tBody, "td", hasTargetBlank, colWidth, maxColNum)
    }
    container.append(html)
}

function t431__findMaxRowLengthInTable(arrayHead, arrayData) {
    var headMaxLength = 0;
    var dataMaxLength = 0;
    if (arrayHead) {
        headMaxLength = t431__findMaxRowLengInArray(arrayHead)
    }
    if (arrayData) {
        dataMaxLength = t431__findMaxRowLengInArray(arrayData)
    }
    if (dataMaxLength > headMaxLength) {
        return dataMaxLength
    } else {
        return headMaxLength
    }
}

function t431__escapeHTML(string) {
    var html = string.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
    var result = "";
    var allowedTags = "";
    ['b', 'i', 'u', 'ul', 'li', 'ol', 'br', 'img', 's', 'sub', 'sup', 'span', 'hr', 'pre', 'code', 'mark', 'strong', 'small'].forEach(function(value) {
        allowedTags += ":not(" + value + ")"
    });
    var allowedAttrs = ['alt', 'class', 'title', 'id', 'src', 'style', 'width', 'height'];
    var fakeDOM = document.implementation.createHTMLDocument('fake');
    $.each($.parseHTML(html, fakeDOM) || [], function(i, $el) {
        var el = $($el)[0];
        if (!$($el).is(allowedTags)) {
            if (el.nodeType !== 3) {
                var temp = document.createElement(el.tagName);
                allowedAttrs.forEach(function(value) {
                    if (el.getAttribute(value) !== null) {
                        temp.setAttribute(value, el.getAttribute(value).replace(/javascript:/gi, ''))
                    }
                });
                temp.textContent = el.textContent;
                result += temp.outerHTML
            } else {
                result += el.textContent
            }
        }
    });
    return result
}

function t431__findMaxRowLengInArray(curArray) {
    var maxLength = 0;
    for (var i = 0; i < curArray.length; i++) {
        if (curArray[i].length > maxLength) {
            maxLength = curArray[i].length
        }
    }
    return maxLength
}

function t431__setColumnsWidth(colWidth, colsNumber, recid) {
    if (colWidth) {
        return colWidth[0]
    } else {
        var tableWidth = $('#rec' + recid + ' .t431 .t-container .t-col').width();
        return (tableWidth / colsNumber + "px")
    }
}

function t431__generateTable(arrayValues, colTag, hasTargetBlank, colWidth, maxColNumber) {
    var html = "";
    var tag = "";
    if (colTag == "td") {
        tag = "tbody"
    } else {
        tag = "thead"
    }
    html += '<' + tag + ' class="t431__' + tag + '">';
    for (var i = 0; i < arrayValues.length; i++) {
        if (colTag == "td") {
            if ((i + 1) % 2 > 0) {
                html += '<tr class="t431__oddrow">'
            } else {
                html += '<tr class="t431__evenrow">'
            }
        } else {
            html += '<tr>'
        }
        var addingCols = 0;
        if (arrayValues[i].length < maxColNumber) {
            addingCols = maxColNumber - arrayValues[i].length
        }
        for (var j = 0; j < (arrayValues[i].length + addingCols); j++) {
            if (arrayValues[i][j]) {
                var curWidth = "";
                if (Array.isArray(colWidth) && colWidth[j]) {
                    curWidth = colWidth[j].myText
                } else {
                    curWidth = colWidth
                }
                var ColWithAttr = '';
                if (colTag == "td") {
                    ColWithAttr = '<td class="t431__td t-text" width="' + curWidth + '">'
                } else {
                    ColWithAttr = '<th class="t431__th t-title" width="' + curWidth + '">'
                }
                if (arrayValues[i][j].myHref) {
                    var tBlank = "";
                    if (hasTargetBlank) {
                        tBlank = "target=\"_blank\""
                    }
                    var linkWithAttr = "";
                    var linkCloseTag = "";
                    if (arrayValues[i][j].myHrefType == "link") {
                        linkWithAttr = '<a href="' + arrayValues[i][j].myHref + '"' + tBlank + '>';
                        linkCloseTag = '</a>'
                    } else {
                        linkWithAttr = '<div class="t431__btnwrapper"><a href="' + arrayValues[i][j].myHref + '"' + tBlank + ' class="t-btn t-btn_sm"><table style="width:100%; height:100%"><tr><td>';
                        linkCloseTag = '</td></tr></table></a></div>'
                    }
                    html += ColWithAttr + linkWithAttr + arrayValues[i][j].myText + linkCloseTag + '</' + colTag + '>'
                } else {
                    html += ColWithAttr + arrayValues[i][j].myText + '</' + colTag + '>'
                }
            } else {
                html += '<' + colTag + ' class="t431__' + colTag + '" width="' + curWidth + '">' + '</' + colTag + '>'
            }
        }
        html += "</tr>"
    }
    html += "</" + tag + ">";
    return html
}

function t431_parseData(data) {
    if (data !== "" && typeof data != "undefined") {
        data = t431__addBrTag(data);
        var arrayTable = [];
        var arrayRow = [];
        var curItem = {
            myText: "",
            myHref: "",
            myHrefType: ""
        };
        var hasLink = "";
        var hasLinkWithSpace = "";
        var hasBtn = "";
        var hasBtnWithSpace = "";
        var endLine = "";
        for (var i = 0; i < data.length; i++) {
            if (data[i] == ";" && !(data.slice(i - 4, i) == "&lt;" || data.slice(i - 4, i) == "&gt;" || data.slice(i - 5, i) == "&amp;" || data.slice(i - 6, i) == "&nbsp;")) {
                arrayRow.push(curItem);
                curItem = {
                    myText: "",
                    myHref: ""
                };
                hasLink = "";
                hasLinkWithSpace = "";
                hasBtn = "";
                hasBtnWithSpace = ""
            } else {
                if (hasLink == "link=" || hasLinkWithSpace == " link=" || hasBtn == "button=" || hasBtnWithSpace == " button=") {
                    if (curItem.myHref === "" && hasLink === "link=") {
                        curItem.myText = curItem.myText.slice(0, -5);
                        curItem.myHrefType = "link"
                    } else {
                        if (curItem.myHref === "" && hasLinkWithSpace === " link=") {
                            curItem.myText = curItem.myText.slice(0, -6);
                            curItem.myHrefType = "link"
                        } else {
                            if (curItem.myHref === "" && hasBtn === "button=") {
                                curItem.myText = curItem.myText.slice(0, -7);
                                curItem.myHrefType = "btn"
                            } else {
                                if (curItem.myHref === "" && hasBtnWithSpace === " button=") {
                                    curItem.myText = curItem.myText.slice(0, -8);
                                    curItem.myHrefType = "btn"
                                }
                            }
                        }
                    }
                    curItem.myHref += (data[i])
                } else {
                    curItem.myText += (data[i]);
                    hasLink = t431__checkSubstr("link=", hasLink, data[i]);
                    hasLinkWithSpace = t431__checkSubstr(" link=", hasLinkWithSpace, data[i]);
                    hasBtn = t431__checkSubstr("button=", hasBtn, data[i]);
                    hasBtnWithSpace = t431__checkSubstr(" button=", hasBtnWithSpace, data[i])
                }
                endLine = t431__checkSubstr("<br />", endLine, data[i]);
                if (endLine == "<br />") {
                    if (curItem.myHref) {
                        curItem.myHref = curItem.myHref.slice(0, -6)
                    } else {
                        curItem.myText = curItem.myText.slice(0, -6)
                    }
                    arrayRow.push(curItem);
                    arrayTable.push(arrayRow);
                    curItem = {
                        myText: "",
                        myHref: ""
                    };
                    hasLink = "";
                    hasLinkWithSpace = "";
                    hasBtn = "";
                    hasBtnWithSpace = "";
                    arrayRow = []
                }
            }
        }
        if (arrayRow.length > 0 || curItem.myText !== "") {
            if (curItem !== "") {
                arrayRow.push(curItem)
            }
            arrayTable.push(arrayRow)
        }
    }
    return arrayTable
}

function t431__checkSubstr(targetSubstr, curSubstr, curSymbol) {
    if (!curSubstr && curSymbol == targetSubstr[0]) {
        return curSymbol
    } else {
        if (curSubstr) {
            for (var i = 0; i < (targetSubstr.length - 1); i++) {
                if (curSubstr[curSubstr.length - 1] == targetSubstr[i] && curSymbol == targetSubstr[i + 1]) {
                    return (curSubstr += curSymbol)
                }
            }
        }
    }
}

function t431__addBrTag(oldStringItem) {
    var newStringItem = "";
    for (var i = 0; i < oldStringItem.length; i++) {
        if (oldStringItem[i] == "\n" || oldStringItem[i] == "\r") {
            newStringItem += "<br />"
        } else {
            newStringItem += oldStringItem[i]
        }
    }
    return newStringItem.replace(/&nbsp;/g, ' ')
}

function t431_createTable(recid, tablehead, tabledata, tablecolsize, hastargetblank, btnstyles, t431__tdstyles, t431__thstyles, t431__oddrowstyles, t431__evenrowstyles) {
    var t431__arrayColSize = t431_parseData(tablecolsize);
    var t431__arrayHead = t431_parseData(tablehead);
    var t431__arrayData = t431_parseData(tabledata);
    var t431__maxcolnumber = t431__findMaxRowLengthInTable(t431__arrayHead, t431__arrayData);
    var t431__colWidth = t431__setColumnsWidth(t431__arrayColSize, t431__maxcolnumber, recid);
    if (t431__colWidth[0].myText && t431__colWidth[0].myText[t431__colWidth[0].myText.length - 1] == "%") {
        for (var i = 0; i < t431__colWidth.length; i++) {
            t431__colWidth[i].myText = t431__colWidth[i].myText.slice(0, -1);
            t431__colWidth[i].myText += "vw"
        }
    }
    var t431__container = $('#rec' + recid + ' .t431 .t-container .t431__table');
    var t431__htmlTable = "";
    if (t431__arrayHead) {
        t431__htmlTable += t431__generateHtml(recid, t431__arrayHead, "th", hastargetblank, t431__colWidth, btnstyles, t431__thstyles, null, null, t431__maxcolnumber)
    }
    t431__container.append(t431__htmlTable);
    t431__htmlTable = "";
    if (t431__arrayData) {
        t431__htmlTable += t431__generateHtml(recid, t431__arrayData, "td", hastargetblank, t431__colWidth, btnstyles, t431__tdstyles, t431__oddrowstyles, t431__evenrowstyles, t431__maxcolnumber)
    }
    t431__container.append(t431__htmlTable)
}

function t431__generateHtml(recid, arrayValues, coltag, hastargetblank, colWidth, btnstyles, colstyles, oddrowstyles, evenrowstyles, maxcolnumber) {
    var t431__htmlpart = "";
    if (coltag == "td") {
        var t431__theadorbodytag = "tbody"
    } else {
        var t431__theadorbodytag = "thead"
    }
    t431__htmlpart += '<' + t431__theadorbodytag + ' class="t431__' + t431__theadorbodytag + '">';
    var t431__firstbodyrowstyle = "";
    if ($('#rec' + recid + ' .t431 .t-container .t431__thead th').length > 0 && $('#rec' + recid + ' .t431 .t-container .t431__thead th').css("border-bottom-width")[0] != "0") {
        t431__firstbodyrowstyle = "border-top: 0 !important;"
    }
    for (var i = 0; i < arrayValues.length; i++) {
        if (coltag == "td") {
            if ((i + 1) % 2 > 0) {
                t431__htmlpart += "<tr class=\"t431__oddrow\"" + "style=\"" + oddrowstyles + "\">"
            } else {
                t431__htmlpart += "<tr class=\"t431__evenrow\"" + "style=\"" + evenrowstyles + "\">"
            }
        } else {
            t431__htmlpart += "<tr>"
        }
        var t431__addingcols = 0;
        if (arrayValues[i].length < maxcolnumber) {
            t431__addingcols = maxcolnumber - arrayValues[i].length
        }
        for (var j = 0; j < (arrayValues[i].length + t431__addingcols); j++) {
            if (arrayValues[i][j]) {
                if (Array.isArray(colWidth) && colWidth[j]) {
                    var t431__curWidth = colWidth[j].myText
                } else {
                    var t431__curWidth = colWidth
                }
                if (i == 0 && coltag == "td") {
                    var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + t431__firstbodyrowstyle + "\">"
                } else {
                    var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">"
                }
                if (arrayValues[i][j].myHref) {
                    var t431__tblank = "";
                    if (hastargetblank) {
                        var t431__tblank = "target=\"_blank\""
                    }
                    if (arrayValues[i][j].myHrefType == "link") {
                        var t431__linkwithattr = "<a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + ">";
                        var t431__linkclosetag = "</a>"
                    } else {
                        var t431__linkwithattr = "<div class=\"t431__btnwrapper\"><a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + " class=\"t-btn t-btn_sm\" style=\"" + btnstyles + "\"><table style=\"width:100%; height:100%;\"><tr><td>";
                        var t431__linkclosetag = "</td></tr></table></a></div>"
                    }
                    t431__htmlpart += t431__colwithattr + t431__linkwithattr + arrayValues[i][j].myText + t431__linkclosetag + "</" + coltag + ">"
                } else {
                    t431__htmlpart += t431__colwithattr + arrayValues[i][j].myText + "</" + coltag + ">"
                }
            } else {
                t431__htmlpart += "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">" + "</" + coltag + ">"
            }
        }
        t431__htmlpart += "</tr>"
    }
    t431__htmlpart += "</" + t431__theadorbodytag + ">";
    return t431__htmlpart
}

function t552_init(recid, ratio) {
    var t552__el = $("#rec" + recid),
        t552__image = t552__el.find(".t552__blockimg:first");
    t552__setHeight(recid, t552__image, ratio);
    var t552__doResize;
    $(window).resize(function() {
        clearTimeout(t552__doResize);
        t552__doResize = setTimeout(function() {
            t552__setHeight(recid, t552__image, ratio)
        }, 200)
    })
}

function t552__setHeight(recid, image, ratio) {
    $("#rec" + recid + " .t552__blockimg").css("height", Math.round(image.innerWidth() * ratio))
}

function t585_init(recid) {
    var el = $('#rec' + recid);
    var toggler = el.find(".t585__header");
    var accordion = el.find('.t585__accordion');
    if (accordion) {
        accordion = accordion.attr('data-accordion')
    } else {
        accordion = "false"
    }
    toggler.click(function() {
        if (accordion === "true") {
            toggler.not(this).removeClass("t585__opened").next().slideUp()
        }
        $(this).toggleClass("t585__opened");
        $(this).next().slideToggle();
        if (window.lazy === 'y') {
            t_lazyload_update()
        }
    })
}

function t607_init(recid) {
    t607_checkAnchorLinks(recid)
}

function t607_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t607_navLinks = $("#rec" + recid + " .t607__list_item a:not(.tooltipstered)[href*='#']");
        if (t607_navLinks.length > 0) {
            t607_catchScroll(t607_navLinks)
        }
    }
}

function t607_catchScroll(t607_navLinks) {
    var t607_clickedSectionId = null,
        t607_sections = new Array(),
        t607_sectionIdTonavigationLink = {},
        t607_interval = 100,
        t607_lastCall, t607_timeoutId;
    t607_navLinks = $(t607_navLinks.get().reverse());
    t607_navLinks.each(function() {
        var t607_cursection = t607_getSectionByHref($(this));
        if (typeof t607_cursection.attr("id") != "undefined") {
            t607_sections.push(t607_cursection)
        }
        t607_sectionIdTonavigationLink[t607_cursection.attr("id")] = $(this)
    });
    t607_highlightNavLinks(t607_navLinks, t607_sections, t607_sectionIdTonavigationLink, t607_clickedSectionId);
    setTimeout(function() {
        t607_highlightNavLinks(t607_navLinks, t607_sections, t607_sectionIdTonavigationLink, t607_clickedSectionId)
    }, 1000);
    $(document).keydown(function(e) {
        var t607_direction = "";
        switch (e.which) {
            case 38:
                t607_direction = "top";
                break;
            case 40:
                t607_direction = "bottom";
                break;
            case 33:
                t607_direction = "top";
                break;
            case 34:
                t607_direction = "bottom";
                break;
            default:
                return
        }
        if (t607_direction != "") {
            var t607_curActiveSectionId = t607_getSectionByHref(t607_navLinks.filter(".t-active")).attr("id"),
                t607_newActiveSectionIndex = $.map(t607_sections, function(obj, index) {
                    if (obj.attr("id") == t607_curActiveSectionId && t607_direction == "top") {
                        return index + 1
                    }
                    if (obj.attr("id") == t607_curActiveSectionId && t607_direction == "bottom") {
                        return index - 1
                    }
                });
            var t607_newActiveSection = t607_sections[t607_newActiveSectionIndex[0]];
            if (typeof t607_newActiveSection == "undefined") {
                return
            }
            t607_navLinks.removeClass('t-active');
            var $root = $('html, body'),
                t607_offsetTop = $(".t607").attr("data-offset-top");
            t607_sectionIdTonavigationLink[t607_newActiveSection.attr("id")].addClass('t-active');
            t607_clickedSectionId = t607_newActiveSection.attr("id");
            if (typeof t607_offsetTop != "undefined") {
                $root.animate({
                    scrollTop: t607_newActiveSection.offset().top - t607_offsetTop
                }, 500)
            } else {
                $root.animate({
                    scrollTop: t607_newActiveSection.offset().top
                }, 500)
            }
        }
    });
    t607_navLinks.click(function() {
        if (!$(this).hasClass("tooltipstered")) {
            t607_navLinks.removeClass('t-active');
            var t607_clickedSection = t607_getSectionByHref($(this)),
                $root = $('html, body'),
                t607_offsetTop = $(".t607").attr("data-offset-top");
            if (!$(this).hasClass("t-active")) {
                t607_clickedSectionId = t607_clickedSection.attr("id")
            }
            t607_sectionIdTonavigationLink[t607_clickedSection.attr("id")].addClass('t-active');
            if (typeof t607_offsetTop != "undefined") {
                $root.animate({
                    scrollTop: t607_clickedSection.offset().top - t607_offsetTop
                }, 500)
            } else {
                $root.animate({
                    scrollTop: t607_clickedSection.offset().top
                }, 500)
            }
            return !1
        }
    });
    $(window).scroll(function() {
        var t607_now = new Date().getTime();
        if (t607_lastCall && t607_now < (t607_lastCall + t607_interval)) {
            clearTimeout(t607_timeoutId);
            t607_timeoutId = setTimeout(function() {
                t607_lastCall = t607_now;
                t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks, t607_sections, t607_sectionIdTonavigationLink, t607_clickedSectionId)
            }, t607_interval - (t607_now - t607_lastCall))
        } else {
            t607_lastCall = t607_now;
            t607_clickedSectionId = t607_highlightNavLinks(t607_navLinks, t607_sections, t607_sectionIdTonavigationLink, t607_clickedSectionId)
        }
    })
}

function t607_getSectionByHref(curlink) {
    var t651_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t651_curLinkValue.substring(1) + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t651_curLinkValue.substring(1) + "']")
    }
}

function t607_highlightNavLinks(t607_navLinks, t607_sections, t607_sectionIdTonavigationLink, t607_clickedSectionId) {
    var t607_scrollPosition = $(window).scrollTop(),
        t607_valueToReturn = t607_clickedSectionId;
    if (typeof t607_sections[t607_sections.length - 2] != "undefined" && t607_sections[t607_sections.length - 2].offset().top <= $(window).height() / 2 && t607_scrollPosition == 0) {
        t607_navLinks.removeClass('t-active');
        t607_navLink = t607_sectionIdTonavigationLink[t607_sections[t607_sections.length - 1].attr("id")];
        t607_navLink.addClass('t-active');
        return null
    }
    $(t607_sections).each(function(e) {
        var t607_curSection = $(this),
            t607_sectionTop = t607_curSection.offset().top,
            t607_id = t607_curSection.attr('id'),
            t607_navLink = t607_sectionIdTonavigationLink[t607_id];
        if ((t607_scrollPosition + $(window).height() / 2) >= t607_sectionTop || (t607_sections[0].attr("id") == t607_id && $(window).scrollTop() >= $(document).height() - $(window).height())) {
            if (t607_clickedSectionId == null && !t607_navLink.hasClass('t-active')) {
                t607_navLinks.removeClass('t-active');
                t607_navLink.addClass('t-active');
                t607_valueToReturn = null
            } else {
                if (t607_clickedSectionId != null && t607_id == t607_clickedSectionId) {
                    t607_valueToReturn = null
                }
            }
            return !1
        }
    });
    return t607_valueToReturn
}

function t650_unifyHeights(recid) {
    if ($(window).width() >= 960) {
        $('#rec' + recid + ' .t650 .t-container .t650__row').each(function() {
            var t650_highestBox = 0,
                t650_currow = $(this);
            $('.t650__inner-col', this).each(function() {
                var t650_curCol = $(this),
                    t650_curText = t650_curCol.find(".t650__text"),
                    t650_curBtn = t650_curCol.find(".t650__btn-container"),
                    t650_curColHeight = t650_curText.outerHeight() + t650_curBtn.outerHeight();
                if (t650_curColHeight > t650_highestBox) {
                    t650_highestBox = t650_curColHeight
                }
            });
            $('.t650__inner-col', this).css('height', t650_highestBox)
        })
    } else {
        $('.t650__inner-col').css('height', 'auto')
    }
}

function t706_onSuccessCallback(t706_form) {
    $(".t706__cartwin-products").slideUp(10, function() {});
    $(".t706__cartwin-bottom").slideUp(10, function() {});
    $(".t706 .t-form__inputsbox").slideUp(700, function() {});
    try {
        tcart__unlockScroll()
    } catch (e) {}
}

function t770_init(recid) {
    var rec = $('#rec' + recid);
    var navElem = rec.find('.t770');
    var isFixed = (navElem.css('position') == 'fixed');
    var redactorMode = navElem.hasClass('t770_redactor-mode');
    if (!redactorMode) {
        t770_highlight();
        navElem.removeClass('t770__beforeready');
        if (isFixed) {
            t770_checkAnchorLinks(recid)
        }
        if (isFixed && navElem.attr('data-bgopacity-two')) {
            t770_changebgopacitymenu(recid);
            $(window).bind('scroll', t_throttle(function() {
                t770_changebgopacitymenu(recid)
            }, 200))
        }
        if (isFixed && navElem.attr('data-appearoffset')) {
            navElem.removeClass('t770__beforeready');
            t770_appearMenu(recid);
            $(window).bind('scroll', t_throttle(function() {
                t770_appearMenu(recid)
            }, 200))
        }
    }
    if (rec.find('.t770__imglogo').attr('data-img-width')) {
        t770_setLogoPadding(recid)
    }
    if (rec.find('.t770__mobile_burger').length) {
        t770_createMobileMenu(recid)
    }
    t770_setBg(recid);
    $(window).bind('resize', t_throttle(function() {
        t770_setBg(recid)
    }, 200))
}

function t770_setLogoPadding(recid) {
    if ($(window).width() > 980) {
        var t770__menu = $('#rec' + recid + ' .t770');
        var t770__logo = t770__menu.find('.t770__logowrapper');
        var t770__leftpart = t770__menu.find('.t770__leftwrapper');
        var t770__rightpart = t770__menu.find('.t770__rightwrapper');
        t770__leftpart.css("padding-right", t770__logo.width() / 2 + 50);
        t770__rightpart.css("padding-left", t770__logo.width() / 2 + 50)
    }
}

function t770_highlight() {
    var url = window.location.href;
    var pathname = window.location.pathname;
    if (url.substr(url.length - 1) == "/") {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) == "/") {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) == "/") {
        pathname = pathname.slice(1)
    }
    if (pathname == "") {
        pathname = "/"
    }
    $(".t770__list_item a[href='" + url + "']").addClass("t-active");
    $(".t770__list_item a[href='" + url + "/']").addClass("t-active");
    $(".t770__list_item a[href='" + pathname + "']").addClass("t-active");
    $(".t770__list_item a[href='/" + pathname + "']").addClass("t-active");
    $(".t770__list_item a[href='" + pathname + "/']").addClass("t-active");
    $(".t770__list_item a[href='/" + pathname + "/']").addClass("t-active")
}

function t770_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t770_navLinks = $("#rec" + recid + " .t770__desktoplist .t770__list_item a:not(.tooltipstered)[href*='#']");
        if (t770_navLinks.length > 0) {
            t770_catchScroll(t770_navLinks)
        }
    }
}

function t770_catchScroll(t770_navLinks) {
    var t770_clickedSectionId = null,
        t770_sections = new Array(),
        t770_sectionIdTonavigationLink = [],
        t770_interval = 100,
        t770_lastCall, t770_timeoutId;
    t770_navLinks = $(t770_navLinks.get().reverse());
    t770_navLinks.each(function() {
        var t770_cursection = t770_getSectionByHref($(this));
        if (typeof t770_cursection.attr("id") != "undefined") {
            t770_sections.push(t770_cursection)
        }
        t770_sectionIdTonavigationLink[t770_cursection.attr("id")] = $(this)
    });
    t770_updateSectionsOffsets(t770_sections);
    t770_sections.sort(function(a, b) {
        return b.attr("data-offset-top") - a.attr("data-offset-top")
    });
    $(window).bind('resize', t_throttle(function() {
        t770_updateSectionsOffsets(t770_sections)
    }, 200));
    $('.t770').bind('displayChanged', function() {
        t770_updateSectionsOffsets(t770_sections)
    });
    setInterval(function() {
        t770_updateSectionsOffsets(t770_sections)
    }, 5000);
    t770_highlightNavLinks(t770_navLinks, t770_sections, t770_sectionIdTonavigationLink, t770_clickedSectionId);
    t770_navLinks.click(function() {
        var t770_clickedSection = t770_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t770_clickedSection.attr("id") != "undefined") {
            t770_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t770_clickedSectionId = t770_getSectionByHref($(this)).attr("id")
        }
    });
    $(window).scroll(function() {
        var t770_now = new Date().getTime();
        if (t770_lastCall && t770_now < (t770_lastCall + t770_interval)) {
            clearTimeout(t770_timeoutId);
            t770_timeoutId = setTimeout(function() {
                t770_lastCall = t770_now;
                t770_clickedSectionId = t770_highlightNavLinks(t770_navLinks, t770_sections, t770_sectionIdTonavigationLink, t770_clickedSectionId)
            }, t770_interval - (t770_now - t770_lastCall))
        } else {
            t770_lastCall = t770_now;
            t770_clickedSectionId = t770_highlightNavLinks(t770_navLinks, t770_sections, t770_sectionIdTonavigationLink, t770_clickedSectionId)
        }
    })
}

function t770_updateSectionsOffsets(sections) {
    $(sections).each(function() {
        var t770_curSection = $(this);
        t770_curSection.attr("data-offset-top", t770_curSection.offset().top)
    })
}

function t770_getSectionByHref(curlink) {
    var t770_curLinkValue = curlink.attr("href").replace(/\s+/g, '');
    if (t770_curLinkValue[0] == '/') {
        t770_curLinkValue = t770_curLinkValue.substring(1)
    }
    if (curlink.is('[href*="#rec"]')) {
        return $(".r[id='" + t770_curLinkValue.substring(1) + "']")
    } else {
        return $(".r[data-record-type='215']").has("a[name='" + t770_curLinkValue.substring(1) + "']")
    }
}

function t770_highlightNavLinks(t770_navLinks, t770_sections, t770_sectionIdTonavigationLink, t770_clickedSectionId) {
    var t770_scrollPosition = $(window).scrollTop(),
        t770_valueToReturn = t770_clickedSectionId;
    if (t770_sections.length != 0 && t770_clickedSectionId == null && t770_sections[t770_sections.length - 1].attr("data-offset-top") > (t770_scrollPosition + 300)) {
        t770_navLinks.removeClass('t-active');
        return null
    }
    $(t770_sections).each(function(e) {
        var t770_curSection = $(this),
            t770_sectionTop = t770_curSection.attr("data-offset-top"),
            t770_id = t770_curSection.attr('id'),
            t770_navLink = t770_sectionIdTonavigationLink[t770_id];
        if (((t770_scrollPosition + 300) >= t770_sectionTop) || (t770_sections[0].attr("id") == t770_id && t770_scrollPosition >= $(document).height() - $(window).height())) {
            if (t770_clickedSectionId == null && !t770_navLink.hasClass('t-active')) {
                t770_navLinks.removeClass('t-active');
                t770_navLink.addClass('t-active');
                t770_valueToReturn = null
            } else {
                if (t770_clickedSectionId != null && t770_id == t770_clickedSectionId) {
                    t770_valueToReturn = null
                }
            }
            return !1
        }
    });
    return t770_valueToReturn
}

function t770_setPath() {}

function t770_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t770").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color", bgcolor)
            }
        })
    } else {
        $(".t770").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color", bgcolor);
            el.attr("data-bgcolor-setbyscript", "yes")
        })
    }
}

function t770_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t770").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset != "") {
                if (appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)))
                }
                appearoffset = parseInt(appearoffset, 10);
                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top", "-50px");
                        el.css("visibility", "visible");
                        el.animate({
                            "opacity": "1",
                            "top": "0px"
                        }, 200, function() {})
                    }
                } else {
                    el.stop();
                    el.css("visibility", "hidden")
                }
            }
        })
    }
}

function t770_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t770").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow
            } else {
                var menushadowvalue = '0.' + menushadow
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if (bgopacitytwo == '0' || menushadow == ' ') {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            } else {
                el.css("background-color", bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' ') {
                    el.css("box-shadow", "none")
                } else {
                    el.css("box-shadow", "0px 1px 3px rgba(0,0,0," + menushadowvalue + ")")
                }
            }
        })
    }
}

function t770_createMobileMenu(recid) {
    var window_width = $(window).width(),
        el = $("#rec" + recid),
        menu = el.find(".t770"),
        burger = el.find(".t770__mobile");
    burger.click(function(e) {
        menu.fadeToggle(300);
        $(this).toggleClass("t770_opened")
    })
    $(window).bind('resize', t_throttle(function() {
        window_width = $(window).width();
        if (window_width > 980) {
            menu.fadeIn(0)
        }
    }, 200))
}

function t776__init(recid) {
    setTimeout(function() {
        //t_prod__init(recid);
        t776_initPopup(recid);
        t776__hoverZoom_init(recid);
        t776__updateLazyLoad(recid);
        t776__alignButtons_init(recid)
    }, 500)
}

function t776__showMore(recid) {
    var el = $('#rec' + recid).find(".t776");
    var showmore = el.find('.t776__showmore');
    var cards_count = parseInt(el.attr('data-show-count'));
    if (cards_count > 0) {
        if (showmore.text() === '') {
            showmore.find('td').text(t776__dict('loadmore'))
        }
        showmore.show();
        el.find('.t776__col').hide();
        var cards_size = el.find('.t776__col').size();
        var cards_count = parseInt(el.attr('data-show-count'));
        var x = cards_count;
        var y = cards_count;
        el.find('.t776__col:lt(' + x + ')').show();
        showmore.click(function() {
            x = (x + y <= cards_size) ? x + y : cards_size;
            el.find('.t776__col:lt(' + x + ')').show();
            if (x == cards_size) {
                showmore.hide()
            }
        })
    }
}

function t776__dict(msg) {
    var dict = [];
    dict.loadmore = {
        EN: 'Load more',
        RU: 'Загрузить еще',
        FR: 'Charger plus',
        DE: 'Mehr laden',
        ES: 'Carga más',
        PT: 'Carregue mais',
        UK: 'Завантажити ще',
        JA: 'もっと読み込む',
        ZH: '裝載更多',
    };
    var lang = window.tildaBrowserLang;
    if (typeof dict[msg] !== 'undefined') {
        if (typeof dict[msg][lang] !== 'undefined' && dict[msg][lang] != '') {
            return dict[msg][lang]
        } else {
            return dict[msg].EN
        }
    }
    return 'Text not found "' + msg + '"'
}

function t776__alignButtons_init(recid) {
    var el = $('#rec' + recid);
    if (el.find('[data-buttons-v-align]')[0]) {
        try {
            t776__alignButtons(recid);
            $(window).bind('resize', t_throttle(function() {
                if (typeof window.noAdaptive !== 'undefined' && window.noAdaptive === !0 && $isMobile) {
                    return
                }
                t776__alignButtons(recid)
            }));
            el.find('.t776').bind('displayChanged', function() {
                t776__alignButtons(recid)
            });
            if ($isMobile) {
                $(window).on('orientationchange', function() {
                    t776__alignButtons(recid)
                })
            }
        } catch (e) {
            console.log('buttons-v-align error: ' + e.message)
        }
    }
}

function t776__alignButtons(recid) {
    var rec = $('#rec' + recid);
    var wrappers = rec.find('.t776__textwrapper');
    var maxHeight = 0;
    var itemsInRow = rec.find('.t-container').attr('data-blocks-per-row') * 1;
    var mobileView = $(window).width() <= 480;
    var tableView = $(window).width() <= 960 && $(window).width() > 480;
    var mobileOneRow = $(window).width() <= 960 && rec.find('.t776__container_mobile-flex')[0] ? true : !1;
    var mobileTwoItemsInRow = $(window).width() <= 480 && rec.find('.t776 .mobile-two-columns')[0] ? true : !1;
    if (mobileView) {
        itemsInRow = 1
    }
    if (tableView) {
        itemsInRow = 2
    }
    if (mobileTwoItemsInRow) {
        itemsInRow = 2
    }
    if (mobileOneRow) {
        itemsInRow = 999999
    }
    var i = 1;
    var wrappersInRow = [];
    $.each(wrappers, function(key, element) {
        element.style.height = 'auto';
        if (itemsInRow === 1) {
            element.style.height = 'auto'
        } else {
            wrappersInRow.push(element);
            if (element.offsetHeight > maxHeight) {
                maxHeight = element.offsetHeight
            }
            $.each(wrappersInRow, function(key, wrapper) {
                wrapper.style.height = maxHeight + 'px'
            });
            if (i === itemsInRow) {
                i = 0;
                maxHeight = 0;
                wrappersInRow = []
            }
            i++
        }
    })
}

function t776__hoverZoom_init(recid) {
    if (isMobile) {
        return
    }
    var rec = $('#rec' + recid);
    try {
        if (rec.find('[data-hover-zoom]')[0]) {
            if (!jQuery.cachedZoomScript) {
                jQuery.cachedZoomScript = function(url) {
                    var options = {
                        dataType: 'script',
                        cache: !0,
                        url: url
                    };
                    return jQuery.ajax(options)
                }
            }
            $.cachedZoomScript('https://static.tildacdn.com/js/tilda-hover-zoom-1.0.min.js').done(function(script, textStatus) {
                if (textStatus == 'success') {
                    setTimeout(function() {
                        t_hoverZoom_init(recid, ".t-slds__container")
                    }, 500)
                } else {
                    console.log('Upload script error: ' + textStatus)
                }
            })
        }
    } catch (e) {
        console.log('Zoom image init error: ' + e.message)
    }
}

function t776__updateLazyLoad(recid) {
    var scrollContainer = $("#rec" + recid + " .t776__container_mobile-flex");
    var curMode = $(".t-records").attr("data-tilda-mode");
    if (scrollContainer.length && curMode != "edit" && curMode != "preview") {
        scrollContainer.bind('scroll', t_throttle(function() {
            if (window.lazy == 'y') {
                t_lazyload_update()
            }
        }))
    }
}

function t776_initPopup(recid) {
    var rec = $('#rec' + recid);
    rec.find('[href^="#prodpopup"]').each(function(e) {
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        $(".r").find('a[href$="#!/tproduct/' + recid + '-' + lid_prod + '"]').click(function(e) {
            if (rec.find('[data-product-lid=' + lid_prod + ']').length) {
                rec.find('[data-product-lid=' + lid_prod + '] [href^="#prodpopup"]').triggerHandler('click')
            }
        })
    });
    rec.find('[href^="#prodpopup"]').one("click", function(e) {
        e.preventDefault();
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        t_sldsInit(recid + ' #t776__product-' + lid_prod + '')
    });
    rec.find('[href^="#prodpopup"]').click(function(e) {
        e.preventDefault();
        t776_showPopup(recid);
        var el_popup = rec.find('.t-popup');
        var el_prod = $(this).closest('.js-product');
        var lid_prod = el_prod.attr('data-product-lid');
        el_popup.find('.js-product').css('display', 'none');
        var el_fullprod = el_popup.find('.js-product[data-product-lid="' + lid_prod + '"]');
        el_fullprod.css('display', 'block');
        var analitics = el_popup.attr('data-track-popup');
        if (analitics > '') {
            var virtTitle = el_fullprod.find('.js-product-name').text();
            if (!virtTitle) {
                virtTitle = 'prod' + lid_prod
            }
            Tilda.sendEventToStatistics(analitics, virtTitle)
        }
        var curUrl = window.location.href;
        if (curUrl.indexOf('#!/tproduct/') < 0 && curUrl.indexOf('%23!/tproduct/') < 0) {
            if (typeof history.replaceState != 'undefined') {
                window.history.replaceState('', '', window.location.href + '#!/tproduct/' + recid + '-' + lid_prod)
            }
        }
        t776_updateSlider(recid + ' #t776__product-' + lid_prod + '');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    });
    if ($('#record' + recid).length == 0) {
        t776_checkUrl(recid)
    }
    t776_copyTypography(recid)
}

function t776_checkUrl(recid) {
    var curUrl = window.location.href;
    var tprodIndex = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && tprodIndex < 0) {
        tprodIndex = curUrl.indexOf('%23!/tproduct/')
    }
    if (tprodIndex >= 0) {
        var curUrl = curUrl.substring(tprodIndex, curUrl.length);
        var curProdLid = curUrl.substring(curUrl.indexOf('-') + 1, curUrl.length);
        var rec = $('#rec' + recid);
        if (curUrl.indexOf(recid) >= 0 && rec.find('[data-product-lid=' + curProdLid + ']').length) {
            rec.find('[data-product-lid=' + curProdLid + '] [href^="#prodpopup"]').triggerHandler('click')
        }
    }
}

function t776_updateSlider(recid) {
    var el = $('#rec' + recid);
    t_slds_SliderWidth(recid);
    var sliderWrapper = el.find('.t-slds__items-wrapper');
    var sliderWidth = el.find('.t-slds__container').width();
    var pos = parseFloat(sliderWrapper.attr('data-slider-pos'));
    sliderWrapper.css({
        transform: 'translate3d(-' + (sliderWidth * pos) + 'px, 0, 0)'
    });
    t_slds_UpdateSliderHeight(recid);
    t_slds_UpdateSliderArrowsHeight(recid)
}

function t776_showPopup(recid) {
    var el = $('#rec' + recid);
    var popup = el.find('.t-popup');
    popup.css('display', 'block');
    setTimeout(function() {
        popup.find('.t-popup__container').addClass('t-popup__container-animated');
        popup.addClass('t-popup_show');
        if (window.lazy == 'y') {
            t_lazyload_update()
        }
    }, 50);
    $('body').addClass('t-body_popupshowed');
    el.find('.t-popup').mousedown(function(e) {
        var windowWidth = $(window).width();
        var maxScrollBarWidth = 17;
        var windowWithoutScrollBar = windowWidth - maxScrollBarWidth;
        if (e.clientX > windowWithoutScrollBar) {
            return
        }
        if (e.target == this) {
            t776_closePopup()
        }
    });
    el.find('.t-popup__close, .t776__close-text').click(function(e) {
        t776_closePopup()
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            t776_closePopup()
        }
    })
}

function t776_closePopup() {
    $('body').removeClass('t-body_popupshowed');
    $('.t-popup').removeClass('t-popup_show');
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tproduct/');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && indexToRemove < 0) {
        indexToRemove = curUrl.indexOf('%23!/tproduct/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    setTimeout(function() {
        $(".t-popup").scrollTop(0);
        $('.t-popup').not('.t-popup_show').css('display', 'none');
        if (typeof history.replaceState != 'undefined') {
            window.history.replaceState('', '', curUrl)
        }
    }, 300)
}

function t776_removeSizeStyles(styleStr) {
    if (typeof styleStr != "undefined" && (styleStr.indexOf('font-size') >= 0 || styleStr.indexOf('padding-top') >= 0 || styleStr.indexOf('padding-bottom') >= 0)) {
        var styleStrSplitted = styleStr.split(';');
        styleStr = "";
        for (var i = 0; i < styleStrSplitted.length; i++) {
            if (styleStrSplitted[i].indexOf('font-size') >= 0 || styleStrSplitted[i].indexOf('padding-top') >= 0 || styleStrSplitted[i].indexOf('padding-bottom') >= 0) {
                styleStrSplitted.splice(i, 1);
                i--;
                continue
            }
            if (styleStrSplitted[i] == "") {
                continue
            }
            styleStr += styleStrSplitted[i] + ";"
        }
    }
    return styleStr
}

function t776_copyTypography(recid) {
    var rec = $('#rec' + recid);
    var titleStyle = rec.find('.t776__title').attr('style');
    var descrStyle = rec.find('.t776__descr').attr('style');
    rec.find('.t-popup .t776__title').attr("style", t776_removeSizeStyles(titleStyle));
    rec.find('.t-popup .t776__descr, .t-popup .t776__text').attr("style", t776_removeSizeStyles(descrStyle))
}

function t822_init(recid) {
    t822_setHeight(recid);
    $(window).load(function() {
        t822_setHeight(recid)
    });
    $(window).bind('resize', t_throttle(function() {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t822_setHeight(recid)
    }, 200));
    $('.t822').bind('displayChanged', function() {
        t822_setHeight(recid)
    })
}

function t822_setHeight(recid) {
    $('#rec' + recid + ' .t822 .t-container').each(function() {
        var t822__highestBox = 0;
        $('.t822__col', this).each(function() {
            var t822__curcol = $(this);
            var t822__curcolchild = t822__curcol.find('.t822__col-wrapper');
            if (t822__curcol.height() < t822__curcolchild.height()) t822__curcol.height(t822__curcolchild.height());
            if (t822__curcol.height() > t822__highestBox) t822__highestBox = t822__curcol.height()
        });
        if ($(window).width() >= 960) {
            $('.t822__col', this).css('height', t822__highestBox)
        } else {
            $('.t822__col', this).css('height', "auto")
        }
    })
};

function t859_init(recid) {
    var rec = $('#rec' + recid);
    var container = rec.find('.t859');
    var doResize;
    t859_unifyHeights(rec);
    $(window).bind('resize', t_throttle(function() {
        if (typeof window.noAdaptive != "undefined" && window.noAdaptive == !0 && $isMobile) {
            return
        }
        t859_unifyHeights(rec)
    }));
    $(window).load(function() {
        t859_unifyHeights(rec)
    });
    rec.find('.t859').bind('displayChanged', function() {
        t859_unifyHeights(rec)
    });
    if (container.hasClass('t859__previewmode')) {
        setInterval(function() {
            t859_unifyHeights(rec)
        }, 5000)
    }
}

function t859_unifyHeights(rec) {
    if ($(window).width() >= 960) {
        rec.find('.t859 .t-container .t859__row').each(function() {
            var highestBox = 0;
            var currow = $(this);
            $('.t859__inner-col', this).each(function() {
                var curCol = $(this);
                var curWrap = curCol.find('.t859__wrap');
                var curColHeight = curWrap.outerHeight();
                if (curColHeight > highestBox) {
                    highestBox = curColHeight
                }
            });
            $('.t859__inner-col', this).css('height', highestBox)
        })
    } else {
        $('.t859__inner-col').css('height', 'auto')
    }
}