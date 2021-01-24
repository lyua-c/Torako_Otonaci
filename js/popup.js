$(function () {
  Debug = !1, GV = {}, FU = {}, GV.sru = "https://www.showroom-live.com", console.log("---poppu---"), FU.zeroFill = function (e, t) {
    return ("0000000000" + e).slice(-t)
  }, FU.timeChange = function (e) {
    if (0 == e) return {
      mo: " -- ",
      d: " -- ",
      h: " -- ",
      m: " -- ",
      s: " -- "
    };
    10 == String(e).length && (e *= 1e3);
    let t = new Date(Number(e));
    return {
      mo: FU.zeroFill(t.getMonth() + 1, 2),
      d: FU.zeroFill(t.getDate(), 2),
      h: FU.zeroFill(t.getHours(), 2),
      m: FU.zeroFill(t.getMinutes(), 2),
      s: FU.zeroFill(t.getSeconds(), 2)
    }
  }, FU.nowTime = function () {
    let e = new Date;
    GV.now_time_list = {
      mo: e.getMonth() + 1,
      d: e.getDate(),
      h: e.getHours(),
      mi: e.getMinutes(),
      s: e.getSeconds()
    }, GV.now_unix_time = Math.floor(e.getTime() / 1e3), GV.now_unix_time_c = Math.floor(e.getTime())
  }, FU.onliveRoom = function (e) {
    var t = GV.sru + "/api/live/onlives?skip_serial_code_live=1&_=" + Date.parse(new Date),
      o = new XMLHttpRequest;
    o.open("GET", t, !0), o.responseType = "json", o.onload = function (t) {
      Star_room_id_list = {}, Seed_room_id_list = {};
      for (var o = this.response.onlives, i = 1; i < o.length; i++)
        for (var n = o[i].lives, s = 0; s < n.length; s++) try {
          var l = n[s],
            _ = l.genre_id,
            r = l.room_id,
            a = l.view_num;
          200 == Number(_) ? Seed_room_id_list[String(a)] = r : Star_room_id_list[String(a)] = r
        } catch (t) {}
      if ("star" == e) {
        for (; Object.keys(Star_room_id_list).length > 10;) delete Star_room_id_list[Object.keys(Star_room_id_list)[0]];
        var c = Math.floor(Math.random() * (Object.keys(Star_room_id_list).length + 1));
        FU.haveNum(Star_room_id_list[Object.keys(Star_room_id_list)[c]], "star")
      } else {
        for (; Object.keys(Seed_room_id_list).length > 10;) delete Seed_room_id_list[Object.keys(Seed_room_id_list)[0]];
        c = Math.floor(Math.random() * (Object.keys(Seed_room_id_list).length + 1)), FU.haveNum(Seed_room_id_list[Object.keys(Seed_room_id_list)[c]], "seed")
      }
    }, o.send()
  }, FU.haveNum = function (e, t) {
    if (void 0 != e) {
      var o = GV.sru + "/api/live/current_user?room_id=" + e;
      $.get(o, function (o) {
        if (0 != o.user_id)
          if (o.gift_list.normal.length) {
            for (var i = 0; i < 5; i++) $("#free_gift_id_" + o.gift_list.normal[i].gift_id).text(o.gift_list.normal[i].free_num);
            $("#show_gold_area p").text("Show Gold: " + o.gold + " G"), chrome.runtime.sendMessage({
              method: "setItem",
              key: "have_" + t,
              value: e
            }, function (e) {}), chrome.runtime.sendMessage({
              method: "getItem",
              key: "user_id"
            }, function (e) {
              e.data ? o.user_id != e.data && chrome.runtime.sendMessage({
                method: "setItem",
                key: "user_id",
                value: o.user_id
              }, function (e) {}) : chrome.runtime.sendMessage({
                method: "setItem",
                key: "user_id",
                value: o.user_id
              }, function (e) {})
            })
          } else setTimeout(function () {
            FU.onliveRoom(t)
          }, 100)
      })
    } else setTimeout(function () {
      FU.onliveRoom(t)
    }, 100)
  }, $(".get_log_button").click(function () {
    $("#" + $(this).attr("name")).is(":hidden") ? ($(".get_log_box").css({
      display: "none"
    }), $(".get_log_button").text("▼"), $("#" + $(this).attr("name")).css({
      display: "block"
    }), $(this).text("▲")) : ($("#" + $(this).attr("name")).css({
      display: "none"
    }), $(this).text("▼")), $("html,body").css({
      height: $("#free_gift_num_area").css("height")
    })
  }), FU.desktopPopLog = function () {
    for (var e = 0; e < DesktopPop_log.length; e++) {
      var t = DesktopPop_log[e];
      if ("onlive" == t.type) var o = "LIVE",
        i = " type_onlive",
        n = GV.sru + "/" + t.room_url_key,
        s = FU.unixTimeConvert(t.time),
        l = t.message;
      else "fr" == t.type ? (o = "FR", i = " type_fr", n = GV.sru + "/room/fan_club?room_id=" + t.room_id, s = FU.unixTimeConvert(t.time), l = t.message) : "time_notice" == t.type ? (o = "TIME", i = " type_time_notice", n = GV.sru + "/onlive", s = FU.unixTimeConvert(t.time), l = t.message) : "reget" == t.type ? (o = "RE", i = " type_reget", n = GV.sru + "/onlive", s = FU.unixTimeConvert(t.time), l = t.message) : (o = "NONE", i = "", n = "#", s = "不明", l = "不明");
      $("<a>", {
        href: n
      }).appendTo("#notification_log"), $("<p>", {
        class: "notification_log_type" + i,
        text: o,
        title: s
      }).appendTo("#notification_log a:eq(" + e + ")"), $("<p>", {
        class: "notification_log_name",
        text: t.title,
        title: t.title
      }).appendTo("#notification_log a:eq(" + e + ")"), $("<p>", {
        class: "notification_log_message",
        text: l,
        title: l
      }).appendTo("#notification_log a:eq(" + e + ")")
    }
    $("#notification_log a").off(), $("#notification_log a").on("click", function () {
      chrome.tabs.create({
        url: $(this).attr("href")
      })
    })
  }, $("#notification_log_button").click(function () {
    $("#notification_log").is(":hidden") ? ($("#notification_log").css({
      display: "block"
    }), $(this).text("通知ログ ▲")) : ($("#notification_log").css({
      display: "none"
    }), $(this).text("通知ログ ▼")), $("html,body").css({
      height: $("#free_gift_num_area").css("height")
    })
  }), FU.unixTimeConvert = function (e) {
    var t = new Date(1e3 * e);
    return t.getMonth() + 1 + "/" + t.getDate() + " " + ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2)
  }, FU.followRoomData = function () {
    var e = GV.sru + "/follow";
    $.ajax({
      url: e,
      type: "GET",
      success: function (e) {
        var t = $(e).find("#js-genre-section-all .listcardinfo-main-text"),
          o = $(e).find("#js-genre-section-all .profile-link"),
          i = $(e).find("#js-genre-section-all .room-url"),
          n = $(e).find("#js-genre-section-all .icon-camera-gray"),
          s = $(e).find("#js-genre-section-all .js-follow-li"),
          l = $(e).find("#js-genre-section-all .img-main");
        $(".follow_room_area").empty(), Follow_room_list = {};
        for (var _ = 0; _ < o.length; _++) {
          var r = t[_].innerText,
            a = o[_].search.replace("?room_id=", ""),
            c = i[2 * _].pathname.replace("/", ""),
            m = l.eq(_).attr("data-src"),
            g = "",
            d = "200" == s[_].classList[1].replace("js-genre-", "") ? "seed" : "star";
          if ($.each(n[_].classList, function (e, t) {
              "is-active" != t || (g = " genre_onlive")
            }), void 0 == Time_table_list[String(a)]) var f = "";
          else f = void 0 != Time_table_list[String(a)][0] ? FU.unixTimeConvert(Time_table_list[String(a)][0]) : "";
          var h = void 0 != Check_list.onlive[String(a)] && Check_list.onlive[String(a)].check,
            u = void 0 != Check_list.fr[String(a)] && Check_list.fr[String(a)].check,
            p = void 0 != Check_list.time_notice[String(a)] && Check_list.time_notice[String(a)].check;
          $("<li>", {
            class: "follow_room follow_room_id_" + a + " genre_all genre_" + d + g
          }).appendTo("#follow_room_area"), $("<a>", {
            href: GV.sru + "/" + c
          }).appendTo(".follow_room_id_" + a), $("<img>", {
            class: "follow_room_img follow_room_img_on",
            src: "https://image.showroom-live.com/showroom-prod/assets/img/v3/img_lazyload.png",
            data_src: m
          }).appendTo(".follow_room_id_" + a + " a"), $("<p>", {
            class: "follow_room_name",
            text: r
          }).appendTo(".follow_room_id_" + a), $("<p>", {
            class: "follow_room_next_live",
            text: f
          }).appendTo(".follow_room_id_" + a), $("<button>", {
            class: "onlive_check " + (h ? "check_on" : "check_off"),
            room_id: a,
            room_url_key: c,
            text: "LIVE"
          }).appendTo(".follow_room_id_" + a), $("<button>", {
            class: "fr_check " + (u ? "check_on" : "check_off"),
            room_id: a,
            room_url_key: c,
            text: "FR"
          }).appendTo(".follow_room_id_" + a), $("<button>", {
            class: "time_notice_check " + (p ? "check_on" : "check_off"),
            room_id: a,
            room_url_key: c,
            text: "TIME"
          }).appendTo(".follow_room_id_" + a), Follow_room_list[String(a)] = {
            room_name: r,
            room_url_key: c,
            genre: d,
            room_img_url: m,
            next_live: f
          }
        }
        for (Debug && console.log(Check_list), _ = 0; _ < 10; _++) {
          var v = $(".genre_all img").eq(_);
          v.attr("src", v.attr("data_src"))
        }
        setItem("check_list", JSON.stringify(Check_list)), setItem("follow_room_list", JSON.stringify(Follow_room_list)), $(window).off("scroll"), $(window).on("scroll", function () {
          for (var e = $(".genre_active").attr("name"), t = Math.floor($(this).scrollTop() / 70 + 10), o = 0; o < t; o++) {
            var i = $(".genre_" + e + " img").eq(o);
            i.attr("src", i.attr("data_src"))
          }
        }), $(".follow_room a").off(), $(".follow_room a").on("click", function () {
          chrome.tabs.create({
            url: $(this).attr("href")
          })
        }), $(".follow_room button").off("click"), $(".follow_room button").on("click", function () {
          Debug && console.log(Check_list), $(this).hasClass("check_off") ? $(this).removeClass("check_off").addClass("check_on") : $(this).removeClass("check_on").addClass("check_off");
          var e = $(this).hasClass("check_on"),
            t = $(this).attr("room_url_key"),
            o = $(this).attr("room_id");
          $(this).hasClass("onlive_check") && (Check_list.onlive[o] = {
            room_url_key: t,
            check: e
          }), $(this).hasClass("fr_check") && (Check_list.fr[o] = {
            room_url_key: t,
            check: e
          }), $(this).hasClass("time_notice_check") && (Check_list.time_notice[o] = {
            room_url_key: t,
            check: e
          }), setItem("check_list", JSON.stringify(Check_list))
        }), $("#follow_room_header li").off("click"), $("#follow_room_header li").on("click", function () {
          $("#follow_room_header li").removeClass("genre_active"), $(this).addClass("genre_active");
          var e = $(this).attr("name");
          $(".genre_all").css({
            display: "none"
          }), "all" == e ? $(".genre_all").css({
            display: "block"
          }) : "star" == e ? $(".genre_star").css({
            display: "block"
          }) : "seed" == e ? $(".genre_seed").css({
            display: "block"
          }) : "onlive" == e && $(".genre_onlive").css({
            display: "block"
          });
          for (var t = 0; t < 10; t++) {
            var o = $(".genre_" + e + " img").eq(t);
            o.attr("src", o.attr("data_src"))
          }
        })
      },
      error: function (e, t, o) {}
    })
  }, setItem = function (e, t) {
    chrome.runtime.sendMessage({
      method: "setItem",
      key: e,
      value: t
    }, function (e) {
      Debug && console.log(e)
    })
  }, getItem = function (e, t) {
    chrome.runtime.sendMessage({
      method: "getItem",
      key: e
    }, function (t) {
      Debug && console.log(t), "option_list" == e ? (null == t.data ? Option_list = {} : Option_list = t.data, Start_switch[e] = !0, 0 == Option_list.noti_log && $("#notification_log_button").css({
        display: "none"
      }), 0 == Option_list.re_get_time && $(".re_get_time_1,.re_get_time_2").css({
        display: "none"
      }), 0 == Option_list.show_gold && $("#show_gold_area").css({
        display: "none"
      })) : "time_table_list" == e ? (null == t.data ? Time_table_list = {} : Time_table_list = t.data, Start_switch[e] = !0) : "check_list" == e ? (null == t.data ? Check_list = {
        onlive: {},
        fr: {},
        time_notice: {}
      } : Check_list = t.data, Start_switch[e] = !0) : "desktopPop_log" == e && (null == t.data ? DesktopPop_log = [] : (DesktopPop_log = t.data, FU.desktopPopLog()))
    })
  }, configLoad = function () {
    getItem("option_list"), getItem("time_table_list"), getItem("check_list"), getItem("desktopPop_log")
  }, $("#onlive_open").on("click", function () {
    $("#context_box").is(":visible") ? $("#context_box").hide() : $("#context_box").show()
  }), $("#context_box img").off(), $("#context_box img").on("click", function () {
    $("#context_box img").removeClass("on"), $(this).addClass("on")
  }), $("#context_box .omit").off(), $("#context_box .omit").on("click", function () {
    if ($(this).hasClass("on")) {
      $(this).removeClass("on");
      var e = 0
    } else $(this).addClass("on"), e = 1;
    console.log($(this).attr("name"), e), localStorage.setItem($(this).attr("name"), e)
  }), $("#context_box .radio input").off(), $("#context_box .radio input").on("change", function () {
    "2" == $(this).val() ? $("#context_box .open_num").val(3) : $("#context_box .open_num").val(localStorage.getItem("room_open_n"))
  }), $("#context_box .open_num").off(), $("#context_box .open_num").on("change", function () {
    localStorage.setItem("room_open_n", $("#context_box .open_num").val())
  }), $("#context_box .open").off(), $("#context_box .open").on("click", function () {
    var e = $("#context_box .open_num").val(),
      t = $("#context_box .on").attr("name"),
      o = $("#context_box .wait_num").val(),
      i = $("#context_box .tb").hasClass("on"),
      n = $("#context_box .vb").hasClass("on"),
      s = $("#context_box .close").hasClass("on"),
      l = $("#context_box .radio input:checked").val();
    chrome.runtime.sendMessage({
      method: "function",
      key: "tab_open",
      value: JSON.stringify({
        n: e,
        w: o,
        ty: t,
        gt: l,
        tb: i,
        vb: n,
        cl: s
      })
    }, function (e) {})
  }), 1 == localStorage.getItem("omit_vb") && $("#context_box .vb").addClass("on"), 1 == localStorage.getItem("omit_tb") && $("#context_box .tb").addClass("on"), 1 == localStorage.getItem("omit_cl") && $("#context_box .close").addClass("on"), localStorage.getItem("room_open_n") && $("#context_box .open_num").val(localStorage.getItem("room_open_n")), optionOpen = function () {
    chrome.tabs.create({
      url: "./option.html"
    }).focus()
  }, $("#option_open").click(function () {
    optionOpen()
  }), $("#side_menu img").click(function () {
    $("#side_menu img").removeClass("menu_on"), $(this).addClass("menu_on"), $(".content_box").css({
      display: "none"
    }), $("#" + $(this).attr("name")).css({
      display: "block"
    }), "free_gift_num_area" == $(this).attr("name") && $("html,body").css({
      height: $("#" + $(this).attr("name")).css("height")
    })
  }), Start_switch = {
    time_table_list: !1,
    check_list: !1,
    option_list: !1
  }, configLoad(), chrome.runtime.sendMessage({
    method: "getItem",
    key: "have_star"
  }, function (e) {
    "number" == $.type(e.data) ? FU.haveNum(e.data, "star") : FU.onliveRoom("star")
  }), chrome.runtime.sendMessage({
    method: "getItem",
    key: "have_seed"
  }, function (e) {
    "number" == $.type(e.data) ? FU.haveNum(e.data, "seed") : FU.onliveRoom("seed")
  }), chrome.runtime.sendMessage({
    method: "getItem",
    key: "suko_get_log"
  }, function (e) {
    if (e.data) {
      let t = {};
      getLogText = function () {
        Math.floor((new Date).getTime()), t.star_get_log = e.data.star_get_log, t.seed_get_log = e.data.seed_get_log;
        for (var o = 0; o < 2; o++) {
          if (t.tw_n = 0, t.vi_n = 0, t.re_1 = 0, t.re_2 = 0, t.re_b = !1, t.ti = "", 0 == o) var i = "star",
            n = t.star_get_log;
          else i = "seed", n = t.seed_get_log;
          for (var s = 0, l = n.length; s < l; s++) {
            var _ = n[s];
            if ("tw" == _.type) {
              var r = "ツイボ";
              t.tw_n++
            } else "vi" == _.type ? (r = "視聴ボ", t.vi_n++) : "re" == _.type && (r = "解除時刻", t.tw_n = 0, t.vi_n = 0, t.re_1 = Number(_.at), t.ti = "", t.re_b = !0);
            "tw" != _.type && "vi" != _.type || (t.tw_n + t.vi_n == 1 ? (t.re_2 = Number(_.at) + 36e5, t.re_b = !0) : t.re_2 < _.at && (t.re_2 = Number(_.at) + 36e5, t.tw_n = 0, t.vi_n = 0, "tw" == _.type ? t.tw_n++ : t.vi_n++, t.re_b = !0), t.ti = " (" + (t.vi_n + t.tw_n) + "回目)"), t.re_b && (t.re_b = !1, $("#" + i + "_get_log").prepend('<p class="log_border"></p>'));
            var a = FU.timeChange(_.at);
            $("#" + i + "_get_log").prepend('<div class="log_text_box"><p class="log_type">' + r + '</p><p class="log_text">' + a.h + ":" + a.m + ":" + a.s + t.ti + "</p></div>")
          }
          FU.nowTime();
          var c = (a = FU.timeChange(t.re_1)).h + ":" + a.m + ":" + a.s + "～";
          if ($("#" + i + "_re_get_time_1").text(c), t.re_1 > t.now_unix_time_c && t.re_1 + 6e4 < t.re_2 || t.re_1 + 6e4 < t.re_2 && t.re_1 + 36e5 > t.re_2 || t.re_1 > t.re_2) $("#" + i + "_re_get_time_2").text("解除予測 --:--:--").css("color", "#eee");
          else {
            var m = FU.timeChange(t.re_2);
            $("#" + i + "_re_get_time_2").text("解除予測 " + m.h + ":" + m.m + ":" + m.s).css("color", t.re_2 < t.now_unix_time_c && 0 != t.re_2 ? "red" : "#eee")
          }
        }
      }, getLogText()
    }
  }), Follow_first_open = !0, $("#follow_open").click(function () {
    Follow_first_open && (Follow_first_open = !1, FollowRoomDataStart = setInterval(function () {
      Start_check = !0, $.each(Start_switch, function (e, t) {
        0 != t || (Start_check = !1)
      }), 1 == Start_check && (clearInterval(FollowRoomDataStart), FU.followRoomData())
    }, 500))
  })
});