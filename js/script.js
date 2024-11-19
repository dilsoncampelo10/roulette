let globalObjects = {};

const playOnClick = () => {
 
    globalObjects = {
        btnPlay: document.querySelector(".btnPlay"),
        roulette: document.querySelector(".roulette"),
    };

   
    globalObjects.timeInitial = new Date();
    globalObjects.btnPlay.style.visibility = "hidden";

   
    const randomRotation = Math.floor(Math.random() * 3600) + 360;
    globalObjects.roulette.style.transition = "transform 4s ease-out";
    globalObjects.roulette.style.transform = `rotate(${randomRotation}deg)`;

   
    const today = new Date().toISOString().split("T")[0]; 
    localStorage.setItem("lastPlayDate", today);

  
    
  
};

const checkIfPlayedToday = () => {
    const lastPlayDate = localStorage.getItem("lastPlayDate");
    const today = new Date().toISOString().split("T")[0]; 

    if (lastPlayDate === today) {

        document.querySelector(".btnPlay").style.visibility = "hidden";
        document.querySelector(".infoMessage").textContent = "Você já jogou hoje! Tente novamente amanhã.";
        return true;
    }
    return false;
};

const checkAndClearLocalStorage = () => {
    const storedDate = localStorage.getItem("lastPlayed");

    if (storedDate) {
        const currentDate = new Date();
        const storedDateObj = new Date(storedDate);

        if (currentDate >= storedDateObj) {
            localStorage.removeItem("lastPlayed");
            console.log("Data expirada. Entrada do localStorage removida.");
        } else {
            console.log("Ainda está dentro do prazo.");
        }
    } else {
        console.log("Nenhuma data armazenada no localStorage.");
    }
};


document.addEventListener("DOMContentLoaded", () => {
    if (!checkIfPlayedToday()) {
        document.querySelector(".btnPlay").addEventListener("click", playOnClick);
    }
    if(localStorage.getItem("reward")){
        document.querySelector(".reward_message").innerHTML ="<h2>Seu prêmio do dia: "+ localStorage.getItem("reward")+"</h2>"
    }
    checkAndClearLocalStorage()
   
});
