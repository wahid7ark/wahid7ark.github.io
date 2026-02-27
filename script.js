function startMusic() {
    var audio = document.getElementById("bgmusic");

    if (audio) {
        audio.play().catch(function () {});
    }
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });
