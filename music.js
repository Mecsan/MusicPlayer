

var mini = false;
var all_songs;
var all_song = [{
    "name": "Let me love you",
    "singer": "justin biber",
    "img": "let_me_love_you.jpg"
},
{
    "name": "Excuses",
    "singer": "AP dhillon",
    "img": "excuses.jpg"
}
    , {
    "name": "Peaky blinder",
    "singer": "Otnicka",
    "img": "peaky.jpg"
}
    , {
    "name": "Blinding light",
    "singer": "The weekeend",
    "img": "blinding light.jpg"
},
{
    "name": "Tu Aake dekhle",
    "singer": "king",
    "img": "tu akhe dekhle.jpg"
},
{
    "name": "Kacha Badam",
    "singer": "Bhuban Bandyakar",
    "img": "kacha badam.jpg"
},
{
    "name": "Don't let me down",
    "singer": "Chainsmokers",
    "img": "dont let me down.jpg"

},
{
    "name": "One Dance",
    "singer": "Drake",
    "img": "one dance.jpg"
},
{
    "name": "The night we met",
    "singer": "Lord huron",
    "img": "The night we met.jpg"
},
{
    "name": "Zara zara",
    "singer": "Unknown",
    "img": "Zara zara.jpg"
},
{
    "name": "senorita",
    "singer": "koi to he",
    "img": "Anjani.jpg"

},
{
    "name": "Naruto pain theme",
    "singer": "artist",
    "img": "Naruto pain theme.jpg"

}
]

let cur_list = all_song;

let close = document.querySelector('.close');
let next = document.getElementById('nxt');
let play = document.getElementById('play');
let pre = document.getElementById('pre');
let audio = document.getElementById('audio');
var aside = document.getElementById('song');
var down = document.getElementById('down');
 
var slide = document.querySelector('#text');
var s_box = document.getElementById('s_box');
var s_text = document.getElementById('s_txt');
var s_pro = document.getElementById('s_progre')
let text = document.getElementById('text');
let pro = document.getElementById('progre');
let img = document.getElementById('image');
let s_pre = document.getElementById('s_pre');
let s_nxt = document.getElementById('s_nxt');
let s_play = document.getElementById('s_play');
var c = document.getElementById('song');
let mu = document.querySelector('.musicplayer');
let x = document.querySelector('.contain');
let cu_time = document.getElementById('cu_time');
let to_time = document.getElementById('to_time');
let S_se = document.getElementById('S_se');
let se = document.getElementById('se');



down.addEventListener('click', function () {
    let x = document.querySelector('div.contain');
    if (x.style.bottom != '-200px') {
        x.style.bottom = '-200px';
        down.style.bottom = '0px';
        main.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    else {
        down.style.bottom = '72px';
        x.style.bottom = '0px';
        console.log("me nhi hu")
    }
})

load_songs(all_song);

//default song
let song_idx = 2;
get_song(all_song[song_idx]);


function load_songs(song) {
    for (let i = 0; i < song.length; i++) {
        let div = `<div class="songs play_this" title="${i}">
         <div class="child img" 
         style="background:url('img/${song[i].img}');
         background-position:center;
         background-size:cover;"></div>
        <div class="child name" id="c1" >${song[i].name}</div>
        <div class="child singer">${song[i].singer}</div>
        </div>`
        aside.innerHTML += div;
    }

}


function get_song(s) {
    text.innerText = s.name;
    s_text.innerText = s.name;
    s_box.style.backgroundImage = `url('img/${s.img}')`;
    img.src = `img/${s.img}`;
    audio.src = `song/${s.name}.mp3`;
    
}



function play_song() {


    if (audio.paused == true) {
        slide.classList.add('add_sl');
        play.innerText = '=';
        s_play.innerText = '=';
        play.style.transform = "rotatez(90deg)";
        s_play.style.transform = "rotatez(90deg)";

        audio.play();
    }
    else {
        slide.classList.remove('add_sl');

        play.innerText = '>';
        s_play.innerText = '>';

        play.style.transform = "rotatez(0deg)";
        s_play.style.transform = "rotatez(0deg)";

        audio.pause();
    }
    // console.log(audio);
}
function next_song() {
    play.innerText = "=";
    play.style.transform = "rotatez(90deg)";
    song_idx++;
    song_idx = song_idx % all_song.length;
    get_song(cur_list[song_idx]);
    play_song();
}
function pre_song() {
    play.innerText = "=";
    play.style.transform = "rotatez(90deg)";

    song_idx--;
    if (song_idx < 0) {
        song_idx = all_song.length - 1;
    }
    // console.log(song_idx);
    get_song(cur_list[song_idx]);
    play_song();
}

play.addEventListener("click", play_song);
next.addEventListener("click", next_song);
pre.addEventListener("click", pre_song);
audio.addEventListener('timeupdate', set_status);
s_nxt.addEventListener("click", next_song);
s_pre.addEventListener("click", pre_song);
s_play.addEventListener("click", play_song);
close.addEventListener('click', s_close);
 


se.addEventListener('input', search)
S_se.addEventListener('input', search)

function search() {
    aside.innerText = "";
    let text = this.value.toLowerCase();
    var arr = [];
    // console.log(arr, text);
    all_song.forEach((obj) => {
        let found = false;
        let name = obj.name.toLowerCase();
        let singer = obj.singer.toLowerCase();
        if (name.indexOf(text) != -1 || singer.indexOf(text) != -1) {
            arr.push(obj);
        }
    });
    cur_list = arr;
    load_songs(arr);
}


function set_status() {
    if (audio.ended) {
        next_song();
    }
    // console.log("heloo mother father");
    let total_time = audio.duration;
    let currTime = audio.currentTime;
    let new_value = (currTime / total_time) * 100;
    // console.log(new_value);
    if (isNaN(new_value)) {
        s_pro.value = 0;
        pro.value = 0;
    }
    else {
        s_pro.value = new_value;
        pro.value = new_value;
    }

}




c.addEventListener('click', play_t);
function play_t(e) {
    //   console.log(e.target);
    if (e.target.classList.contains("play_this")
        || e.target.classList.contains("child")) {
        let par = e.target;
        if (e.target.classList.contains("child")) {
            par = par.parentElement;
            // console.log(par);
        }
        let idx = par.title;
        //   console.log(idx);
        play.innerText = '=';
        get_song(cur_list[idx]);
        play_song();
    }
}

x.addEventListener('click', function (e) {
    if (innerWidth <= '500') {
        if (e.target.classList.contains('sh')) { }
        else {
            if (mu.style.top != '0%') {
                mu.style.top = '0%';
            }
            else {
                mu.style.top = '100%';
            }

        }
        return;
    }

})

// })


function change_() {
    let total_time = audio.duration;
    let val = pro.value;
    let currTime = (total_time * val) / 100;
    if (!isNaN(currTime)) {
        audio.currentTime = currTime;
    }
}

function s_change() {
    let total_time = audio.duration;
    let val = s_pro.value;
    let currTime = (total_time * val) / 100;
    if (!isNaN(currTime)) {
        audio.currentTime = currTime;
    }
}
function s_close() {
    mu.style.top = '100%';
}
function show_main() {
    if (innerWidth <= '500') {
        return;
    }
    if (main.style.display != 'block') {
        main.style.display = 'block';
        document.body.style.overflow = 'hidden';

    }
    else {
        main.style.display = 'none';
        document.body.style.overflow = 'auto';

    }

}




