$(function () {
  location.href.match("https://www.showroom-live.com/room/live_schedule") && (console.log("---live booking---"), liveBookingStart = function () {
    Booking_list = {}, $("<link>", {
      rel: "stylesheet",
      type: "text/css",
      href: chrome.extension.getURL("./css/live_booking.css")
    }).appendTo("head"), liveBooking = function (o, e, t) {
      var i = new FormData;
      i.append("csrf_token", $("form *[name=csrf_token]").attr("value")), i.append("room_id", $("form *[name=room_id]").attr("value")), i.append("use_ymd", "1"), i.append("ymd", o), i.append("hour", e), i.append("min", t);
      var n = new XMLHttpRequest;
      n.open("POST", "https://www.showroom-live.com/room/live_schedule_add"), n.onload = function (o) {}, n.send(i)
    }, liveBookingClear = function (o) {
      var e = new FormData;
      e.append("csrf_token", $("form *[name=csrf_token]").attr("value")), e.append("no", o), e.append("room_id", $("form *[name=room_id]").attr("value"));
      var t = new XMLHttpRequest;
      t.open("POST", "https://www.showroom-live.com/room/live_schedule_delete"), t.onload = function (o) {}, t.send(e)
    };
    var o = $(".box-edit form:eq(1) button");
    $("<div>", {
      id: "booking_button_list"
    }).insertBefore(o), $("<p>", {
      id: "plus_day",
      text: "+ 1日"
    }).appendTo("#booking_button_list"), $("<p>", {
      id: "minus_day",
      text: "- 1日"
    }).appendTo("#booking_button_list"), $("<p>", {
      id: "plus_3_hour",
      text: "+ 3時間"
    }).appendTo("#booking_button_list"), $("<p>", {
      id: "minus_3_hour",
      text: "- 3時間"
    }).appendTo("#booking_button_list"), $("<p>", {
      id: "plus_5_min",
      text: "+ 5分"
    }).appendTo("#booking_button_list"), $("<p>", {
      id: "minus_5_min",
      text: "- 5分"
    }).appendTo("#booking_button_list"), $("<p>", {
      id: "booking_add_button",
      text: "追加"
    }).appendTo("#booking_button_list"), $("<ul>", {
      id: "booking_post_list"
    }).insertBefore(o), $("<p>", {
      id: "booking_post_button",
      class: "fs-b4 btn-light-green mt-b4 mb-b4",
      text: "まとめて登録"
    }).insertBefore(o), $("<p>", {
      id: "booking_all_clear_button",
      class: "fs-b4 btn-light-green mt-b4 mb-b4",
      text: "全て削除"
    }).insertAfter(".box-edit table"), $(o).hide();
    var e = new Date,
      t = ("0" + e.getFullYear()).slice(-4),
      i = ("0" + (e.getMonth() + 1)).slice(-2),
      n = ("0" + e.getDate()).slice(-2),
      l = ("0" + e.getHours()).slice(-2);
    $(".box-edit form:eq(1) #ymd").val(t + "/" + i + "/" + n), $(".box-edit form:eq(1) #hour").val(Number(l)), $(".box-edit form:eq(1) #min").val("0"), Booling_clear_list = [], $("form *[name=no]").each(function () {
      Booling_clear_list.push($(this).attr("value"))
    }), $("#plus_day").on("click", function () {
      var o = new Date($("#ymd").val().slice(0, 4), Number($("#ymd").val().slice(5, 7)) - 1, $("#ymd").val().slice(-2), $(".box-edit form:eq(1) #hour").val(), 0, 0);
      o.setDate(o.getDate() + 1);
      var e = ("0" + o.getFullYear()).slice(-4) + "/" + ("0" + (o.getMonth() + 1)).slice(-2) + "/" + ("0" + o.getDate()).slice(-2);
      $("#ymd").val(e)
    }), $("#minus_day").on("click", function () {
      var o = new Date($("#ymd").val().slice(0, 4), Number($("#ymd").val().slice(5, 7)) - 1, $("#ymd").val().slice(-2), $(".box-edit form:eq(1) #hour").val(), 0, 0);
      o.setDate(o.getDate() - 1);
      var e = ("0" + o.getFullYear()).slice(-4) + "/" + ("0" + (o.getMonth() + 1)).slice(-2) + "/" + ("0" + o.getDate()).slice(-2);
      $("#ymd").val(e)
    }), $("#plus_3_hour").on("click", function () {
      $(".box-edit form:eq(1) #hour").val(Number($(".box-edit form:eq(1) #hour").val()) + 3 < 24 ? Number($(".box-edit form:eq(1) #hour").val()) + 3 : 23)
    }), $("#minus_3_hour").on("click", function () {
      $(".box-edit form:eq(1) #hour").val(Number($(".box-edit form:eq(1) #hour").val()) - 3 < 0 ? 0 : Number($(".box-edit form:eq(1) #hour").val()) - 3)
    }), $("#plus_5_min").on("click", function () {
      $(".box-edit form:eq(1) #min").val(Number($(".box-edit form:eq(1) #min").val()) + 5 < 60 ? Number($(".box-edit form:eq(1) #min").val()) + 5 : 55)
    }), $("#minus_5_min").on("click", function () {
      $(".box-edit form:eq(1) #min").val(Number($(".box-edit form:eq(1) #min").val()) - 5 < 0 ? 0 : Number($(".box-edit form:eq(1) #min").val()) - 5)
    }), $("#booking_add_button").on("click", function () {
      if (Booling_clear_list.length + Object.keys(Booking_list).length >= 10) alert("予約上限の10個になりました。");
      else {
        var o = new Date($("#ymd").val().slice(0, 4), Number($("#ymd").val().slice(5, 7)) - 1, $("#ymd").val().slice(-2), $(".box-edit form:eq(1) #hour").val(), $(".box-edit form:eq(1) #min").val(), 0),
          e = Math.floor(o.getTime() / 1e3);
        Booking_list[String(e)] = {
          ymd: $("#ymd").val(),
          hour: $(".box-edit form:eq(1) #hour").val(),
          min: $(".box-edit form:eq(1) #min").val()
        }, $(".booking_post_data").remove(), $.each(Booking_list, function (o, e) {
          $("<li>", {
            id: "booking_num_" + o,
            class: "booking_post_data"
          }).appendTo("#booking_post_list"), $("<p>", {
            class: "bokking_ymd",
            text: e.ymd
          }).appendTo("#booking_num_" + o), $("<p>", {
            class: "bokking_hour",
            text: e.hour + " 時"
          }).appendTo("#booking_num_" + o), $("<p>", {
            class: "bokking_min",
            text: e.min + " 分"
          }).appendTo("#booking_num_" + o), $("<p>", {
            class: "bokking_remove",
            name: o,
            text: "削除"
          }).appendTo("#booking_num_" + o)
        }), $(".bokking_remove").off("click"), $(".bokking_remove").on("click", function () {
          delete Booking_list[$(this).attr("name")], $(this).parent().remove()
        })
      }
    }), $("#booking_post_button").on("click", function () {
      for (var o = 0; o < Object.keys(Booking_list).length; o++) ! function (o) {
        setTimeout(function () {
          var e = Booking_list[Object.keys(Booking_list)[o]];
          o == Object.keys(Booking_list).length - 1 && setTimeout(function () {
            location.reload()
          }, 1e3), liveBooking(e.ymd, e.hour, e.min)
        }, 100 * o)
      }(o)
    }), $("#booking_all_clear_button").on("click", function () {
      if (confirm("全てのライブ予定を削除しますか？"))
        for (var o = 0; o < Booling_clear_list.length; o++) ! function (o) {
          setTimeout(function () {
            o == Booling_clear_list.length - 1 && setTimeout(function () {
              location.reload()
            }, 1e3), liveBookingClear(Booling_clear_list[o])
          }, 100 * o)
        }(o)
    })
  }, chrome.runtime.sendMessage({
    method: "getItem",
    key: "option_list"
  }, function (o) {
    o.data && (Start = void 0 != o.data.live_booking && o.data.live_booking, Start && liveBookingStart())
  }))
});