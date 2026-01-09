const songs = [
  { name: "Neon Sunset", artist: "Synthwave Pro", path: "songs/song1.mp3", cover: "https://picsum.photos/200/200?random=1" },
  { name: "Midnight City", artist: "Urban Dreamer", path: "songs/song2.mp3", cover: "https://picsum.photos/200/200?random=2" },
  { name: "Deep Echoes", artist: "Lofi Girl", path: "songs/song3.mp3", cover: "https://picsum.photos/200/200?random=3" }
];

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-pause');
const trackName = document.getElementById('track-name');
const trackArtist = document.getElementById('track-artist');
const trackArt = document.getElementById('track-art');
const progress = document.getElementById('progress');

function loadTrack(index) {
  const song = songs[index];
  audio.src = song.path;
  trackName.textContent = song.name;
  trackArtist.textContent = song.artist;
  trackArt.src = song.cover;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶';
  } else {
    audio.play();
    playBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadTrack(currentIndex);
  if (isPlaying) audio.play();
}

function prevTrack() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadTrack(currentIndex);
  if (isPlaying) audio.play();
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
document.getElementById('next').addEventListener('click', nextTrack);
document.getElementById('prev').addEventListener('click', prevTrack);

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  
  // Format time
  const format = (t) => Math.floor(t / 60) + ":" + Math.floor(t % 60).toString().padStart(2, '0');
  document.getElementById('current-time').textContent = format(audio.currentTime);
  document.getElementById('duration').textContent = audio.duration ? format(audio.duration) : "0:00";
});

progress.addEventListener('input', (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

// Auto-play next song
audio.addEventListener('ended', nextTrack);

loadTrack(currentIndex);
const volumeSlider = document.querySelector('.volume-slider');

volumeSlider.addEventListener('input', (e) => {
  // e.target.value pulls the 0.0 to 1.0 value from your range input
  audio.volume = e.target.value;
  
  // Optional: Console log to verify it's working
  console.log("Current Volume:", audio.volume);
});