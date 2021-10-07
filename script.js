const music = document.querySelector("audio");
const musiccontainer = document.getElementById("music_container");
const playbtn = document.getElementById('play');
const imagerotation = document.querySelector('img');
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const repeat = document.getElementById("repeat");
const title = document.querySelector("h2");
const artist = document.querySelector("h3");

let progressbar = document.getElementById("progress");
let progressdiv = document.getElementById("progress_div");
let total_time = document.getElementById("total_time");
let current_time = document.getElementById("current_time")

albums = [
    {
        name : "Song1",
        title : "Iktara",
        artist: "Tochi Raina, Amitabh Bhattacharya"
    },

    {
        name : "Song2",
        title : "jee le zara",
        artist: "Vishal Dadlani"
    },

    {
        name : "Song3",
        title : "Offo 2 states",
        artist: "Amitabh Bhattacharya"
    },

    {
        name : "Song4",
        title : "rajhana",
        artist: "Jaswinder singh"
    },

    {
        name : "Song5",
        title : "Sunny Sunny",
        artist: "Yo Yo honey singh"
    },

    {
        name : "Song6",
        title : "Baby",
        artist: "Justin Bieber"
    },

    {
        name : "Song7",
        title : "Brown Rang",
        artist: "Yo Yo honey singh"
    }
];

let isplaying = false;
let songindex = 0;

function playmusic() {
    isplaying = true;
    playbtn.classList.replace("fa-play-circle", "fa-pause-circle");
    playbtn.title = "Pause";
    imagerotation.classList.add("anime");
    musiccontainer.classList.add("animatecolor");
    music.play();
};

function pausemusic() {
    isplaying = false;
    playbtn.classList.replace("fa-pause-circle", "fa-play-circle");
    playbtn.title = "Play";
    imagerotation.classList.remove("anime");
    musiccontainer.classList.remove("animatecolor");
    music.pause();
};

function loadsong(song)
{
    music.src = "Songs/"+song.name+".mp3";
    title.textContent = song.title;
    artist.textContent = song.artist;
}

function nextsong()
{
    songindex = (songindex+1) % albums.length;
    loadsong(albums[songindex]);
    playmusic();
}

function prevsong()
{
    songindex = (songindex-1 + albums.length) % albums.length;
    loadsong(albums[songindex]);
    playmusic();
}

function repeatsong(){
    music.currentTime = 0.00;
    playmusic();
}

function decisiontoplay(){
    isplaying ? pausemusic() : playmusic();
}

loadsong(albums[songindex]);

playbtn.addEventListener("click", decisiontoplay);

// progress bar work 
music.addEventListener("timeupdate", (event) => {
    const {currentTime, duration} = event.srcElement;

    // progress bar updating 
    let width = (currentTime/duration)*100;
    progressbar.style.width = `${width}%`;

    //total duration of music
    let minutes = Math.floor(duration/60);
    let seconds = Math.floor(duration%60);
    if(seconds<10)
        seconds = '0'+seconds;
    if(minutes<10)
        minutes = '0'+minutes;
    if(duration)
        total_time.textContent = `${minutes}`+":"+`${seconds}`;

    //current duration of music
    let currminutes = Math.floor(currentTime/60);
    let currseconds = Math.floor(currentTime%60);
    if(currseconds<10)
        currseconds = '0'+currseconds;
    if(currminutes<10)
        currminutes = '0'+currminutes;
    current_time.textContent = `${currminutes}`+":"+`${currseconds}`;
});

// after completion of song go to next song 
music.addEventListener("ended", nextsong);

//Random duration music play
progressdiv.addEventListener("click", (event) => {
    const{duration} = music;
    let radomtime = (event.offsetX / event.srcElement.clientWidth)*duration;
    music.currentTime = radomtime;
});

//Next and Prev button click
next.addEventListener("click",nextsong);
prev.addEventListener("click", prevsong);
repeat.addEventListener("click", repeatsong);

// Play and Pause functionality using Space 
window.addEventListener("keypress", (event)=>{
    // console.log(event.code, event.which);
    if(event.which == 32)
    {
        isplaying ? pausemusic() : playmusic();
    }
});