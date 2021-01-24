$(function () {
  if ("https://www.showroom-live.com/follow" == location.href) {
    console.log("---follow---"), FU = {}, GV = {}, $("<link>", {
      rel: "stylesheet",
      type: "text/css",
      href: chrome.extension.getURL("/css/follow.css")
    }).appendTo("head"), FU.followListSortStart = function () {
      Follow_save_num = null == localStorage.getItem("follow_sort_num") ? 5 : localStorage.getItem("follow_sort_num"), Follow_sort_time = !1, $("<div>", {
        id: "follow_sort_button"
      }).insertBefore(".select-form"), $("<p>", {
        text: "並び替え"
      }).appendTo("#follow_sort_button"), $("<div>", {
        id: "follow_sort_box"
      }).prependTo("#js-genre-section-all"), $("#follow_sort_box").css("display", "none"), $("#follow_sort_button").css({
        position: "absolute",
        top: "10px",
        right: "45px",
        width: "90px",
        height: "30px",
        background: "#607D8B",
        "border-radius": "2px",
        margin: "0 5px"
      }), $(".l-genre-select-box").css({
        right: "145px"
      }), $("#follow_sort_button").css({
        position: "absolute",
        top: "10px",
        right: GV.right_list.follow_sort,
        width: "90px",
        height: "30px",
        background: "#607D8B",
        "border-radius": "2px",
        margin: "0"
      }), $("<select>", {
        id: "follow_sort_start_num",
        class: "follow_sort_num",
        value: 1
      }).appendTo("#follow_sort_box");
      for (var i = 0; i <= 59; i++) $("<option>", {
        value: i,
        text: i + 1 + "番目から"
      }).appendTo("#follow_sort_start_num");
      for ($("<select>", {
          id: "follow_sort_end_num",
          class: "follow_sort_num",
          value: 5
        }).appendTo("#follow_sort_box"), i = 1; i <= 60; i++) $("<option>", {
        value: i,
        text: i + "番目まで"
      }).appendTo("#follow_sort_end_num");
      $("#follow_sort_end_num").val(Follow_save_num), $("<button>", {
        id: "follow_sort_save_button",
        text: "保存"
      }).appendTo("#follow_sort_box"), $("<button>", {
        id: "follow_sort_load_button",
        text: "読み込み"
      }).appendTo("#follow_sort_box"), FU.followListSort = function () {
        $(".follow_up").remove(), $(".follow_down").remove(), $(".js-follow-li").removeClass("follow_sort_target"), $("#js-genre-section-all .listcardinfo-menu ul").each(function (i) {
          $("<li>", {
            class: "follow_up"
          }).appendTo(this), $("<li>", {
            class: "follow_down"
          }).appendTo(this), i >= $("#follow_sort_start_num").val() && i < $("#follow_sort_end_num").val() && $(".js-follow-li").eq(i).addClass("follow_sort_target")
        }), $("<img>", {
          src: chrome.extension.getURL("./img/up.png")
        }).appendTo(".follow_up"), $("<img>", {
          src: chrome.extension.getURL("./img/down.png")
        }).appendTo(".follow_down"), $(".follow_up").off("click"), $(".follow_up").on("click", function () {
          $("#js-genre-section-all .follow_up").index(this) > 0 && $("#js-genre-section-all ul").children(".js-follow-li:eq(" + ($("#js-genre-section-all .follow_up").index(this) - 1) + ")").before($(".js-follow-li:eq(" + $("#js-genre-section-all .follow_up").index(this) + ")")), $(".js-follow-li").removeClass("follow_sort_target");
          for (var i = $("#follow_sort_start_num").val(); i < $("#follow_sort_end_num").val(); i++) $(".js-follow-li").eq(i).addClass("follow_sort_target")
        }), $(".follow_down").off("click"), $(".follow_down").on("click", function () {
          $("#js-genre-section-all ul").children(".js-follow-li:eq(" + ($("#js-genre-section-all .follow_down").index(this) + 0) + ")").before($(".js-follow-li:eq(" + ($("#js-genre-section-all .follow_down").index(this) + 1) + ")")), $(".js-follow-li").removeClass("follow_sort_target");
          for (var i = $("#follow_sort_start_num").val(); i < $("#follow_sort_end_num").val(); i++) $(".js-follow-li").eq(i).addClass("follow_sort_target")
        })
      }, $("#follow_sort_button").click(function () {
        $("#follow_sort_box").is(":visible") ? ($("#follow_sort_box").hide(), $(this).css({
          background: "#607D8B"
        }), $(".follow_up").remove(), $(".follow_down").remove(), $(".js-follow-li").removeClass("follow_sort_target")) : ($("#follow_sort_box").show(), $(this).css({
          background: "#3bddb5"
        }), $(".js-genre-tab").removeClass("active"), $("#js-genre-tab-all").addClass("active"), $(".js-genre-section").addClass("hidden"), $("#js-genre-section-all").removeClass("hidden"), FU.followListSort())
      }), $("#follow_sort_start_num,#follow_sort_end_num").change(function () {
        FU.followListSort()
      }), $("#follow_sort_save_button").mousedown(function () {
        $(this).css({
          background: "#3bddb5"
        });
        var follow_save_list = [];
        $("#js-genre-section-all .js-follow-btn").each(function (i) {
          i >= $("#follow_sort_start_num").val() && i < $("#follow_sort_end_num").val() && follow_save_list.push($(this).attr("data-room-id"))
        }), 0 == Follow_sort_time && (chrome.runtime.sendMessage({
          method: "setItem",
          key: "follow_list",
          value: JSON.stringify(follow_save_list)
        }, function (response) {}), localStorage.setItem("follow_sort_num", $("#follow_sort_end_num").val()), Follow_sort_time = Math.floor(1.5 * follow_save_list.length), Follow_sort_timer = setInterval(function () {
          Follow_sort_time--, $("#follow_sort_save_button").text("残り" + Follow_sort_time + "秒"), Follow_sort_time <= 0 && ($("#follow_sort_save_button").text("完了"), $("#follow_sort_save_button").css({
            background: "#607D8B"
          }), setTimeout(function () {
            location.reload()
          }, 2e3), Follow_sort_time = !1, clearInterval(Follow_sort_timer))
        }, 1e3))
      }), $("#follow_sort_load_button").mousedown(function () {
        $(this).css({
          background: "#3bddb5"
        }), chrome.runtime.sendMessage({
          method: "getItem",
          key: "follow_list"
        }, function (response) {
          response.data ? (chrome.runtime.sendMessage({
            method: "setItem",
            key: "follow_list",
            value: JSON.stringify(response.data)
          }, function (response) {}), 0 == Follow_sort_time && (Follow_sort_time = Math.floor(1.5 * response.data.length), Follow_sort_timer = setInterval(function () {
            Follow_sort_time--, $("#follow_sort_load_button").text("残り" + Follow_sort_time + "秒"), Follow_sort_time <= 0 && ($("#follow_sort_load_button").text("完了"), $("#follow_sort_load_button").css({
              background: "#607D8B"
            }), setTimeout(function () {
              location.reload()
            }, 2e3), Follow_sort_time = !1, clearInterval(Follow_sort_timer))
          }, 1e3))) : location.reload()
        })
      })
    }, FU.timeTablePlusStart = function () {
      $("<li>", {}).appendTo(".tab-sub-category"), $("<a>", {
        id: "time_table",
        class: "js-genre-tab",
        text: "タイムテーブル"
      }).appendTo(".tab-sub-category li:eq(3)"), $("<section>", {
        id: "time_table_list",
        class: "js-genre-section hidden"
      }).appendTo(".l-inner .contentlist"), $("<div>", {
        id: "room_list_box"
      }).appendTo("#time_table_list"), $("<ul>", {
        id: "official_room",
        class: "room_list_box"
      }).appendTo("#room_list_box"), $("<ul>", {
        id: "amateur_room",
        class: "room_list_box"
      }).appendTo("#room_list_box"), $("<p>", {
        id: "official_title",
        text: "オフィシャル"
      }).appendTo("#official_room"), $("<p>", {
        id: "amateur_title",
        text: "アマチュア"
      }).appendTo("#amateur_room"), $("<button>", {
        id: "reset_button",
        text: "ルームリスト再読み込み"
      }).appendTo("#time_table_list"), GV.room_data_load = setTimeout(function () {
        $("#time_table").addClass("load")
      }, 2e3), FU.timeTable = function () {
        $.get("https://www.showroom-live.com/api/time_table/time_tables", function (d) {
          GV.time_table = d.time_tables, FU.roomData(d)
        })
      }, FU.roomData = async function (data) {
        GV.follow_data = localStorage.getItem("follow_data") ? JSON.parse(localStorage.getItem("follow_data")) : {};
        for (var i = 0, li = data.time_tables, len = li.length; i < len; i++) li[i].is_follow && void 0 == GV.follow_data[li[i].room_url_key] && await $.get("https://www.showroom-live.com/api/room/status?room_url_key=" + li[i].room_url_key, function (d) {
          GV.follow_data[li[i].room_url_key] = d.is_official
        });
        try {
          clearInterval(GV.room_data_load)
        } catch (e) {}
        localStorage.setItem("follow_data", JSON.stringify(GV.follow_data)), FU.timeTableCreate()
      }, FU.timeTableCreate = function () {
        GV.ttc_li = [];
        for (var i = 0, li = GV.time_table, len = li.length; i < len; i++) try {
          var d = li[i],
            at = new Date(1e3 * Number(d.started_at)),
            st = at.getMonth() + 1 + "/" + at.getDate() + " " + ("0" + at.getHours()).slice(-2) + ":" + ("0" + at.getMinutes()).slice(-2);
          if (d.is_follow)
            if (-1 == GV.ttc_li.indexOf(d.room_url_key)) {
              GV.ttc_li.push(d.room_url_key);
              var t_class = ".time_table_" + d.room_url_key,
                type = GV.follow_data[d.room_url_key] ? "official" : "amateur";
              $("<li>", {
                class: "time_table_" + type + "_room time_table_" + d.room_url_key
              }).appendTo("#" + type + "_room"), $("<a>", {
                href: "https://www.showroom-live.com/" + d.room_url_key
              }).appendTo(t_class), $("<img>", {
                class: "time_table_room_img",
                src: d.image
              }).appendTo(t_class + " a"), $("<div>", {
                class: "time_table_room_name_live_at_box time_table_room_name_live_at_" + type
              }).appendTo(t_class), $("<p>", {
                class: "time_table_room_name",
                text: d.main_name
              }).appendTo(t_class + " .time_table_room_name_live_at_" + type), $("<p>", {
                class: "time_table_live_at",
                text: st
              }).appendTo(t_class + " .time_table_room_name_live_at_" + type), $("<button>", {
                class: "time_table_nest_button",
                name: d.room_url_key,
                text: "▼"
              }).appendTo(t_class + " .time_table_room_name_live_at_" + type), $("<div>", {
                class: "time_table_nest_area"
              }).appendTo(t_class), d.is_onlive && $(t_class + " .time_table_room_name_live_at_" + type + " .time_table_live_at").css({
                "background-color": "red"
              })
            } else $("<p>", {
              class: "time_table_live_at_nest",
              text: st
            }).appendTo(".time_table_" + d.room_url_key + " .time_table_nest_area"), $(".time_table_" + d.room_url_key + " .time_table_nest_button").css("display", "block")
        } catch (e) {}
        $(".time_table_nest_button").on("click", function () {
          var t = $(".time_table_" + $(this).attr("name") + " .time_table_nest_area");
          t.is(":visible") ? ($(this).text("▼").css({
            color: "#eee",
            "background-color": "#133"
          }), t.hide()) : ($(this).text("▲").css({
            color: "yellow",
            "background-color": "#244"
          }), t.show())
        }), GV.img_height = setInterval(function () {
          $(".time_table_room_name_live_at_box").css({
            height: $(".time_table_room_img:eq(0)").height() + "px"
          }), 0 != $(".time_table_room_img:eq(0)").height() && clearInterval(GV.img_height)
        }, 500), $("#time_table").removeClass("load"), $("#reset_button").on("click", function () {
          window.confirm("ルーム情報を再読み込みしますか？\n(オフィシャルとアマチュアを移動したルームが正しく表示されるようになります。)") && (localStorage.removeItem("follow_data"), location.reload())
        })
      }, FU.timeTable()
    };
    var star_n = 0,
      seed_n = 0;
    $("#js-genre-section-all .contentlist-rowlist").children().each(function () {
      "200" == $(this).attr("class").replace("js-follow-li js-genre-", "") ? seed_n++ : star_n++
    }), $("h2.contentlist-heading").text("フォロー (" + (star_n + seed_n) + "ルーム)").attr("title", "【オフィシャル】 " + star_n + " ルーム\n【アマチュア】 " + seed_n + " ルーム"), FU.bookmark = function () {
      GV.bookmark = {}, FU.bookmarkAdd = function (text) {
        let r = FU.randomNum(9999, 1);
        GV.bookmark.book_mark_list[String(r)] ? setTimeout(function () {
          FU.bookmarkAdd(text)
        }, 500) : (GV.bookmark.book_mark_list[String(r)] = text, FU.local_save({
          name: "book_mark_list",
          data: GV.bookmark.book_mark_list
        }), FU.bookmarkDomCreate(), FU.bookmarkListClick())
      }, FU.bookmarkListClick = function () {
        $("#bookmark_list_add_box .bookmark_list_add_list button.close").off(), $("#bookmark_list_add_box .bookmark_list_add_list button.close").on("click", function () {
          let name = $(this).attr("name"),
            text = $(this).parent().find(".select").text();
          1 == confirm("｢" + text + "｣ブックマークを削除しますか?") && (delete GV.bookmark.book_mark_list[String(name)], FU.local_save({
            name: "book_mark_list",
            data: GV.bookmark.book_mark_list
          }), $(this).parent().remove(), FU.genreAllShow())
        }), $("#bookmark_list_add_box .bookmark_list_add_list button.select").off(), $("#bookmark_list_add_box .bookmark_list_add_list button.select").on("click", function () {
          let name = $(this).attr("name"),
            text = $(this).text();
          $(this).hasClass("on") ? ($(".bookmark_add_button").hide().removeClass("on"), $(this).removeClass("on"), $(".bookmark_name_text").hide()) : ($("#bookmark_list_add_box .bookmark_list_add_list button.select").removeClass("on"), $(".bookmark_add_button").show().removeClass("on"), $(this).addClass("on"), $(".bookmark_name_text").show().text("ブックマーク追加モード : " + text), GV.bookmark.bookmark_number = name, FU.bookmarkAddCheck()), FU.genreAllShow()
        })
      }, FU.bookMarkSelect = function (value) {
        if (null != value && -1 != value.indexOf("bookmark_room_id")) {
          $(".js-follow-li").hide();
          let vv = value.replace("bookmark_room_id_", "");
          GV.bookmark.book_mark_list[vv] ? ($.each(GV.bookmark.room_data, function (k, v) {
            v[vv] && $(".bookmark_room_id_" + k).show()
          }), FU.local_save({
            name: "genre_select_num",
            data: value
          })) : FU.genreAllShow()
        } else if (null != value) {
          let vv = value.replace("bookmark_room_id_", "");
          FU.local_save({
            name: "genre_select_num",
            data: vv
          })
        } else FU.genreAllShow()
      }, FU.genreLoad = function () {
        let genre_select_num = FU.local_load("genre_select_num");
        genre_select_num && ($("#js-genre_id").val(genre_select_num), FU.bookMarkSelect(genre_select_num))
      }, FU.genreAllShow = function () {
        FU.local_save({
          name: "genre_select_num",
          data: "0"
        }), $("#js-genre_id").val(0), $(".js-follow-li").show()
      }, FU.bookmarkDomCreate = function () {
        $("#bookmark_list_add_box .bookmark_list_add_list").empty(), $("#bookmark_select").empty(), $("#bookmark_room_box .bookmark_list_box").empty(), $.each(GV.bookmark.book_mark_list, function (k, v) {
          $("#bookmark_list_add_box .bookmark_list_add_list").append('<div class="bookmark_list_add_list_in_box"><button class="select" name="' + k + '">' + v + '</button><button class="close" name="' + k + '">✕</button></div>'), $("#bookmark_select").append('<option value="bookmark_room_id_' + k + '">' + v + "</option>"), $("#bookmark_room_box .bookmark_list_box").append('<div class="bookmark_list"><button class="bookmark_add bookmark_id_' + k + '" name="' + k + '">' + v + "</button></div>")
        })
      }, FU.bookmarkAddCheck = function () {
        $.each($(".bookmark_add_button"), function () {
          let d = GV.bookmark.room_data[$(this).attr("room_id")];
          d && d[GV.bookmark.bookmark_number] && $(this).addClass("on")
        })
      };
      let book_mark_room_data = FU.local_load("book_mark_room_data"),
        book_mark_list = FU.local_load("book_mark_list");
      GV.bookmark.room_data = book_mark_room_data || {}, GV.bookmark.book_mark_list = book_mark_list || {
        1: "お気に入り"
      }, $.each($(".js-follow-li"), function () {
        let tar = $(this),
          room_id = tar.find(".js-follow-btn").attr("data-room-id"),
          dom = '<li class="bookmark_add_button" room_id="' + room_id + '"><a room_name="' + tar.find(".listcardinfo-main-text").text() + '" ><img class="bookmark_icon" src="' + FU.local_url("/img/bookmark.png") + '"></a></li>';
        tar.find(".listcardinfo-menu ul").append(dom), tar.addClass("bookmark_room_id_" + room_id)
      }), $(".bookmark_add_button").hide(), $("#js-genre-section-all").before('<p class="bookmark_name_text">ブックマーク追加モード : </p>'), $(".bookmark_name_text").hide(), $(".select-form").parent().append('<div id="bookmark_list_button"><p>★</p></div>'), $("#bookmark_list_button").css({
        position: "absolute",
        top: "10px",
        right: "20px",
        width: "30px",
        height: "30px",
        background: "#607D8B",
        "border-radius": "2px",
        margin: "0"
      }), $("#sr-content-main").append('<div id="bookmark_list_add_box"><button class="bookmark_box_close">✕</button><div class="bookmark_add"><input type="text" placeholder="ブックマーク名"><button>追加</button></div><div class="bookmark_list_add_list"></div></div>'), $("#sr-content-main").append('<div id="bookmark_room_box"><button class="bookmark_box_close">✕</button><p class="room_name"></p><div class="bookmark_list_box"></div></div>'), $("#js-genre_id").append('<optgroup id="bookmark_select" label="ブックマーク">'), FU.bookmarkDomCreate(), $("#bookmark_list_add_box .bookmark_add button").click(function () {
        let text = $(this).parent().find("input").val(),
          v_li = Object.values(GV.bookmark.book_mark_list);
        text.length > 0 && -1 == v_li.indexOf(text) && (FU.bookmarkAdd(text), $(this).parent().find("input").val(""))
      }), $("#bookmark_list_button").click(function (e) {
        $("#bookmark_list_add_box").show(), $("#bookmark_room_box").hide()
      }), $(".bookmark_add_button").click(function (e) {
        let room_id = $(this).attr("room_id"),
          on = $(this).hasClass("on");
        GV.bookmark.room_data[room_id] || (GV.bookmark.room_data[room_id] = {}), on ? ($(this).removeClass("on"), GV.bookmark.room_data[room_id][GV.bookmark.bookmark_number] = !1) : ($(this).addClass("on"), GV.bookmark.room_data[room_id][GV.bookmark.bookmark_number] = !0), FU.local_save({
          name: "book_mark_room_data",
          data: GV.bookmark.room_data
        })
      }), $("#bookmark_room_box .bookmark_add").click(function (e) {
        let s, bookmark_id = $(this).attr("name"),
          room_id = $("#bookmark_room_box").attr("name");
        $(this).hasClass("on") ? ($(this).removeClass("on"), s = !1) : ($(this).addClass("on"), s = !0);
        let room = GV.bookmark.room_data[room_id];
        room ? room[bookmark_id] = s : (GV.bookmark.room_data[room_id] = {}, GV.bookmark.room_data[room_id][bookmark_id] = s), FU.local_save({
          name: "book_mark_room_data",
          data: GV.bookmark.room_data
        })
      }), $(".bookmark_box_close").click(function () {
        $(this).parent().hide(), $(".bookmark_add_button").hide().removeClass("on"), $("#bookmark_list_add_box .bookmark_list_add_list button.select").removeClass("on"), $(".bookmark_name_text").hide()
      }), $("#js-genre_id").click(function () {
        let value = $(this).val();
        FU.bookMarkSelect(value)
      }), FU.genreLoad(), FU.bookmarkListClick()
    }, FU.randomNum = function (max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }, FU.local_url = function (u) {
      return "chrome-extension://" + localStorage.getItem("e_id") + u
    }, FU.local_save = function (d) {
      localStorage.setItem(d.name, JSON.stringify(d.data))
    }, FU.local_load = function (d) {
      try {
        return JSON.parse(localStorage.getItem(d))
      } catch (e) {
        return {}
      }
    }, $(document).ready(function () {
      chrome.runtime.sendMessage({
        method: "getItem",
        key: "option_list"
      }, function (re) {
        re.data ? (GV.right_list = {}, GV.right_list.follow_sort = 0, GV.right_list.genre = 20, re.data.follow_list_sort && re.data.bookmark ? (GV.right_list.follow_sort = 55, GV.right_list.genre = 150) : re.data.follow_list_sort ? (GV.right_list.follow_sort = 20, GV.right_list.genre = 115) : re.data.bookmark && (GV.right_list.follow_sort = 20, GV.right_list.genre = 55), 0 != re.data.follow_list_sort && FU.followListSortStart(), 0 != re.data.time_table && FU.timeTablePlusStart(), 0 != re.data.bookmark && FU.bookmark(), $(".l-genre-select-box").css({
          right: GV.right_list.genre
        })) : (GV.right_list = {}, GV.right_list.follow_sort = 55, GV.right_list.genre = 150, $(".l-genre-select-box").css({
          right: GV.right_list.genre
        }), FU.followListSortStart(), FU.timeTablePlusStart(), FU.bookmark())
      })
    })
  }
});