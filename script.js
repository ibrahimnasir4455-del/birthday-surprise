// =========================
// Birthday Surprise Script
// Part 1
// =========================

const loader = document.getElementById("loader");
const doorSection = document.getElementById("door-section");
const surprise = document.getElementById("surprise");

const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");

const openDoor = document.getElementById("openDoor");

const music = document.getElementById("music");

const message = document.getElementById("message");

window.onload = () => {

setTimeout(()=>{

loader.style.display="none";

},2500);

};

openDoor.onclick = ()=>{

leftDoor.style.transform="rotateY(-110deg)";

rightDoor.style.transform="rotateY(110deg)";

music.play();

setTimeout(()=>{

doorSection.style.display="none";

surprise.style.display="block";

typeMessage();

},2200);

};

function typeMessage(){

const text=`

💖 Happy Birthday Rija Burney... 🎂❤️

Aaj ka din sirf tumhare naam hai... ✨

May Allah tumhari har dua qubool kare... 🤲❤️

May every smile stay forever on your face... 😊💕

Tumhari zindagi khushiyon se bhar jaye... 🌹✨

May success follow you everywhere... 💫

Stay blessed...
Stay happy...
Stay beautiful...

Once Again...

Happy Birthday Rija Burney... 🎉❤️

From...
Ibrahim Nasir... ❤️

`;

let i=0;

const typing=setInterval(()=>{

message.innerHTML+=text.charAt(i);

i++;

if(i>=text.length){

clearInterval(typing);

}

},45);

}
