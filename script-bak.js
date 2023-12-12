const ball = document.querySelector('.ball');
let isBallDown = false;
let currentDroppable = null;
const ballInfo = {
	shiftX: 0,
	shiftY: 0,
};

const handleImageDown = (e) => {
	const rect = ball.getBoundingClientRect();
	isBallDown = true;
	ball.style.position = 'absolute';
	ballInfo.shiftX = e.clientX - rect.left;
	ballInfo.shiftY = e.clientY - rect.top;
};

const leaveDroppable = (currentDroppable) => {
	currentDroppable.style.background = '';
};
const enterDroppable = (currentDroppable) => {
	currentDroppable.style.background = 'pink';
};

const handleImageMove = (e) => {
	if (!isBallDown) return;
	ball.hidden = true;
	// mouse pointer가 위치한 곳의 요소를 가져온다
	let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
	ball.hidden = false;
	if (!elemBelow) return;

	let droppableBelow = elemBelow.closest('.droppable');

	if (currentDroppable !== droppableBelow) {
		if (currentDroppable) {
			leaveDroppable(currentDroppable);
		}

		currentDroppable = droppableBelow;

		if (currentDroppable) {
			enterDroppable(currentDroppable);
		}
	} // if

	ball.style.left = e.pageX - ballInfo.shiftX + 'px';
	ball.style.top = e.pageY - ballInfo.shiftY + 'px';
};

const handleImageUp = () => {
	isBallDown = false;
};

ball.addEventListener('mousedown', handleImageDown);
ball.addEventListener('mousemove', handleImageMove);
ball.addEventListener('mouseup', handleImageUp);
ball.addEventListener('dragstart', (e) => e.preventDefault());
