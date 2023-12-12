class DragDrop {
	shiftX = 0;
	shiftY = 0;
	posX = 0;
	posY = 0;
	isMouseDown = false;

	constructor(el) {
		this.draggableEl = el;

		this.bindEvent();
	}

	setLocation({ clientX, clientY }) {
		console.log(clientX);
		const rect = this.draggableEl.getBoundingClientRect();
		this.shiftX = clientX - rect.left;
		this.shiftY = clientY - rect.top;
	}

	render() {
		this.draggableEl.style.position = 'absolute';
		this.draggableEl.style.left = this.posX + 'px';
		this.draggableEl.style.top = this.posY + 'px';
	}

	handleDragElDown(e) {
		this.isMouseDown = true;
		this.setLocation(e);
	}

	handleDraggableMove(e) {
		if (!this.isMouseDown) return;
		this.posX = e.pageX - this.shiftX;
		this.posY = e.pageY - this.shiftY;
		this.render();
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
			this.draggableEl.removeEventListener(
				'mousemove',
				this.handleDraggableMove
			);
		});
		this.draggableEl.addEventListener('dragstart', (e) => e.preventDefault());
	}
}

new DragDrop(document.querySelector('.ball'));
