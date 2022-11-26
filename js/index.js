const audio = new Audio();

const tracksCard = document.getElementsByClassName('track');
const pauseBtn = document.querySelector('.player__icon_pause');

console.log(tracksCard);

const playMusic = url => {
    audio.src = url;  // сохрани себе путь в url
    audio.play(); // проиграй этот путь
};

for (let i = 0; i <= tracksCard.length; i++) {
    tracksCard[i].addEventListener('click', playMusic);
};
