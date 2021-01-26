$(function () {
  Debug = !1, GV = {}, FU = {}, GV.sru = "https://www.showroom-live.com", console.log("---SR Background---"), chrome.runtime.onMessage.addListener(function (re, sender, send) {
    switch (Debug && console.log(re), re.method) {
    case "getLength":
      send({
        data: localStorage.length
      });
      break;
    case "getItem":
      send({
        data: JSON.parse(localStorage.getItem(re.key))
      });
      break;
    case "setItem":
      if (send({
          data: localStorage.setItem(re.key, re.value)
        }), "option_list" != re.key && "black_list" != re.key && "time_table_list" != re.key && "follow_room_list" != re.key && "desktopPop_log" != re.key && "remove_comm_list" != re.key || FU.configLoad(), "check_list" == re.key) {
        FU.configLoad();
        var now_time = GV.now_time_unix + 30;
        try {
          clearInterval(GV.bcsvr_key_get_timer)
        } catch (e) {}
        GV.bcsvr_key_get_timer = setInterval(function () {
          now_time <= GV.now_time_unix && (clearInterval(GV.bcsvr_key_get_timer), FU.anteRoomBcsvrKey())
        }, 1e3)
      }
      "follow_list" == re.key && (FU.configLoad(), FU.csrfToken("follow"), Follow_list = JSON.parse(re.value)), "user_id" == re.key && FU.userData(re.value), "suko_data" == re.key && (GV.suko_data = JSON.parse(re.value) ? JSON.parse(re.value) : {}), "suko_get_log" == re.key && (GV.suko_log = JSON.parse(re.value) ? JSON.parse(re.value) : {});
      break;
    case "function":
      if ("fr_comm_remove" == re.key) {
        var d = JSON.parse(re.value);
        GV.remove_comm_li[d.id] = {
          name: d.name,
          comment: d.comment,
          created_at: d.created_at,
          user_id: d.user_id
        }, localStorage.setItem("remove_comm_list", JSON.stringify(GV.remove_comm_li)), FU.csrfToken("fc_remove", {
          id: d.id
        })
      }
      "csrf_token" == re.key && FU.csrfToken("none"), "tab_open" == re.key && FU.tabOpen(JSON.parse(re.value));
      break;
    case "removeItem":
      send({
        data: localStorage.removeItem[re.key]
      });
      break;
    case "clearAll":
      send({
        data: localStorage.clear()
      })
    }
    return !0
  }), FU.csrfToken = function (type, d_list) {
    $.get(GV.sru + "/follow", function (d) {
      GV.csrf_token = $(d).find("#js-signup-form input").attr("value"), localStorage.setItem("csrf_token", GV.csrf_token), $(d).find(".side-owner-menu-box").length ? localStorage.setItem("is_owner", !0) : localStorage.setItem("is_owner", !1), "follow" == type && (GV.follow_num = GV.fo.length - 1, FU.followOnOff(0)), "fc_remove" == type && FU.commentDelete(d_list.id)
    })
  }, FU.onliveRoom = function (li) {
      console.log("---function onlive Room---"), $.get(GV.sru + "/api/live/onlives?skip_serial_code_live=1&_=" + Date.parse(new Date), function (d) {
      for (var i = 1, ro = [], onli = d.onlives, len = onli.length; i < len; i++)
        for (var ge = onli[i].lives, ii = 0; ii < ge.length; ii++) try {
          ro.push(ge[ii].room_url_key)
        } catch (e) {}
      for (i = 0; i < li.length; i++) - 1 == ro.indexOf(li[i]) && FU.roomInfo(li[i])
    })
  }, FU.tabOpen = function (a) {
    chrome.tabs.getAllInWindow(undefined, function(tabs) {
      if (tabs.length > 40) {
        return;
      }
    });
   
    if (GV.suko_log) {
      var ng = [];
      try {
        var live_con_li = GV.suko_data.live_config;
        $.each(live_con_li, function (k, v) {
          k.match("room_open_ex_") && v && ng.push(k.replace("room_open_ex_", ""))
        })
      } catch (e) {}
      var li, def = {
          tw: 0,
          vi: 0,
          re_1: 0,
          re_2: 0
        },
        orl = {},
        open_doing = [],
        vbl = [],
        tbl = [];
      if (1 == a.ty)
        for (var con = GV.suko_log.hasOwnProperty("star_re_log") ? GV.suko_log.star_re_log : def, i = 0, len = (li = GV.suko_log.star_get_log).length; i < len; i++) "tw" == li[i].type ? tbl.push(li[i].id) : "vi" == li[i].type && vbl.push(li[i].id);
      else
        for (con = GV.suko_log.hasOwnProperty("seed_re_log") ? GV.suko_log.seed_re_log : def, i = 0, len = (li = GV.suko_log.seed_get_log).length; i < len; i++) "tw" == li[i].type ? tbl.push(li[i].id) : "vi" == li[i].type && vbl.push(li[i].id);
      a.vb || (vbl = []), a.tb || (tbl = []), chrome.tabs.getAllInWindow(function (t) {
        for (var i = 0, len = t.length; i < len; i++) {
          var d = t[i],
            n = d.url.indexOf("?"); - 1 != d.url.indexOf("?") ? open_doing.push(d.url.slice(0, n).replace("https://www.showroom-live.com/", "")) : open_doing.push(d.url.replace("https://www.showroom-live.com/", "")), d.active && (GV.tid = d.id)
        }
      });
      try {
        clearInterval(GV.tab_open)
      } catch (e) {}
      $.each(GV.open_room_log, function (k, v) {
        Number(v) + 300 < GV.now_time_unix && delete GV.open_room_log[k]
      }), $.get(GV.sru + "/api/live/onlives?_=1", function (re) {
        for (var i = 1, len = re.onlives.length; i < len; i++)
          for (var d = re.onlives[i], ii = 1, len_2 = d.lives.length; ii < len_2; ii++)
            if (d.lives[ii].official_lv == a.ty && -1 == open_doing.indexOf(d.lives[ii].room_url_key) && -1 == ng.indexOf(d.lives[ii].room_url_key) && 0 == d.lives[ii].live_type && 0 == d.lives[ii].premium_room_type) {
              if ("1" != a.gt && "2" != a.gt || !GV.open_room_log[d.lives[ii].room_url_key]) rin = !0;
              else var rin = !1;
              rin && -1 == vbl.indexOf(String(d.lives[ii].live_id)) && -1 == tbl.indexOf(String(d.lives[ii].live_id)) && (orl[String(d.lives[ii].live_id)] = {
                rk: d.lives[ii].room_url_key
              })
            }
        var open_n = a.n,
          rn_li = (con.vi, []);
        if (2 == a.gt) var time = 40;
        else time = 30 * open_n + 10;
        for (a.cl && 0 != a.gt || (time = 999), i = 0; i < 50; i++) rn_li.push(FU.randomNum(Object.keys(orl).length - 1, 0));
        rn_li = Array.from(new Set(rn_li)), i = 0;
        for (var ob = Object.keys(orl); i < open_n; i++) {
          var id = ob[rn_li[i]];
          if (!orl[id]) {return;}
          var url = GV.sru + "/" + orl[id].rk + "?gt=" + a.gt + "&time=" + time + "&ty=" + a.ty;
          GV.open_room_log[String(orl[id].rk)] = GV.now_time_unix, chrome.tabs.create({
            url: url
          })
        }
        try {
          chrome.tabs.update(GV.tid, {
            active: !0
          })
        } catch (e) {}
      })
    }
  }, GV.now_time_unix = 0, GV.auto_sort_start = !1, FU.nowTime = function () {
    setInterval(function () {
      var now_time = new Date;
      GV.now_time_unix = Math.floor(Math.round(now_time) / 1e3), GV.now_time_unix_c = Math.floor(Math.round(now_time)), GV.now_hm = ("0" + now_time.getHours()).slice(-2) + ("0" + now_time.getMinutes()).slice(-2), GV.op.all_noti && (GV.op.reget_time_noti && FU.reGetNoti(), FU.onliveNoti()), FU.followLiSortNoti()
    }, 1e3)

    // フォローリストcheckのためのインターバル 海老名マルシェ
    setInterval(function () {
      FU.followRoomCheck();
    }, 8 * 1000)
  }, FU.zeroFill = function (a, b) {
    return ("0000000000" + a).slice(-b)
  }, FU.randomNum = function (max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }, FU.timeChange = function (t) {
    if (0 == t) return {
      mo: " -- ",
      d: " -- ",
      h: " -- ",
      m: " -- ",
      s: " -- "
    };
    10 == String(t).length && (t *= 1e3);
    let d = new Date(Number(t));
    return {
      mo: FU.zeroFill(d.getMonth() + 1, 2),
      d: FU.zeroFill(d.getDate(), 2),
      h: FU.zeroFill(d.getHours(), 2),
      m: FU.zeroFill(d.getMinutes(), 2),
      s: FU.zeroFill(d.getSeconds(), 2)
    }
  }, FU.reGetNoti = function () {
    if (GV.suko_log.star_re_log) {
      var re_1 = GV.suko_log.star_re_log.re_1,
        re_2 = GV.suko_log.star_re_log.re_2,
        noti_num = Number(GV.op.reget_time_noti_num);
      if (re_1 || re_2) {
        if (re_1 && re_2)
          if (re_1 > GV.now_unix_time_c && re_1 + 6e4 < re_2 || re_1 + 6e4 < re_2 && re_1 + 36e5 > re_2 || re_1 > re_2) var star_ret = re_1;
          else star_ret = re_1 < re_2 ? re_2 : re_1;
        else re_1 ? star_ret = re_1 : re_2 && (star_ret = re_2);
        if (GV.now_time_unix + noti_num > Math.floor(star_ret / 1e3) && GV.now_time_unix + noti_num - 5 < Math.floor(star_ret / 1e3) && !GV.reset_se_star) {
          GV.reset_se_star = !0;
          var d = {
            type: "reget",
            id: "star_" + star_ret,
            img: "./img/pop_star.png",
            title: "解除時間 " + (dt = FU.timeChange(star_ret)).h + ":" + dt.m + ":" + dt.s,
            message: "まもなく星の解除時間です。",
            time: GV.now_time_unix
          };
          FU.desktopPop(d), setTimeout(function () {
            GV.reset_se_star = !1
          }, 1e4)
        }
      }
    }
    if (GV.suko_log.seed_re_log && (re_1 = GV.suko_log.seed_re_log.re_1, re_2 = GV.suko_log.seed_re_log.re_2, noti_num = Number(GV.op.reget_time_noti_num), re_1 || re_2)) {
      if (re_1 && re_2)
        if (re_1 > GV.now_unix_time_c && re_1 + 6e4 < re_2 || re_1 + 6e4 < re_2 && re_1 + 36e5 > re_2 || re_1 > re_2) var seed_ret = re_1;
        else seed_ret = re_1 < re_2 ? re_2 : re_1;
      else re_1 ? seed_ret = re_1 : re_2 && (seed_ret = re_2);
      var dt;
      if (GV.now_time_unix + noti_num > Math.floor(seed_ret / 1e3) && GV.now_time_unix + noti_num - 5 < Math.floor(seed_ret / 1e3) && !GV.reset_se_seed) GV.reset_se_seed = !0, d = {
        type: "reget",
        id: "seed_" + seed_ret,
        img: "./img/pop_seed.png",
        title: "解除時間 " + (dt = FU.timeChange(seed_ret)).h + ":" + dt.m + ":" + dt.s,
        message: "まもなく種の解除時間です。",
        time: GV.now_time_unix
      }, FU.desktopPop(d), setTimeout(function () {
        GV.reset_se_seed = !1
      }, 1e4)
    }
  }, FU.onliveNoti = function () {
    $.each(GV.ti, function (k1, v1) {
      "undefined" != $.type(GV.ch.onlive[String(k1)]) && GV.op.live_noti && GV.op.live_booking_noti && "undefined" != $.type(GV.ch.onlive[String(k1)]) && 1 == GV.ch.onlive[String(k1)].check && Object.keys(GV.for).indexOf(String(k1)) >= 0 && GV.now_time_unix + (void 0 == GV.op.live_booking_noti_num ? 10 : Number(GV.op.live_booking_noti_num)) == v1[0] && $.each(GV.for, function (k2, v2) {
        if (k2 == String(k1)) {
          var d = {
            type: "onlive",
            room_url_key: v2.room_url_key,
            room_id: k1,
            id: String(k1) + "_" + String(v1[0]),
            img: "./img/live_on_3.png",
            title: v2.room_name,
            message: "まもなく配信予定時間です。",
            time: GV.now_time_unix
          };
          FU.desktopPop(d)
        }
      }), "undefined" != $.type(GV.ch.time_notice[String(k1)]) && GV.op.time_noti && 1 == GV.ch.time_notice[String(k1)].check && Object.keys(GV.for).indexOf(String(k1)) >= 0 && GV.now_time_unix + 60 * Number(GV.op.time_noti_num) == v1[0] && $.each(GV.for, function (k2, v2) {
        if (k2 == String(k1)) {
          var d = {
            type: "time_notice",
            room_url_key: v2.room_url_key,
            room_id: k1,
            id: String(k1) + "_" + String(GV.now_time_unix),
            img: "./img/live_on_3.png",
            title: v2.room_name,
            message: "通知時間になりました。",
            time: GV.now_time_unix
          };
          FU.desktopPop(d)
        }
      })
    })
  }, FU.followLiSortNoti = function () {
    0 == GV.auto_sort_start && GV.op.auto_follow_list_sort && (GV.now_hm != GV.auto_sort_time_1 && GV.now_hm != GV.auto_sort_time_2 || (GV.auto_sort_start = !0, setTimeout(function () {
      GV.auto_sort_start = !1
    }, 62e3), FU.csrfToken("follow")))
  }, FU.desktopPop = function (d) {
    Debug && console.log(d);
    var id = d.type + "_" + d.id;
    for (d.id = id, GV.de.unshift(d); GV.de.length > 100;) GV.de.pop();
    localStorage.setItem("desktopPop_log", JSON.stringify(GV.de)), chrome.notifications.create(id, {
      type: "basic",
      iconUrl: d.img,
      title: d.title,
      message: d.message,
      requireInteraction: GV.noti[d.type]
    })
  }, chrome.notifications.onClicked.addListener(id => {
    $.each(GV.de, function (k, v) {
      id == v.id && ("onlive" == v.type && window.open(GV.sru + "/" + v.room_url_key), "fr" == v.type && window.open(GV.sru + "/room/fan_club?room_id=" + v.room_id), "time_notice" == v.type && window.open(GV.sru + "/onlive"), "reget" == v.type && window.open(GV.sru + "/onlive"))
    })
  }), FU.timeTable = function () {
    $.get(GV.sru + "/api/time_table/time_tables", function (d) {
      var un = Math.floor((new Date).getTime() / 1e3),
        ti = d.time_tables;
      GV.ti = {};
      for (var i = 0, len = ti.length; i < len; i++)
        if (ti[i].is_follow) {
          var ro = void 0 == GV.ti[String(ti[i].room_id)] ? [] : GV.ti[String(ti[i].room_id)];
          Number(un) < Number(ti[i].started_at) && ro.push(ti[i].started_at), GV.ti[String(ti[i].room_id)] = ro
        }
      localStorage.setItem("time_table_list", JSON.stringify(GV.ti)), setTimeout(function () {
        FU.timeTable()
      }, 6e4)
    })
  }, FU.followOnOff = function (t) {
    GV.follow_num >= 0 && $.post(GV.sru + "/api/room/follow", "room_id=" + GV.fo[GV.follow_num] + "&flag=" + t + "&csrf_token=" + GV.csrf_token).done(function (d) {
      0 == t ? FU.followOnOff(1) : (GV.follow_num--, setTimeout(function () {
        FU.followOnOff(0)
      }, 1e3))
    }).fail(function (e) {})
  }, GV.webS = null, GV.bclo = !1, GV.fr_stop_room = {}, GV.fr_stop_user = {}, FU.ConnectionStart = function () {
    null == GV.webS && (GV.webS = new WebSocket("ws://online.showroom-live.com:8080"), GV.webS.onopen = FU.OnOpen, GV.webS.onmessage = FU.OnMessage, GV.webS.onclose = FU.OnClose, GV.webS.onerror = FU.OnError, 0 == GV.bclo && (setTimeout(FU.bcKPL, 5e3), GV.bclo = setInterval(FU.bcKPL, 3e4)))
  }, FU.OnOpen = function (e) {
    Debug && console.log("【サーバーに接続しました。】", new Date)
  }, FU.OnMessage = function (e) {
    e && e.data && FU.Chat(e.data)
  }, FU.OnError = function (e) {
    Debug && console.log("【エラーが発生しました。】", e, new Date)
  }, FU.OnClose = function (e) {
    Debug && console.log("【切断しました。再接続します】", new Date), GV.webS = null, clearInterval(GV.bclo), GV.bclo = !1, FU.ConnectionStart()
  }, FU.bcKPL = function () {
    Debug && console.log(GV.bckr), $.each(GV.ch.fr, function (k, v) {
      v.check && GV.webS.send("SUB\tfan_com_" + k)
    }), $.each(GV.bckr, function (k, v) {
      try {
        GV.ch.onlive[String(v.room_id)].check && GV.webS.send("SUB\t" + v.broadcast_key)
      } catch (e) {}
    })
  }, FU.Chat = function (t) {
    try {
      if (!t.split("\t")[2]) return;
      var msg = JSON.parse(t.split("\t")[2]),
        msgr = t.substring(3, t.search("{")).trim()
    } catch (e) {
      return
    }
    if (Debug && console.log(msg), "104" == String(msg.t) && GV.op.live_start_noti && GV.op.live_noti && GV.op.all_noti && $.each(GV.bckr, function (k, v) {
        if (v.broadcast_key == msgr && GV.ch.onlive[String(v.room_id)].check && Object.keys(GV.for).indexOf(String(v.room_id)) >= 0) {
          var d = {
            type: "onlive",
            room_url_key: String(k),
            room_id: v.room_id,
            id: v.room_id + "_" + msg.created_at,
            img: "./img/live_on.png",
            title: v.room_name,
            message: "配信を開始しました。",
            time: GV.now_time_unix
          };
          FU.desktopPop(d)
        }
      }), (200 == Number(msg.t) || 201 == Number(msg.t)) && GV.op.fr_noti && GV.op.all_noti && $.each(GV.bckr, function (key, value) {
        var rid = value.room_id,
          room_name = value.room_name;
        if ("fan_com_" + rid == msgr && 1 == GV.ch.fr[String(rid)].check && Object.keys(GV.for).indexOf(String(rid)) >= 0) {
          var type = msg.pt,
            name = msg.n,
            owner = msg.ro,
            comment = msg.s,
            id = msg.id,
            user_id = msg.u,
            created_at = msg.created_at,
            cd = !1;
          if (comment && comment.match(GV.op.fr_text_comm.replace(/\s+/g, "")) && GV.op.fr_text_comm.replace(/\s+/g, "").length >= 2 ? 1 == type && GV.op.fr_text_comm_noti && (cd = {
              type: "fr",
              room_url_key: String(key),
              room_id: rid,
              id: rid + "_" + id + "_" + created_at,
              img: "./img/live_on_2.png",
              title: room_name,
              message: "【指定コメント】" + name + " : " + comment,
              time: GV.now_time_unix
            }) : 1 == owner ? (4 == type && GV.op.fr_owner_in_noti && (cd = {
              type: "fr",
              room_url_key: String(key),
              room_id: rid,
              id: rid + "_" + id + "_" + created_at,
              img: "./img/live_on_2.png",
              title: room_name,
              message: name + "さんが入室しました。",
              time: GV.now_time_unix
            }), 1 == type && GV.op.fr_owner_comm_noti && (cd = {
              type: "fr",
              room_url_key: String(key),
              room_id: rid,
              id: rid + "_" + id + "_" + created_at,
              img: "./img/live_on_2.png",
              title: room_name,
              message: name + " : " + comment,
              time: GV.now_time_unix
            }), 2 == type && GV.op.fr_img_noti && (cd = {
              type: "fr",
              room_url_key: String(key),
              room_id: rid,
              id: rid + "_" + id + "_" + created_at,
              img: "./img/live_on_2.png",
              title: room_name,
              message: name + "さんが画像を投稿しました。",
              time: GV.now_time_unix
            })) : 1 == type && GV.op.fr_fan_comm_noti && (cd = {
              type: "fr",
              room_url_key: String(key),
              room_id: rid,
              id: rid + "_" + id + "_" + created_at,
              img: "./img/live_on_2.png",
              title: room_name,
              message: name + " : " + comment,
              time: GV.now_time_unix
            }), GV.op.fr_comm_noti_stop && cd) {
            var fr_stop_n = void 0 == GV.op.fr_stop_fr_num && "number" != $.type(GV.op.fr_stop_fr_num) ? 0 : GV.op.fr_stop_fr_num,
              fr_stop_user_n = void 0 == GV.op.fr_stop_user_num && "number" != $.type(GV.op.fr_stop_user_num) ? 0 : GV.op.fr_stop_user_num;
            0 != fr_stop_n && ($.each(GV.fr_stop_room, function (k, v) {
              k == String(rid) && GV.now_time_unix <= v && (cd = !1)
            }), 0 != cd && (GV.fr_stop_room[String(rid)] = GV.now_time_unix + 60 * fr_stop_n)), 0 != fr_stop_user_n && 0 != cd && ($.each(GV.fr_stop_user, function (k, v) {
              k == String(user_id) && GV.now_time_unix <= v && (cd = !1)
            }), 0 != cd && (GV.fr_stop_user[String(user_id)] = GV.now_time_unix + 60 * fr_stop_user_n))
          }
          cd && FU.desktopPop(cd)
        }
      }), "fan_com_" + GV.my_r_id == msgr && 200 == Number(msg.t) && GV.op.fan_ma) {
      var name = msg.n,
        comm = msg.s,
        id = msg.id,
        uid = msg.u,
        at = msg.created_at;
      if ((void 0 == GV.op.bl_li_sw || GV.op.bl_li_sw) && $.each(GV.bl, function (k, v) {
          String(uid) == String(k) && (Debug && console.log("【削除】" + name + " : " + comm), GV.remove_comm_li[String(id)] = {
            name: $.trim(name),
            comment: comm,
            created_at: at,
            user_id: uid
          }, localStorage.setItem("remove_comm_list", JSON.stringify(GV.remove_comm_li)), FU.csrfToken("fc_remove", {
            id: id
          }))
        }), GV.op.desi_comm_ban) {
        var de = GV.op.desi_comm_ban_t.replace(/\s+/g, ""); - 1 != comm.replace(/\s+/g, "").indexOf(de) && de.length >= 2 && (Debug && console.log("【削除】" + name + " : " + comm), GV.remove_comm_li[String(id)] = {
          name: $.trim(name),
          comment: comm,
          created_at: at,
          user_id: uid
        }, localStorage.setItem("remove_comm_list", JSON.stringify(GV.remove_comm_li)), FU.csrfToken("fc_remove", {
          id: id
        }))
      }
      if (GV.op.lot_comm_ban)
        if (void 0 == GV.lot_comm_user_list[String(uid)]) GV.lot_comm_user_list[String(uid)] = {
          remove_at: Number(at) + Number(GV.op.lot_comm_ban_tin),
          post_num: 1
        };
        else if (GV.now_time_unix >= GV.lot_comm_user_list[String(uid)].remove_at) GV.lot_comm_user_list[String(uid)] = {
        remove_at: Number(at) + Number(GV.op.lot_comm_ban_tin),
        post_num: 1
      };
      else {
        var post_num = GV.lot_comm_user_list[String(uid)].post_num + 1,
          remove_at = GV.lot_comm_user_list[String(uid)].remove_at;
        GV.lot_comm_user_list[String(uid)] = {
          remove_at: remove_at,
          post_num: post_num
        }, Number(GV.op.lot_comm_ban_cn) < post_num && (Debug && console.log("【削除】" + name + " : " + comm), GV.remove_comm_li[String(id)] = {
          name: $.trim(name),
          comment: comm,
          created_at: at,
          user_id: uid
        }, localStorage.setItem("remove_comm_list", JSON.stringify(GV.remove_comm_li)), FU.csrfToken("fc_remove", {
          id: id
        }))
      }
    }
  }, FU.followRoomCheck = function () {
    // add 海老名マルシェ
    chrome.tabs.getAllInWindow(null, function(tabs) {
      if (tabs.length > 100) {
        console.log("---なんかタブ多すぎるので閉じれるの閉じます---");
        FU.closeTab();
        return;
      } else {
        console.log('https://www.showroom-live.com/undefined 監視');
        for (var i = 1; i < tabs.length; i++) {
          console.log(tabs[i].url);
          if (tabs[i].url == 'https://www.showroom-live.com/undefined') {
            console.log('閉じるよ' + tabs[i].url);
           chrome.tabs.remove(tabs[i].id, null);
          }
        } 
      }
    });
    var e = GV.sru + "/follow";
    console.log("---フォロールームの状況確認---")
    $.ajax({
      url: e,
      type: "GET",
      cache: false,
      success: function (e) {
        // console.log(e);
        var t = $(e).find("#js-genre-section-all .listcardinfo-main-text"),
          o = $(e).find("#js-genre-section-all .profile-link"),
          i = $(e).find("#js-genre-section-all .room-url:even"),
          n = $(e).find("#js-genre-section-all .icon-camera-gray");
        for (var _ = 0; _ < o.length; _++) {
          if (n[_].classList.contains('is-active')) {
            var c = i[_].pathname.replace("/", "");
              console.log(t[_]);
              console.log(c);
              var url = GV.sru + "/" + c;
              FU.followopen(url);
          }
        }
      },
      error: function (e, t, o) {}
    })
  }, FU.closeTab = function() {
    chrome.tabs.getAllInWindow(null, function (tabs) {
      for (var i = 1; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id, null);
      }
  });
    }, FU.followopen = function (open_url) {
    // add 海老名マルシェ
    chrome.tabs.getAllInWindow(null, function(tabs) {
      for (var i = 0, tab; tab = tabs[i]; i++) {
        console.log(tab.url);
        if (!tab.url.indexOf('devtools:')) {
          console.log('devtools:は邪悪');
          return;
        }
        if (tab.url && tab.url == open_url) {
          return;
        }
      }
      chrome.tabs.create({url: open_url});
    });
  }, FU.commentDelete = function (id) {
    var p = "csrf_token=" + GV.csrf_token + "&room_id=" + GV.my_r_id + "&chat_id=" + id;
    $.post(GV.sru + "/fan_room/delete", p).done(function (d) {}).fail(function () {})
  }, FU.roomInfo = function (k) {
    Debug && console.log("---roomInfo---");
    var url = GV.sru + "/api/room/status?room_url_key=" + k;
    $.get(url, function (d) {
      Debug && console.log(d), 0 == d.is_live && (GV.bckr[k] = {
        room_id: d.room_id,
        broadcast_key: d.broadcast_key,
        room_name: d.room_name
      })
    })
  }, FU.userData = function (id) {
    $.get(GV.sru + "/api/user/profile?user_id=" + id, function (d) {
      d.room_profile ? (localStorage.setItem("my_room_id", d.room_profile.room_id), GV.my_r_id = d.room_profile.room_id, localStorage.setItem("my_room_url_key", d.room_profile.room_url_key), localStorage.setItem("my_is_live", d.room_profile.live_id), localStorage.setItem("is_owner", !0)) : (GV.my_r_id = 0, localStorage.setItem("is_owner", !1))
    })
  }, FU.anteRoomBcsvrKey = function () {
    Debug && console.log("【anteRoomBcsvrKey】"), GV.bckr = {};
    var li = [];
    $.each(GV.ch.onlive, function (k, v) {
      v.check && li.push(v.room_url_key)
    }), $.each(GV.ch.fr, function (k, v) {
      v.check && li.push(v.room_url_key)
    }), FU.onliveRoom(li)
  }, GV.de = [], GV.open_room_log = {}, GV.my_r_id = 0, GV.con_ini = {
    all_noti: !0,
    live_noti: !0,
    live_booking_noti: !0,
    live_start_noti: !0,
    fr_noti: !0,
    fr_owner_in_noti: !0,
    fr_owner_comm_noti: !0,
    fr_img_noti: !0,
    fr_fan_comm_noti: !0,
    fr_text_comm_noti: !1,
    fr_text_comm: "",
    fr_comm_noti_stop: !1,
    time_noti: !1,
    auto_follow_list_sort: !1,
    time_noti: !1,
    reget_time_noti: !1,
    fanroom_manage: !1,
    bl_li_sw: !0,
    lot_comm_ban: !1,
    desi_comm_ban: !1,
    desi_comm_ban_t: !1,
    time_noti_num: 45,
    reget_time_noti_num: 0,
    lot_comm_ban_tin: 0,
    lot_comm_ban_cn: 0
  }, FU.configLoad = function () {
    Debug && console.log("【configLoad】"), GV.lot_comm_user_list = {}, GV.noti = {}, void 0 == JSON.parse(localStorage.getItem("time_table_list")) ? GV.ti = {} : GV.ti = JSON.parse(localStorage.getItem("time_table_list")), void 0 == JSON.parse(localStorage.getItem("check_list")) ? GV.ch = {
      onlive: {},
      fr: {},
      time_notice: {}
    } : GV.ch = JSON.parse(localStorage.getItem("check_list")), void 0 == JSON.parse(localStorage.getItem("follow_room_list")) ? GV.for = {} : GV.for = JSON.parse(localStorage.getItem("follow_room_list")), void 0 == JSON.parse(localStorage.getItem("desktopPop_log")) ? GV.de = [] : GV.de = JSON.parse(localStorage.getItem("desktopPop_log")), void 0 == JSON.parse(localStorage.getItem("option_list")) ? GV.op = {} : GV.op = JSON.parse(localStorage.getItem("option_list")), void 0 == JSON.parse(localStorage.getItem("follow_list")) ? GV.fo = [] : GV.fo = JSON.parse(localStorage.getItem("follow_list")), void 0 == JSON.parse(localStorage.getItem("black_list")) ? GV.bl = {} : GV.bl = JSON.parse(localStorage.getItem("black_list")), void 0 == JSON.parse(localStorage.getItem("remove_comm_list")) ? GV.remove_comm_li = {} : GV.remove_comm_li = JSON.parse(localStorage.getItem("remove_comm_list")), void 0 == JSON.parse(localStorage.getItem("suko_get_log")) ? GV.suko_log = {} : GV.suko_log = JSON.parse(localStorage.getItem("suko_get_log")), void 0 == JSON.parse(localStorage.getItem("suko_data")) ? GV.suko_data = {} : GV.suko_data = JSON.parse(localStorage.getItem("suko_data")), GV.auto_sort_time_1 = void 0 == GV.op.auto_sort_h_1 ? "0000" : ("0" + GV.op.auto_sort_h_1).slice(-2) + ("0" + GV.op.auto_sort_m_1).slice(-2), GV.auto_sort_time_2 = void 0 == GV.op.auto_sort_h_2 ? "0000" : ("0" + GV.op.auto_sort_h_2).slice(-2) + ("0" + GV.op.auto_sort_m_2).slice(-2), GV.noti.onlive = void 0 != GV.op.noti_inf_onlive && GV.op.noti_inf_onlive, GV.noti.fr = void 0 != GV.op.noti_inf_fr && GV.op.noti_inf_fr, GV.noti.time_notice = void 0 != GV.op.noti_inf_time && GV.op.noti_inf_time, GV.noti.reget = void 0 != GV.op.reget_time_noti_inf_time && GV.op.reget_time_noti_inf_time, $.each(GV.con_ini, function (k, v) {
      void 0 == GV.op[k] && (GV.op[k] = v)
    }), Debug && (console.log(GV.ti), console.log(GV.ch), console.log(GV.for), console.log(GV.de), console.log(GV.op), console.log(GV.fo), console.log(GV.bl))
  }, FU.getTimer = function () {
    FU.anteRoomBcsvrKey(), 0 == GV.my_r_id && localStorage.getItem("user_id") && FU.userData(localStorage.getItem("user_id"))
  }, FU.configLoad(), FU.csrfToken("none"), FU.nowTime(), FU.timeTable(), FU.getTimer(), FU.ConnectionStart(), setInterval(function () {
    FU.getTimer(), FU.configLoad()
  }, 3e5)
});