const audio = new Audio();
const tracksCard = document.getElementsByClassName('track');
const pauseBtn = document.querySelector('.player__icon_pause');
const catalogContainer = document.querySelector('.catalog__container');
const stopBtn = document.querySelector('.player__icon_stop');
const prevBtn = document.querySelector('.player__icon_prev');
const nextBtn = document.querySelector('.player__icon_next');
const likeBtn = document.querySelector('.player__icon_like');
const muteBtn = document.querySelector('.player__icon_mute');
const player = document.querySelector('.player');
const favoriteBtn = document.querySelector('.header__favorite-btn');
const playerPprogress = document.querySelector('.player__progress-input');
const playerTimePassed = document.querySelector('.player__time-passed');
const playerTimeTotal = document.querySelector('.player__time-total');
const logo = document.querySelector('.header__logo');
const playerVolumeInput = document.querySelector('.player__volume-input');

const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add');
  catalogAddBtn.innerHTML = `
    <span>Увидеть все</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
    </svg>     
  `;

const dataMusic = [
  {
    id: '1',
    artist: 'The weeknd',
    track: 'Save your tears',
    poster: 'img/photo1.jpg',
    mp3: 'audio/The Weeknd - Save Your Tears.mp3',
  },
  {
    id: '2',
    artist: 'Imagine Dragons',
    track: 'Follow You',
    poster: 'img/photo2.jpg',
    mp3: 'audio/Imagine Dragons - Follow You.mp3',
  },
  {
    id: '3',
    artist: 'Tove Lo',
    track: 'How Long',
    poster: 'img/photo3.jpg',
    mp3: 'audio/Tove Lo - How Long.mp3',
  },
  {
    id: '4',
    artist: 'Tom Odell',
    track: 'Another Love',
    poster: 'img/photo4.jpg',
    mp3: 'audio/Tom Odell - Another Love.mp3',
  },
  {
    id: '5',
    artist: 'Lana Del Rey',
    track: 'Born To Die',
    poster: 'img/photo5.jpg',
    mp3: 'audio/Lana Del Rey - Born To Die.mp3',
  },
  {
    id: '6',
    artist: 'Adele',
    track: 'Hello',
    poster: 'img/photo6.jpg',
    mp3: 'audio/Adele - Hello.mp3',
  },
  {
    id: '7',
    artist: 'Tom Odell',
    track: "Can't Pretend",
    poster: 'img/photo7.jpg',
    mp3: "audio/Tom Odell - Can't Pretend.mp3",
  },
  {
    id: '8',
    artist: 'Lana Del Rey',
    track: 'Young And Beautiful',
    poster: 'img/photo8.jpg',
    mp3: 'audio/Lana Del Rey - Young And Beautiful.mp3',
  },
  {
    id: '9',
    artist: 'Adele',
    track: 'Someone Like You',
    poster: 'img/photo9.jpg',
    mp3: 'audio/Adele - Someone Like You.mp3',
  },
  {
    id: '10',
    artist: 'Imagine Dragons',
    track: 'Natural',
    poster: 'img/photo10.jpg',
    mp3: 'audio/Imagine Dragons - Natural.mp3',
  },
  {
    id: '11',
    artist: 'Drake',
    track: 'Laugh Now Cry Later',
    poster: 'img/photo11.jpg',
    mp3: 'audio/Drake - Laugh Now Cry Later.mp3',
  },
  {
    id: '12',
    artist: 'Madonna',
    track: 'Frozen',
    poster: 'img/photo12.jpg',
    mp3: 'audio/Madonna - Frozen.mp3',
  },
];

let playlist = [];

const favoriteList = localStorage.getItem('favorite') 
  ? JSON.parse(localStorage.getItem('favorite')) 
  : []

const pausePlayer = () => {
    const trackActive = document.querySelector('.track_active');

    if (audio.paused) {
        audio.play();
        pauseBtn.classList.remove('.player__icon_play');
        trackActive.classList.remove('track_pause');
    } else {
        audio.pause();
        pauseBtn.classList.add('.player__icon_play');
        trackActive.classList.add('track_pause');
    }
};

const playMusic = e => {
    e.preventDefault();
    const trackActive = e.currentTarget;

    if (trackActive.classList.contains('track_active')) {
      pausePlayer();
      return 
    }

    let i = 0;
    const id = trackActive.dataset.idTrack;

    const index = favoriteList.indexOf(id);

     if (index !== -1) {
       likeBtn.classList.add('player__icon_like_active');
     } else {
       likeBtn.classList.remove('player__icon_like_active');
     }

    const track = playlist.find((item, index) => {
      i = index;
      return id === item.id;
    });
    audio.src = track.mp3;  // сохрани себе путь в url

    audio.play(); // проиграй этот путь
    pauseBtn.classList.remove('player__icon_play');
    player.classList.add('player_active');

    const prevTrack = i === 0 ? playlist.length - 1 : i - 1;
    const nextTrack = i + 1 === playlist.length ? 0 : i + 1;
    prevBtn.dataset.idTrack = playlist[prevTrack].id;
    nextBtn.dataset.idTrack = playlist[nextTrack].id;
    likeBtn.dataset.idTrack = id;

    for (let i = 0; i <= tracksCard.length; i++) {
      if (id === tracksCard[i].dataset.idTrack) {
        tracksCard[i].classList.add('track_active');
      } else {
        tracksCard[i].classList.remove('track_active');
      }
    }

    
};

