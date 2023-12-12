const ball = document.querySelector('.ball');
let currentDroppable = null;

const handleDraggableDown = (e) => {
	const rect = ball.getBoundingClientRect();
	const shiftX = e.clientX - rect.left;
	const shiftY = e.clientY - rect.top;
	ball.style.position = 'absolute';

	const leaveDroppable = (element) => {
		element.style.backgroundColor = '';
	};
	const enterDroppable = (element) => {
		element.style.backgroundColor = 'pink';
	};

	const handleDraggableMove = (e) => {
		ball.hidden = true;
		const droppableBelow = document.elementFromPoint(e.pageX, e.pageY);
		ball.hidden = false;

		if (currentDroppable !== droppableBelow) {
			if (currentDroppable) {
				leaveDroppable(currentDroppable);
			}

			currentDroppable = droppableBelow.closest('.droppable');

			if (currentDroppable) {
				enterDroppable(currentDroppable);
			}
		}

		ball.style.left = e.pageX - shiftX + 'px';
		ball.style.top = e.pageY - shiftY + 'px';
	};

	ball.addEventListener('mousemove', handleDraggableMove);
	ball.addEventListener('mouseup', () => {
		ball.removeEventListener('mousemove', handleDraggableMove);
	});
};

// ball.addEventListener('mousedown', handleDraggableDown);
// ball.addEventListener('dragstart', (e) => e.preventDefault());

new DragDrop(ball);
