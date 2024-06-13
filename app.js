class Song {
  constructor(name, audio, image) {
    this.name = name;
    this.audio = audio;
    this.image = image;
    this.id = id;
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
  actualSong.volume = 0
  $audio.animate({volume: 1.0}, 1000)
}

function delPrevSong() {}

getSongs();