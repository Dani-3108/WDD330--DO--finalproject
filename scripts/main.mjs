//Footer section that repeats in each page
const today = new Date();
document.getElementById("currentyear").innerHTML = today.getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
//Hamburger button section for menu in navegation bar
const button = document.querySelector("#hamburger");
const navigation = document.querySelector(".menu");
//listener events for menu button
button.addEventListener("click", function () {
    if (button.classList.contains("open")) {
        button.innerHTML = "&#9776";
    }
    else {
        button.innerHTML = "&#10005";
    }
    navigation.classList.toggle("open");
    button.classList.toggle("open");
});
// local storage recording
const lastVisit = localStorage.getItem("lastVisit");
const msToDays = 86400000;
let message = "";
if (lastVisit == null) {
    message = "Welcome! Enjoy the content and let us know if you have any questions.";
    localStorage.setItem("lastVisit", Date.now());
}
else {
    let daysDifference = Math.floor((Date.now() - lastVisit) / msToDays);
    if (daysDifference < 1) {
        message = "Back so soon! Awesome!";
        localStorage.setItem("lastVisit", Date.now());
    }
    else {
        let dayWord = "";
        if (daysDifference === 1) {
            dayWord = "day";
        }
        else {
            dayWord = "days";
        }
        message = `You last visited ${daysDifference} ${dayWord} ago`;
        localStorage.setItem("lastVisit", Date.now());
    }
}
document.querySelector("#visit-message").innerHTML = message;