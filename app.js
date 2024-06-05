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
const getSongs = async ()=>{
    const response = await fetch("./songs.json")
    const data = await response.json();
    data.forEach(element => {
        songs.push(new Song(element.name, element.audio, element.image, id = "" + (songs.length + 1)));
    })
    console.log(songs);
    showDOM()
}

function showDOM() {
    for (const song of songs)  {
        let div= document.createElement("div")
        div.classname = "songCard"
        div.innerHTML =
        `
        <p class="songName" style="background-image: url('${song.image}')">${song.name}</p>
            <source src="${song.audio}">
        `
        container.appendChild(div)
    }
}

getSongs()
