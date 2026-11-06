/* ==========================================================
   一烨知秋纪事录 · 装饰小图案（依日期设定）
   ----------------------------------------------------------
   每一天各写一笔，格式：

     "日期": {
       bubble: "泡泡变成的图",
       card: ["详情框图1", "详情框图2", "详情框图3"],
     },

   bubble  点选（电脑上是鼠标停留）这天的泡泡时，泡泡变成这张图，
           大小和泡泡一样；点别的泡泡才会变回来。
           不想让泡泡变 → 写 ""，或整行删掉。
   card    点开这天后，详情框右上角横排的小图，最多 3 张，由左到右。
           只想放 1～2 张就只写 1～2 张；不放 → 写 []，或整行删掉。

   日期    写成 "2025-11-05" 或 "2025/11/5" 都可以。
           没写到的日期就维持原样，不会出现任何图。

   图片    先上传到 GitHub 的 images 文件夹，这里写 "images/文件名.png"，
           大小写要和 GitHub 上的文件名一模一样；也可以直接贴图片网址。
           建议去背的 PNG、正方形，256×256 左右就够清楚。

   每一笔最后的 }, 和每张图后面的逗号不要删掉。
   ========================================================== */

window.DECO = {

  /* ↓ 在这里新增，一天一笔。下面是范本，用的时候把开头的 // 删掉 ↓ */

   "2025-09-25": {
     bubble: "0926.png",},
   "2025-09-26": {
     bubble: "0926.png",},
   "2025-09-27": {
     bubble: "0926.png",},
   "2025-09-28": {
     bubble: "0926.png",},
   "2025-09-29": {
     bubble: "0926.png",},
   "2025-10-29": {
     bubble: "0926.png",},
   "2025-10-06": {
     bubble: "1006.png",},
   "2026-10-30": {
     bubble: "1030.png",},
   "2025-11-07": {
     bubble: "1107.png",},
   "2025-11-29": {
     bubble: "1129.png",},
   "2025-12-31": {
     bubble: "1231.png",},
   "2026-01-29": {
     bubble: "0129.png",},
   "2026-01-31": {
     bubble: "0129.png",},
   "2026-02-02": {
     bubble: "0129.png",},
   "2026-02-21": {
     bubble: "0221.png",},
   "2026-03-14": {
     bubble: "0314.png",},
   "2026-03-15": {
     bubble: "0315.png",},
   "2026-03-29": {
     bubble: "0329.png",},
   "2026-04-20": {
     bubble: "0420.png",},
   "2026-04-29": {
     bubble: "0429.png",},
   "2026-04-30": {
     bubble: "0430.png",},
   "2026-07-18": {
     bubble: "0718.png",},
   "2026-07-19": {
     bubble: "0718.png",},
};
/* ==========================================================
   详情框右上角的图（一张，所有「有事件」的日子自动放）
   ----------------------------------------------------------
   CARD_PIC   图片位置。换图只要改这里。
   CARD_SIZE  图的宽度 = 详情框宽度的百分之几（等比例缩放）。
   CARD_MIN / CARD_MAX  最小、最大宽度（像素），避免太小或太大。
   上面 window.DECO 里如果某天自己写了 card，就以那天写的为准。
   ========================================================== */
(function () {
  var CARD_PIC  = "yyzq.png";
  var CARD_SIZE = 24;
  var CARD_MIN  = 70;
  var CARD_MAX  = 150;

  var D = window.DECO = window.DECO || {};
  var norm = function (s) {
    var m = String(s || "").trim().match(/^(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
    return m ? m[1] + "-" + ("0" + m[2]).slice(-2) + "-" + ("0" + m[3]).slice(-2) : "";
  };
  var keyOf = {};
  Object.keys(D).forEach(function (k) { var n = norm(k); if (n) keyOf[n] = k; });

  (window.REPLAYS || []).forEach(function (r) {
    var ev = (r.event && String(r.event).trim()) || (r.tags || []).indexOf("大事记") >= 0;
    var day = norm(r.date);
    if (!ev || !day) return;
    var k = keyOf[day] || (keyOf[day] = day);
    var v = D[k] = D[k] || {};
    if (!v.card || !v.card.length) v.card = [CARD_PIC];
  });

  /* 只有一张图时的版面：横向的图，宽度跟着详情框等比例缩放 */
  var css =
    '.card.has-deco[style*="--n:1"]{--cw:clamp(' + CARD_MIN + 'px,' + CARD_SIZE + 'cqi,' + CARD_MAX + 'px)}' +
    '.card.has-deco[style*="--n:1"] .card-deco{top:calc(var(--cw) * .06);right:calc(var(--cw) * .1)}' +
    '.card.has-deco[style*="--n:1"] .card-deco img{width:var(--cw);height:auto;aspect-ratio:1.58;object-fit:cover;object-position:50% 60%}' +
    '.card.has-deco[style*="--n:1"] .card-head{padding-right:calc(var(--cw) * 1.1)}';
  var st = document.createElement("style");
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
})();
