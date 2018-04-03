export default () => {
  const playerButtonsSection = document.getElementById('player-buttons');
  const progressBar = document.getElementById('song-progress-bar');

  const playButton = document.getElementById('play-song-button');
  const pauseButton = document.getElementById('');
  const nextSongButton = document.getElementById('play-next-song-button');
  const priviousSongButton = document.getElementById('play-previous-song-button');
  const repeatSongButton = document.getElementById('repeat-song-button');
  const shuffleSongsButton = document.getElementById('shuffle-song-button');

  playerButtonsSection.addEventListener('click', (event) => {
    const { target } = event;
    console.log(target);
  });

  progressBar.addEventListener('change', (event) => {
    const myAudio = {};
    myAudio.currentTime = progressBar.value;
    console.log(progressBar.value);
  });
};
