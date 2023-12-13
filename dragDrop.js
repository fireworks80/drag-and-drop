class DragDrop {
	shiftX = 0;
	shiftY = 0;
	posX = 0;
	posY = 0;
	isEnterDroppable = false;
	isMouseDown = false;
	currentDroppable = null;

	constructor({ el, droppable }) {
		this.draggableEl = el;
		this.droppable = droppable;

		this.bindEvent();
	}

	leaveDroppable() {
		this.isEnterDroppable = false;
		this.currentDroppable.style.backgroundColor = '';

		if (!this.currentDroppable.contains(this.draggableEl)) return;

		this.currentDroppable.removeChild(this.draggableEl);
		document.body.appendChild(this.draggableEl);
	}

	enterDroppable() {
		this.isEnterDroppable = true;
		this.currentDroppable.style.backgroundColor = 'orange';
	}

	setLocation({ clientX, clientY }) {
		const rect = this.draggableEl.getBoundingClientRect();
		this.shiftX = clientX - rect.left;
		this.shiftY = clientY - rect.top;
	}

	draggableElMoveTo() {
		this.draggableEl.style.left = this.posX + 'px';
		this.draggableEl.style.top = this.posY + 'px';
	}

	handleMouseUp() {
		if (this.isEnterDroppable) {
			this.currentDroppable.style.backgroundColor = '';
			this.currentDroppable.appendChild(this.draggableEl);
			this.draggableEl.style = '';
			return;
		}
	}

	handleDragElDown(e) {
		this.isMouseDown = true;
		this.draggableEl.style.position = 'absolute';
		this.setLocation(e);
	}

	handleDraggableMove(e) {
		if (!this.isMouseDown) return;
		this.posX = e.pageX - this.shiftX;
		this.posY = e.pageY - this.shiftY;

		this.draggableEl.hidden = true;
		const elemBelow = document.elementFromPoint(this.posX, this.posY);

		this.draggableEl.hidden = false;

		if (!elemBelow) return;

		const droppableBelow = elemBelow.closest(this.droppable);

		if (this.currentDroppable !== droppableBelow) {
			if (this.currentDroppable) {
				this.leaveDroppable();
			}

			this.currentDroppable = droppableBelow;

			if (this.currentDroppable) {
				this.enterDroppable();
			}
		}
		this.draggableElMoveTo();
	}

	bindEvent() {
		this.draggableEl.addEventListener(
			'mousedown',
			this.handleDragElDown.bind(this)
		);
		this.draggableEl.addEventListener(
			'mousemove',
			this.handleDraggableMove.bind(this)
		);
		this.draggableEl.addEventListener('mouseup', () => {
			this.isMouseDown = false;
			this.handleMouseUp();
			this.draggableEl.removeEventListener(
				'mousemove',
				this.handleDraggableMove
			);
		});
		this.draggableEl.addEventListener('dragstart', (e) => e.preventDefault());
	}
}

new DragDrop({
	el: document.querySelector('.ball'),
	droppable: '.droppable',
});
