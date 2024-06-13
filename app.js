class Song {
  constructor(name, audio, image, fadeInTimer, id) {
    this.name = name;
    this.audio = audio;
    this.image = image;
    this.id = id;
    this.fadeInTimer = fadeInTimer;
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
        (id = "" + (songs.length + 1))
      )
    );
  });
  console.log(songs);
  showDOM();
};

function showDOM() {
  for (const song of songs) {
    let div = document.createElement("div");
    div.classname = "songCard";
    div.innerHTML = `
        <button id="btn${song.name}" class="songName" style="background-image: url('${song.image}')">${song.name}</button>
        `;
    container.appendChild(div);

    const btn = document.getElementById(`btn${song.name}`);

    btn.addEventListener("click", () => {
      createSong(song);
    });
  }
}

function createSong(song) {
  let div = document.createElement("div");
  div.classname = "audioControlls";
  div.id = `audio${song.name}`;
  div.innerHTML = `
    <audio src="${song.audio}" autoplay controls loop class="audioControls" id="audioController${song.name}">`;

  audios.appendChild(div);

  const actualSong = document.getElementById(`audioController${song.name}`);
  actualSong.volume = 0;

  fadeIn(song);
}

function fadeIn(song) {
  const audio = document.getElementById(`audioController${song.name}`);

  const fadeInAudio = setInterval(function () {
    if (audio.volume < 0.98) {
      audio.volume += 0.01;
    } else {
      audio.volume = 1.0;
    }

    if (audio.volume === 1.0) {
      clearInterval(fadeInAudio);
    }
  }, song.fadeInTimer);
}

function delPrevSong() {}

getSongs();