const addHandlerTrack = () => {
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].addEventListener('click', playMusic);
  }
};

pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {
  audio.src = '';
  player.classList.remove('player_active');

  // !todo add stop active-card
  document.querySelector('.track_active').classList.remove('.track_active');
});

const createCard = (data) => {
  const a = document.createElement('a');
  a.href = '#';
  a.classList.add("catalog__item", "track");
  a.dataset.idTrack = data.id;
  a.innerHTML = `
    <div class="track__img-wrap">
        <img class="track__poster" src="${data.poster}" alt="${data.artist} ${data.track}" width="180" height="180">
    </div>
    <div class="track__info track-info">
        <p class="track__title">${data.artist}</p>
        <p class="track__artist">${data.track}</p>
    </div>
  `;
  return a;
};

const renderCatalog = (dataList) => {
  playlist = [...dataList];
  catalogContainer.textContent = '';
  const listCards = dataList.map(createCard);
  catalogContainer.append(...listCards);
  addHandlerTrack();
};

const checkCount = (i = 1) => {
  
  if (catalogContainer.clientHeight > tracksCard[0].clientHeight * 3) {
    tracksCard[tracksCard.length - i].style.display = 'none';
    checkCount(i + 1);
  } else if (i !== 1) { 
    catalogContainer.append(catalogAddBtn);
  }
};

const updateTime = () => {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progress = (currentTime / duration) * 1000;
  playerPprogress.value = progress ? progress : 0;

  const minutePassend = Math.floor(currentTime / 60) || '0';
  const secondPassend = Math.floor(currentTime % 60) || '0';
  const minuteDuration = Math.floor(duration / 60) || '0';
  const secondDuration = Math.floor(duration % 60) || '0';

  playerTimePassed.textContent = `${minutePassend}:${secondPassend < 10 ? '0' + secondPassend : secondPassend}`;
  playerTimeTotal.textContent = `${minuteDuration}:${secondDuration < 10 ? '0' + secondDuration : secondDuration}`;
};

const init = () => {
  audio.volume = localStorage.getItem('volume') || 1;
  playerVolumeInput.value = audio.volume * 100;

  renderCatalog(dataMusic);
  checkCount();

  catalogAddBtn.addEventListener('click', () => {
    [...tracksCard].forEach((el) => {
      el.style.display = '';
      catalogAddBtn.remove();
    });
  });

  prevBtn.addEventListener('click', playMusic);
  nextBtn.addEventListener('click', playMusic);

  audio.addEventListener('ended', () => {
    nextBtn.dispatchEvent(new Event('click', {bubbles: true}));
  });

  audio.addEventListener('timeupdate', updateTime);
  playerPprogress.addEventListener('change', () => {
    const progress = playerPprogress.value;
    audio.currentTime = (progress / 1000) * audio.duration;
  });

  favoriteBtn.addEventListener('click', () => {
    const data = dataMusic.filter((item) => favoriteList.includes(item.id));
    renderCatalog(data);
    checkCount();
  });

  likeBtn.addEventListener('click', () => {
     const index = favoriteList.indexOf(likeBtn.dataset.idTrack);

     if (index === -1) {
       favoriteList.push(likeBtn.dataset.idTrack);
       likeBtn.classList.add('player__icon_like_active');
     } else {
       favoriteList.splice(index, 1);
       likeBtn.classList.remove('player__icon_like_active');
     }

     localStorage.setItem('favorite', JSON.stringify(favoriteList));
  });

  logo.addEventListener('click', () => {
    renderCatalog(dataMusic);
    checkCount();
  });

  playerVolumeInput.addEventListener('input', () => {
    const val = playerVolumeInput.value;
    audio.volume = val / 100;
  });

  muteBtn.addEventListener('click', () => {
    if (audio.volume) {
      localStorage.setItem('volume', audio.volume);
      audio.volume = 0;
      muteBtn.classList.add('player__icon_mute-off');
      playerVolumeInput.value = 0;
    } else {
      audio.volume = localStorage.getItem('volume');
      muteBtn.classList.remove('player__icon_mute-off');
      playerVolumeInput.value = audio.volume * 100;
    }
  });

};

init();


