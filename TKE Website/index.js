
var slides = [
    "./slideshow/2019Decks.PNG",
    "./slideshow/AEClass.JPG",
    "./slideshow/basketballAction.JPG",
    "./slideshow/basketballJBS.JPG",
    "./slideshow/DaggerMuck.JPG",
    "./slideshow/execSki.PNG",
    "./slideshow/fenceChill.PNG",
    "./slideshow/frontHouse.PNG",
    "./slideshow/hoco2017Skit.PNG",
    "./slideshow/Hoco2021.JPG",
    "./slideshow/houseChill.JPG",
    "./slideshow/kdPhilWin.JPG",
    "./slideshow/kiddyPoolChill.JPG",
    "./slideshow/MomsWeekend2019.JPG",
    "./slideshow/penguinChill.JPG",
    "./slideshow/Rush2019.JPG"
];

var slideIndex = 0;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  if (n > slides.length-1) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length-1; }
  console.log(n);

  document.getElementById("display").setAttribute("src",slides[slideIndex]);
}