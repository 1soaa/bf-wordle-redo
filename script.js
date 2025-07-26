let songs = [];
let sentSong = [];
let guesses = 1;
let songToGuess ;
let durationInSec = 0;

document.addEventListener('DOMContentLoaded',async () => {
await FillArray();
console.log(songs);

songToGuess = songs[Math.floor(Math.random() * songs.length)];


console.log(songToGuess);

    durationInSec += Number(songToGuess.duration[0] * 60);
    durationInSec += Number(songToGuess.duration[2] * 10);
    durationInSec += Number(songToGuess.duration[3]);
console.log(durationInSec);

    document.addEventListener('input', change => {
        AutofillSearch();
    })

    document.getElementById("guessButton").addEventListener('click', e => {
        if (guesses <= 8) {
            ButtonPressed();
            if (guesses <= 8) {
                document.getElementById("input").placeholder = "Guess " + guesses + "/8";
            }
            else {
                document.getElementById("input").placeholder = "nono guesses";
                document.getElementById("input").disabled = true;
            }
            document.getElementById("input").value = "";

        }

    })

})
async function FillArray() {
    songs = await fetch("http://localhost:3000/songs")
    .then(res => res.json())
}

function AutofillSearch () {
    document.getElementById("ul").innerHTML = "";
    let onList = 0;
    let input = document.getElementById("input")
    if(input.length !== 0){
        for (let i = 0; i < songs.length; i++){
            if (onList < 5 && input.value !== "" && songs[i].songTitle.toLowerCase().startsWith(input.value.toLowerCase())){
                let li = document.createElement("li");
                li.textContent = songs[i].songTitle;
                li.innerHTML = songs[i].songTitle;

                document.getElementById("ul").appendChild(li);
                onList++;

                if (songs[i].songTitle === input.value){
                    document.getElementById("ul").innerHTML = "";
                }

                li.onclick = function(){
                    input.value = songs[i].songTitle;
                    document.getElementById("ul").innerHTML = "";
                }
            }
        }


    }
}

function ButtonPressed(){
    let durationSec = 0;
    let input = document.getElementById("input")
    for (let i = 0; i < songs.length; i++) {
        if (input.value === songs[i].songTitle) {
            sentSong = [];
            sentSong.push(songs[i]);

            console.log(songs[i].duration);
            durationSec += Number(songs[i].duration[0] * 60);
            durationSec += Number(songs[i].duration[2] * 10);
            durationSec += Number(songs[i].duration[3]);

            console.log(durationSec);
            sentSong.push(durationSec);




            guesses++;

            console.log("guess: " + guesses);

            DrawTable();
        }
    }

}


function DrawTable (){
    let tr = document.createElement("tr");

    let songName = document.createElement("td");
    songName.innerHTML = sentSong[0].songTitle;
    songName.style.textAlign = "center";
    if (sentSong[0].songTitle === songToGuess.songTitle){
        songName.style.backgroundColor = "#71b55b";
    }


    let album = document.createElement("td");
    if (sentSong[0].album === "2 Layers 2 Deep") {
        album.innerHTML = '<img src="albums/boko-2Layers2Deep.png" alt="Album cover" style="width: 70px; height: 70px;">';
        album.style.textAlign = "left";
        album.style.lineHeight = "0";
        album.style.padding = "0px";
        if ()
    }
    else if (sentSong[0].album === "A-Compact-Masterpiece"){
        album.innerHTML = '<img src="albums/boko-ACM.png" alt="Album cover" style="width: 70px; height: 70px;">';
        album.style.textAlign = "left";
        album.style.padding = "0px";
        album.style.lineHeight = "0";
    }
    else if (sentSong[0].album === "MAN&GOD"){
        album.innerHTML = '<img src="albums/boko-MAN&GOD.png" alt="Album cover" style="width: 70px; height: 70px;">';
        album.style.textAlign = "left";
        album.style.padding = "0px";
        album.style.lineHeight = "0";
    }
    else if (sentSong[0].album === "A Saint's Addiction"){
        album.innerHTML = '<img src="albums/boko-ASaintsAddiction.jpg" alt="Album cover" style="width: 70px; height: 70px;">';
        album.style.textAlign = "left";
        album.style.padding = "0px";
        album.style.lineHeight = "0";
    }
    else{
        album.innerHTML = '<img src="albums/boko-ASinnersRecovery.jpg" alt="Album cover" style="width: 70px; height: 70px;">';
        album.style.textAlign = "left";
        album.style.padding = "0px";
        album.style.lineHeight = "0";
    }



    tr.appendChild(songName);
    tr.appendChild(album);
    tr.appendChild(TrackNumber());
    tr.appendChild(TrackLength());

    document.getElementById("table").appendChild(tr);
}


function TrackNumber (){
    let trackNumber = document.createElement("td");
    trackNumber.innerHTML = sentSong[0].trackNumber;
    trackNumber.style.textAlign = "center";
    let eqa = Number(sentSong[0].trackNumber)-Number(songToGuess.trackNumber);
    console.log(eqa);
    if (eqa === 0){
        console.log("correct num")
        trackNumber.style.backgroundColor = "#71b55b";
    }
    else if (eqa === -2 || eqa === -1){
        console.log("close num")
        trackNumber.style.backgroundColor = "#cfc669";
    }
    else if (eqa === 2 || eqa === 1){
        trackNumber.style.backgroundColor = "#cfc669";
    }
    if (eqa < 0){
        trackNumber.innerHTML += '&nbsp;<span style="transform: rotate(180deg); display: inline-block; transform-origin: center; position: relative; top: -2px;">\u2228</span>';
    }
    else if (eqa > 0){
        trackNumber.innerHTML += " \u2228";
    }

    return trackNumber;
}

function TrackLength (){
    let trackLength = document.createElement("td");
    trackLength.innerHTML = sentSong[0].duration;
    trackLength.style.textAlign = "center";
    let eqa = sentSong[1]-durationInSec;
    console.log(eqa);
    if (eqa === 0){
        console.log("yipi time");
        trackLength.style.backgroundColor = "#71b55b";
    }
    else if (eqa > -20 && eqa < 0){
        console.log("close time")
        trackLength.style.backgroundColor = "#cfc669";
    }
    else if (eqa < 20 && eqa > 0){
        trackLength.style.backgroundColor = "#cfc669";
    }
    if (eqa < 0){
        trackLength.innerHTML += '&nbsp;<span style="transform: rotate(180deg); display: inline-block; transform-origin: center; position: relative; top: -2px;">\u2228</span>';
    }
    else if (eqa > 0){
        trackLength.innerHTML += " \u2228";
    }

    return trackLength;
}