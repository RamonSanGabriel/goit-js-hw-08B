import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);

//4.Read the documentation of the on() method and start tracking the timeupdate event - playback time update.
const timeFunction = data => {
  let playerSecond = data.seconds;
  localStorage.setItem('videoplayer-current-time', playerSecond);
};

//5.Save playback time to local storage. Let the key for the storage be the "videoplayer-current-time" string.
player.on('timeupdate', throttle(timeFunction, 1000));

//6.When reloading the page, use the setCurrentTime() method to resume playback from the saved position.
player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
