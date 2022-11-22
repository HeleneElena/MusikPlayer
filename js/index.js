const audio = new Audio();

const pauseBtn = document.querySelector('.player__icon_pause');

const playMusic = url => {
    audio.src = url;  // сохрани себе путь в url
    audio.play(); // проиграй этот путь
}
pauseBtn.addEventListener('click', () => {
    playMusic('audio/Adele - Someone Like You.mp3');
});


