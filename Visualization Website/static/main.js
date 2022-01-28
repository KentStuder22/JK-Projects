
function state_highlight(element) {
    console.log(element.firstElementChild.innerHTML);
    element.innerHTML = '<span>' + element.firstElementChild.innerHTML + '</span>';
}

