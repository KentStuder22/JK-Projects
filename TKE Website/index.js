
var slides = [
    "./slideshow/2019Decks.PNG",
    "./slideshow/execSki.PNG",
    "./slideshow/fenceChill.PNG",
    "./slideshow/frontHouse.PNG",
    "./slideshow/hoco2017Skit.PNG"
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