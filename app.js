class Song {
  constructor(name, audio, image, fadeInTimer, id, category, playing) {
    this.name = name;
    this.audio = audio;
    this.image = image;
    this.id = id;
    this.fadeInTimer = fadeInTimer;
    this.category = category;
    this.playing = false;
  }
}

const songs = [];

//Obtener canciones
const getSongs = async () => {
  const response = await fetch("./songs.json");
  const data = await response.json();
  data.forEach((element) => {
    songs.push(
      new Song(
        element.name,
        element.audio,
        element.image,
        element.fadeInTimer,
        (id = "" + (songs.length + 1)),
        element.category,
        element.playing
      )
    );
  });
  console.log(songs);
  showDOM();
};

//Shows all songs avalaible
function showDOM() {
  for (const song of songs) {
    let div = document.createElement("div");
    div.className = "songCard";
    div.innerHTML = `
        <button id="btn${song.name}" class="songIcon" style="background-image: url('${song.image}')"></button>
        <p class="songName">${song.name}</p>
        `;
    if (song.category == "Combat") {
      containerCombat.appendChild(div);
    } else if (song.category == "Travel") {
      containerTravel.appendChild(div);
    }

    let div2 = document.createElement("div");
    div2.classname = "audioControlls";
    div2.id = `audio${song.name} generalID`;
    div2.innerHTML = `
        <audio src="${song.audio}" controls loop class="audioControls" id="audioController${song.name}">`;
    audios.appendChild(div2);

    const btn = document.getElementById(`btn${song.name}`);

    btn.addEventListener("click", () => {
      if (!song.playing) {
        playSong(song);
      } else {
        fadeOut(song);
      }
    });
  }
}

//Plays song
function playSong(song) {
  const audio = document.getElementById(`audioController${song.name}`);
  stopAllSongs(song.name);
  audio.currentTime = 0;
  audio.volume = 0;
  audio.play();
  fadeIn(song);
}

//Fade in for song
function fadeIn(song) {
  const audio = document.getElementById(`audioController${song.name}`);
  console.log(`Fade in: ${song.name}`);
  const fadeInAudio = setInterval(function () {
    if (audio.volume < 0.98) {
      audio.volume += 0.01;
    } else {
      audio.volume = 1.0;
    }

    if (audio.volume === 1.0) {
      song.playing = true;
      clearInterval(fadeInAudio);
    }
  }, song.fadeInTimer);
}

//Fade out and stop for song
function fadeOut(song) {
  console.log(`Fade out: ${song.name}`);
  const audio = document.getElementById(`audioController${song.name}`);

  const fadeOutAudio = setInterval(function () {
    if (audio.volume > 0.01) {
      audio.volume -= 0.01;
    } else {
      audio.volume = 0;
    }
    if (audio.volume === 0) {
      audio.pause();
      song.playing = false;
      clearInterval(fadeOutAudio);
    }
  }, 10);
}

//Stop all songs with a possible exception
function stopAllSongs(exception) {
  console.log(`Exception is: ${exception}`);
  for (const song of songs) {
    if (song.name != exception && song.playing === true) {
      console.log(song.playing)
      fadeOut(song);
    }
  }
}

const title = document.getElementById("title");
title.addEventListener("click", () => {
  stopAllSongs();
})



getSongs();
