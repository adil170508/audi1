const bar = document.getElementById("bar");
const track = document.getElementById("scrollTrack");
const goUp = document.getElementById("goUp");
const goDown = document.getElementById("goDown");
function updateBar() {
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - innerHeight;
    const maxBar = track.offsetHeight - bar.offsetHeight;
    const ratio = doc.scrollTop / maxScroll;
    bar.style.top = (ratio * maxBar) + "px";
    goUp.style.display = doc.scrollTop > 100 ? "flex" : "none";
    goDown.style.display = doc.scrollTop < maxScroll - 100 ? "flex" : "none";
}
window.addEventListener("scroll", updateBar);
window.addEventListener("resize", updateBar);
updateBar();
let dragging = false;
let shiftY = 0;
bar.addEventListener("mousedown", (e) => {
    dragging = true;
    shiftY = e.clientY - bar.getBoundingClientRect().top;
});
document.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const maxBar = track.offsetHeight - bar.offsetHeight;
    let y = e.clientY - shiftY - track.getBoundingClientRect().top;
    if (y < 0) y = 0;
    if (y > maxBar) y = maxBar;
    bar.style.top = y + "px";
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - innerHeight;
    const ratio = y / maxBar;
    window.scrollTo({ top: maxScroll * ratio, behavior: "auto" });
});
document.addEventListener("mouseup", () => dragging = false);
goUp.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
goDown.onclick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });