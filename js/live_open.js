$(function () {
  liveOpen_C = function () {
    var o = ['<div class="context_close">✕</div>', '<div id="onlive_room_open"><img title="開くルーム:星ルーム" class="context star on" name="1"><img title="開くルーム:種ルーム" class="context seed" name="0"></div>', '<div class="get_type" title="取得タイプ"><div class="radio"><input title="通常モードで指定数ルームを開きます。自動閉ONでも閉じません。" type="radio" name="get_type" value="0"> 通常</div><div class="radio"><input title="取得モードで指定数ルームを開きます。\n(映像･アバターOFF) \n開いたタブが閉じるまでの時間\n = 開くルーム数 × 30秒 + 10秒" type="radio" name="get_type" value="1" checked> 取得</div><div class="radio"><input title="捨てモードで指定数ルームを開きます。\n(映像･アバターOFF)\n開いたタブが閉じるまでの時間\n = 開くルーム数とは関係なく40秒固定" type="radio" name="get_type" value="2" > 捨て</div></div>', '<div class=""><p>開くルーム数</p><input type="number" class="open_num" value="10" min="1" max="30"></div>', '<div title="除外ルーム"><div name="omit_vb" title="ONで視聴ボーナス取得済みルームを除外" class="omit vb">視聴ボ</div><div name="omit_cl" title="ONで自動でルームを閉じる" class="omit close">自動閉</div></div>', '<button class="open">OPEN</button>'];
    liveOpen = function () {
      $("#context_box").show().css({
        top: (event.clientY < 180 ? 0 : event.clientY - 180) + "px",
        left: event.clientX - 150 + "px"
      }), $("#onlive_open img").addClass("on"), $("#context_box .context_in_box").empty().hide(), $("#context_box .context_open_room").show(), $("#context_box .context_open_room").append($(o.join("")));
      var t = "chrome-extension://" + localStorage.getItem("e_id") + "/img/";
      $("#context_box .star").attr("src", t + "star.png"), $("#context_box .seed").attr("src", t + "seed.png"), 1 == localStorage.getItem("omit_vb") && $("#context_box .vb").addClass("on"), 1 == localStorage.getItem("omit_tb") && $("#context_box .tb").addClass("on"), 1 == localStorage.getItem("omit_cl") && $("#context_box .close").addClass("on"), localStorage.getItem("room_open_n") && $("#context_box .open_num").val(localStorage.getItem("room_open_n")), $("#context_box img").off(), $("#context_box img").on("click", function () {
        $("#context_box img").removeClass("on"), $(this).addClass("on")
      }), $("#context_box .omit").off(), $("#context_box .omit").on("click", function () {
        if ($(this).hasClass("on")) {
          $(this).removeClass("on");
          var o = 0
        } else $(this).addClass("on"), o = 1;
        localStorage.setItem($(this).attr("name"), o)
      }), $("#context_box .radio input").off(), $("#context_box .radio input").on("change", function () {
        "2" == $(this).val() ? $("#context_box .open_num").val(3) : $("#context_box .open_num").val(localStorage.getItem("room_open_n"))
      }), $("#context_box .open_num").off(), $("#context_box .open_num").on("change", function () {
        localStorage.setItem("room_open_n", $("#context_box .open_num").val())
      }), $("#context_box .open").off(), $("#context_box .open").on("click", function () {
        var o = $("#context_box .open_num").val(),
          t = $("#context_box .on").attr("name"),
          e = $("#context_box .wait_num").val(),
          n = $("#context_box .tb").hasClass("on"),
          i = $("#context_box .vb").hasClass("on"),
          c = $("#context_box .close").hasClass("on"),
          a = $("#context_box .radio input:checked").val();
        chrome.runtime.sendMessage({
          method: "function",
          key: "tab_open",
          value: JSON.stringify({
            n: o,
            w: e,
            ty: t,
            gt: a,
            tb: n,
            vb: i,
            cl: c
          })
        }, function (o) {})
      }), $("#context_box .context_close").on("click", function () {
        $("#onlive_open img").removeClass("on"), $("#context_box .context_in_box").empty().hide()
      }), $(document).off(), $(document).on("click", function (o) {
        $(o.target).closest("#context_box").length || ($("#onlive_open img").removeClass("on"), $("#context_box .context_in_box").empty().hide())
      }), JSON.parse($("#js-initial-data").attr("data-json")).isOfficial || ($(".context_open_room .star").removeClass("on"), $(".context_open_room .seed").addClass("on")), $("#context_box").draggable()
    }, $("#icon-room-onlive").off(), $("#icon-room-onlive").on("contextmenu", function (o) {
      return $("#onlive_room_open").length ? ($("#onlive_open img").removeClass("on"), $("#context_box .context_in_box").empty().hide()) : liveOpen(), !1
    }), $("#onlive_open").off(), $("#onlive_open").on("click", function (o) {
      return $("#onlive_room_open").length ? ($("#onlive_open img").removeClass("on"), $("#context_box .context_in_box").empty().hide()) : liveOpen(), !1
    })
  }, $("#js-video").length && (check = function () {
    $("#onlive_open").length ? liveOpen_C() : setTimeout(function () {
      check()
    }, 500)
  }, check())
});