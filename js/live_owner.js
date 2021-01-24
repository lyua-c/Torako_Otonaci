$(function () {
  window.onload = function () {
    if ($("#js-video").length && $("#js-vote-ctl").length) {
      if (chrome.runtime.sendMessage({
          method: "getItem",
          key: "option_list"
        }, async function (e) {
          if (e.data) {
            var t = void 0 == e.data.suko_owner || e.data.suko_owner;
            localStorage.setItem("suko_owner", t)
          }
        }), "false" == localStorage.getItem("suko_owner")) return;
      sSet(function () {
        SRApp.store.get("isOwner") && ($("<link>", {
          rel: "stylesheet",
          type: "text/css",
          href: "chrome-extension://" + localStorage.getItem("e_id") + "/css/live_owner.css"
        }).appendTo("head"), FU.nowTime = function () {
          let e = new Date;
          GV.now_time_list = {
            mo: e.getMonth() + 1,
            d: e.getDate(),
            h: e.getHours(),
            mi: e.getMinutes(),
            s: e.getSeconds()
          }, GV.now_unix_time = Math.floor(e.getTime() / 1e3), GV.now_unix_time_c = Math.floor(e.getTime()), GV.now_time_list_2 = {
            mo: FU.zeroFill(GV.now_time_list.mo, 2) + 1,
            d: FU.zeroFill(GV.now_time_list.d, 2),
            h: FU.zeroFill(GV.now_time_list.h, 2),
            mi: FU.zeroFill(GV.now_time_list.mi, 2),
            s: FU.zeroFill(GV.now_time_list.s, 2)
          }, GV.now_time = GV.now_time_list_2.h + "時" + GV.now_time_list_2.mi + "分" + GV.now_time_list_2.s + "秒", $("#now_time").text(GV.now_time_list_2.h + ":" + GV.now_time_list_2.mi + ":" + GV.now_time_list_2.s);
          var t = GV.now_unix_time - Number(SRApp.store.get("startedAt")),
            n = 3600 - t;
          GV.update_time = {
            m: FU.zeroFill(Math.floor(n / 60), 2),
            s: FU.zeroFill(n % 60, 2)
          };
          var o = {
            h: Math.floor(t / 3600),
            m: FU.zeroFill(Math.floor(t % 3600 / 60), 2),
            s: FU.zeroFill(t % 60, 2)
          };
          if (GV.elap_time_t = o, GV.elapsed_time_noti && !GV.elt && FU.el_noti(t), 0 != SRApp.store.get("liveId")) {
            if (n < 0 ? ($("#update_time").text("更新可能").css("background-color", "red"), GV.update_time_on = !0) : $("#update_time").css("background-color", "#000").text(GV.update_time.m + ":" + GV.update_time.s), GV.start_time ? $("#label-start-time").text(GV.start_time.h + ":" + GV.start_time.m + ":" + GV.start_time.s + "～" + (GV.elap_time ? "(" + o.h + ":" + o.m + ":" + o.s + ")" : "")) : GV.start_time = FU.timeChange(SRApp.store.get("startedAt")), $("#view_bonus_box input").val() > 270) {
              var i = 270;
              $("#view_bonus_box input").val(270)
            } else i = $("#view_bonus_box input").val();
            if (Number(i) > t) console.log("block中"), SRApp.vent.trigger("startPolling"), $("#view_b_timer").text("秒 (" + (Number(i) - t) + "秒)"), t % 30 == 0 && (FU.roomProfile(), SRApp.vent.trigger("fetchAvatar"), SRApp.vent.trigger("fetchEventAndSupport"));
            else if (GV.view_b_get) {
              if (Number(i) - t >= 0) var r = "秒 (" + (Number(i) - t) + "秒)";
              else r = "秒 (0秒)";
              $("#view_b_timer").text(r)
            } else GV.view_b_get = !0, FU.viewBonus()
          } else if (GV.live_data = JSON.parse($("#js-live-data").attr("data-json")), GV.live_data.room.last_lived_at) {
            var a = FU.timeChange(GV.live_data.room.last_lived_at);
            $("#update_time").css("background-color", "#000").text("前回 " + a.mo + "/" + a.d + " " + a.h + ":" + a.m + ":" + a.s + "～" + (GV.end_time ? GV.end_time : ""))
          }
          setTimeout(function () {
            FU.nowTime(), $(".room-header .label-room").css({
              display: "inline-block"
            })
          }, 1e3)
        }, FU.reset_time = function () {
          try {
            var e = GV.star_log.re_1 < GV.star_log.re_2 ? GV.star_log.re_2 : GV.star_log.re_1;
            if (GV.now_unix_time + 5 > Math.floor(e / 1e3) && GV.now_unix_time < Math.floor(e / 1e3) && !GV.reset_se_star) {
              GV.reset_se_star = !0, GV.reset_se && FU.soundPop("pop.mp3", Number($("#config_area .reset_se .se_volume").attr("value")) / 100), GV.pop_n = GV.pop_n ? GV.pop_n + 1 : 0, FU.pop_c(GV.pop_n, FU.local_url("/img/pop_star.png"), "まもなく解除時間。");
              try {
                FU.getLogText()
              } catch (e) {}
              setTimeout(function () {
                GV.reset_se_star = !1
              }, 1e4)
            }
            if (e = GV.seed_log.re_1 < GV.seed_log.re_2 ? GV.seed_log.re_2 : GV.seed_log.re_1, GV.now_unix_time + 5 > Math.floor(e / 1e3) && GV.now_unix_time < Math.floor(e / 1e3) && !GV.reset_se_seed) {
              GV.reset_se_seed = !0, GV.reset_se && FU.soundPop("pop.mp3", Number($("#config_area .reset_se .se_volume").attr("value")) / 100), GV.pop_n = GV.pop_n ? GV.pop_n + 1 : 0, FU.pop_c(GV.pop_n, FU.local_url("/img/pop_seed.png"), "まもなく解除時間。");
              try {
                FU.getLogText()
              } catch (e) {}
              setTimeout(function () {
                GV.reset_se_seed = !1
              }, 1e4)
            }
          } catch (e) {}
        }, FU.el_noti = function (e) {
          var t = 3600 - (e + 60 * Number($("#config_area .elapsed_time_noti .number").val()));
          t <= 0 && t > -10 && (GV.elt = !0, FU.pop_c("el_time", FU.local_url("/img/reload.png"), "更新前通知", 1e4), GV.el_noti_se && FU.soundPop("pop.mp3", Number($("#config_area .elapsed_time_noti_se .se_volume").attr("value")) / 100))
        }, FU.zeroFill = function (e, t) {
          return ("0000000000" + e).slice(-t)
        }, FU.randomNum = function (e, t) {
          return Math.floor(Math.random() * (e - t + 1)) + t
        }, FU.unixChange = function (e) {
          let t = new Date,
            n = new Date(e.ye ? e.ye : t.getFullYear(), e.mo ? e.mo : t.getMonth(), e.da ? e.da : t.getDate(), e.ho ? e.ho : t.getHours(), e.mi ? e.mi : t.getMinutes(), e.se ? e.mi : 0);
          return Math.floor(n.getTime() / 1e3)
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
        }, FU.soundPop = function (e, t) {
          let n = new Audio;
          n.src = FU.local_url("/sound/" + e), n.volume = t, n.play()
        }, FU.save = function (e, t) {
          localStorage.setItem(e, JSON.stringify(t))
        }, FU.load = function (e) {
          try {
            var t = JSON.parse(localStorage.getItem(e))
          } catch (e) {
            t = !1
          }
          return t
        }, FU.local_url = function (e) {
          return "chrome-extension://" + localStorage.getItem("e_id") + e
        }, FU.textSepa = function (e) {
          return e.replace(/\s+/g, "").split(",")
        }, FU.liveInfo = async function () {
          await $.get(GV.u + "/api/live/live_info?room_id=" + SRApp.store.get("roomId"), function (e) {})
        }, FU.roomStatus = async function () {
          await $.get(GV.u + "/api/room/status?room_url_key=" + location.href.replace("https://www.showroom-live.com/", ""), function (e) {
            e.is_live || (GV.bckey = e.broadcast_key, GV.room_id = e.room_id)
          })
        }, FU.roomProfile = async function (e) {
          await $.get(GV.u + "/api/room/profile?room_id=" + SRApp.store.get("roomId"), function (t) {
            SRApp.vent.trigger("setWatchNum", t.view_num), e && (GV.room_view_n = t.visit_count, $("#js-broadcast-ctl .live_num").text("回数 : " + t.visit_count + " 回"))
          })
        }, FU.roomHtml = async function (e) {
          await $.get(location.href, function (e) {
            var t = JSON.parse($(e).find("#js-live-data").attr("data-json"));
            $("#js-broadcast-ctl .room_point").hasClass("room_point") || ($("#js-broadcast-ctl").append('<div id="room_data"></div>'), $("#room_data").append('<p class="room_point">累計ポイント : ' + Number(t.room.popularity_point).toLocaleString() + " pt</p>"), $("#room_data .room_point").css({
              padding: "5px 10px",
              "background-color": "rgba(255,255,255,.1)"
            }), $("#js-broadcast-ctl .owner-ctl-heading").append('<p class="live_num"></p>'), $("#js-broadcast-ctl .live_num").css({
              display: "inline-block"
            }), GV.room_html_timer = 1e4, GV.room_point = Number(t.room.popularity_point), GV.offlive_n = 0, FU.roomProfile(!0)), GV.room_point != Number(t.room.popularity_point) ? ($("#room_data .room_point").text("累計ポイント : " + Number(t.room.popularity_point).toLocaleString() + " pt"), GV.room_html_timer = 3e5, GV.offlive_n = 0) : 3e5 == GV.room_html_timer && (GV.room_html_timer = 5e3), SRApp.store.get("liveId") || GV.offlive_n++, GV.offlive_n >= 60 && (GV.room_html_timer = 6e4), setTimeout(function () {
              FU.roomHtml()
            }, GV.room_html_timer)
          })
        }, FU.userLiveRank = function () {
          $.get(location.href, function (e) {
            var n = JSON.parse($(e).find("#js-live-data").attr("data-json")),
              o = n.ranking.live_ranking;
            if ($("#user_live_rank_list").css("height", $("#room-ranking-list").css("height")), n.is_live) {
              FU.timeChange(o[0].updated_at), $("#user_live_rank_note .reload").attr("title", "前回のリロード : " + GV.now_time_list_2.h + ":" + GV.now_time_list_2.mi + ":" + GV.now_time_list_2.s);
              for (var i = 0, r = o.length; i < 101; i++)
                if (t = $("#user_live_rank_" + (i + 1)), r > i) {
                  var a = o[i];
                  t.find(".rank_box").show().attr({
                    title: "ユーザーID : " + a.user.user_id
                  }), t.find(".point").text(a.point.toLocaleString() + " pt"), t.find(".ava").attr({
                    src: a.user.avatar_url,
                    title: "アバターID : " + a.user.avatar_id
                  }), t.find(".name").text(a.user.name).attr("title", a.user.name)
                } else t.find(".rank_box").hide()
            }
          })
        }, FU.eventRoom = async function () {
          $("#event_ranking_dialog").remove(), GV.event_next_rank_end = !1, $("#event-detail-dialog .po-rt").after('<section id="event_ranking_dialog"></section>'), $("#event_ranking_dialog").hide().append('<div id="event_ranking_note"><div class="rank">順位</div><div class="name">ルーム名</div><div class="point">ポイント</div><div class="gap">次の順位まで</div></div>').append('<div id="event_ranking_area" class="scroll"></div>').append('<div id="event_next_rank_point">ランク20位まで表示</div>'), $("#event_next_rank_point").show(), $("#event_ranking_area").css("height", $(window).height() - 200 + "px"), $("#event_ranking_button").off(), $("#event_ranking_button").on("click", function () {
            $("#event_ranking_dialog").show()
          }), $(".js-genre-tab").click(function () {
            "event_ranking_button" != $(this).attr("id") && $("#event_ranking_dialog").hide()
          }), GV.event_page = {}, GV.event_room_id = [], GV.event_room_name = {}, GV.event_room_url = [], GV.event_room_data = {};
          for (var e = SRApp.store.attributes.eventData.eventId, t = 1; t < 10; t++) {
            await FU.eventPage(e, t);
            for (var n = GV.event_page["p_" + t], o = n.html, i = $(o).find(".profile-link"), r = $(o).find(".listcardinfo-main-text"), a = $(o).find(".room-url"), _ = 0; _ < i.length; _++) try {
              var s = $(i[_]).attr("href").replace("/room/profile?room_id=", ""),
                l = $(a[2 * _]).attr("href").replace("/", ""); - 1 == GV.event_room_id.indexOf(s) && (GV.event_room_id.push(s), GV.event_room_name[s] = $(r[_]).text()), -1 == GV.event_room_url.indexOf(l) && GV.event_room_url.push(l)
            } catch (e) {}
            n.next_page || (t = 99)
          }
          for (t = 0; t < 10; t++) try {
            GV.event_room_id[t] && await FU.eventRankingPoint(GV.event_room_id[t], t)
          } catch (e) {}
          $("#event_next_rank_point").off().attr("value", 10), $("#event_next_rank_point").on("click", async function () {
            if (!GV.event_next_load) {
              GV.event_next_load = !0;
              for (var e = Number($("#event_next_rank_point").attr("value")), t = 0; t < 10; t++) try {
                var n = GV.event_room_id[e + t];
                void 0 != n ? await FU.eventRankingPoint(n, e + t) : GV.event_next_rank_end = !0
              } catch (e) {}
              GV.event_next_load = !1, GV.event_next_rank_end ? $("#event_next_rank_point").text("すべてのランキングを表示しました") : $("#event_next_rank_point").attr("value", e + 10).text("ランク" + (e + 20) + "位まで表示する"), FU.eventRankingC()
            }
          }), FU.eventRankingC()
        }, FU.eventRankingC = function () {
          for (var e = 0, t = Object.keys(GV.event_room_data).length; e < t; e++) {
            var n = e + 1;
            if (!$("#event_rank_box_" + n).length) {
              var o = GV.event_room_data[String(e)];
              $("#event_ranking_area").append('<div id="event_rank_box_' + n + '" class="event_rank_box"><div class="rank">' + o.rank + '</div><div class="name">' + o.name + '</div><div class="point">' + o.point.toLocaleString() + ' pt</div><div class="gap">' + (1 == n ? 0 : o.gap.toLocaleString()) + ' pt</div><img class="link" src="' + FU.local_url("/img/live.png") + '" value="' + o.room_url_key + '"></div>')
            }
          }
          $("#event_ranking_area .link").off(), $("#event_ranking_area .link").on("click", function () {
            var e = $(this).attr("value");
            e && window.open("https://www.showroom-live.com/" + e, "_blank")
          })
        }, FU.onlivs = async function () {
          await $.get(GV.u + "/api/live/onlives?_=1", function (e) {
            GV.onlives = e
          })
        }, FU.giftList = async function () {
          await $.get(GV.u + "/api/live/gift_list?room_id=" + SRApp.store.get("roomId"), function (e) {
            GV.gift_list = e.normal
          })
        }, FU.viewBonus = function () {
          $.ajax({
            url: GV.u + "/api/live/polling?room_id=" + SRApp.store.get("roomId"),
            type: "GET",
            dataType: "json"
          }).then(function (e) {
            if (e.live_watch_incentive.hasOwnProperty("ok"))
              if (SRApp.store.get("isOfficial")) {
                for (GV.star_vb_log = FU.load("star_vb") ? FU.load("star_vb") : {}; Object.keys(GV.star_vb_log).length > 200;) delete GV.star_vb_log[Object.keys(GV.star_vb_log)[0]];
                GV.star_vb_log[String(SRApp.store.get("liveId"))] = GV.now_unix_time_c, FU.save("star_vb", GV.star_vb_log)
              } else {
                for (GV.seed_vb_log = FU.load("seed_vb") ? FU.load("seed_vb") : {}; Object.keys(GV.seed_vb_log).length > 200;) delete GV.seed_vb_log[Object.keys(GV.seed_vb_log)[0]];
                GV.seed_vb_log[String(SRApp.store.get("liveId"))] = GV.now_unix_time_c, FU.save("seed_vb", GV.seed_vb_log)
              }
            SRApp.vent.trigger("setWatchNum", e.online_user_num), e.live_watch_incentive && (e.live_watch_incentive.hasOwnProperty("ok") ? SRApp.vent.trigger("showWatchBonus", e.toast) : e.live_watch_incentive.hasOwnProperty("error") && SRApp.vent.trigger("showErrorToast", e.live_watch_incentive.message)), FU.roomProfile(!1), SRApp.vent.trigger("fetchAvatar"), SRApp.vent.trigger("fetchEventAndSupport")
          })
        }, FU.dom_C = function () {
          GV.debug && console.log("---dom---"), $("<div>", {
            id: "suko_area"
          }).appendTo("body"), $("#label-start-time").after($(GV.dom_time.join(""))), $("#telop-form-input").attr("list", "temp").after('<datalist id="temp"></datalist>'), $("#telop-form-delete").after('<div id="more_temp">▼</div>').css({
            float: "left",
            "margin-left": "5px"
          }), $("#telop-form").append('<div id="temp_telop"><input type="text" id="temp_input" placeholder="テンプレ追加と削除" list="temp"><div id="temp_add" class="button">+</div><div id="temp_delete" class="button">×</div></div>'), $("#telop-form-delete,#telop-form-submit").css({
            width: "105px"
          }), $("#js-broadcast-ctl").append('<div id="view_bonus_box"><p>視聴ボブロック</p><input type="number" min="30" max="270" value="30"><p id="view_b_timer">秒</p></div>'), GV.temp_list = localStorage.getItem("temp_list") ? JSON.parse(localStorage.getItem("temp_list")) : [];
          for (var e = 0; e < GV.temp_list.length; e++) $("#temp").append('<option class="temp_text" value="' + GV.temp_list[e] + '">');
          if ($("#view_bonus_box input").val(FU.load("view_b_timer") ? FU.load("view_b_timer") : 30), !$("#user_live_rank_show").length) {
            for ($("#ranking").append('<img id="user_live_rank_show" src="' + FU.local_url("/img/user.png") + '">'), $("#ranking-content-region").append('<div id="user_live_rank_list" class="scroll"></div>'), $("#user_live_rank_list").append('<div id="user_live_rank_note"></div>'), $("#user_live_rank_note").append('<div class="note">※リアルタイムのポイントではありません。<br>※カウントポイントは含まれません。</div>'), $("#user_live_rank_note").append('<img class="reload" src="' + FU.local_url("/img/reload.png") + '">'), $("#user_live_rank_note .reload").off("click"), $("#user_live_rank_note .reload").on("click", function () {
                GV.user_live_rank_load || (FU.userLiveRank(), GV.user_live_rank_load = !0, setTimeout(function () {
                  GV.user_live_rank_load = !1
                }, 3e3))
              }), e = 1; e < 101; e++) $("#user_live_rank_list").append('<div id="user_live_rank_' + e + '"><div class="rank_box"><div class="rank">' + e + '</div><div class="point"></div><img class="ava"><div class="name"></div></div></div>');
            $("#user_live_rank_show").off(), $("#user_live_rank_show").on("click", function () {
              $("#user_live_rank_list").is(":visible") ? ($(".room_point").text("累計ランキング"), $("#user_live_rank_list").hide(), $("#room-ranking-list").show(), $(this).removeClass("on")) : ($(".room_point").text("ライブランキング"), $(this).addClass("on"), $("#user_live_rank_list").show(), $("#room-ranking-list").hide(), GV.user_live_rank_load || (FU.userLiveRank(), GV.user_live_rank_load = !0, setTimeout(function () {
                GV.user_live_rank_load = !1
              }, 3e3)))
            }), FU.userLiveRank()
          }
        }, FU.etc_C = async function () {
          GV.debug && console.log("---etc---"), FU.start_time = function () {
            if (0 != SRApp.store.get("liveId")) {
              var e = FU.timeChange(SRApp.store.get("startedAt"));
              GV.start_time = e, $("#label-start-time").text(e.h + ":" + e.m + ":" + e.s + "～")
            }
          }, FU.room_view_n = function () {
            $("#watch-num-label").on("click", function () {
              FU.pop_c("view_num", FU.local_url("/img/login.png"), "配信回数 " + GV.room_view_n + " 回")
            })
          }, FU.eventPoint = function () {
            SRApp.view.subViews.eventView.subViews.eventBoxView.model.fetchEventAndSupport = function () {
              return $.ajax({
                type: "GET",
                url: "/api/room/event_and_support",
                data: {
                  room_id: SRApp.store.get("roomId")
                },
                success: function (e) {
                  if (e.event && ($("#event_point").remove(), e.event.ranking ? ($("<p>", {
                      id: "event_point",
                      text: "現在のポイント: " + String(e.event.ranking.point).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") + " pt"
                    }).prependTo("#event-rank-wrapper div:eq(1)"), $("#event_point").css({
                      "text-align": "center",
                      "font-size": "14px",
                      color: "#1DE9B6"
                    }), $("#event-next-point").text(String(e.event.ranking.gap).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"))) : e.event.quest && ($("#event-rank-wrapper").show(), $("#event-rank-wrapper .current-rank").hide(), $("#event-rank-wrapper .next-rank").empty(), $("<p>", {
                      id: "event_point",
                      text: "現在のポイント: " + String(e.event.quest.support.current_point).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") + " pt"
                    }).prependTo("#event-rank-wrapper div:eq(1)"), $("#event_point").css({
                      "text-align": "center",
                      "font-size": "14px",
                      color: "#1DE9B6"
                    }))), e.regular_event && e.regular_event.event_id && SRApp.store.set({
                      regularEventData: {
                        eventId: e.regular_event.event_id,
                        eventName: e.regular_event.event_name,
                        levelName: e.regular_event.level_name
                      }
                    }), e.event && (SRApp.store.set({
                      eventData: {
                        eventId: e.event.event_id,
                        eventName: e.event.event_name,
                        eventType: e.event.event_type,
                        image: e.event.image,
                        questLevel: e.event.quest_level,
                        rank: e.event.rank,
                        nextRank: e.event.next_rank,
                        gap: e.event.gap
                      }
                    }), e.event.ranking && SRApp.store.set({
                      eventData: {
                        rank: e.event.ranking.rank,
                        nextRank: e.event.ranking.next_rank,
                        point: e.event.ranking.point,
                        gap: e.event.ranking.gap
                      }
                    }), e.event.quest && (SRApp.store.set({
                      eventData: {
                        questLevel: e.event.quest.quest_level
                      }
                    }), e.event.quest.support && SRApp.store.set({
                      supportData: {
                        supportId: e.event.quest.support.support_id,
                        title: e.event.quest.support.title,
                        currentPoint: e.event.quest.support.current_point,
                        goalPoint: e.event.quest.support.goal_point
                      }
                    }))), e.support && e.support.support_id) return SRApp.store.set({
                    supportData: {
                      supportId: e.support.support_id,
                      title: e.support.title,
                      currentPoint: e.support.current_point,
                      goalPoint: e.support.goal_point
                    }
                  })
                }
              })
            }, SRApp.vent.trigger("fetchEventAndSupport")
          }, FU.eventRankingS = function () {
            $(".showEventDetail").click(function () {
              if ($(".event-body img").attr("src").length) {
                try {
                  if (0 == SRApp.store.attributes.eventData.rank) return
                } catch (e) {
                  return
                }
                GV.set_event_ranking = setInterval(function () {
                  if ($("#event_ranking_button").length) {
                    try {
                      clearInterval(GV.set_event_ranking)
                    } catch (e) {}
                    FU.eventRoom()
                  } else $(".tab-sub-category").append('<li><a class="js-genre-tab" id="event_ranking_button" href="javascript:void(0);">ルームランキング</a></li>')
                }, 100)
              }
            })
          }, FU.roomProfileSensor = function () {
            try {
              var e = $('meta[name="description"]').attr("content");
              if (e.indexOf("#eve:") >= 0) {
                var t = e.substr(e.indexOf("#eve") + 1, 50),
                  n = t.indexOf(":"),
                  o = t.indexOf("#"),
                  i = t.substr(n, o).replace("#", "").replace(":", "").replace(/\s+/g, "");
                GV.next_event_url = "https://www.showroom-live.com/event/" + i, $("#event-support-wrapper").append('<div id="next_event_link"><a href="' + GV.next_event_url + '" target="_blank">参加予定イベント</a></div>')
              }
            } catch (o) {}
          }, $("#temp_add,#temp_delete").on("click", function () {
            var e = $("#temp_input").val();
            $("#temp_input").val(""), GV.temp_list = [], $.each($(".temp_text"), function () {
              e == $(this).val() && $(this).remove()
            }), "temp_add" == $(this).attr("id") && $("#temp").prepend('<option class="temp_text" value="' + e + '">'), $.each($(".temp_text"), function () {
              GV.temp_list.push($(this).val())
            }), localStorage.setItem("temp_list", JSON.stringify(GV.temp_list))
          }), $("#more_temp").on("click", function () {
            $("#temp_telop").is(":visible") ? ($("#temp_telop").hide(), $(this).text("▼")) : ($("#temp_telop").show(), $(this).text("▲"))
          }), $("#temp_input,#telop-form-input").on("change input", function () {
            $(this).val().length > 25 ? $(this).addClass("over") : $(this).removeClass("over")
          }), $("#view_bonus_box input").on("change input", function () {
            FU.save("view_b_timer", $(this).val())
          }), FU.start_time(), FU.eventPoint(), FU.eventRankingS(), FU.roomProfileSensor()
        }, FU.check = function () {
          SRApp.view && SRApp.view.subViews ? (GV.debug && console.log("---check---"), FU.dom_C(), FU.etc_C(), FU.nowTime(), FU.roomHtml()) : setTimeout(function () {
            console.log("---retry---"), FU.check()
          }, 500)
        }, $(window).load(function () {
          GV.check = !0, FU.check()
        }), setTimeout(function () {
          GV.check || FU.check()
        }, 3e3), $("#watch-num-label").click(function () {}), $(".room-header-user-name").click(function () {}))
      })
    }
  }
});