// LOADER

window.onload = ()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},2500);

};



// ELEMENTS

const openDoor = document.getElementById("openDoor");

const leftDoor = document.querySelector(".left");

const rightDoor = document.querySelector(".right");

const doorScreen = document.getElementById("doorScreen");

const birthday = document.getElementById("birthday");

const music = document.getElementById("music");

const heartBtn = document.getElementById("heartBtn");

const letter = document.getElementById("letter");




// OPEN DOOR

openDoor.onclick = ()=>{


leftDoor.style.transform="rotateY(-120deg)";

rightDoor.style.transform="rotateY(120deg)";


// MUSIC

music.play().catch(()=>{});



setTimeout(()=>{


doorScreen.style.display="none";

birthday.classList.remove("hidden");


},2000);



};




// OPEN LETTER

heartBtn.onclick=()=>{


letter.classList.remove("hidden");


heartBtn.style.display="none";


};
