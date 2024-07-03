class Song {
  constructor(
    name,
    audio,
    image,
    fadeInTimer,
    id,
    category,
    playing,
    randomStart,
    loops
  ) {
    this.name = name;
    this.audio = audio;
    this.image = image;
    this.id = id;
    this.fadeInTimer = fadeInTimer;
    this.category = category;
    this.playing = false;
    this.randomStart = randomStart;
    this.loops = loops;
  }
}

const songs = [];

//Gets songs from JSON
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
        element.playing,
        element.randomStart,
        element.loops
      )
    );
  });
  console.log(songs);
  showDOM();
};
/* Base app has spaces for name, audio, image, fade in timer, an id, category, a boolean for checking if song is playing, 
a boolean for random start or if it starts from the beginning, and a boolean for looping comprobation. More can be added. Id doesn't get a use.*/

//Shows all songs avalaible
function showDOM() {
  for (const song of songs) {
    let div = document.createElement("div");
    div.className = "songCard";
    div.innerHTML = `
        <button id="btn${song.name}" class="songIcon" style="background-image: url('${song.image}')"></button>
        <p class="songName">${song.name}</p>
        `;

    //Append to respective container by category
    const container = document.getElementById(`container${song.category}`);
    container.appendChild(div);

    //Generates the audio controlls
    let div2 = document.createElement("div");
    div2.classname = "audioControlls";
    div2.id = `audio${song.name} generalID`;
    //Checks if song loops
    if (song.loops === true) {
      div2.innerHTML = `
        <audio src="${song.audio}" controls loop class="audioControls" id="audioController${song.name}">`;
    } else {
      div2.innerHTML = `
        <audio src="${song.audio}" controls class="audioControls" id="audioController${song.name}">`;
    }
    audios.appendChild(div2);

    const btn = document.getElementById(`btn${song.name}`);

    //Plays or pauses song
    btn.addEventListener("click", () => {
      if (!song.playing) {
        playSong(song);
      } else {
        fadeOut(song);
      }
    });
  }
}

//Plays song function
function playSong(song) {
  const audio = document.getElementById(`audioController${song.name}`);
  stopAllSongs(song.name);
  audio.volume = 0;

  //Checks if song has random start
  if (song.randomStart === true) {
    audio.currentTime = Math.random() * audio.duration;
    audio.play();
    console.log(audio.currentTime);
  } else if (song.randomStart === false) {
    audio.currentTime = 0;
    audio.play();
    console.log(audio.currentTime);
  }
  fadeIn(song);
}

//Fade in for song function
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

//Fade out and stop for song function
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

//Stop all songs with a possible exception function
function stopAllSongs(exception) {
  console.log(`Exception is: ${exception}`);
  for (const song of songs) {
    if (song.name != exception && song.playing === true) {
      console.log(song.playing);
      fadeOut(song);
    }
  }
}

//Stop all songs when the title is clicked
const title = document.getElementById("title");
title.addEventListener("click", () => {
  stopAllSongs();
});

getSongs();