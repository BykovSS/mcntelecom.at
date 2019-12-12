"use strict";

$(document).ready(function () {
  $('.second-level__options ul li.has-children').each(function (i, item) {
    var ul_width = parseInt($(item).find('.list-wrap ul').css('width')) + parseInt($(item).find('.list-wrap ul').css('padding-left')) + parseInt($(item).find('.list-wrap ul').css('padding-right'));
    var item_width = parseInt($(item).width());
    var left = -(ul_width - item_width) / 2;
    $(item).find('.list-wrap').css('left', left + 'px');
  });
  $('.hamburger_link').on('click', function (e) {
    e.preventDefault();

    if ($(this).next().hasClass('options__menu_list')) {
      if (!$(this).next().hasClass('isopen')) {
        $(this).next().toggleClass('isopen');
        $(this).next().css('height', 'auto');
        var height = $(this).next().css('height');
        $(this).next().css('height', 0);
        $(this).next().animate({
          height: height,
          paddingBottom: '30px'
        }, 400, function () {
          $(this).css('height', 'auto');
          $(this).parents('.mcntelecom-header').css('position', 'relative');
          $('.mcntelecom-main-content').css('margin-top', -$(this).parents('.mcntelecom-header').height() + 'px');

          if ($(window).scrollTop() !== 0) {
            $(window).scrollTop(0);
          }
        });
        $(this).parents('.mcntelecom-header__second-level').css('background', '#ffffff');
      } else {
        $(this).next().toggleClass('isopen');
        $(this).next().animate({
          height: 0,
          paddingBottom: 0
        }, 400, function () {
          $(this).parents('.mcntelecom-header__second-level').css('background', 'linear-gradient(to bottom, white 0%, white 30%, rgba(255, 255, 255, 0) 100%)');
          $(this).parents('.mcntelecom-header').css('position', 'fixed');
          $('.mcntelecom-main-content').css('margin-top', 0);
        });
      }
    }
  });
  $('.has-children a').on('click', function (e) {
    e.preventDefault();

    if ($(this).next().hasClass('second-level__submenu_list-wrap')) {
      if (!$(this).hasClass('isopen')) {
        $(this).toggleClass('isopen');
        $(this).next().css('height', 'auto');
        var height = $(this).next().css('height');
        $(this).next().css('height', 0);
        $(this).next().animate({
          height: height
        }, 400, function () {
          $(this).css('height', 'auto');
        });
      } else {
        $(this).toggleClass('isopen');
        $(this).next().animate({
          height: 0
        }, 400);
      }
    }
  });
  $(window).on('resize', function (e) {
    if ($(this).width() > 1007) {
      $('.hamburger_link + .options__menu_list').removeClass('isopen').css('padding-bottom', '0').css('height', 'auto').parents('.mcntelecom-header__second-level').css('background', 'linear-gradient(to bottom, white 0%, white 30%, rgba(255, 255, 255, 0) 100%)');
      $('.mcntelecom-header').css('position', 'fixed');
      $('.has-children a').removeClass('isopen');
      $('.has-children a + .second-level__submenu_list-wrap').css('height', 'auto');
    } else {
      $('.hamburger_link + .options__menu_list').css('height', '0');
      $('.has-children a + .second-level__submenu_list-wrap').css('height', '0');
    } // $('.entry__blue-globe').css('top', 740 - parseInt($('.entry__blue-globe').css('height'))/2)

  });
  var target_block = $('.mcntelecom-numbers');
  var blockStatus = true;
  $(window).scroll(function () {
    var scrollEvent = $(window).scrollTop() > target_block.position().top + parseInt($('.mcntelecom-numbers .numbers__content').css('padding-top')) - $(window).height();

    if (scrollEvent && blockStatus) {
      blockStatus = false;
      $('.mcntelecom-numbers .numbers__count').each(function () {
        var that = $(this);
        var num_start = 1;
        var num_end = parseInt($(this).text());

        if ($(this).find('.numbers__count-nulls').length !== 0) {
          num_end = num_end * 1000 + parseInt($(this).find('.numbers__count-nulls').text());
        }

        $({
          numberValue: num_start
        }).animate({
          numberValue: num_end
        }, {
          duration: 1000,
          easing: "linear",
          step: function step(val) {
            var rem_val;

            if (Math.ceil(val % 1000) < 10) {
              rem_val = '00' + Math.ceil(val % 1000);
            } else if (Math.ceil(val % 1000) < 100) {
              rem_val = '0' + Math.ceil(val % 1000);
            } else {
              rem_val = Math.ceil(val % 1000);
            }

            if (that.find('.numbers__count-nulls').length !== 0) {
              that.html(Math.ceil(val / 1000) + ' <span class="numbers__count-nulls">' + rem_val + '</span>');
            } else {
              that.html(Math.ceil(val));
            }
          }
        });
      });
    }
  });
  $.mask.definitions['9'] = '';
  $.mask.definitions['n'] = '[0-9]';
  $("#phonenumber").mask("+43 (n) nnn-nn-nn");
});