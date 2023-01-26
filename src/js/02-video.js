import Player from '@vimeo/player';
import throttle from '../../node_modules/lodash.throttle/index.js';

const idPlayer = new Player('vimeo-player');
const STORAGE_KEY = 'videoplayer-current-time';
const currentTime = Number(localStorage.getItem(STORAGE_KEY));

idPlayer.on('timeupdate', throttle(onPlay, 1000));


idPlayer.setCurrentTime(currentTime);

function onPlay(data) {
    const currentTime = data.seconds;
    localStorage.setItem(STORAGE_KEY, currentTime);
}

