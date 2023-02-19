export let leftArrowOn = false;
export let rightArrowOn = false;
export let upArrow = false;
export let downArrow = false;
export let space = false;
export let falling = false;

document.addEventListener("keydown", e => {
	if (e.key == "ArrowLeft") leftArrowOn = true;
	else if (e.key == "ArrowRight") rightArrowOn = true;
	else if (e.key == "ArrowUp") upArrow = true;
	else if (e.key == "ArrowDown") downArrow = true;
	else if (e.key == " ") space = true;
});

document.addEventListener("keyup", e => {
	if (e.key == "ArrowLeft") leftArrowOn = false;
	else if (e.key == "ArrowRight") rightArrowOn = false;
	else if (e.key == "ArrowUp") {
		upArrow = false;
		falling = true;
	} else if (e.key == "ArrowDown") downArrow = false;
	else if (e.key == " ") space = false;
});