$(function () {
  if ($("#js-video").length && !$("#broadcast-settings-tab-encoder").length) {
    if ($("#suko_area").length) return;
    if ($("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "chrome-extension://" + localStorage.getItem("e_id") + "/css/live_room.css"
      }).appendTo("head"), chrome.runtime.sendMessage({
        method: "getItem",
        key: "option_list"
      }, async function (re) {
        if (re.data) {
          var c = void 0 == re.data.suko_listener || re.data.suko_listener;
          localStorage.setItem("suko_listener", c)
        }
      }), "false" == localStorage.getItem("suko_listener")) return;
    logSave = function () {
      setInterval(function () {
        try {
          "1" == localStorage.getItem("log_save") && (chrome.runtime.sendMessage({
            method: "setItem",
            key: "suko_data",
            value: localStorage.getItem("suko") ? localStorage.getItem("suko") : "{}"
          }, function (re) {}), chrome.runtime.sendMessage({
            method: "setItem",
            key: "suko_get_log",
            value: localStorage.getItem("suko_get_log") ? localStorage.getItem("suko_get_log") : "{}"
          }, function (re) {}), localStorage.setItem("log_save", "0"))
        } catch (e) {}
      }, 3e3)
    }, logSave(), sSet(function () {
      if (!$("#suko_area").length && !SRApp.store.get("isOwner")) {
        GV.url_para = {};
        for (var pair = location.search.substring(1).split("&"), i = 0; pair[i]; i++) {
          var kv = pair[i].split("=");
          GV.url_para[kv[0]] = kv[1]
        }
        GV.gift_u = "https://image.showroom-cdn.com/showroom-prod/assets/img/gift/", setInterval(function () {
          0 != SRApp.store.get("liveId") && SRApp.vent.trigger("startPolling")
        }, 1e4), GV.room_url_key = location.href.replace("https://www.showroom-live.com/", ""), FU.nowTime = function () {
          let d = new Date;
          GV.now_time_list = {
            mo: d.getMonth() + 1,
            d: d.getDate(),
            h: d.getHours(),
            mi: d.getMinutes(),
            s: d.getSeconds()
          }, GV.now_unix_time = Math.floor(d.getTime() / 1e3), GV.now_unix_time_c = Math.floor(d.getTime()), GV.now_time_list_2 = {
            mo: FU.zeroFill(GV.now_time_list.mo, 2) + 1,
            d: FU.zeroFill(GV.now_time_list.d, 2),
            h: FU.zeroFill(GV.now_time_list.h, 2),
            mi: FU.zeroFill(GV.now_time_list.mi, 2),
            s: FU.zeroFill(GV.now_time_list.s, 2)
          }, GV.now_time = GV.now_time_list_2.h + "時" + GV.now_time_list_2.mi + "分" + GV.now_time_list_2.s + "秒", $("#now_time").text(GV.now_time_list_2.h + ":" + GV.now_time_list_2.mi + ":" + GV.now_time_list_2.s);
          var et = GV.now_unix_time - Number(SRApp.store.get("startedAt")),
            t = 3600 - et;
          GV.update_time = {
            m: FU.zeroFill(Math.floor(t / 60), 2),
            s: FU.zeroFill(t % 60, 2)
          };
          var et_t = {
            h: Math.floor(et / 3600),
            m: FU.zeroFill(Math.floor(et % 3600 / 60), 2),
            s: FU.zeroFill(et % 60, 2)
          };

          if (GV.elap_time_t = et_t, GV.elapsed_time_noti && !GV.elt && FU.el_noti(et), GV.start_time ? $("#label-start-time").text(GV.start_time.h + ":" + GV.start_time.m + ":" + GV.start_time.s + "～" + (GV.elap_time ? "(" + et_t.h + ":" + et_t.m + ":" + et_t.s + ")" : "")) : GV.start_time = FU.timeChange(SRApp.store.get("startedAt")), 0 != SRApp.store.get("liveId")) {
            // 1秒ごとにカウントをしている部分
            if (GV.comm_n < 50 && !$("#auto_count .icon").hasClass("on")) {
              if ($(".js-follow").hasClass("active")) {
                // 1個ギフト投げるよ！！
          	    FU.autoCountOn();
          	    console.log(document.title + '自動カウントを開始します');  
                console.log(document.title + '自動1投げ');  
                var li = SRApp.store.get("isOfficial") ? [1, 1001, 1002, 1003, 2] : [1501, 1502, 1503, 1504, 1505];
                for (var i = 0, len = li.length; i < len; i++) FU.freeGiftPost({
                  id: li[i],
                  n: 1
                });                
              }  
           }

            if ((((et_t.s == 0)) ||  (et_t.s == 30)) && !$(".js-follow").hasClass("active")) {
               console.log('30秒に一回');
            	 console.log ('view_bonus :' + $("#view_bonus").find(".icon").hasClass("on"));
		           if (SRApp.store.get("isOfficial")) {
		            console.log ('get_bonus_time :' + GV.suko.view_bonus_star);
		            if (GV.suko.view_bonus_star) {
		              if ($("#view_bonus").find(".icon").hasClass("on")) {
		                    console.log('星集め');  
                        FU.freeGiftMax();
                        if (!$("#onlive_open img").hasClass("on")) {
                          $("#onlive_open").trigger("click");
                          $("#onlive_open").trigger("click");
                          $("#onlive_open").trigger("click");
                        }		                    
		                    $("#context_box .open").trigger("click");
		              }
		            }
		           } else {
		            console.log ('get_bonus_time :' + GV.suko.view_bonus_seed);
		            
		            if (GV.suko.view_bonus_seed) {
		              if ($("#view_bonus").find(".icon").hasClass("on")) {
		                    console.log('種集め');  
		                    FU.freeGiftMax();
                        if (!$("#onlive_open img").hasClass("on")) {
                          $("#onlive_open").trigger("click");
                          $("#onlive_open").trigger("click");
                          $("#onlive_open").trigger("click");
                        }		                    
		                    $("#context_box .open").trigger("click");

		              }
		            }
		          }  
            }

            // カウント終わっていてフォローしてないルームは閉じちゃえ
            if (GV.comm_n >= 50 && !$(".js-follow").hasClass("active")) {
             console.log('10秒後に閉じます');
             setTimeout(function () {
               if (window.opener != null) {
               window.close();
               } else {
               if (window.history.length > 1) {
                 window.history.back(-1);
               }
                 console.log(window.opener + 'だから閉じれないよ！');
                 FU.getonlive();
               }
             },10 * 1000)
            }    

            // フォローしてないルームで無料ギフトいっぱいならとじちゃえ
            if (FU.GiftMax && !$(".js-follow").hasClass("active")) {
              console.log('10秒後に閉じます');
              setTimeout(function () {
                if (window.opener != null) {
                window.close();
                } else {
                if (window.history.length > 1) {
                  window.history.back(-1);
                }
                  console.log(window.opener + 'だから閉じれないよ！');
                  FU.getonlive();
                }
              },10 * 1000)
             }             
 

            if(GV.suko.live_config["count_end_comm_room_list_" + SRApp.store.get("roomId")] && !$(".js-follow").hasClass("active")) {
              console.log('10秒後に閉じます');
                setTimeout(function () {
                if (window.opener != null) {
                 window.close();
                } else {
                 if (window.history.length > 1) {
                   window.history.back(-1);
                 }
                   console.log(window.opener + 'だから閉じれないよ！');
                   FU.getonlive();
                }
              },10 * 1000)
            }
           


            
            if (document.location.pathname == '/ad4bc3574905' || document.location.pathname == '/YuNiKanoKorabo_0111' || document.location.pathname == '/Serimaru') {
              if ($("#ten_post img").hasClass("on")) {
                console.log('ここ推しのルームで今１０投げれるやんけ！！');
                
                // 10個ギフト投げるよ！！
                var li = SRApp.store.get("isOfficial") ? [1, 1001, 1002, 1003, 2] : [1501, 1502, 1503, 1504, 1505];
                for (var i = 0, len = li.length; i < len; i++) FU.freeGiftPost({
                  id: li[i],
                  n: 10
                });
              }
                // かいしゅー
                if ($("#view_bonus").hasClass("off")) {
                  FU.viewBonusOn();
                }
           }

           if (t < 0) {
              $("#update_time").text("更新可能").css("background-color", "red");
              GV.update_time_on = !0;
            } else {
              $("#update_time").css("background-color", "#000").text(GV.update_time.m + ":" + GV.update_time.s);
            }
          } else if (GV.live_data = JSON.parse($("#js-live-data").attr("data-json")), GV.live_data.room.last_lived_at) {
            var ti = FU.timeChange(GV.live_data.room.last_lived_at);
            $("#update_time").css("background-color", "#000").text("前回 " + ti.y + "/" + ti.mo + "/" + ti.d + " " + ti.h + ":" + ti.m + ":" + ti.s + "～" + (GV.end_time ? GV.end_time : ""))

            // ライブが終わってたらタブを閉じる
           if($("#update_time").text().match('前回')) {
            console.log('配信終わってるやんけ！');
            if (window.opener != null) {
              window.close();
            } else {
              if (window.history.length > 1) {
                window.history.back(-1);
              }
                console.log(window.opener + 'だから閉じれないよ！');
                FU.getonlive();
            }
           }
          }
          GV.reset_time_noti && FU.reset_time(), setTimeout(function () {
            FU.nowTime()
          }, 1e3)
        }, FU.getonlive = function (){
          $.get("https://www.showroom-live.com/api/live/onlives?_=1", function (re) {
            var i = Math.floor( Math.random() * re.onlives.length);
            console.log(i);
            var d = Math.floor( Math.random() * re.onlives[i].lives.length);
            console.log(d);
            var url = re.onlives[i].lives[d].room_url_key;
            console.log(url);
            document.location = "https://www.showroom-live.com/" + url;
          })
        }, FU.reset_time = function () {
          try {
            var ret = GV.star_log.re_1 < GV.star_log.re_2 ? GV.star_log.re_2 : GV.star_log.re_1;
            if (GV.now_unix_time + 5 > Math.floor(ret / 1e3) && GV.now_unix_time < Math.floor(ret / 1e3) && !GV.reset_se_star) {
              GV.reset_se_star = !0, GV.reset_se && FU.soundPop("pop.mp3", Number($("#config_area .reset_se .se_volume").attr("value")) / 100), GV.pop_n = GV.pop_n ? GV.pop_n + 1 : 0, FU.pop_c(GV.pop_n, FU.local_url("/img/pop_star.png"), "まもなく解除時間。");
              try {
                FU.getLogText()
              } catch (e) {}
              setTimeout(function () {
                GV.reset_se_star = !1
                GV.suko.view_bonus_star = true;
                FU.save("suko", GV.suko);
              }, 1e4)
            }
            ret = GV.seed_log.re_1 < GV.seed_log.re_2 ? GV.seed_log.re_2 : GV.seed_log.re_1;
            if (GV.now_unix_time + 5 > Math.floor(ret / 1e3) && GV.now_unix_time < Math.floor(ret / 1e3) && !GV.reset_se_seed) {
              GV.reset_se_seed = !0, GV.reset_se && FU.soundPop("pop.mp3", Number($("#config_area .reset_se .se_volume").attr("value")) / 100), GV.pop_n = GV.pop_n ? GV.pop_n + 1 : 0, FU.pop_c(GV.pop_n, FU.local_url("/img/pop_seed.png"), "まもなく解除時間。");
              try {
                FU.getLogText()
              } catch (e) {}
              setTimeout(function () {
                GV.reset_se_seed = !1
                GV.suko.view_bonus_seed = true;
                FU.save("suko", GV.suko);
              }, 1e4)
            }
          } catch (e) {}
        }, FU.el_noti = function (et) {
          var ep_n = 3600 - (et + 60 * Number($("#config_area .elapsed_time_noti .number").val()));
          ep_n <= 0 && ep_n > -10 && (GV.elt = !0, FU.pop_c("el_time", FU.local_url("/img/reload.png"), "更新前通知", 1e4), GV.el_noti_se && FU.soundPop("pop.mp3", Number($("#config_area .elapsed_time_noti_se .se_volume").attr("value")) / 100))
        }, FU.zeroFill = function (a, b) {
          return ("0000000000" + a).slice(-b)
        }, FU.randomNum = function (max, min) {
          return Math.floor(Math.random() * (max - min + 1)) + min
        }, FU.unixChange = function (t) {
          let now = new Date,
            dt = new Date(t.ye ? t.ye : now.getFullYear(), t.mo ? t.mo : now.getMonth(), t.da ? t.da : now.getDate(), t.ho ? t.ho : now.getHours(), t.mi ? t.mi : now.getMinutes(), t.se ? t.mi : 0);
          return Math.floor(dt.getTime() / 1e3)
        }, FU.timeChange = function (t) {
          if (0 == t) return {
            y: " -- ",
            mo: " -- ",
            d: " -- ",
            h: " -- ",
            m: " -- ",
            s: " -- "
          };
          if (10 == String(t).length) t = 1e3 * t;
          let d = new Date(Number(t));
          return {
            y: d.getFullYear(),
            mo: FU.zeroFill(d.getMonth() + 1, 2),
            d: FU.zeroFill(d.getDate(), 2),
            h: FU.zeroFill(d.getHours(), 2),
            m: FU.zeroFill(d.getMinutes(), 2),
            s: FU.zeroFill(d.getSeconds(), 2)
          }
        }, FU.soundPop = function (s, v) {
          let a = new Audio;
          a.src = FU.local_url("/sound/" + s), a.volume = v, a.play()
        }, FU.save = function (k, v) {
          localStorage.setItem(k, JSON.stringify(v)), "suko" == k && localStorage.setItem("log_save", "1")
        }, FU.load = function (k) {
          try {
            var d = JSON.parse(localStorage.getItem(k))
          } catch (e) {
            d = !1
          }
          return d
        }, FU.local_url = function (u) {
          return "chrome-extension://" + localStorage.getItem("e_id") + u
        }, FU.hash = async function () {
          GV.suko = FU.load("suko") ? FU.load("suko") : {};
          let l = ["gift_log", "live_config", "live_window"];
          for (var i = 0, len = l.length; i < len; i++) GV.suko[l[i]] || (GV.suko[l[i]] = {})
        }, FU.log = async function () {
          GV.star_vb_log = FU.load("star_vb") ? FU.load("star_vb") : {}, GV.star_tb_log = FU.load("star_tb") ? FU.load("star_tb") : {}, GV.star_re_log = FU.load("star_re") ? FU.load("star_re") : {}, GV.seed_vb_log = FU.load("seed_vb") ? FU.load("seed_vb") : {}, GV.seed_tb_log = FU.load("seed_tb") ? FU.load("seed_tb") : {}, GV.seed_re_log = FU.load("seed_re") ? FU.load("seed_re") : {}
        }, FU.logReset = function () {
          for (var li = ["star_vb", "star_tb", "star_re", "seed_vb", "seed_tb", "seed_re"], i = 0; i < li.length; i++) localStorage.removeItem(li[i])
        }, FU.count_num = function () {
          if (FU.load("count_log_" + SRApp.store.get("liveId"))) {
            var n = Number(FU.load("count_log_" + SRApp.store.get("liveId")).n);
            GV.comm_n = n, GV.count_s_n && n > 1 ? $("#auto_count .auto_count_text").text(n - 1) : !GV.count_s_n && n > 0 ? $("#auto_count .auto_count_text").text(n - 1) : $("#auto_count .auto_count_text").text("－"), GV.comm_n > 50 && $("#auto_count").addClass("end").find("p").text("END")
          } else $("#auto_count .auto_count_text").text("－"), GV.comm_n = GV.count_s_n ? 1 : 0
        }, FU.textSepa = function (t) {
          return t.replace(/\s+/g, "").split(",")
        }, $("body").on("mousedown", function (e) {
          GV.mdown = !0;
          var x = e.clientX,
            y = e.clientY;
          $(this).on("mousemove", function (e) {
            (x + 5 < e.clientX || x - 5 > e.clientX || y + 5 < e.clientY || y - 5 > e.clientY) && (GV.mmove5 = !0), (x + 10 < e.clientX || x - 10 > e.clientX || y + 10 < e.clientY || y - 10 > e.clientY) && (GV.mmove10 = !0)
          })
        }).on("mouseup", function () {
          $(this).off("mousemove"), GV.mdown = !1, GV.mmove10 = !1, GV.mmove5 = !1
        }), FU.video_play = function () {
          try {
            SRApp.player.data = !1, SRApp.player.url = !1, document.getElementById("js-video").play(), $("#js-video").css("display", "inline-block")
          } catch (e) {}
          try {
            $("#ShowRoomLive").attr("data", "/assets/swf/v3/ShowRoomLive.swf?v=20160614")
          } catch (e) {}
        }, FU.video_stop = function () {
          try {
            SRApp.player.data = !1, SRApp.player.url = !1, document.getElementById("js-video").pause(), $("#js-video").css("display", "none")
          } catch (e) {}
          try {
            $("#ShowRoomLive").attr("data", "")
          } catch (e) {}
        }, SRApp.vent.off("showFireworks"), SRApp.vent.on("showFireworks", function () {
          SRApp.view.subViews.canvasView.showFireworks(), GV.fire_se && FU.soundPop("fireworks.mp3", Number($("#config_area .fire_se .se_volume").attr("value")) / 100)
        }), FU.mute_on = function (d) {
          d.set("mute", !0), GV.volume = d.get("volume"), SRApp.vent.trigger("setVolume", 0)
        }, FU.mute_off = function (d) {
          d.set("mute", !1), !GV.volume && (GV.volume = d.get("volume")), d.set("volume", GV.volume), SRApp.vent.trigger("setVolume", GV.volume)
        }, FU.mute = function (d) {
          try {
            clearInterval(GV.mute_ob)
          } catch (e) {}
          GV.mute_ob = setInterval(function () {
            if (SRApp.view.subViews.volumeIconView) {
              try {
                clearInterval(GV.mute_ob)
              } catch (e) {}
              d ? FU.mute_on(SRApp.view.subViews.volumeIconView.model) : FU.mute_off(SRApp.view.subViews.volumeIconView.model)
            }
          }, 100)
        }, FU.setVolume = function (e) {
          var r = document.getElementById("js-video");
          if (SRApp.view && SRApp.view.subViews && SRApp.view.subViews.volumeIconView) try {
            (r = document.getElementById("js-video")).volume = e / 100 > 0 ? e / 100 * 1 : 0, r.muted = SRApp.view.subViews.volumeIconView.model.get("mute");
            var i = r.play();
            if (void 0 === i) return;
            i.then(function () {}).catch(function (e) {
              SRApp.view.subViews.volumeIconView.model.setMute()
            })
          } catch (error) {
            console.log("--- retry volume ---"), setTimeout(function () {
              FU.setVolume(e)
            }, 500)
          } else setTimeout(function () {
            FU.setVolume(e)
          }, 500)
        }, SRApp.vent.off("setVolume"), SRApp.vent.on("setVolume", function (e) {
          FU.setVolume(e)
        }), GV.now_post_li = {}, FU.liveInfo = async function () {
          await $.get(GV.u + "/api/live/live_info?room_id=" + SRApp.store.get("roomId"), function (d) {})
        }, FU.roomStatus = async function () {
          await $.get(GV.u + "/api/room/status?room_url_key=" + GV.room_url_key, function (d) {
            d.is_live || (GV.bckey = d.broadcast_key, GV.room_id = d.room_id)
          })
        }, FU.roomProfile = async function (t) {
          await $.get(GV.u + "/api/room/profile?room_id=" + SRApp.store.get("roomId"), function (d) {
            SRApp.vent.trigger("setWatchNum", d.view_num), t && (GV.room_view_n = d.visit_count, d.visit_count % 100 == 0 && 0 != d.visit_count ? (FU.soundPop("pop.mp3", .1), FU.pop_c("view_num", FU.local_url("/img/login.png"), d.visit_count + "回目の訪問です！")) : FU.pop_c("view_num", FU.local_url("/img/login.png"), $("#broadcast-settings-tab-encoder").length ? "配信回数 " + d.visit_count + " 回" : "訪問回数 " + d.visit_count + " 回"))
          })
        }, FU.eventPage = async function (key, i) {
          await $.get(GV.u + "/event/room_list?event_id=" + key + "&p=" + i, function (d) {
            GV.event_page["p_" + i] = d
          })
        }, FU.eventRankingPoint = async function (key, i) {
          await $.get(GV.u + "/api/room/event_and_support?room_id=" + key, function (d) {
            var r = d.event.ranking;
            GV.event_room_data[i] = {
              point: r.point,
              gap: r.gap,
              rank: r.rank,
              name: GV.event_room_name[key],
              room_id: key,
              room_url_key: GV.event_room_url[i]
            }
          })
        }, FU.roomHtml = async function (t) {
          await $.get(location.href, function (d) {
            var live = JSON.parse($(d).find("#js-live-data").attr("data-json"));
            $("#ranking .title").hasClass("room_point") || ($("#ranking .title").attr("title", "ルーム累計ポイント : " + Number(live.room.popularity_point).toLocaleString() + " pt").addClass("room_point"), GV.room_html_timer = 1e4, GV.room_point = Number(live.room.popularity_point), GV.offlive_n = 0), GV.room_point != Number(live.room.popularity_point) ? ($("#ranking .title").attr("title", "ルーム累計ポイント : " + Number(live.room.popularity_point).toLocaleString() + " pt"), GV.room_html_timer = 3e5, GV.offlive_n = 0) : 3e5 == GV.room_html_timer && (GV.room_html_timer = 5e3), SRApp.store.get("liveId") || GV.offlive_n++, GV.offlive_n >= 60 ? GV.room_html_timer = 6e4 : 1 != GV.url_para.gt && 2 != GV.url_para.gt || GV.live_view_mode || (GV.room_html_timer = 6e4), setTimeout(function () {
              FU.roomHtml()
            }, GV.room_html_timer)
          })
        }, FU.userLiveRank = function () {
          $.get(location.href, function (re) {
            var live = JSON.parse($(re).find("#js-live-data").attr("data-json")),
              d = live.ranking.live_ranking;
            if ($("#user_live_rank_list_box").css("height", $("#room-ranking-list").innerHeight() - 20 + "px"), live.is_live) {
              FU.timeChange(d[0].updated_at);
              $("#user_live_rank_note .reload").attr("title", "前回のリロード : " + GV.now_time_list_2.h + ":" + GV.now_time_list_2.mi + ":" + GV.now_time_list_2.s);
              for (var i = 0, len = d.length; i < 101; i++)
                if (t = $("#user_live_rank_" + (i + 1)), len > i) {
                  var dd = d[i];
                  t.find(".rank_box").show().attr({
                    title: "ユーザーID : " + dd.user.user_id
                  }), t.find(".point").text(dd.point.toLocaleString() + " pt"), t.find(".ava").attr({
                    src: dd.user.avatar_url,
                    title: "アバターID : " + dd.user.avatar_id
                  }), t.find(".name").text(dd.user.name).attr("title", dd.user.name)
                } else t.find(".rank_box").hide()
            }
          })
        }, FU.eventRoom = async function () {
          $("#event_ranking_dialog").remove(), GV.event_next_rank_end = !1, $("#event-detail-dialog .po-rt").after('<section id="event_ranking_dialog"></section>'), $("#event_ranking_dialog").hide().append('<div id="event_ranking_note"><div class="rank">順位</div><div class="name">ルーム名</div><div class="point">ポイント</div><div class="gap">次の順位まで</div></div>').append('<div id="event_ranking_area" class="scroll"></div>').append('<div id="event_next_rank_point">ランク20位まで表示</div>'), $("#event_next_rank_point").show(), $("#event_ranking_area").css("height", $(window).height() - 200 + "px"), $("#event_ranking_button").off(), $("#event_ranking_button").on("click", function () {
            $("#event_ranking_dialog").show()
          }), $(".js-genre-tab").click(function () {
            "event_ranking_button" != $(this).attr("id") && $("#event_ranking_dialog").hide()
          }), GV.event_page = {}, GV.event_room_id = [], GV.event_room_name = {}, GV.event_room_url = [], GV.event_room_data = {};
          for (var id = SRApp.store.attributes.eventData.eventId, i = 1; i < 10; i++) {
            await FU.eventPage(id, i);
            for (var d = GV.event_page["p_" + i], html = d.html, room = $(html).find(".profile-link"), name = $(html).find(".listcardinfo-main-text"), room_url = $(html).find(".room-url"), ii = 0; ii < room.length; ii++) try {
              var room_id = $(room[ii]).attr("href").replace("/room/profile?room_id=", ""),
                room_url_key = $(room_url[2 * ii]).attr("href").replace("/", ""); - 1 == GV.event_room_id.indexOf(room_id) && (GV.event_room_id.push(room_id), GV.event_room_name[room_id] = $(name[ii]).text()), -1 == GV.event_room_url.indexOf(room_url_key) && GV.event_room_url.push(room_url_key)
            } catch (e) {}
            d.next_page || (i = 99)
          }
          for (i = 0; i < 10; i++) try {
            GV.event_room_id[i] && await FU.eventRankingPoint(GV.event_room_id[i], i)
          } catch (e) {}
          $("#event_next_rank_point").off().attr("value", 10), $("#event_next_rank_point").on("click", async function () {
            if (!GV.event_next_load) {
              GV.event_next_load = !0;
              for (var val = Number($("#event_next_rank_point").attr("value")), i = 0; i < 10; i++) try {
                var id = GV.event_room_id[val + i];
                void 0 != id ? await FU.eventRankingPoint(id, val + i) : GV.event_next_rank_end = !0
              } catch (e) {}
              GV.event_next_load = !1, GV.event_next_rank_end ? $("#event_next_rank_point").text("すべてのランキングを表示しました") : $("#event_next_rank_point").attr("value", val + 10).text("ランク" + (val + 20) + "位まで表示する"), FU.eventRankingC()
            }
          }), FU.eventRankingC()
        }, FU.eventRankingC = function () {
          for (var i = 0, len = Object.keys(GV.event_room_data).length; i < len; i++) {
            var rank = i + 1;
            if (!$("#event_rank_box_" + rank).length) {
              var d = GV.event_room_data[String(i)];
              $("#event_ranking_area").append('<div id="event_rank_box_' + rank + '" class="event_rank_box"><div class="rank">' + d.rank + '</div><div class="name">' + d.name + '</div><div class="point">' + d.point.toLocaleString() + ' pt</div><div class="gap">' + (1 == rank ? 0 : d.gap.toLocaleString()) + ' pt</div><img class="link" src="' + FU.local_url("/img/live.png") + '" value="' + d.room_url_key + '"></div>')
            }
          }
          $("#event_ranking_area .link").off(), $("#event_ranking_area .link").on("click", function () {
            var key = $(this).attr("value");
            key && window.open("https://www.showroom-live.com/" + key, "_blank")
          })
        }, FU.currentUser = async function () {
          await $.get(GV.u + "/api/live/current_user?room_id=" + SRApp.store.get("roomId"), function (d) {
            GV.user_data = d;
            var gl = GV.user_data.gift_list.normal;
            GV.free_gift_data || (GV.free_gift_data = {}), SRApp.store.set({
              isLogin: d.is_login,
              avatarImage: d.avatar_url,
              gold: d.gold,
              fanLevel: d.fan_level,
              badge: d.badge,
              badgeType: d.badge_type
            }), SRApp.vent.trigger("setGiftNum", d.gift_list), $("#gold-label").text("Show Gold: " + GV.user_data.gold + " G"), $("#gift_area .show_gold").text("Show Gold: " + GV.user_data.gold + " G"), 1 == d.badge ? (GV.tweet_B = !0, $("#get_icon_area .tweet").addClass("get"), $("#one_click_tweet img").addClass("on")) : $("#get_icon_area .tweet").removeClass("get"), gl[0] && (gl[0].free_num >= 10 || gl[1].free_num >= 10 || gl[2].free_num >= 10 || gl[3].free_num >= 10 || gl[4].free_num >= 10) ? $("#ten_post img").addClass("on") : $("#ten_post img").removeClass("on"), !gl[0] || 0 == gl[0].free_num && 0 == gl[1].free_num && 0 == gl[2].free_num && 0 == gl[3].free_num && 0 == gl[4].free_num ? $("#one_post img").removeClass("on") : $("#one_post img").addClass("on");
            for (var i = 0, h_n = 0, len = gl.length; i < len; i++) {
              if (GV.fg_id_list.indexOf(gl[i].gift_id) >= 0 && gl[i].free_num > h_n && gl[i].free_num < 10) h_n = gl[i].free_num;
              $("#gift_area .free_gift .g_num_" + gl[i].gift_id).text("× " + gl[i].free_num), GV.gift_have_n && (GV.gift_have_n[String(gl[i].gift_id)] = gl[i].free_num), GV.free_gift_data[gl[i].gift_id] = gl[i].free_num
            }

            try {
              $("#gift_area .user_name").text(GV.user_data.name).attr("title", "ユーザーレベル: Lv." + GV.user_data.fan_level + "\n累計ポイント: " + GV.user_data.contribution_point.toLocaleString() + " pt\n次のレベルまで: " + GV.user_data.next_level_point.toLocaleString() + " pt"), $("#gift_area .show_gold").text("Show Gold: " + GV.user_data.gold.toLocaleString() + " G")
            } catch (e) {}
            gl[0] && 0 != h_n ? ($("#rest_post img").addClass("on"), $("#rest_post p").text(h_n)) : ($("#rest_post img").removeClass("on"), $("#rest_post p").text("?"))
          })
        }, FU.onlivs = async function () {
          await $.get(GV.u + "/api/live/onlives?_=1", function (re) {
            GV.onlives = re
          })
        }, FU.giftList = async function () {
          await $.get(GV.u + "/api/live/gift_list?room_id=" + SRApp.store.get("roomId"), function (d) {
            GV.gift_list = d.normal
          })
        }, FU.freeGiftPost = function (p) {
          console.log(p);
          if (p.n < 10) {
            if (GV.now_post_li[p.id]) return void console.log("return");
            GV.now_post_li[p.id] = !0
          }
          $.post(GV.u + "/api/live/gifting_free", "gift_id=" + p.id + "&live_id=" + SRApp.store.get("liveId") + "&num=" + p.n + "&csrf_token=" + SRApp.store.get("csrfToken")).done(function (d) {
            GV.gift_se && SRApp.vent.trigger("playShotSE"), $("#gift_area .g_num_" + d.gift_id).text("× " + d.num), FU.currentUser(), $.each(GV.gift_list, function (k, v) {
              if (v.gift_id == p.id)
                for (var t = {
                    id: p.id,
                    image: GV.gift_u + p.id + "_s.png",
                    image2: "",
                    isFree: !0,
                    isHidden: v.is_hidden,
                    isRemovable: !0,
                    num: d.num,
                    point: v.point,
                    scale: v.scale,
                    type: v.gift_type
                  }, i = 0; i < p.n; i++) SRApp.vent.trigger("throwGifts", {
                  userId: SRApp.store.get("userId"),
                  gift: t,
                  num: 1
                })
            });
            var img = GV.gift_u + p.id + "_s.png",
              msg = "× " + p.n + " (残り" + d.num + "個)";
            FU.pop_c(p.id, img, msg), GV.now_post_li[p.id] = !1
          }).fail(function (e) {
            FU.currentUser(), GV.now_post_li[p.id] = !1, GV.debug && console.log("【E】")
          })
        }, FU.payGiftPost = async function (p) {
          await $.post(GV.u + "/api/live/gifting_point_use", "gift_id=" + p.id + "&live_id=" + SRApp.store.get("liveId") + "&num=" + p.n + "&csrf_token=" + SRApp.store.get("csrfToken") + "&isRemovable=true").done(function (d) {
            for (FU.hash(), GV.gift_se && SRApp.vent.trigger("playShotSE"); Object.keys(GV.suko.gift_log).length > 200;) delete GV.suko.gift_log[Object.keys(GV.suko.gift_log)[0]];
            GV.suko.gift_log[SRApp.store.get("liveId") + "_" + p.id] = GV.suko.gift_log[SRApp.store.get("liveId") + "_" + p.id] ? Number(GV.suko.gift_log[SRApp.store.get("liveId") + "_" + p.id]) + Number(p.n) : Number(p.n), d.n && SRApp.vent.trigger("addGiftLog", {
              avatarImage: SRApp.store.get("avatarImage"),
              screenId: SRApp.store.get("screenId"),
              giftImage: GV.gift_u + p.id + "_s.png",
              num: d.n
            }), FU.save("suko", GV.suko), $.each(GV.gift_list, function (k, v) {
              if (v.gift_id == p.id)
                for (var t = {
                    id: p.id,
                    image: GV.gift_u + p.id + "_m.png",
                    image2: "",
                    isFree: !0,
                    isHidden: v.is_hidden,
                    isRemovable: !0,
                    num: p.n,
                    point: v.point,
                    scale: v.scale,
                    type: v.gift_type
                  }, i = 0; i < p.n; i++) SRApp.vent.trigger("throwGifts", {
                  userId: SRApp.store.get("userId"),
                  gift: t,
                  num: 10
                })
            });
            var img = GV.gift_u + p.id + "_s.png",
              msg = "× " + p.n + " (合計: " + GV.suko.gift_log[SRApp.store.get("liveId") + "_" + p.id] + " 個)";
            FU.pop_c(p.id, img, msg)
          }).fail(function (e) {
            FU.pop_c("pay_gift", FU.local_url("/img/stop.png"), "有料ギフト投げ失敗", 1e4), GV.debug && console.log("【E】")
          })
        }, FU.commentPost = function (c, t) {
          if (0 != SRApp.store.get("liveId") && SRApp.store.get("isLive"))
            if (!t && Number(c) > 50) FU.autoCountOff();
            else {
              if (!t && GV.auto_count_c && GV.auto_count_p) {
                try {
                  clearInterval(GV.auto_count_re)
                } catch (e) {}
                return GV.comm_n >= 50 ? void FU.autoCountOff() : ($("#auto_count .auto_count_text").text(GV.comm_n), void(GV.auto_count_re = setInterval(function () {
                  if (!GV.auto_count_p) try {
                    clearInterval(GV.auto_count_re), !GV.re_count_t && GV.auto_count_c && FU.commentPost(GV.comm_n, !1)
                  } catch (e) {}
                }, 1e3)))
              }
              if (50 == GV.comm_n && !t) c = FU.countEndComm();
              $.post("https://www.showroom-live.com/api/live/post_live_comment", {
                live_id: SRApp.store.get("liveId"),
                comment: String(c),
                is_delay: 0,
                csrf_token: SRApp.store.get("csrfToken")
              }).done(function (d) {
                GV.last_comm = d.comment, t && (GV.comm_post = !1, $("#video_con_box button").removeClass("sending"), $("#js-room-comment button").removeClass("sending")), SRApp.vent.trigger("showOwnComment", {
                  ok: 1,
                  comment: String(d.comment),
                  room_id: d.room_id
                }), GV.comm_n++, GV.re_count = 1e3, GV.comm_n > 50 ? (FU.autoCountOff(), GV.count_end_se && !t && FU.soundPop("count.mp3", Number($("#config_area .count_end_se .se_volume").attr("value")) / 100)) : $("#auto_count").removeClass("end").find("p").text(GV.comm_n - 1), FU.save("count_log_" + SRApp.store.get("liveId"), {
                  n: GV.comm_n,
                  t: GV.now_unix_time
                }), setTimeout(function () {
                  GV.auto_count_c && !t && FU.commentPost(GV.comm_n, !1)
                }, GV.comm_post ? 3e3 : 1800)
              }).fail(function (e) {
                t && setTimeout(function () {
                  FU.commentPost(c, t)
                }, 200), t || (GV.re_count_t = !0, GV.re_count > 300 && (GV.re_count -= 100), setTimeout(function () {
                  GV.re_count_t = !1, FU.commentPost(GV.comm_n, t)
                }, GV.comm_post ? 3e3 : GV.re_count))
              })
            }
        }, FU.roomfollow = function (t) {
          $.post(GV.u + "/api/room/follow", {
            room_id: 152921,
            flag: 1,
            csrf_token: SRApp.store.get("csrfToken")
          }).done(function (d) {
            FU.pop_c("follow", FU.local_url("/img/heart.png"), "フォローしました。")
          })
          }, FU.dom_C = function () {
          if (GV.debug && console.log("---dom---"), FU.hash(), $("#js-room-head-other-select-list").append('<li id="suko_config_show"><a>すこツー設定</a></li>'), $("<div>", {
              id: "suko_area"
            }).appendTo("body"), $("#suko_area").append($(GV.dom_area.join(""))), $("#config_area").append($(GV.dom_config.join(""))), $("#icon_area").append($(GV.dom_icon.join(""))), $("#gift_area").append($(GV.dom_gift_box.join(""))), $("#get_log_area").append($(GV.dom_get_log.join(""))), $("#label-start-time").after($(GV.dom_time.join(""))), $("#js-room-section").append($(GV.dom_video.join(""))), $("#get_icon_area").append($(GV.dom_get_icon.join(""))), $("<div>", {
              id: "info_area"
            }).appendTo("body"), $("<div>", {
              id: "popup_area_posi",
              text: "ポップアップ位置"
            }).appendTo("#popup_area"), $("#now_time").css({
              display: "inline-block"
            }), $("#update_time").css({
              display: "inline-block"
            }), $("#get_icon_area .tweet").attr("src", FU.local_url("/img/twitter_b.png")), $("#get_icon_area .view").attr("src", FU.local_url("/img/view_b.png")), !$("#user_live_rank_show").length) {
            $("#ranking").append('<img id="user_live_rank_show" src="' + FU.local_url("/img/user.png") + '">'), $("#ranking-content-region").append('<div id="user_live_rank_list"></div>'), $("#user_live_rank_list").append('<div id="user_live_rank_note"></div>'), $("#user_live_rank_note").append('<div class="note">※リアルタイムのポイントではありません。<br>※カウントポイントは含まれません。</div>'), $("#user_live_rank_note").append('<img class="reload" src="' + FU.local_url("/img/reload.png") + '">'), $("#user_live_rank_note .reload").off("click"), $("#user_live_rank_note .reload").on("click", function () {
              GV.user_live_rank_load || (FU.userLiveRank(), GV.user_live_rank_load = !0, setTimeout(function () {
                GV.user_live_rank_load = !1
              }, 3e3))
            }), $("#user_live_rank_list").append('<div id="user_live_rank_list_box" class="scroll"></div>');
            for (var i = 1; i < 101; i++) $("#user_live_rank_list_box").append('<div id="user_live_rank_' + i + '"><div class="rank_box"><div class="rank">' + i + '</div><div class="point"></div><img class="ava"><div class="name"></div></div></div>');
            $("#user_live_rank_show").off(), $("#user_live_rank_show").on("click", function () {
              $("#user_live_rank_list").is(":visible") ? ($(".room_point").text("累計ランキング"), $("#user_live_rank_list").hide(), $("#room-ranking-list").show(), $(this).removeClass("on")) : ($(".room_point").text("ライブランキング"), $(this).addClass("on"), $("#user_live_rank_list").show(), $("#room-ranking-list").hide(), GV.user_live_rank_load || (FU.userLiveRank(), GV.user_live_rank_load = !0, setTimeout(function () {
                GV.user_live_rank_load = !1
              }, 3e3)))
            }), FU.userLiveRank()
          }
          $(".suko_area,#comment-log,#get_icon_area").mouseover(function (e) {}).mouseout(function (e) {
            FU.hash(), GV.suko.live_window[$(this).attr("id")] = {
              top: $(this).css("top"),
              left: $(this).css("left")
            }, "gift_area" == e.target.id && (GV.suko.live_window.gift_area_size = $("#gift_area").css("width")), "get_log_area" == e.target.id && (GV.suko.live_window.get_log_area_size = $("#get_log_area").css("width")), "popup_area" == e.target.id && (GV.suko.live_window.popup_area_size = $("#popup_area").css("height")), FU.save("suko", GV.suko)
          }), $("#gift_area,#get_log_area").mouseover(function (e) {
            $(this).css("z-index", 55)
          }).mouseout(function (e) {
            $(this).css("z-index", 50)
          }), GV.posi_li = {
            icon_area: {
              top: "calc(100% - 100px)",
              left: "calc(10px)"
            },
            gift_area: {
              top: "calc(100% - 400px)",
              left: "calc(280px)"
            },
            get_log_area: {
              top: "calc(100% - 320px)",
              left: "calc(10px)"
            },
            popup_area: {
              top: "calc(100% - 600px)",
              left: "calc(10px)"
            },
            "comment-log": {
              top: "calc(100px)",
              left: "calc(100% - 310px)"
            },
            get_icon_area: {
              top: "calc(50px)",
              left: "calc(315px)"
            }
          }, $.each(GV.posi_li, function (k, v) {
            var top = GV.suko.live_window[k] ? GV.suko.live_window[k].top : v.top,
              left = GV.suko.live_window[k] ? GV.suko.live_window[k].left : v.left;
            $("#" + k).css({
              top: top,
              left: left
            })
          }), $("#gift_area").css("width", GV.suko.live_window.gift_area_size), $("#get_log_area").css("width", GV.suko.live_window.get_log_area_size), $("#popup_area").css("height", GV.suko.live_window.popup_area_size), $("#popup_area").css("height", GV.suko.live_window.popup_area_size), $("#icon_area").draggable({
            handle: "#icon_button",
            distance: 10
          }), $("#gift_area").draggable({
            zIndex: 51
          }).resizable({
            minWidth: 190,
            maxWidth: 330,
            handles: "w,e"
          }), $("#get_log_area").draggable({
            zIndex: 51
          }).resizable({
            minWidth: 180,
            maxWidth: 330,
            handles: "w,e"
          }), $("#popup_area").draggable({
            distance: 10
          }).resizable({
            minHeight: 200,
            maxHeight: 400,
            handles: "s,n"
          }), $("#get_icon_area").draggable({
            distance: 10
          }), $("#js-room-comment-wrapper").css({
            width: GV.suko.live_window.comment_log_size + 65 + "px"
          }), $("#js-chat-input-comment").css({
            width: GV.suko.live_window.comment_log_size + "px"
          }), $("#js-room-comment").css({
            "white-space": "nowrap"
          }), $("#js-room-comment-wrapper").resizable({
            minWidth: 340,
            minHeight: 50,
            maxWidth: 700,
            maxHeight: 50,
            handles: "se",
            resize: function (e, ui) {
              var w = ui.size.width - 320 + 245;
              $("#js-chat-input-comment").css({
                width: w + "px"
              }), GV.suko.live_window.comment_log_size = w, FU.save("suko", GV.suko)
            }
          }), $("#icon_area,#gift_area,#get_log_area,#popup_area").css({
            position: "absolute"
          }), $("#icon_area #icon_button").on("mouseup", function () {
            GV.mmove10 || ($("#icon_area .icon_list").is(":visible") ? ($("#icon_area .icon_list").css("display", "none"), $(this).addClass("on")) : ($("#icon_area .icon_list").css("display", "inline-block"), $(this).removeClass("on")))
          }), FU.live_reset = function () {
            $("#icon_area").empty(), $("#get_log_area").empty(), $("#gift_area").empty()
          }
        }, FU.icon_C = async function () {
          GV.debug && console.log("---icon---"), SRApp.store.get("isOwner") ? $("#icon_area").hide() : (SRApp.store.get("isOfficial") ? $.each(GV.icon_set_star, function (k, v) {
            $("#" + k + " img").attr("src", FU.local_url("/img/" + v + ".png"))
          }) : $.each(GV.icon_set_seed, function (k, v) {
            $("#" + k + " img").attr("src", FU.local_url("/img/" + v + ".png"))
          }), await FU.giftList(), GV.fg_list = [], GV.hide_gift = [1601, 14], $.each(GV.gift_list, function (k, v) {
            v.free && 1601 != v.gift_id && GV.fg_list.push(v.gift_id), v.free || 10 != v.point || GV.hide_gift.push(v.gift_id)
          }), $("#icon_area .fg_post").off(), $("#icon_area .fg_post").on("click", function () {
            var n = $(this).attr("name"),
              li = SRApp.store.get("isOfficial") ? [1, 1001, 1002, 1003, 2] : [1501, 1502, 1503, 1504, 1505];
            if (0 != n)
              for (var i = 0, len = li.length; i < len; i++) FU.freeGiftPost({
                id: li[i],
                n: n
              });
            else if (1 == n)
              for (i = 0, len = li.length; i < len; i++) FU.freeGiftPost({
                id: li[i],
                n: 1
              });
            else
              for (i = 0, len = li.length; i < len; i++) GV.free_gift_data[li[i]] < 10 && FU.freeGiftPost({
                id: li[i],
                n: GV.free_gift_data[li[i]]
              })
          }), FU.commentText = function () {
            FU.auto_count_re();
            var c = String($("#js-chat-input-comment").val());
            c.length > 50 || 0 == c.length || (GV.last_comm != c ? GV.comm_post ? FU.pop_c("comm_wait", FU.local_url("/img/comment.png"), "コメント送信待ち") : (GV.comm_post = !0, $("#js-chat-input-comment").val(""), $("#con_comm_input").val(""), $("#video_con_box button").addClass("sending"), $("#js-room-comment button").addClass("sending"), FU.commentPost(c, !0)) : FU.pop_c("comm_booking", FU.local_url("/img/comment.png"), "連続同一コメント", 7e3))
          }, $("#js-room-comment button").off(), $("#js-room-comment button").on("click", async function () {
            FU.commentText()
          }), $("#js-chat-input-comment").keydown(function (e) {
            if ("js-chat-input-comment" == $(":focus").attr("id") && (e.which && 13 === e.which || e.keyCode && 13 === e.keyCode)) return FU.commentText(), !1
          }), GV.auto_count_c = !1, FU.count_num(), FU.autoCountOn = function () {
            GV.auto_count_c = !0, GV.re_count = 1e3, GV.comm_n > 50 && (GV.comm_n = GV.count_s_n ? 1 : 0), $("#auto_count .icon").addClass("on").removeClass("off"), GV.count_end_comm_s && $("#auto_count .icon").addClass("etc"), GV.comm_n <= 50 && FU.commentPost(GV.comm_n, !1)
          }, FU.autoCountOff = function () {
            GV.auto_count_c = !1, FU.auto_count_re(), $("#auto_count .icon").addClass("off").removeClass("on").removeClass("etc"), GV.comm_n > 50 && $("#auto_count").addClass("end").find("p").text("END")
          }, $("#auto_count").off(), $("#auto_count").mousedown(function () {
            var t = 0;
            GV.count_end_comm_s = !1, GV.auto_count_send_t = setInterval(function () {
              if (++t >= 10) {
                GV.auto_count_c || ($("#auto_count img").addClass("set"), GV.count_end_comm_s = !0, setTimeout(function () {
                  $("#auto_count img").removeClass("set")
                }, 3e3));
                try {
                  clearInterval(GV.auto_count_send_t)
                } catch (e) {}
              }
            }, 100)
          }).mouseup(function () {
            $("#auto_count img").removeClass("set");
            try {
              clearInterval(GV.auto_count_send_t)
            } catch (e) {}
            GV.auto_count_c ? FU.autoCountOff() : FU.autoCountOn()
          }), FU.countEndComm = function () {
            var c = !1;
            if (!GV.count_end_comm_s) {
              if (GV.count_end_comm_room && GV.suko.live_config["count_end_comm_room_list_" + SRApp.store.get("roomId")]) c = GV.suko.live_config["count_end_comm_room_list_" + SRApp.store.get("roomId")];
              else if (GV.count_end_comm && GV.suko.live_config.count_end_comm_list) c = GV.suko.live_config.count_end_comm_list;
              if ("@" == c || "＠" == c) c = !1
            }
            return c && c.trim().length > 0 ? c : 50
          }, GV.vbt_n = 30, GV.vb_on = !1, GV.suko.view_bonus_room || (GV.suko.view_bonus_room = []), setInterval(function () {
            if (SRApp.store.get("liveId")) {
              if (GV.vbt_n <= 0 && (GV.vbt_n = 29, SRApp.store.get("liveId") && (GV.vb_on || GV.suko.view_bonus_room.indexOf(SRApp.store.get("liveId")) >= 0) && FU.viewBonus()), SRApp.store.get("isOfficial")) var l = GV.star_vb_log;
              else l = GV.seed_vb_log;
              l[String(SRApp.store.get("liveId"))] ? $("#view_bonus").addClass("end").find("p").text("GET") : GV.vb_on ? $("#view_bonus .view_bonus_text").text(GV.vbt_n) : $("#view_bonus .view_bonus_text").text("")
            } else $("#view_bonus p").text(GV.vb_on ? "×" : "");
            if (GV.vbt_n--, 0 == Math.abs(GV.vbt_n % 20)) {
              0 != SRApp.store.get("liveId") && (FU.roomProfile(!1), FU.currentUser(), SRApp.vent.trigger("fetchAvatar"), SRApp.vent.trigger("fetchEventAndSupport"));
              try {
                FU.getLogText()
              } catch (e) {}
            }
          }, 1e3), FU.viewBonusOn = function () {
            $("#view_bonus").find(".icon").addClass("on").removeClass("off"), $("#view_bonus img").addClass("on").removeClass("off").attr("src", FU.local_url("/img/view_bonus_1.png")), GV.vbt_n = 30, GV.vbm = !0, GV.vb_on = !0
          }, FU.viewBonusOff = function () {
            $("#view_bonus").find(".icon").addClass("off").removeClass("on"), $("#view_bonus p").text(""), $("#view_bonus img").addClass("off").removeClass("on").attr("src", FU.local_url("/img/view_bonus_2.png")), GV.vb_on = !1
          }, $("#view_bonus").off("click"), $("#view_bonus").on("click", function () {
            FU.hash(), $(this).find(".icon").hasClass("off") ? (FU.viewBonusOn(), GV.suko.live_config.view_bonus = !0, SRApp.store.get("isOfficial") ? GV.suko.live_config.view_bonus_star = !0 : GV.suko.live_config.view_bonus_seed = !0) : (FU.viewBonusOff(), GV.suko.live_config.view_bonus = !1, SRApp.store.get("isOfficial") ? GV.suko.live_config.view_bonus_star = !1 : GV.suko.live_config.view_bonus_seed = !1), FU.save("suko", GV.suko)
          }), FU.viewBonus = function () {
            GV.vbt_n = 29, FU.hash(), $.ajax({
              url: GV.u + "/api/live/polling?room_id=" + SRApp.store.get("roomId"),
              type: "GET",
              dataType: "json"
            }).then(function (d) {
              if (FU.save("suko", GV.suko), d.live_watch_incentive.hasOwnProperty("ok")) {
                if (SRApp.store.get("isOfficial")) {
                  for (GV.star_vb_log = FU.load("star_vb") ? FU.load("star_vb") : {}; Object.keys(GV.star_vb_log).length > 200;) delete GV.star_vb_log[Object.keys(GV.star_vb_log)[0]];
                  GV.star_vb_log[String(SRApp.store.get("liveId"))] = GV.now_unix_time_c, FU.save("star_vb", GV.star_vb_log)
                } else {
                  for (GV.seed_vb_log = FU.load("seed_vb") ? FU.load("seed_vb") : {}; Object.keys(GV.seed_vb_log).length > 200;) delete GV.seed_vb_log[Object.keys(GV.seed_vb_log)[0]];
                  GV.seed_vb_log[String(SRApp.store.get("liveId"))] = GV.now_unix_time_c, FU.save("seed_vb", GV.seed_vb_log)
                }
                localStorage.setItem("log_save", "1"), setTimeout(function () {
                  GV.url_para.time && 999 != GV.url_para.time && (GV.live_view_mode || window.close())
                }, 3e3), $("#get_icon_area .view").addClass("get");
                try {
                  FU.getLogText()
                } catch (e) {}
                FU.view_bonus_room()
              } else if (GV.vbm && !d.live_watch_incentive.message) {
                GV.vbm = !1;
                var msg = "視聴ボーナスを取得できませんでした。";
                try {
                  if (SRApp.store.get("isOfficial")) var l = GV.star_log,
                    ty = "star";
                  else l = GV.seed_log, ty = "seed";
                  if (l.re_1 > GV.now_unix_time_c) {
                    msg = "無料ギフトの獲得は" + GV[ty + "_re_get_time"] + "まで制限されています";
                    if (SRApp.store.get("isOfficial")) {
                      GV.suko.view_bonus_star = false;
                    } else {
                      GV.suko.view_bonus_seed = false;
                    }
                    FU.save("suko", GV.suko);
                    if (GV.live_view_mode) {
                      console.log('live_view_mode');
                      window.close();
                      
                    }
                  }
                } catch (e) {}
                try {
                  if (SRApp.store.get("isOfficial")) l = GV.star_vb_log;
                  else l = GV.seed_vb_log;
                  if (l[String(SRApp.store.get("liveId"))]) msg = !1
                } catch (e) {}
                msg && SRApp.vent.trigger("showErrorToast", msg)
              }
              SRApp.vent.trigger("setWatchNum", d.online_user_num), d.live_watch_incentive && (d.live_watch_incentive.hasOwnProperty("ok") ? SRApp.vent.trigger("showWatchBonus", d.toast) : d.live_watch_incentive.hasOwnProperty("error") && SRApp.vent.trigger("showErrorToast", d.live_watch_incentive.message)), FU.roomProfile(!1), FU.currentUser(), SRApp.vent.trigger("fetchAvatar"), SRApp.vent.trigger("fetchEventAndSupport");
              try {
                if (d.live_watch_incentive.message.match("無料")) {
                  var e = d.live_watch_incentive.message.replace(/[^0-9]/g, "");
                  e = 1e3 * Number(FU.unixChange({
                    ho: e.slice(0, 2),
                    mi: e.slice(2, 4)
                  }));
                  if (GV.now_unix_time_c > e + 12e4) e = e + 864e5;
                  SRApp.store.get("isOfficial") ? (GV.star_re_log = FU.load("star_re") ? FU.load("star_re") : {}, GV.star_re_log[String(e)] = GV.now_unix_time_c, FU.save("star_re", GV.star_re_log)) : (GV.seed_re_log = FU.load("seed_re") ? FU.load("seed_re") : {}, GV.seed_re_log[String(e)] = GV.now_unix_time_c, FU.save("seed_re", GV.seed_re_log)), localStorage.setItem("log_save", "1")
                }
              } catch (e) {}
            })
          }, FU.view_bonus_room = function () {
            for (GV.suko.view_bonus_room || (GV.suko.view_bonus_room = []), GV.suko.view_bonus_room.push(SRApp.store.get("liveId")); GV.suko.view_bonus_room.length > 200;) GV.suko.view_bonus_room.shift();
            FU.save("suko", GV.suko)
          }, $("#config_show,#suko_config_show").on("click", function () {
            $("#config_area").hasClass("hide") ? $("#config_area").addClass("show").removeClass("hide") : ($(".config_box").css("display", "none"), $("#config_area .menu").removeClass("menu_on"), $("#config_area").addClass("hide").removeClass("show"))
          }), $("#config_area .close").on("click", function () {
            $(".config_box").css("display", "none"), $("#config_area .menu").removeClass("menu_on"), $("#config_area").addClass("hide").removeClass("show")
          }), FU.view_bonus_switch = function () {
            GV.suko.live_config.view_bonus_sepa ? SRApp.store.get("isOfficial") ? GV.suko.live_config.view_bonus_star ? FU.viewBonusOn() : FU.viewBonusOff() : GV.suko.live_config.view_bonus_seed ? FU.viewBonusOn() : FU.viewBonusOff() : GV.suko.live_config.view_bonus ? FU.viewBonusOn() : FU.viewBonusOff(), FU.versionUpCheck()
          }, FU.bonusGetMode = function () {
            FU.viewBonusOn(), FU.video_stop(), SRApp.vent.trigger("hideCanvas"), FU.mute(!0), $("body").append('<div id="live_view_mode">通常視聴モードに変更</div>"'), $("#live_view_mode").on("click", function () {
              $("#live_view_mode").hide(), GV.live_view_mode = !0, SRApp.vent.trigger("showCanvas"), FU.video_play();
              var s1 = void 0 == GV.suko.live_config["start_mute_room_" + SRApp.store.get("roomId")] ? 0 : GV.suko.live_config["start_mute_room_" + SRApp.store.get("roomId")];
              FU.configList.start_mute_room(s1);
              var s2 = void 0 == GV.suko.live_config.start_mute ? 1 : GV.suko.live_config.start_mute;
              FU.configList.start_mute(s2)
            }), 999 != GV.url_para.time && (setTimeout(function () {
              setTimeout(function () {
                GV.live_view_mode || window.close()
              }, 3e3)
            }, 1e3 * Number(GV.url_para.time)), setTimeout(function () {
              setTimeout(function () {
                GV.live_view_mode || window.close()
              }, 5e3)
            }, 1e3 * Number(GV.url_para.time)))
          }, FU.freeGiftMax = async function () {
            if (GV.suko.live_config.auto_block) {
              await FU.currentUser();
              for (var d = GV.user_data.gift_list.normal, c = !0, i = 0; i < 5; i++)
                if (99 != d[i].free_num) {
                  c = !1;
                  console.log(d[i].gift_id + ' : ' + d[i].free_num);
                }
              
              if (c) {
                console.log('マックスじゃないギフトはありません');
                (FU.viewBonusOff(), GV.pop_n = GV.pop_n ? GV.pop_n + 1 : 0, FU.pop_c(GV.pop_n, FU.local_url("/img/view_bonus_2.png"), "自動視聴ボ ブロック"));
                FU.GiftMax = 1;
              } else {
                console.log('マックスじゃないギフトありました');
                if (!$("#view_bonus").find(".icon").hasClass("on")) {FU.viewBonusOn();}
                GV.pop_n = GV.pop_n ? GV.pop_n + 1 : 0;
                FU.pop_c(GV.pop_n, FU.local_url("/img/view_bonus_2.png"), "自動視聴ボ ブロック 解除");
              }
            }
          }, 1 == GV.url_para.gt || 2 == GV.url_para.gt ? FU.bonusGetMode() : (FU.view_bonus_switch(), setTimeout(function () {
            0 != SRApp.store.get("liveId") && FU.freeGiftMax()
          }, 1e3)))
        }, FU.giftBox_C = async function () {
          GV.suko.live_config.gift_box_stop || (GV.debug && console.log("---gift box---"), FU.gb_show = function () {
            $("#gift_box_show").find(".icon").addClass("on").removeClass("off"), $("#gift_area").css("display", "block")
          }, FU.gb_hide = function () {
            $("#gift_box_show").find(".icon").addClass("off").removeClass("on"), $("#gift_area").css("display", "none")
          }, $("#gift_box_show").off("click"), $("#gift_box_show").on("click", function () {
            if (FU.hash(), $(this).find(".icon").hasClass("off")) {
              var v = !0;
              FU.gb_show()
            } else {
              v = !1;
              FU.gb_hide()
            }
            FU.resize(), GV.suko.live_config.gift_box_show = v, FU.save("suko", GV.suko)
          }), FU.userData = async function () {
            0 != SRApp.store.get("liveId") ? await FU.currentUser() : setTimeout(function () {
              FU.userData()
            }, 1e4)
          }, FU.giftImg_C = async function () {
            var tar = $("#gift_area");
            tar.find(".free_gift_box").empty(), tar.find(".pay_gift_box").empty();
            var fg = [],
              pg = [],
              rg = [];
            GV.f_gift = [1601], GV.hi_pay_gift = [], GV.hi_pay_gift_p = {}, GV.gift_have_n = {}, await FU.giftList(), $.each(GV.gift_list, function (k, v) {
              if (v.free) GV.f_gift.push(v.gift_id), fg.push('<div class="free_gift"><img src="' + v.image + '" class="' + v.gift_id + '" name="' + v.gift_id + '"><p class="g_num_' + v.gift_id + '"></p></div>');
              else if (v.free) rg.push('<div class="free_gift"><img src="' + v.image + '" class="g_num_' + v.gift_id + '" name="' + v.gift_id + '"></div>');
              else {
                if (v.point >= 500 && (GV.hi_pay_gift.push(v.gift_id), GV.hi_pay_gift_p[v.gift_id] = v.point), 0 != v.dialog_id) var anime_gift = '<img class="anime_gift" src="/assets/img/gift/icons/1.png">';
                else anime_gift = "";
                pg.push('<div class="pay_gift"><img class="gift_img" src="' + v.image + '" name="' + v.gift_id + '" value="' + v.point + '" title="' + v.point + ' G">' + anime_gift + "</div>")
              }
              4 == v.gift_id && (GV.is_daruma = !0)
            }), GV.is_daruma && pg.push('<div class="pay_gift r_daruma"><img class="gift_img" src="' + FU.local_url("/img/rainbow_daruma.png") + '" name="999" value="130" title="130 G (5種×10個)"></div>'), $("#gift_area .free_gift_box .free_gift").length || $("#gift_area .free_gift_box").append($(fg.join(""))), $("#gift_area .pay_gift_box .pay_gift").length || ($("#gift_area .pay_gift_box").append($(pg.join(""))), $("#gift_area .pay_gift_box").append($(rg.join("")))), FU.userData(), $("#gift_area .free_gift_box img").off(), $("#gift_area .free_gift_box img").on("click", function () {
              console.log($(this).attr("name"));
              FU.freeGiftPost({
                id: $(this).attr("name"),
                n: 10
              })
            }), $("#gift_area .pay_gift_box img").off(), $("#gift_area .pay_gift_box img").on("click", async function () {
              if (FU.hash(), 999 != Number($(this).attr("name"))) {
                if (-1 != GV.hi_pay_gift.indexOf(Number($(this).attr("name")))) {
                  var p = GV.hi_pay_gift_p[$(this).attr("name")];
                  GV.giftPostDialog_t && GV.giftPostDialog_t >= GV.now_unix_time ? FU.payGiftPost({
                    id: $(this).attr("name"),
                    n: 10
                  }) : FU.giftPostDialog({
                    html: "消費SG : " + p.toLocaleString() + " × 10 = " + (10 * p).toLocaleString() + ' SG<p class="info">(下段ボタン:指定時間ポップアップ非表示)</p>',
                    fd: {
                      id: $(this).attr("name"),
                      n: 10
                    }
                  })
                } else await FU.payGiftPost({
                  id: $(this).attr("name"),
                  n: 10
                });
                await FU.currentUser()
              } else {
                for (var dli = [4, 1101, 1102, 1103, 1104], i = 0; i < 5; i++) await FU.payGiftPost({
                  id: dli[i],
                  n: 10
                });
                await FU.currentUser()
              }
            }), $("#gift_area .pay_gift_box img,#gift_area .free_gift_box img").off("contextmenu"), $("#gift_area .pay_gift_box img,#gift_area .free_gift_box img").on("contextmenu", function (e) {
              if ($("#onlive_open img").removeClass("on"), 999 != Number($(this).attr("name"))) {
                $("#gift_area .pay_gift,#gift_area .free_gift").removeClass("on"), $(this).parent().addClass("on"), $("#context_box").show().css({
                  top: event.clientY + "px",
                  left: event.clientX + "px"
                }), $("#context_box .context_in_box").empty().hide(), $("#context_box .gift").show(), $("#context_box .gift").append($(GV.dom_context_gift.join(""))), $("#context_box").attr("name", $(this).attr("name"));
                var free = !1;
                if (-1 != GV.f_gift.indexOf(Number($(this).attr("name")))) free = !0;
                var hi_pay = !1;
                if (-1 != GV.hi_pay_gift.indexOf(Number($(this).attr("name")))) hi_pay = !0;
                return (free || hi_pay) && $("#context_box .gift_num .pay").remove(), $("#context_box .start").off(), $("#context_box .start").on("click", async function () {
                  var n = $("#context_box .gift_num").val(),
                    id = $("#context_box").attr("name");
                  if (FU.hash(), free) FU.freeGiftPost({
                    id: id,
                    n: n
                  });
                  else {
                    if (n < 10) await FU.payGiftPost({
                      id: id,
                      n: n
                    });
                    else if (!GV.auto_gp) {
                      GV.auto_gp = !0;
                      for (var i = 0; i < n / 10; i++) GV.auto_gp && await FU.payGiftPost({
                        id: id,
                        n: 10
                      })
                    }
                    await FU.currentUser(), GV.auto_gp = !1, setTimeout(function () {
                      var img = GV.gift_u + id + "_s.png",
                        msg = "合計: " + GV.suko.gift_log[SRApp.store.get("liveId") + "_" + id] + " 個 (※実際に投げた数と表示が違うことがあります。)";
                      FU.pop_c(id, img, msg)
                    }, 2e3)
                  }
                }), $("#context_box .stop").off(), $("#context_box .stop").on("click", function () {
                  GV.auto_gp = !1
                }), $("body").off(), $("body").on("click", function (e) {
                  $(e.target).closest("#context_box").length || ($("#context_box").hide(), $("#gift_area .pay_gift,#gift_area .free_gift").removeClass("on"))
                }), $("#context_box .context_close").on("click", function () {
                  $("#context_box .context_in_box").empty().hide()
                }), !1
              }
            })
          }, FU.resize = function () {
            $(".free_gift p").css("font-size", $(".free_gift").innerWidth() / 3), $("#gift_area .pay_gift_box").css("height", .7 * $("#gift_area").innerWidth() + "px"), $("#get_log_area p").css("font-size", $("#get_log_area").innerWidth() / 23), $(".g_num_1601").css("height", $(".free_gift .g_num_1").height() + "px");
            var t = $(".g_num_1601").text();
            if (t.length > 4) {
              var s = parseInt($(".g_num_1601").css("font-size"));
              6 == t.length && $(".g_num_1601").css({
                "font-size": .8 * s + "px",
                margin: "-6px 0 0 0"
              }), 7 == t.length && $(".g_num_1601").css({
                "font-size": .5 * s + "px",
                margin: "-6px 0 0 0"
              })
            }
          }, $("#gift_area,#context_box .gift").on({
            mouseenter: function () {
              $("#gift_area .mini").stop(!1, !0).show()
            },
            mouseleave: function () {
              GV.gift_box_mini && $("#gift_area .mini").slideUp(0)
            }
          }), FU.giftImg_C(), GV.suko.live_config.gift_box_show && FU.gb_show(), $(window).off("load resize"), $(window).on("load resize", function () {
            FU.resize()
          }), setTimeout(function () {
            FU.resize()
          }, 2e3), setTimeout(function () {
            FU.resize()
          }, 5e3))
        }, FU.getLogBox_C = async function () {
          GV.suko.live_config.get_log_stop || (GV.debug && console.log("---get log---"), FU.gl_show = function () {
            $("#get_log_show").find(".icon").addClass("on").removeClass("off"), $("#get_log_area").css("display", "block")
          }, FU.gl_hide = function () {
            $("#get_log_show").find(".icon").addClass("off").removeClass("on"), $("#get_log_area").css("display", "none")
          }, $("#get_log_show").off("click"), $("#get_log_show").on("click", function () {
            if (FU.hash(), $(this).find(".icon").hasClass("off")) {
              var v = !0;
              FU.gl_show()
            } else {
              v = !1;
              FU.gl_hide()
            }
            FU.resize(), GV.suko.live_config.get_log_box_show = v, FU.save("suko", GV.suko)
          }), FU.getLogText = function () {
            $("#get_log_area .log").empty(), GV.star_get_log = [], GV.seed_get_log = [], GV.suko_get_log = {}, FU.log();
            for (var i = 0; i < 2; i++) {
              if (0 == i ? ($.each(GV.star_tb_log, function (k, v) {
                  GV.star_get_log.push({
                    id: k,
                    at: Number(v),
                    type: "tw"
                  })
                }), $.each(GV.star_vb_log, function (k, v) {
                  GV.star_get_log.push({
                    id: k,
                    at: Number(v),
                    type: "vi"
                  })
                }), $.each(GV.star_re_log, function (k, v) {
                  GV.star_get_log.push({
                    id: k,
                    at: Number(k),
                    type: "re"
                  })
                }), GV.star_get_log.sort((a, b) => a.at < b.at ? -1 : a.at > b.at ? 1 : 0)) : ($.each(GV.seed_tb_log, function (k, v) {
                  GV.seed_get_log.push({
                    id: k,
                    at: Number(v),
                    type: "tw"
                  })
                }), $.each(GV.seed_vb_log, function (k, v) {
                  GV.seed_get_log.push({
                    id: k,
                    at: Number(v),
                    type: "vi"
                  })
                }), $.each(GV.seed_re_log, function (k, v) {
                  GV.seed_get_log.push({
                    id: k,
                    at: Number(k),
                    type: "re"
                  })
                }), GV.seed_get_log.sort((a, b) => a.at < b.at ? -1 : a.at > b.at ? 1 : 0)), GV.vi_n = 0, GV.re_1 = 0, GV.re_2 = 0, GV.re_b = !1, GV.ti = "", 0 == i) var type = "star",
                li = GV.star_get_log;
              else type = "seed", li = GV.seed_get_log;
              for (var ii = 0, len = li.length; ii < len; ii++) {
                var d = li[ii];
                if ("vi" == d.type) {
                  var te = "視聴ボ";
                  GV.vi_n++
                } else if ("re" == d.type) {
                  te = "解除時刻";
                  GV.vi_n = 0, GV.re_1 = Number(d.at), GV.ti = "", GV.re_b = !0
                }
                "tw" != d.type && "vi" != d.type || (1 == GV.vi_n ? (GV.re_2 = Number(d.at) + 36e5, GV.re_b = !0) : GV.re_2 < d.at && (GV.re_2 = Number(d.at) + 36e5, GV.vi_n = 0, GV.vi_n++, GV.re_b = !0), GV.ti = " (" + GV.vi_n + "回目)"), GV.re_b && (GV.re_b = !1, $("#get_log_area ." + type + "_log").prepend('<p class="log_border"></p>'));
                var dt = FU.timeChange(d.at);
                $("#get_log_area ." + type + "_log").prepend('<div class="log_text_box"><p class="log_type">' + te + '</p><p class="log_text">' + dt.h + ":" + dt.m + ":" + dt.s + GV.ti + "</p></div>")
              }
              var ta = $("#get_log_area ." + type),
                dt1 = FU.timeChange(GV.re_1);
              if ($("#get_log_area ." + type + " .reset_1").text(dt1.h + ":" + dt1.m + ":" + dt1.s + "～").css("color", GV.re_1 < GV.now_unix_time_c && 0 != GV.re_1 ? "red" : "#111").attr("title", GV.re_1), GV.re_1 > GV.now_unix_time_c && GV.re_1 + 6e4 < GV.re_2 || GV.re_1 + 6e4 < GV.re_2 && GV.re_1 + 36e5 > GV.re_2 || GV.re_1 > GV.re_2) $("#get_log_area ." + type + " .reset_2").text("--:--:--").css("color", "#111").attr("title", GV.re_2);
              else {
                var dt2 = FU.timeChange(GV.re_2);
                $("#get_log_area ." + type + " .reset_2").text(dt2.h + ":" + dt2.m + ":" + dt2.s).css("color", GV.re_2 < GV.now_unix_time_c && 0 != GV.re_2 ? "red" : "#111").attr("title", GV.re_2)
              }
              ta.find(".total").text(GV.vi_n), GV[type + "_log"] = {
                vi: GV.vi_n,
                re_1: GV.re_1,
                re_2: GV.re_2
              }, GV[type + "_re_get_time"] = dt1.h + ":" + dt1.m
            }
            $("#get_log_area .log_show").off("click"), $("#get_log_area .log_show").on("click", function () {
              $(this).hasClass("on") ? ($("#get_log_area .log_show").text("▼").removeClass("on"), $("#get_log_area .log").hide()) : ($("#get_log_area .log_show").text("▼").removeClass("on"), $(this).text("▲").addClass("on"), $("#get_log_area .log").hide(), $("#get_log_area ." + $(this).attr("name") + "_log").show())
            }), GV.suko_get_log.star_re_log = GV.star_log, GV.suko_get_log.seed_re_log = GV.seed_log, GV.suko_get_log.star_get_log = GV.star_get_log, GV.suko_get_log.seed_get_log = GV.seed_get_log, FU.save("suko_get_log", GV.suko_get_log), localStorage.setItem("log_save", "1"), $("#get_log_area p").css("font-size", $("#get_log_area").innerWidth() / 23)
          }, $("#get_log_area").on({
            mouseenter: function () {
              $("#get_log_area .mini,#get_log_area .mini_row").stop(!1, !0).show()
            },
            mouseleave: function () {
              GV.get_box_mini && (GV.get_box_mini_row ? $("#get_log_area .mini,#get_log_area .mini_2").slideUp(0) : $("#get_log_area .mini,#get_log_area .mini_row,#get_log_area .mini_2").slideUp(0), $("#get_log_area .log_show").text("▼").removeClass("on"))
            }
          }), GV.suko.live_config.get_log_box_show && FU.gl_show(), FU.getLogText())
        }, FU.videoController_C = async function () {
          SRApp.store.get("isLive") || $("#video_con_box").hide(), GV.debug && console.log("---video controller---"), $("#js-room-section .comment").attr("src", FU.local_url("/img/comment.png")), $("#js-room-section .reload").attr("src", FU.local_url("/img/reload.png")), $("#js-room-section .fullscreen").attr("src", FU.local_url("/img/fullscreen_on.png")), $("#js-room-section .telop").attr("src", FU.local_url("/img/telop_on.png")), $("#video_con_box input").focusin(function (e) {
            $("#video_con_box").addClass("focus")
          }).focusout(function (e) {
            $("#video_con_box").removeClass("focus")
          }), $("#video_con_box").hover(function () {
            $("#js-collabo-button").hide()
          }, function () {
            $("#js-collabo-button").show()
          }), FU.commLimit_2 = function () {
            GV.auto_count_stop && GV.auto_count_c && $("#video_con_box input").val().length > 0 ? (GV.auto_count_p = !0, $("#auto_count img").addClass("stop")) : $("#auto_count img").hasClass("stop") && FU.auto_count_re(), $("#video_con_box input").val().length > 50 ? ($("#video_con_box button").attr("disabled", "disabled").removeClass("on").text($("#video_con_box input").val().length), $("#video_con_box input").css("background-color", "rgb(120,10,10)")) : 0 == $("#video_con_box input").val().length ? ($("#video_con_box button").attr("disabled", "disabled").removeClass("on").text("送信"), $("#video_con_box input").css("background-color", "rgb(10,10,10)")) : ($("#video_con_box button").removeAttr("disabled").addClass("on").text("送信"), $("#video_con_box input").css("background-color", "rgb(10,10,10)"))
          }, $("#video_con_box input").off("input change"), $("#video_con_box input").on("input change", function () {
            FU.commLimit_2()
          }), $("#video_con_box button").off("click"), $("#video_con_box button").on("click", function () {
            FU.conCommPost()
          }), $("#video_con_box input").keydown(function (e) {
            if ("con_comm_input" == e.target.id && (e.which && 13 === e.which || e.keyCode && 13 === e.keyCode)) return FU.conCommPost(), !1
          }), $("#js-room-comment button").attr("type", "button"), FU.conCommPost = function () {
            FU.auto_count_re();
            var c = String($("#video_con_box input").val());
            c.length > 50 || 0 == c.length || (GV.last_comm != c ? GV.comm_post ? FU.pop_c("comm_wait", FU.local_url("/img/comment.png"), "コメント送信待ち") : (GV.comm_post = !0, $("#video_con_box input").val(""), $("#con_comm_input").val(""), $("#video_con_box button").addClass("sending"), $("#js-room-comment button").addClass("sending"), FU.commentPost(c, !0)) : FU.pop_c("comm_booking", FU.local_url("/img/comment.png"), "連続同一コメント", 7e3))
          }, FU.auto_count_re = function () {
            $("#auto_count img").hasClass("stop") && (GV.auto_count_p = !1, $("#auto_count img").removeClass("stop"))
          }, $("#video_con_box .comment").off("click"), $("#video_con_box .comment").on("click", function () {
            $("#icon-room-commentlog").hasClass("active") ? ($("#icon-room-commentlog").removeClass("active"), $("#comment-log").css("display", "none")) : ($("#icon-room-commentlog").addClass("active"), $("#comment-log").css("display", "block"))
          }), $("#video_con_box .telop").off("click"), $("#video_con_box .telop").on("click", function () {
            GV.telop_show ? ($("#telop").css("opacity", "1"), SRApp.vent.trigger("fetchTelop"), GV.telop_show = !1, $(this).attr("src", FU.local_url("/img/telop_on.png"))) : ($("#telop").css("opacity", "0"), SRApp.vent.trigger("hideTelop"), GV.telop_show = !0, $(this).attr("src", FU.local_url("/img/telop_off.png")))
          }), $("#video_con_box .fullscreen").off("click"), $("#video_con_box .fullscreen").on("click", function () {
            $("#js-room-video").hasClass("full") ? ($(this).attr("src", FU.local_url("/img/fullscreen_on.png")), $("#js-video").css({
              width: "100%",
              height: "100%",
              position: "static",
              top: "0px",
              left: "0px",
              background: "",
              "z-index": "auto"
            }), $("#js-room-video").removeClass("full").css({
              top: "0px",
              left: "0px",
              width: "640px",
              height: "360px",
              "z-index": "auto",
              position: "absolute",
              "margin-left": "0px",
              background: "#111"
            }), $("#comment-log .title").css({
              "line-height": "25px",
              "border-radius": "0px"
            }).text("コメントログ"), $("#video_con_box").removeClass("full_on").addClass("full_off"), $("#comment-log").css({
              position: "absolute",
              top: GV.full_off_posi.top,
              left: GV.full_off_posi.left,
              "z-index": "50",
              "background-color": "rgba(38,50,56,.8)",
              "border-radius": "0px"
            })) : ($(this).attr("src", FU.local_url("/img/fullscreen_off.png")), GV.full_off_posi = {
              top: $("#comment-log").css("top"),
              left: $("#comment-log").css("left")
            }, $("#js-video").css({
              width: "",
              height: "100%",
              top: "0px",
              left: "0px",
              background: "#111",
              "z-index": "980",
              position: "static"
            }), $("#js-room-video").addClass("full").css({
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              "z-index": "960",
              position: "fixed",
              "margin-left": "0px",
              background: "#111"
            }), $("#comment-log .title").css({
              "line-height": "10px",
              "border-radius": "20px"
            }).text(""), $("#video_con_box").removeClass("full_off").addClass("full_on"), $("#comment-log").css({
              position: "fixed",
              top: "10%",
              left: "calc(100% - " + $("#comment-log").css("width") + ")",
              "z-index": "961",
              "background-color": "rgba( 0,0,0,0.6)",
              "border-radius": "10px"
            }), $("#ShowRoomLive").draggable().resizable({
              minWidth: 640,
              maxWidth: 2e3,
              handles: "w,e"
            }))
          }), FU.videoReload = function () {
            SRApp.view.liveData.streaming_url_hls = SRApp.store.attributes.currentStream.url, SRApp.vent.trigger("loadLiveStream", SRApp.view.liveData), FU.videoReloadAnmute(SRApp.view.subViews.volumeIconView.model.attributes.mute)
          }, $("#video_con_box .reload").off("click"), $("#video_con_box .reload").on("click", function () {
            FU.videoReload()
          }), FU.videoReloadAnmute = function (d) {
            try {
              clearInterval(GV.reload_mute_ob)
            } catch (e) {}
            GV.reload_mute_ob = setInterval(function () {
              if (SRApp.view.subViews.volumeIconView) {
                try {
                  clearInterval(GV.reload_mute_ob)
                } catch (e) {}
                d ? FU.mute_on(SRApp.view.subViews.volumeIconView.model) : FU.mute_off(SRApp.view.subViews.volumeIconView.model)
              }
            }, 100)
          }
        }, FU.etc_C = async function () {
          GV.debug && console.log("---etc---"), FU.start_time = function () {
            var s = FU.timeChange(SRApp.store.get("startedAt"));
            GV.start_time = s, $("#label-start-time").text(s.h + ":" + s.m + ":" + s.s + "～")
          }, FU.room_view_n = function () {
            $("#watch-num-label").on("click", function () {
              GV.ava_reload || (SRApp.vent.trigger("fetchAvatar"), GV.ava_reload = !0, setTimeout(function () {
                GV.ava_reload = !1
              }, 5e3)), FU.pop_c("view_num", FU.local_url("/img/login.png"), "訪問回数 " + GV.room_view_n + " 回")
            })
          }, FU.commLimit_1 = function () {
            GV.auto_count_stop && GV.auto_count_c && $("#js-chat-input-comment").val().length > 0 ? (GV.auto_count_p = !0, $("#auto_count img").addClass("stop")) : $("#auto_count img").hasClass("stop") && FU.auto_count_re(), $("#js-chat-input-comment").val().length > 50 ? ($("#js-chat-input-comment").addClass("comment_over"), $("#js-room-comment .js-room-comment-btn").text($("#js-chat-input-comment").val().length)) : ($("#js-chat-input-comment").removeClass("comment_over"), $("#js-room-comment .js-room-comment-btn").text("送信"))
          }, $("#js-chat-input-comment").removeAttr("placeholder"), $("#js-chat-input-comment").on("input change", function () {
            FU.commLimit_1()
          }), FU.giftLogPost = function () {
            window.throwGifts = function (t, e, r, n, i, o, s, a, u) {
              try {
                (!!(GV.all_gift && GV.hide_gift.indexOf(r) >= 0) || o) && SRApp.view.subViews.giftLogView.add({
                  avatarId: e,
                  screenId: i,
                  giftId: r,
                  num: n,
                  avatarImage: SRApp.request("getAvatarUrl", e),
                  giftImage: SRApp.request("getGiftByGiftId", r).image
                }), t !== SRApp.store.get("userId") && SRApp.view.subViews.canvasView.throwGifts(t, SRApp.reqres.request("getGiftByGiftId", r), n)
              } catch (e) {}
            }
          }, FU.comm_re = function () {
            GV.commLogTypeSet_s || (FU.commLogTypeSet(), GV.commLogTypeSet_s = !0), SRApp.view.subViews.commentLogView.__proto__.childView.prototype.template = function (e) {
              var en = "";
              if (1 == Number(e.ua)) en = '<em class="st-badge__begin"><span><i><img src="/assets/img/avatar/ic_beginner.svg" alt="ビギナー"></i>ビギナー</span></em>';
              else if (2 == Number(e.ua)) en = '<em class="st-badge__start"><span>初見</span></em>';
              var index = e.avatarImage.indexOf(".png"),
                ava_num = e.avatarImage.substring(0, index).replace(/[^0-9]/g, "");
              return '\n      <div class="comment-log-avatar" name="' + e.userId + '" title="アバターID: ' + ava_num + '"><img src="' + (e.avatarImage || SRApp.request("getAssetUrl", "img/avatar/blank.png")) + '"></div>\n      <div class="comment-log-name" title="' + e.name + '">' + en + e.name + '</div>\n      <div class="comment-log-comment">' + e.comment + "</div>"
            }, SRApp.view.subViews.commentLogView.__proto__.getChildView = function (e) {
              return SRApp.view.subViews.commentLogView.__proto__.childView.prototype.className = "commentlog-row", e.attributes.avatarImage.match("sel=1") ? SRApp.view.subViews.commentLogView.__proto__.childView.prototype.className = "commentlog-row select_comm" : e.attributes.avatarImage.match("sel=2") && (SRApp.view.subViews.commentLogView.__proto__.childView.prototype.className = "commentlog-row symbol_comm"), setTimeout(function () {
                GV.symbol_comm || $("#room-comment-log-list .symbol_comm").css("display", "list-item"), FU.name_copy()
              }, 1e3), this.getOption("childView") || this.constructor
            }, SRApp.view.adapter.onReceiveComment = function (e) {
              var t = e.comment,
                o = e.userId,
                i = e.userName,
                n = e.avatarImage,
                a = e.delay,
                ua = Number(e.ua);
              t && o && i && !SRApp.userMuteList.isMuted(o) && setTimeout(function () {
                SRApp.view.subViews.canvasView.comment(t, i, o);
                var r, e = !1,
                  a = !1;
                if (GV.select_comm)
                  for (var s = 0, _ = (r = GV.select_comm_list).length; s < _; s++) t.match(r[s]) && r[s].length > 1 && (e = !0);
                if (GV.symbol_comm)
                  for (s = 0, _ = (r = GV.symbol_list).length; s < _; s++) t[0] == r[s] && (a = !0);
                e ? (SRApp.view.subViews.commentLogView.add({
                  userId: o,
                  name: i,
                  avatarImage: SRApp.request("getAvatarUrl", n) + "&sel=1",
                  comment: t,
                  ua: ua
                }), GV.comm_se && FU.soundPop("comment.mp3", Number($("#config_area .comm_se .se_volume").attr("value")) / 100)) : a ? SRApp.view.subViews.commentLogView.add({
                  userId: o,
                  name: i,
                  avatarImage: SRApp.request("getAvatarUrl", n) + "&sel=2",
                  comment: t,
                  ua: ua
                }) : SRApp.view.subViews.commentLogView.add({
                  userId: o,
                  name: i,
                  avatarImage: SRApp.request("getAvatarUrl", n),
                  comment: t,
                  ua: ua
                }), GV.badge_show || $(".st-badge__begin,.st-badge__start").css("display", "none")
              }, a)
            }
          }, FU.name_copy = function () {
            $(".comment-log-name").off("dblclick"), $(".comment-log-name").on("dblclick", function () {
              if (GV.name_copy) {
                var text = $(this).text();
                if ($(this).find(".st-badge__start").length) text = text.slice(2);
                if ($(this).find(".st-badge__begin").length) text = text.slice(4);
                if (GV.at_back_remove) {
                  if (-1 == (n = text.search("@"))) var n = text.search("＠"); - 1 == n && (n = text.length);
                  var name = text.substr(0, n)
                } else name = text;
                var t = $("#config_area").find(".name_copy .input_text").val().replace("@name", name);
                $("#js-room-comment-wrapper").is(":visible") ? $("#js-chat-input-comment").val(t).focus() : $("#con_comm_input").val(t).focus(), SRApp.view.subViews.commentFormView.model.attributes.text = t.toString(), $(".comment-btn").removeClass("is-disabled").css({
                  cursor: "pointer"
                }).prop("disabled", !1), SRApp.view.subViews.commentFormView.model.attributes.text = t.toString()
              }
            })
          }, FU.time_copy = function () {
            $("#label-start-time,#now_time,#update_time").off("click dblclick"), $("#label-start-time,#now_time,#update_time").on("click dblclick", function (e) {
              var n1 = GV.now_time_list_2.h + ":" + GV.now_time_list_2.mi + ":" + GV.now_time_list_2.s,
                s1 = GV.start_time.h + ":" + GV.start_time.m + ":" + GV.start_time.s,
                s2 = GV.start_time.h + "時" + GV.start_time.m + "分" + GV.start_time.s + "秒",
                u1 = GV.update_time.m + ":" + GV.update_time.s,
                u2 = GV.update_time.m + "分" + GV.update_time.s + "秒",
                e1 = GV.elap_time_t.h + ":" + GV.elap_time_t.m + ":" + GV.elap_time_t.s,
                e2 = GV.elap_time_t.h + "時間" + GV.elap_time_t.m + "分" + GV.elap_time_t.s + "秒",
                id = $(this).attr("id"),
                con = $("#config_area");
              if ("label-start-time" == id && GV.start_time_text) var tar = con.find(".start_time_text .input_text");
              else if ("now_time" == id && GV.now_time_text) tar = con.find(".now_time_text .input_text");
              else if ("update_time" == id && GV.update_time_text) tar = con.find(".update_time_text .input_text");
              if (tar) {
                var t = tar.val().replace("@n1", n1).replace("＠n1", n1).replace("@n2", GV.now_time).replace("＠n2", GV.now_time).replace("@s1", s1).replace("＠s1", s1).replace("@s2", s2).replace("＠s2", s2).replace("@u1", GV.update_time_on ? "00:00" : u1).replace("＠u1", GV.update_time_on ? "00:00" : u1).replace("@u2", GV.update_time_on ? "0分0秒" : u2).replace("＠u2", GV.update_time_on ? "0分0秒" : u2).replace("@u3", GV.update_time_on ? "更新可能" : "").replace("＠u3", GV.update_time_on ? "更新可能" : "").replace("@e1", e1).replace("＠e1", e1).replace("@e2", e2).replace("＠e2", e2);
                t.length > 50 || (GV.time_double_click && "dblclick" == e.type ? (FU.commentPost(t, !0), $("#js-chat-input-comment").val("").blur(), SRApp.view.subViews.commentFormView.model.attributes.text = "") : ($("#js-room-comment-wrapper").is(":visible") ? ($("#js-chat-input-comment").val(t).focus(), t.length > 0 && t.length <= 50 && ($(this).removeClass("comment_over"), $("#js-room-comment button").text("送信"), $(".js-room-comment-btn").removeAttr("disabled").removeClass("is-disabled"))) : ($("#con_comm_input").val(t).focus(), t.length > 0 && t.length <= 50 && ($("#video_con_box button").removeAttr("disabled").addClass("on").text("送信"), $(this).css("background-color", "rgb(10,10,10)"))), SRApp.view.subViews.commentFormView.model.attributes.text = t.toString()))
              }
            })
          }, FU.eventPoint = function () {
            SRApp.view.subViews.eventView.subViews.eventBoxView.model.fetchEventAndSupport = function () {
              return $.ajax({
                type: "GET",
                url: "/api/room/event_and_support",
                data: {
                  room_id: SRApp.store.get("roomId")
                },
                success: function (t) {
                  if (t.event && ($("#event_point").remove(), t.event.ranking ? ($("<p>", {
                      id: "event_point",
                      text: "現在のポイント: " + String(t.event.ranking.point).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") + " pt"
                    }).prependTo("#event-rank-wrapper div:eq(1)"), $("#event_point").css({
                      "text-align": "center",
                      "font-size": "14px",
                      color: "#1DE9B6"
                    }), $("#event-next-point").text(String(t.event.ranking.gap).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,"))) : t.event.quest && ($("#event-rank-wrapper").show(), $("#event-rank-wrapper .current-rank").hide(), $("#event-rank-wrapper .next-rank").empty(), $("<p>", {
                      id: "event_point",
                      text: "現在のポイント: " + String(t.event.quest.support.current_point).replace(/(\d)(?=(\d\d\d)+$)/g, "$1,") + " pt"
                    }).prependTo("#event-rank-wrapper div:eq(1)"), $("#event_point").css({
                      "text-align": "center",
                      "font-size": "14px",
                      color: "#1DE9B6"
                    }))), t.regular_event && t.regular_event.event_id && SRApp.store.set({
                      regularEventData: {
                        eventId: t.regular_event.event_id,
                        eventName: t.regular_event.event_name,
                        levelName: t.regular_event.level_name
                      }
                    }), t.event && (SRApp.store.set({
                      eventData: {
                        eventId: t.event.event_id,
                        eventName: t.event.event_name,
                        eventType: t.event.event_type,
                        image: t.event.image,
                        questLevel: t.event.quest_level,
                        rank: t.event.rank,
                        nextRank: t.event.next_rank,
                        gap: t.event.gap
                      }
                    }), t.event.ranking && SRApp.store.set({
                      eventData: {
                        rank: t.event.ranking.rank,
                        nextRank: t.event.ranking.next_rank,
                        point: t.event.ranking.point,
                        gap: t.event.ranking.gap
                      }
                    }), t.event.quest && (SRApp.store.set({
                      eventData: {
                        questLevel: t.event.quest.quest_level
                      }
                    }), t.event.quest.support && SRApp.store.set({
                      supportData: {
                        supportId: t.event.quest.support.support_id,
                        title: t.event.quest.support.title,
                        currentPoint: t.event.quest.support.current_point,
                        goalPoint: t.event.quest.support.goal_point
                      }
                    }))), t.support && t.support.support_id) return SRApp.store.set({
                    supportData: {
                      supportId: t.support.support_id,
                      title: t.support.title,
                      currentPoint: t.support.current_point,
                      goalPoint: t.support.goal_point
                    }
                  })
                }
              })
            }, SRApp.vent.trigger("fetchEventAndSupport")
          }, FU.roomPoint = function () {
            var live = JSON.parse($("#js-live-data").attr("data-json"));
            $("#ranking .title").attr("title", "ルーム累計ポイント : " + Number(live.room.popularity_point).toLocaleString() + " pt").addClass("room_point")
          }, $(".footer-menu").hover(function () {
            $(".footer-menu").removeClass("hide").addClass("show")
          }, function () {
            GV.footer_icon_hide && $(".footer-menu").removeClass("show").addClass("hide")
          }), FU.pop_c = function (id, img, msg, time) {
            $("#pop_box_n_" + id).remove(), $("#popup_area").append('<div id="pop_box_n_' + id + '" class="pop_box"><img src="' + img + '"><p>' + msg + "</p></div>"), $("#pop_box_n_" + id).stop(!1, !0).show(), $("#pop_box_n_" + id).delay(time || 2e3).fadeOut(5e3).queue(function () {
              $("#pop_box_n_" + id).remove()
            })
          }, FU.info = function (d) {
            $("#info_area").text(d.text), $("#info_area").dialog({
              modal: !0,
              title: d.title,
              open: function (e, ui) {
                $(".ui-dialog-titlebar-close").hide()
              },
              buttons: [{
                text: d.typeA,
                class: "dialog_button",
                click: function () {
                  $(this).dialog("close"), d.url && window.open(d.url), d.func && d.func()
                }
              }, {
                text: d.typeB,
                class: "dialog_button",
                click: function () {
                  $(this).dialog("close"), d.func && d.func()
                }
              }]
            })
          }, FU.versionUpInfo = function () {
            var d = {
              text: "バージョンアップを行いました。※設定の連絡事項から再表示できます｡",
              title: "すこすこツール+ ver." + GV.version,
              typeA: "更新情報",
              typeB: "閉じる",
              url: "https://twitter.com/search?q=from%3Anori_show%20%23%E3%81%99%E3%81%93%E3%83%84%E3%83%BC%E3%83%AB&src=typed_query&f=live",
              func: function () {
                GV.suko.version_up_info = GV.version, FU.save("suko", GV.suko)
              }
            };
            d && FU.info(d)
          }, FU.versionUpCheck = function () {
            GV.suko.version_up_info || (GV.suko.version_up_info = "1", FU.save("suko", GV.suko)), GV.suko.version_up_info != GV.version && FU.versionUpInfo()
          }, FU.giftPostDialog = function (d) {
            $("#info_area").html(d.html), $("#info_area").dialog({
              modal: !0,
              title: "本当に有料ギフトを投げますか?",
              open: function (e, ui) {
                $(".ui-dialog-titlebar-close").hide()
              },
              buttons: [{
                text: "はい",
                class: "dialog_button",
                click: function () {
                  $(this).dialog("close"), FU.payGiftPost({
                    id: d.fd.id,
                    n: d.fd.n
                  })
                }
              }, {
                text: "いいえ",
                class: "dialog_button",
                click: function () {
                  $(this).dialog("close"), GV.giftPostDialog_t = 0
                }
              }, {
                text: "10分",
                class: "dialog_timer_b t_1",
                click: function () {
                  GV.giftPostDialog_t = GV.now_unix_time + 600, $(".dialog_timer_b").removeClass("on"), $(".ui-dialog .t_1").addClass("on")
                }
              }, {
                text: "30分",
                class: "dialog_timer_b t_2",
                click: function () {
                  GV.giftPostDialog_t = GV.now_unix_time + 1800, $(".dialog_timer_b").removeClass("on"), $(".ui-dialog .t_2").addClass("on")
                }
              }, {
                text: "60分",
                class: "dialog_timer_b t_3",
                click: function () {
                  GV.giftPostDialog_t = GV.now_unix_time + 3600, $(".dialog_timer_b").removeClass("on"), $(".ui-dialog .t_3").addClass("on")
                }
              }]
            })
          }, FU.youtubeCon = function () {
            SRApp.vent.off("stopYoutube"), SRApp.vent.off("playYoutube"), SRApp.vent.on("playYoutube", function (t) {
              n = new YT.Player("youtubePlayer", {
                height: "360",
                width: "640",
                videoId: t,
                playerVars: {
                  autoplay: 0,
                  loop: 1,
                  playlist: t,
                  showinfo: 0,
                  rel: 0,
                  fs: 1
                }
              }), $("#youtubeArea").css("display", "block")
            }), SRApp.vent.on("stopYoutube", function () {
              $("#youtubeArea").css("display", "none");
              try {
                n && (n.destroy(), n = null)
              } catch (e) {}
            })
          }, FU.commLogTypeSet = function () {
            try {
              $.each($("#room-comment-log-list li"), function () {
                for (var t = $(this).find(".comment-log-comment").text(), m = !1, mm = !1, i = 0, len = (li = GV.select_comm_list).length; i < len; i++)
                  if (t.match(li[i]) && li[i].length > 1) m = !0;
                var li;
                for (i = 0, len = (li = GV.symbol_list).length; i < len; i++)
                  if (t[0] == li[i]) mm = !0;
                m ? $(this).addClass("select_comm") : mm ? $(this).addClass("symbol_comm") : $(this).removeClass("symbol_comm")
              }), GV.symbol_comm || $("#room-comment-log-list .symbol_comm").css("display", "list-item")
            } catch (e) {
              setTimeout(function () {
                FU.commLogTypeSet()
              }, 2e3)
            }
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
              var pro = $('meta[name="description"]').attr("content");
              if (pro.indexOf("#eve:") >= 0) {
                var d = pro.substr(pro.indexOf("#eve") + 1, 50),
                  s = d.indexOf(":"),
                  e = d.indexOf("#"),
                  url = d.substr(s, e).replace("#", "").replace(":", "").replace(/\s+/g, "");
                GV.next_event_url = "https://www.showroom-live.com/event/" + url, $("#event-support-wrapper").append('<div id="next_event_link"><a href="' + GV.next_event_url + '" target="_blank">参加予定イベント</a></div>')
              }
            } catch (e) {}
          }, FU.renderAvatarSensor = function () {
            SRApp.view.subViews.canvasView.renderAvatar = function (t) {
              if (GV.ava_anime_stop)
                for (var i = 0; i < 5; i++) setTimeout(function () {
                  SRApp.view.subViews.canvasView.avatarContainer.stopAvatarAnimation()
                }, 200 * i);
              return SRApp.view.subViews.canvasView.avatarContainer.render(t)
            }
          }, FU.start_time(), FU.room_view_n(), FU.giftLogPost(), FU.comm_re(), FU.name_copy(), FU.time_copy(), FU.eventPoint(), FU.youtubeCon(), FU.eventRankingS(), FU.roomProfileSensor(), FU.renderAvatarSensor(), setTimeout(function () {
            FU.commLogTypeSet()
          }, 3e3)
        }, FU.config = function () {
          GV.debug && console.log("---config---"), FU.configList = {
            ava: function (d) {
              1 == d ? SRApp.vent.trigger("showCanvas") : SRApp.vent.trigger("hideCanvas")
            },
            balloon: function (d) {
              SRApp.view.subViews.canvasView.comment = 1 == d ? function (t, e, r) {
                var n;
                return n = this.avatarContainer.getAvatarByUserId(r), this.commentContainer.showComment(n, t, e, r)
              } : function () {}
            },
            one_post: function (d) {
              1 == d ? $("#one_post").css("display", "inline-block") : $("#one_post").css("display", "none")
            },
            onlive_icon: function (d) {
              1 == d ? $("#onlive_open").css("display", "inline-block") : $("#onlive_open").css("display", "none")
            },
            tweet_icon: function (d) {
              1 == d ? $("#one_click_tweet").css("display", "inline-block") : $("#one_click_tweet").css("display", "none")
            },
            config_icon: function (d) {
              1 == d ? $("#config_show").css("display", "inline-block") : $("#config_show").css("display", "none")
            },
            get_icon: function (d) {
              1 == d ? $("#get_icon_area").css("display", "inline-block") : $("#get_icon_area").css("display", "none")
            },
            badge_icon: function (d) {
              1 == d ? ($(".st-badge__begin,.st-badge__start").css("display", "inline-block"), GV.badge_show = !0) : ($(".st-badge__begin,.st-badge__start").css("display", "none"), GV.badge_show = !1)
            },
            all_gift_log: function (d) {
              GV.all_gift = 1 == d
            },
            rainbow_daruma: function (d) {
              1 == d ? $("#gift_area .pay_gift_box .r_daruma").show() : $("#gift_area .pay_gift_box .r_daruma").hide()
            },
            now_time: function (d) {
              1 == d ? $("#now_time").show() : $("#now_time").hide()
            },
            update_time: function (d) {
              1 == d ? $("#update_time").show() : $("#update_time").hide()
            },
            elap_time: function (d) {
              GV.elap_time = 1 == d
            },
            popup: function (d) {
              1 == d ? $("#popup_area").css("display", "inline-block") : $("#popup_area").css("display", "none")
            },
            start_mute: function (d) {
              GV.room_mute || (1 == d ? FU.mute(!0) : FU.mute(!1))
            },
            start_mute_room: function (d) {
              0 == d ? GV.room_mute = !1 : 1 == d ? (GV.room_mute = !0, FU.mute(!0)) : 2 == d && (GV.room_mute = !0, FU.mute(!1))
            },
            gift_se: function (d) {
              GV.gift_se = 1 == d
            },
            reset_se: function (d) {
              GV.reset_se = 1 == d
            },
            fire_se: function (d) {
              GV.fire_se = 1 == d
            },
            count_end_se: function (d) {
              GV.count_end_se = 1 == d
            },
            comm_se: function (d) {
              GV.comm_se = 1 == d
            },
            ava_out_se: function (d) {
              GV.ava_out_se = 1 == d
            },
            elapsed_time_noti_se: function (d) {
              GV.el_noti_se = 1 == d
            },
            view_bonus_sepa: function (d) {
              GV.view_bonus_sepa = 1 == d
            },
            auto_block: function (d) {
              GV.auto_block = 1 == d
            },
            comm_inp_color: function (d) {
              1 == d ? $("#js-room-comment-wrapper").addClass("comment_box_color_2") : $("#js-room-comment-wrapper").removeClass("comment_box_color_2")
            },
            mini_icon: function (d) {
              1 == d ? ($("#icon_area .icon_box").addClass("mini"), $("#icon_area #icon_button").addClass("mini")) : ($("#icon_area .icon_box").removeClass("mini"), $("#icon_area #icon_button").removeClass("mini"))
            },
            popup_posi: function (d) {
              1 == d ? ($("#popup_area").draggable("enable").resizable({
                disabled: !1
              }).addClass("border").css({
                "pointer-events": "auto"
              }), $("#popup_area_posi").show()) : ($("#popup_area").draggable("disable").resizable({
                disabled: !0
              }).removeClass("border").css({
                "pointer-events": "none"
              }), $("#popup_area_posi").hide())
            },
            icon_list_vertic: function (d) {
              1 == d ? ($(".icon_box").css({
                margin: "0 0 7px 2px"
              }), $("#icon_area").css({
                width: "50px",
                "white-space": "normal"
              })) : ($(".icon_box").css({
                margin: "0 7px 0 0"
              }), $("#icon_area").css({
                width: "auto",
                "white-space": "nowrap"
              }))
            },
            icon_area_fix: function (d) {
              1 == d ? ($("#icon_area").css("position", "fixed"), GV.icon_area_fix && ($("#icon_area").css({
                top: "50px",
                left: "410px"
              }), FU.pop_c("icon_area_fix", FU.local_url("/img/config.png"), "アイコンリストを画面に固定、上部に移動しました。", 1e4))) : ($("#icon_area").css("position", "absolute"), GV.icon_area_fix = !0)
            },
            gift_box_mini: function (d) {
              1 == d ? (GV.gift_box_mini = !0, $("#gift_area .mini,#gift_area .mini_row").fadeOut(1)) : (GV.gift_box_mini = !1, $("#gift_area .mini,#gift_area .mini_row").fadeIn(1))
            },
            get_box_mini: function (d) {
              1 == d ? (GV.get_box_mini = !0, $("#get_log_area .mini,#get_log_area .mini_row").fadeOut(1), FU.configList.get_box_mini_row(GV.suko.live_config.get_box_mini_row ? GV.suko.live_config.get_box_mini_row : 0)) : (GV.get_box_mini = !1, $("#get_log_area .mini,#get_log_area .mini_row").fadeIn(1), FU.configList.get_box_mini_row(GV.suko.live_config.get_box_mini_row ? GV.suko.live_config.get_box_mini_row : 0))
            },
            get_box_mini_row: function (d) {
              setTimeout(function () {
                1 == d ? (GV.get_box_mini_row = !0, $("#get_log_area .mini_row").show()) : (GV.get_box_mini_row = !1, $("#get_log_area .mini_row").hide())
              }, 1e3)
            },
            event_box_mini: function (d) {
              1 == d ? $("#event-dialog").addClass("scroll").css({
                "max-height": "260px",
                "overflow-y": "auto"
              }) : $("#event-dialog").removeClass("scroll").css({
                "max-height": "",
                "overflow-y": ""
              })
            },
            count_end_comm: function (d) {
              GV.count_end_comm = 1 == d
            },
            count_end_comm_room: function (d) {
              GV.count_end_comm_room = 1 == d
            },
            select_comm: function (d) {
              1 == d ? (GV.select_comm = !0, GV.select_comm_list = GV.suko.live_config.select_comm_list ? FU.textSepa(GV.suko.live_config.select_comm_list) : []) : (GV.select_comm = !1, GV.select_comm_list = [])
            },
            symbol_comm: function (d) {
              1 == d ? (GV.symbol_comm = !0, $("#room-comment-log-list .symbol_comm").css("display", "none"), GV.symbol_list = GV.suko.live_config.symbol_comm_list ? FU.textSepa(GV.suko.live_config.symbol_comm_list) : FU.textSepa($("#config_area .symbol_comm input").val()), FU.commLogTypeSet()) : (GV.symbol_comm = !1, $("#room-comment-log-list .symbol_comm").css("display", "list-item"), GV.symbol_list = FU.textSepa($("#config_area .symbol_comm input").val()))
            },
            name_copy: function (d) {
              GV.name_copy = 1 == d
            },
            at_back_remove: function (d) {
              GV.at_back_remove = 1 == d
            },
            now_time_text: function (d) {
              GV.now_time_text = 1 == d
            },
            update_time_text: function (d) {
              GV.update_time_text = 1 == d
            },
            start_time_text: function (d) {
              GV.start_time_text = 1 == d
            },
            time_double_click: function (d) {
              GV.time_double_click = 1 == d
            },
            footer_icon_hide: function (d) {
              1 == d ? (GV.footer_icon_hide = !0, $(".footer-menu").removeClass("show").addClass("hide")) : (GV.footer_icon_hide = !1, $(".footer-menu").removeClass("hide").addClass("show"))
            },
            live_end_move: function (d) {
              1 == d ? (GV.live_end_move = !0, SRApp.vent.off("startAutoTransition"), SRApp.vent.on("startAutoTransition", function () {
                FU.pop_c("move_stop", FU.local_url("/img/stop.png"), "自動移動を停止")
              })) : (GV.live_end_move = !1, SRApp.vent.off("startAutoTransition"), SRApp.vent.on("startAutoTransition", function () {
                return SRApp.view.subViews.onliveView.startAutoTransition()
              }))
            },
            room_change_reload: function (d) {
              GV.auto_reload = 1 == d
            },
            reset_time_noti: function (d) {
              GV.reset_time_noti = 1 == d
            },
            ava_out_noti: function (d) {
              GV.ava_out_noti = 1 == d
            },
            html5_delay: function (d) {
              GV.html5_delay = 1 == d
            },
            gift_box_stop: function (d) {
              1 == d ? ($("#gift_box_show").css("display", "none"), $("#gift_area").hide()) : ($("#gift_box_show").css("display", "inline-block"), GV.suko.live_config.gift_box_show && ($("#gift_box_show").find(".icon").addClass("on").removeClass("off"), $("#gift_area").css("display", "block")))
            },
            get_log_stop: function (d) {
              1 == d ? ($("#get_log_show").css("display", "none"), $("#get_log_area").hide()) : ($("#get_log_show").css("display", "inline-block"), GV.suko.live_config.get_log_box_show && ($("#get_log_show").find(".icon").addClass("on").removeClass("off"), $("#get_log_area").css("display", "block")))
            },
            count_s_n: function (d) {
              1 == d ? (GV.count_s_n = !0, GV.comm_n <= 1 && (GV.comm_n = 1)) : (GV.count_s_n = !1, GV.comm_n <= 1 && (GV.comm_n = 0))
            },
            auto_count_stop: function (d) {
              GV.auto_count_stop = 1 == d
            },
            room_open_ex: function (d) {
              1 == d ? $(".room-header-user-name").css("color", "red") : $(".room-header-user-name").css("color", "#fff")
            },
            elapsed_time_noti: function (d) {
              GV.elapsed_time_noti = 1 == d
            }
          }, FU.config_load = function () {
            var t = $("#config_area");
            FU.hash(), $.each($(".switch_3"), function (ke, vo) {
              var k = $(vo).attr("name"),
                v = $(vo).attr("value"),
                s = void 0 == GV.suko.live_config[k + "_" + SRApp.store.get("roomId")] ? v : GV.suko.live_config[k + "_" + SRApp.store.get("roomId")];
              0 == s ? t.find(" ." + k + " button").addClass("config_none").removeClass("config_off").text("未設定") : 1 == s ? t.find(" ." + k + " button").removeClass("config_none").addClass("config_on").text("ON") : t.find(" ." + k + " button").removeClass("config_on").addClass("config_off").text("OFF")
            }), $.each($(".switch_2"), function (ke, vo) {
              var k = $(vo).attr("name"),
                v = $(vo).attr("value"),
                s = void 0 == GV.suko.live_config[k] ? v : GV.suko.live_config[k];
              "room_open_ex" == k && (s = void 0 == GV.suko.live_config[k + "_" + GV.room_url_key] ? v : GV.suko.live_config[k + "_" + GV.room_url_key]), 0 == s ? t.find(" ." + k + " button").addClass("config_off").removeClass("config_on").text("OFF") : t.find(" ." + k + " button").addClass("config_on").removeClass("config_off").text("ON")
            }), $.each($(".input_text"), function (ke, vo) {
              if ("count_end_comm_room_list" == (k = $(vo).attr("name"))) var k = k + "_" + SRApp.store.get("roomId");
              GV.suko.live_config[k] && $(vo).attr("value", GV.suko.live_config[k])
            }), $.each($(".se_volume"), function (ke, vo) {
              var t = GV.suko.live_config[$(vo).attr("name")] ? Number(GV.suko.live_config[$(vo).attr("name")]) : 1;
              $(vo).attr("value", t).slider("value", t)
            }), $.each($(".config .number"), function (ke, vo) {
              var t = GV.suko.live_config[$(vo).attr("name")] ? Number(GV.suko.live_config[$(vo).attr("name")]) : 10;
              $(vo).val(t)
            })
          }, $("#config_area .menu").on("click", function () {
            $(".config_box").css({
              display: "none"
            }), $(this).hasClass("menu_on") ? $("#config_area .menu").removeClass("menu_on") : ($("#config_area .menu").removeClass("menu_on"), $(this).addClass("menu_on"), $("#config_area ." + $(this).attr("name")).css({
              display: "block"
            }))
          }), $("#config_area button").on("click", function () {
            if (FU.hash(), $(this).hasClass("switch_2")) {
              if ($(this).hasClass("config_on")) {
                $(this).removeClass("config_on").addClass("config_off").text("OFF");
                var n = 0
              } else {
                $(this).addClass("config_on").removeClass("config_off").text("ON");
                n = 1
              }
              GV.suko.live_config[$(this).attr("name")] = n, "room_open_ex" == $(this).attr("name") && (GV.suko.live_config[$(this).attr("name") + "_" + GV.room_url_key] = n)
            } else if ($(this).hasClass("switch_3")) {
              if ($(this).hasClass("config_none")) {
                $(this).removeClass("config_none").addClass("config_on").text("ON");
                n = 1
              } else if ($(this).hasClass("config_on")) {
                $(this).removeClass("config_on").addClass("config_off").text("OFF");
                n = 2
              } else {
                $(this).addClass("config_none").removeClass("config_off").text("未設定");
                n = 0
              }
              GV.suko.live_config[$(this).attr("name") + "_" + SRApp.store.get("roomId")] = n
            }
            FU.save("suko", GV.suko)
          }), $("#config_area button").on("DOMSubtreeModified propertychange", function (e, config) {
            var n = $(this).attr("name");
            $(this).hasClass("switch_2") && ($(this).hasClass("config_on") ? FU.configList[n](1) : FU.configList[n](0)), $(this).hasClass("switch_3") && ($(this).hasClass("config_none") ? FU.configList[n](0) : $(this).hasClass("config_on") ? FU.configList[n](1) : FU.configList[n](2))
          }), $("#config_area").find(".input_text").on("input change", function (e) {
            FU.hash(), "count_end_comm_room_list" == e.target.name ? GV.suko.live_config["count_end_comm_room_list_" + SRApp.store.get("roomId")] = $(this).val() : GV.suko.live_config[$(this).attr("name")] = $(this).val(), FU.save("suko", GV.suko), "e.target.name" == e.target.name && FU.commLogTypeSet()
          }), $("#config_area").find(".number").on("input change", function (e) {
            FU.hash(), GV.suko.live_config[$(this).attr("name")] = $(this).val(), FU.save("suko", GV.suko)
          }), $("#config_area .info button").on("click", function () {
            FU.versionUpInfo()
          }), $("#config_area .web button").on("click", function () {
            var t = $(this).attr("name");
            switch (Number(t)) {
            case 0:
              var url = "http://sr-com.net/suko_manual/";
              break;
            case 1:
              url = "http://sr-com.net/comment_viewer/pc?id=" + GV.room_url_key;
              break;
            case 2:
              url = "http://sr-com.net/event_point?id=" + GV.room_url_key;
              break;
            case 3:
              url = "http://sr-com.net/sukosuko_oekaki/pc?id=" + GV.room_url_key;
              break;
            case 4:
              url = "http://sr-com.net";
              break;
            case 5:
              url = "https://www.pixiv.net/fanbox/creator/40055601"
            }
            window.open(url)
          }), $("#config_area .reset button").on("click", function () {
            var n = $(this).attr("name");
            confirm($("." + n + " .title").text() + "をリセットしますか?") ? (FU.hash(), "posi_reset" == n && (GV.suko.live_window = {}), "get_log_reset" == n && FU.logReset(), "gift_log_reset" == n && (GV.suko.gift_log = {}), "count_log_reset" == n && FU.count_log_reset(), "setting_reset" == n && (GV.suko.live_config = {}), "all_data_reset" == n && (GV.suko = !1, localStorage.clear()), FU.save("suko", GV.suko), alert($("." + n + " .title").text() + "をリセットしました。"), location.reload()) : alert($("." + n + " .title").text() + "のリセットをキャンセルしました。")
          }), FU.count_log_reset = function () {
            $.each(localStorage, function (k, v) {
              k.match("count_log_") && localStorage.removeItem(k)
            })
          }, $("#config_area .se_volume").slider({
            value: 5,
            min: 1,
            max: 100,
            step: 5,
            slide: function (event, ui) {
              FU.hash(), FU.soundPop($(this).attr("se"), ui.value / 100), $(this).attr("value", ui.value), GV.suko.live_config[$(this).attr("name")] = ui.value, FU.save("suko", GV.suko)
            }
          }), $("#config_area .suko_follow button").on("click", function () {
            FU.roomfollow()
          });
          try {
            if (SRApp.store.get("isOfficial")) var l = GV.star_vb_log;
            else l = GV.seed_vb_log;
            l[String(SRApp.store.get("liveId"))] && ($("#get_icon_area .view").addClass("get"), $("#view_bonus p").text(""))
          } catch (e) {}
          FU.config_load()
        }, FU.liveDataChange = function () {
          GV.debug && console.log("---live---");
          try {
            SRApp.view.adapter
          } catch (e) {
            return void setTimeout(function () {
              FU.liveDataChange()
            }, 1e3)
          }
          
          var t;
          FU.liveEnd = function () {
            GV.auto_gp = !1;
            try {
              FU.autoCountOff()
            } catch (e) {}
            try {
              FU.giftImg_C()
            } catch (e) {}
            try {
              FU.start_time()
            } catch (e) {}
            GV.start_time = !1, GV.tweet_B = !1, GV.vbt_n = 30, GV.comm_n = GV.count_s_n ? 1 : 0, $("#auto_count").removeClass("end").find("p").text(GV.comm_n), $("#video_con_box").hide(), $("#ava_enter_box").remove(), $("#get_icon_area .view").removeClass("get"), $("#get_icon_area .tweet").removeClass("get"), $("#one_click_tweet img").removeClass("on"), setTimeout(function () {
              GV.url_para.time && 999 != GV.url_para.time && (GV.live_view_mode || window.close())
            }, 3e3)
            if (window.opener != null) {
              console.log('window.opener');
              window.close();
            } else {
              if (window.history.length > 1) {
                window.history.back(-1);
              }
            }
          }, FU.liveStart = function () {
            if (SRApp.store.get("liveId")) {
              FU.roomDataReset(), FU.start_time();
              try {
                setTimeout(function () {
                  FU.freeGiftMax(), GV.room_mute = !1, GV.suko.live_config["start_mute_room_" + SRApp.store.get("roomId")] ? FU.configList.start_mute_room(GV.suko.live_config["start_mute_room_" + SRApp.store.get("roomId")]) : FU.configList.start_mute(GV.suko.live_config.start_mute)
                }, 2e3)
              } catch (e) {}
            } else setTimeout(function () {
              FU.liveStart()
            }, 1e3)
          }, FU.roomDataChange = function () {
            FU.roomDataReset();
            try {
              FU.autoCountOff()
            } catch (e) {}
            try {
              FU.config_load()
            } catch (e) {}
            try {
              FU.giftImg_C()
            } catch (e) {}
            try {
              FU.start_time()
            } catch (e) {}
            var img = SRApp.store.get("isOfficial") ? "star" : "seed";
            $("#ten_post img").attr("src", FU.local_url("/img/" + img + "_10.png")), $("#one_post img").attr("src", FU.local_url("/img/" + img + "_1.png")), $("#rest_post img").attr("src", FU.local_url("/img/" + img + ".png"))
          }, FU.roomDataReset = function () {
            GV.start_time = !1, GV.vbt_n = 30, GV.tweet_B = !1, GV.auto_gp = !1, GV.first_tweet = !0, $("#auto_count").removeClass("end").find("p").text(GV.comm_n), $("#video_con_box").show(), FU.log();
            try {
              if (SRApp.store.get("isOfficial")) var l = GV.star_vb_log;
              else l = GV.seed_vb_log;
              l[String(SRApp.store.get("liveId"))] ? ($("#get_icon_area .view").addClass("get"), $("#one_click_tweet img").addClass("on")) : ($("#get_icon_area .view").removeClass("get"), $("#one_click_tweet img").removeClass("on"))
            } catch (e) {}
            setTimeout(function () {
              FU.currentUser()
            }, 2e3)
          }, window.startLive = function () {
            SRApp.vent.trigger("startLive"), FU.liveStart()
          }, window.endLive = function (t) {
            SRApp.vent.trigger("endLive", t), FU.liveEnd()
          }, SRApp.vent.off("changeRoomStatus"), SRApp.vent.on("changeRoomStatus", function (e) {
            var id = SRApp.store.get("roomId");
            if (SRApp.view.model.change(e), GV.auto_reload) SRApp.vent.trigger("reloadWindow");
            else var room_change = setInterval(function () {
              id != SRApp.store.get("roomId") && (clearInterval(room_change), FU.roomDataChange())
            }, 500)
          }), SRApp.vent.off("fetchAvatar"), SRApp.vent.on("fetchAvatar", (t = SRApp.view, async function () {
            var d = await t.subViews.canvasView.fetchAvatar();
            GV.stage_rank = 0;
            for (var i = 0, len = d.length; i < len; i++) d[i] == SRApp.store.get("userId") && (GV.stage_in = !0, GV.stage_rank = i + 1);
            return GV.stage_in && 0 == GV.stage_rank && 0 != SRApp.store.get("liveId") && 0 != SRApp.store.get("startedAt") && SRApp.store.get("startedAt") + 3500 < GV.now_unix_time && (GV.stage_in = !1, FU.ava_out()), d
          })), FU.ava_out = function () {
            GV.ava_out_noti && (FU.pop_c("ava_out", FU.local_url("/img/user.png"), "アバターアウト", 15e3), $("#telop").css("opacity", "0"), SRApp.vent.trigger("hideTelop"), GV.ava_out_se && FU.soundPop("pop.mp3", Number($("#config_area .elapsed_time_noti_se .se_volume").attr("value")) / 100), $(".l-room-video").append('<div id="ava_enter_box"><button id="ava_enter" class="ava_enter" title="視聴ボーナスを取得します。\n(取得制限中は取得しません)">アバターを戻す</button><button id="ava_enter_close" class="ava_enter">✕</button></div>'), $(".ava_enter").on("click", function () {
              "ava_enter" == $(this).attr("id") && FU.viewBonus(), $("#telop").css("opacity", "1"), SRApp.vent.trigger("fetchTelop"), $("#ava_enter_box").remove()
            }))
          }, SRApp.view.adapter.socket.onmessage = function (e) {
            if (e.data.split("\t")[2]) {
              var t = JSON.parse(e.data.split("\t")[2]);
              if (101 == t.t) {
                GV.live_data = JSON.parse($("#js-live-data").attr("data-json"));
                var end = FU.timeChange(t.created_at);
                GV.end_time = end.h + ":" + end.m + ":" + end.s + " (" + Math.floor((t.created_at - GV.live_data.room.last_lived_at) / 60) + ":" + (t.created_at - GV.live_data.room.last_lived_at) % 60 + ")"
              }
              SRApp.view.adapter.dataHandler(e)
            }
          }
        }, GV.version = "3.2.10", GV.check_try_n = 0, FU.check = function () {
          $("#suko_area").length || (GV.check_try_n++, SRApp.view && SRApp.view.subViews ? (GV.debug && console.log("---check---"), FU.hash(), FU.nowTime(), FU.log(), FU.liveDataChange(), FU.dom_C(), FU.icon_C(), FU.etc_C(), FU.videoController_C(), FU.giftBox_C(), FU.getLogBox_C(), FU.config(), FU.roomPoint(), setTimeout(function () {
            FU.roomProfile(!0), $.each(localStorage, function (k, v) {
              k.match("count_log_") && GV.now_unix_time - JSON.parse(v).t > 86400 && localStorage.removeItem(k)
            }), 0 != SRApp.store.get("liveId") && SRApp.vent.trigger("fetchAvatar")
          }, 2e3)) : setTimeout(function () {
            GV.debug && console.log("---retry---"), FU.check()
          }, 500))
        }, $(window).load(function () {
          GV.check = !0, FU.check()
        }), setTimeout(function () {
          GV.check || FU.check()
        }, 1e3)
      }
    })
  }
});