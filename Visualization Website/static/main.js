
// function to present tooltip type div on mouse position based on state its hovering over
function state_highlight(evt, element) {
    // console.log(element.firstElementChild.innerHTML);
    let info = document.getElementById("stateInfo");
    info.innerHTML = element.firstElementChild.innerHTML;
    info.style.display = 'block';
    info.style.left = evt.pageX + 10 + 'px';
    info.style.top = evt.pageY + 10 + 'px';
}

// clears tooltip div when mouse leaves map area
function clear_highlight() {
    let info = document.getElementById("stateInfo");
    info.style.display = "none";
}

