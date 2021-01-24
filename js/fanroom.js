$(function () {
  if (location.href.match("https://www.showroom-live.com/fan_room/setting_room") && (console.log("---fanroom setting---"), fanroomManageButton = function () {
      Room_id = Number(location.href.replace("https://www.showroom-live.com/fan_room/setting_room?room_id=", "")), Csrf_token = $("#js-signup-form input").attr("value"), $("<a>", {
        id: "fanroom_manage_button",
        class: "btn-light-green large",
        href: chrome.extension.getURL("./fanroom.html?room_id=" + Room_id + "&csrf_token=" + Csrf_token),
        text: "コメントの管理(すこツール)"
      }).insertAfter("#room_add_form a"), $("#fanroom_manage_button").css("margin-top", "20px")
    }, chrome.runtime.sendMessage({
      method: "getItem",
      key: "option_list"
    }, function (e) {
      e.data && (Start = void 0 != e.data.fan_ma && e.data.fan_ma, Start && fanroomManageButton())
    })), "fanroom_manage" == $("title").attr("name")) {
    console.log("---fanroom manage---"), Url_para = new Object;
    for (var e = location.search.substring(1).split("&"), t = 0; e[t]; t++) {
      var o = e[t].split("=");
      Url_para[o[0]] = o[1]
    }
    Room_id = Url_para.room_id, Csrf_token = Url_para.csrf_token, zeroFill = function (e, t) {
      return ("0000000000" + e).slice(-t)
    }, timeChange = function (e) {
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
        mo: zeroFill(t.getMonth() + 1, 2),
        d: zeroFill(t.getDate(), 2),
        h: zeroFill(t.getHours(), 2),
        m: zeroFill(t.getMinutes(), 2),
        s: zeroFill(t.getSeconds(), 2)
      }
    }, Last_chat_id = 0, Comment_list = {}, User_list = {}, Select_user = [], commentGet = function () {
      var e = "https://www.showroom-live.com/fan_room/get_talk_list?room_id=" + Room_id + "&last_chat_id=" + Last_chat_id;
      $.get(e, function (e) {
        $("#user_area .user_box").remove();
        for (var t = 0; t < e.length; t++) {
          var o = e[e.length - 1 - t];
          if ("1" == o.pt) {
            var s = timeChange(o.ts);
            Comment_list[o.id] = {
              name: o.n,
              comm: o.s,
              at: o.ts,
              time: s.mo + "/" + s.d + " " + s.h + ":" + s.m + ":" + s.s,
              user_id: o.u,
              img: o.i
            }, User_list[o.u] = {
              name: o.n,
              img: o.i
            }, $("<div>", {
              id: "comment_box_id_" + o.id,
              class: "comment_box remnant_comment user_" + o.u,
              name: o.id
            }).prependTo("#comment_area"), $("<img>", {
              class: "img",
              src: o.i
            }).appendTo("#comment_box_id_" + o.id), $("<p>", {
              class: "user_name",
              text: o.n
            }).appendTo("#comment_box_id_" + o.id), $("<p>", {
              class: "time",
              text: s.mo + "/" + s.d + " " + s.h + ":" + s.m + ":" + s.s
            }).appendTo("#comment_box_id_" + o.id), $("<p>", {
              class: "comment",
              text: o.s
            }).appendTo("#comment_box_id_" + o.id)
          }
        }
        0 == Last_chat_id && $("body").animate({
          scrollTop: $("body").height()
        }, 0), Last_chat_id = Number(e[0].id) - 1, $.each(User_list, function (e, t) {
          $("<div>", {
            id: "user_list_box_id_" + e,
            class: "user_box",
            name: e
          }).prependTo("#user_list"), $("<img>", {
            class: "img",
            src: t.img
          }).appendTo("#user_list_box_id_" + e), $("<p>", {
            class: "user_name",
            text: t.name
          }).appendTo("#user_list_box_id_" + e)
        }), $.each(User_list, function (e, t) {
          $("<div>", {
            id: "black_list_box_id_" + e,
            class: "user_box",
            name: e
          }).prependTo("#black_off_list"), $("<img>", {
            class: "img",
            src: t.img
          }).appendTo("#black_list_box_id_" + e), $("<p>", {
            class: "user_name",
            text: t.name
          }).appendTo("#black_list_box_id_" + e)
        }), $(".comment_box").off("click"), $(".comment_box").on("click", function () {
          Comment_select_switch ? ($(this).css({
            "background-color": "#F3F781"
          }), Select_commtn_list.push(Number($(this).attr("name"))), Select_commtn_list.length >= 2 && (Select_commtn_list[0] > Select_commtn_list[1] ? $.each($(".comment_box"), function () {
            var e = $(this).attr("name");
            e <= Select_commtn_list[0] && e >= Select_commtn_list[1] && $(this).css({
              "background-color": "#999"
            }).addClass("remove_comment").removeClass("remnant_comment")
          }) : $.each($(".comment_box"), function () {
            var e = $(this).attr("name");
            e >= Select_commtn_list[0] && e <= Select_commtn_list[1] && $(this).css({
              "background-color": "#999"
            }).addClass("remove_comment").removeClass("remnant_comment")
          }), Select_commtn_list = [], $("#comment_select").removeAttr("style"), Comment_select_switch = !1)) : $(this).hasClass("remnant_comment") ? $(this).css({
            "background-color": "#999"
          }).addClass("remove_comment").removeClass("remnant_comment") : $(this).css({
            "background-color": "#eee"
          }).addClass("remnant_comment").removeClass("remove_comment")
        }), $("#user_area .user_box").off("click"), $("#user_area .user_box").on("click", function () {
          var e = $(this).attr("name");
          $(this).hasClass("select_user") ? ($(this).css({
            "background-color": "rgba(10, 10, 10, 0.8)"
          }).removeClass("select_user"), $(".user_" + e).show()) : ($(this).css({
            "background-color": "rgba(70, 70, 70, 0.8)"
          }).addClass("select_user"), $(".user_" + e).css({
            "background-color": "#eee"
          }).addClass("remnant_comment").removeClass("remove_comment").hide())
        }), $("#all_user_select_on").off("click"), $("#all_user_select_on").on("click", function () {
          $("#user_area .user_box").css({
            "background-color": "rgba(10, 10, 10, 0.8)"
          }).removeClass("select_user"), $(".comment_box").show()
        }), $("#all_user_select_off").off("click"), $("#all_user_select_off").on("click", function () {
          $("#user_area .user_box").css({
            "background-color": "rgba(70, 70, 70, 0.8)"
          }).addClass("select_user"), $(".comment_box").css({
            "background-color": "#eee"
          }).addClass("remnant_comment").removeClass("remove_comment").hide()
        }), Delete_comment_list = [], $("#select_comment_delete").off("click"), $("#select_comment_delete").on("click", function () {
          Delete_comment_list = [], $(".comment_box").hide(), $(".button_type_1").hide(), $(".button_type_2").css("display", "inline-block"), $.each($(".remove_comment"), function () {
            var e = Comment_list[$(this).attr("name")];
            console.log(e), Delete_comment_list.push({
              user_id: e.user_id,
              name: e.name,
              id: $(this).attr("name"),
              comment: e.comm,
              created_at: e.at
            }), $(this).css({
              "background-color": "#DF0101"
            }).show()
          })
        }), $("#comment_delete").off("click"), $("#comment_delete").on("click", function () {
          if (confirm("赤く表示されているコメントを全て削除しますか？"))
            for (var e = 0; e < Delete_comment_list.length; e++) commentDelete(Delete_comment_list[e])
        }), $("#delete_cancel").off("click"), $("#delete_cancel").on("click", function () {
          $(".comment_box").show().css({
            "background-color": "#eee"
          }).addClass("remnant_comment").removeClass("remove_comment"), $(".button_type_1").css("display", "inline-block"), $(".button_type_2").hide(), Delete_comment_list = []
        }), $("#black_off_list .user_box").off("click"), $("#black_off_list .user_box").on("click", function () {
          $(this).attr("name"), $(this).hasClass("select_black_user") ? $(this).css({
            "background-color": "rgba(10, 10, 10, 0.8)"
          }).removeClass("select_black_user") : $(this).css({
            "background-color": "rgba(70, 70, 10, 0.8)"
          }).addClass("select_black_user")
        }), $("#black_list_add_user").off("click"), $("#black_list_add_user").on("click", function () {
          $(".black_user_box").remove(), $.each($(".select_black_user"), function () {
            var e = $(this).attr("name");
            if (0 == (t = $.trim($(this).find(".user_name").text())).length) var t = "[ NO NAME ]";
            Black_list_user[String(e)] = t
          }), $.each(Black_list_user, function (e, t) {
            $("<div>", {
              id: "black_user_id_" + e,
              class: "black_user_box"
            }).appendTo("#black_on_list"), $("<p>", {
              class: "user_id",
              text: e
            }).appendTo("#black_user_id_" + e), $("<p>", {
              class: "user_name",
              text: t
            }).appendTo("#black_user_id_" + e)
          }), chrome.runtime.sendMessage({
            method: "setItem",
            key: "black_list",
            value: JSON.stringify(Black_list_user)
          }, function (e) {}), $(".black_user_box").hover(function () {
            $(this).css({
              "background-color": "rgba(70, 70, 10, 0.8)"
            })
          }, function () {
            $(this).removeAttr("style")
          }), $(".black_user_box").off("click"), $(".black_user_box").on("click", function () {
            $(this).addClass("remove_blac_user")
          }), $("#black_list_revemo_user").off("click"), $("#black_list_revemo_user").on("click", function () {
            $.each($(".remove_blac_user"), function () {
              delete Black_list_user[$(this).find(".user_id").text()], $(this).remove()
            }), chrome.runtime.sendMessage({
              method: "setItem",
              key: "black_list",
              value: JSON.stringify(Black_list_user)
            }, function (e) {})
          })
        })
      })
    }, commentDelete = function (e) {
      chrome.runtime.sendMessage({
        method: "function",
        key: "fr_comm_remove",
        value: JSON.stringify(e)
      }, function (e) {}), setTimeout(function () {
        location.reload()
      }, 2e3)
    }, commentPost = function (e) {
      var t = "msg=" + e + "&csrf_token=" + Csrf_token + "&room_id=" + Room_id;
      $.post("https://www.showroom-live.com/fan_room/post_talk", t).done(function (e) {}).fail(function () {})
    }, $("#user_list_show").on("click", function () {
      $("#user_area").is(":visible") ? ($("#user_area").hide(), $(".side_area").removeClass("button_on").addClass("button_off"), $("#user_list_show").removeClass("button_on").addClass("button_off")) : ($(".side_list").hide(), $("#user_area").show(), $(".side_area").removeClass("button_on").addClass("button_off"), $("#user_list_show").addClass("button_on").removeClass("button_off"))
    }), $("#black_list_show").on("click", function () {
      $("#black_list_area").is(":visible") ? ($("#black_list_area").hide(), $(".side_area").removeClass("button_on").addClass("button_off"), $("#black_list_show").removeClass("button_on").addClass("button_off")) : ($(".side_list").hide(), $("#black_list_area").show(), $(".side_area").removeClass("button_on").addClass("button_off"), $("#black_list_show").addClass("button_on").removeClass("button_off"))
    }), $("#prev_comment_button").on("click", function () {
      commentGet()
    }), $("#page_top").on("click", function () {
      $("body").animate({
        scrollTop: 0
      }, 500)
    }), $("#page_bottom").on("click", function () {
      $("body").animate({
        scrollTop: $("body").height()
      }, 500)
    }), Comment_select_switch = !1, $("#comment_select").on("click", function () {
      Select_commtn_list = [], Comment_select_switch ? ($(this).removeAttr("style"), Comment_select_switch = !1) : ($(this).css({
        "background-color": "red"
      }), Comment_select_switch = !0)
    }), $("#delete_comment_show").on("click", function () {
      $("#delete_comment_area").is(":visible") ? ($("#delete_comment_area").hide(), $("#comment_area").show(), $("#delete_comment_show").removeClass("button_on").addClass("button_off"), $(".button_type_1,.button_type_2").removeClass("button_hide")) : chrome.runtime.sendMessage({
        method: "getItem",
        key: "remove_comment_list"
      }, function (e) {
        e.data && ($(".delete_comment_box").remove(), $.each(e.data, function (e, t) {
          var o = new Date(1e3 * Number(t.created_at)),
            s = o.getMonth() + 1 + "月" + o.getDate() + "日 " + ("0" + o.getHours()).slice(-2) + ":" + ("0" + o.getMinutes()).slice(-2);
          $("<div>", {
            id: "delete_comment_box_id_" + e,
            class: "delete_comment_box"
          }).prependTo("#delete_comment_area"), $("<img>", {
            class: "img",
            src: "https://image.showroom-live.com/showroom-prod/image/avatar/1.png?v=59"
          }).appendTo("#delete_comment_box_id_" + e), $("<p>", {
            class: "user_name",
            text: t.name
          }).appendTo("#delete_comment_box_id_" + e), $("<p>", {
            class: "time",
            text: s
          }).appendTo("#delete_comment_box_id_" + e), $("<p>", {
            class: "comment",
            text: t.comment
          }).appendTo("#delete_comment_box_id_" + e)
        }), $("#comment_area").hide(), $("#delete_comment_area").show(), $("#delete_comment_show").addClass("button_on").removeClass("button_off"), $(".button_type_1,.button_type_2").addClass("button_hide"))
      })
    }), $("#delete_log_reset").on("click", function () {
      confirm("削除済みコメントログをリセットしますか？") && chrome.runtime.sendMessage({
        method: "setItem",
        key: "remove_comment_list",
        value: "{}"
      }, function (e) {
        location.reload()
      })
    }), chrome.runtime.sendMessage({
      method: "getItem",
      key: "black_list"
    }, function (e) {
      Black_list_user = void 0 == e.data ? {} : e.data, $.each(Black_list_user, function (e, t) {
        $("<div>", {
          id: "black_user_id_" + e,
          class: "black_user_box"
        }).appendTo("#black_on_list"), $("<p>", {
          class: "user_id",
          text: e
        }).appendTo("#black_user_id_" + e), $("<p>", {
          class: "user_name",
          text: t
        }).appendTo("#black_user_id_" + e)
      }), $(".black_user_box").hover(function () {
        $(this).css({
          "background-color": "rgba(70, 70, 10, 0.8)"
        })
      }, function () {
        $(this).removeAttr("style")
      }), $(".black_user_box").off("click"), $(".black_user_box").on("click", function () {
        $(this).addClass("remove_blac_user")
      }), $("#black_list_revemo_user").off("click"), $("#black_list_revemo_user").on("click", function () {
        $.each($(".remove_blac_user"), function () {
          delete Black_list_user[$(this).find(".user_id").text()], $(this).remove()
        }), chrome.runtime.sendMessage({
          method: "setItem",
          key: "black_list",
          value: JSON.stringify(Black_list_user)
        }, function (e) {})
      }), commentGet()
    })
  }
});