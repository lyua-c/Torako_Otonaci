$(function () {
  console.log("---option---"), Option_list = {}, $(".option_box button").on("click", function () {
    $(this).hasClass("button_on") ? ($(this).removeClass("button_on").addClass("button_off").text("OFF"), Option_list[$(this).attr("name")] = !1) : ($(this).removeClass("button_off").addClass("button_on").text("ON"), Option_list[$(this).attr("name")] = !0), localStorage.setItem("option_list", JSON.stringify(Option_list)), chrome.runtime.sendMessage({
      method: "setItem",
      key: "option_list",
      value: JSON.stringify(Option_list)
    }, function (t) {})
  }), $(".select_text,.select_number,.select_option").on("click change", function () {
    Option_list[$(this).attr("name")] = $(this).val(), localStorage.setItem("option_list", JSON.stringify(Option_list)), chrome.runtime.sendMessage({
      method: "setItem",
      key: "option_list",
      value: JSON.stringify(Option_list)
    }, function (t) {})
  }), optionListLoad = function () {
    Option_list = void 0 == JSON.parse(localStorage.getItem("option_list")) ? {} : JSON.parse(localStorage.getItem("option_list")), $.each(Option_list, function (t, o) {
      t = "" == t ? "undefined" : t, 1 == o ? $(".option_box button[name^=" + t + "]").removeClass("button_off").addClass("button_on").text("ON") : $(".option_box button[name^=" + t + "]").removeClass("button_on").addClass("button_off").text("OFF"), "[object String]" == toString.call(o) && $(".select_number[name^=" + t + "]").val(o), "[object String]" == toString.call(o) && $(".select_text[name^=" + t + "]").val(o), "[object String]" == toString.call(o) && $(".select_option[name^=" + t + "]").val(o)
    }), chrome.runtime.sendMessage({
      method: "function",
      key: "csrf_token"
    }, function (t) {})
  }, $(".option_in_box").hide(), $(".nest_show_button").on("click", function () {
    return $(this).nextAll(".option_in_box").is(":hidden") ? ($(this).text("▲").nextAll(".option_in_box").slideDown("fast"), $(this).parent().css("background", "#999")) : ($(this).text("▼").nextAll(".option_in_box").slideUp("fast"), $(this).parent().css("background", "#ccc")), !1
  }), $(".hint").on("click", function () {}), $("#option_reset_area .option").on("click", function () {
    confirm("オプションの設定をリセットしますか？") && (Option_list = {}, localStorage.setItem("option_list", JSON.stringify(Option_list)), chrome.runtime.sendMessage({
      method: "setItem",
      key: "option_list",
      value: JSON.stringify(Option_list)
    }, function (t) {
      location.reload()
    }))
  }), $("#option_reset_area .manual").on("click", function () {
    window.open("http://sr-com.net/suko_manual/")
  }), $("#test_button").on("click", function () {
    chrome.runtime.sendMessage({
      method: "function",
      key: "delete_pop",
      value: "1"
    }, function (t) {})
  }), optionListLoad()
});