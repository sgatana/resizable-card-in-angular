import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

  const defaultHeight = 300;
  const minHeight = 150;
  const maxHeight = window.innerHeight;

@Component({
  selector: 'app-resizable-card',
  templateUrl: './resizable-card.component.html',
  styleUrls: ['./resizable-card.component.scss'],
})
export class ResizableCardComponent implements OnInit {
  @ViewChild('card', { static: true }) cardElement!: ElementRef;
  @ViewChild('dragHandle', { static: true }) dragHandleElement!: ElementRef;
  @ViewChild('leftDragHandle', { static: true }) leftDragHandleElement!: ElementRef;
  @ViewChild('rightDragHandle', { static: true }) rightDragHandleElement!: ElementRef;

  
  currentHeight = defaultHeight;
  isDragging = false;
  initialY!: number;
  initialHeight!: number;

  ngOnInit() {
    this.setCardHeight();
  }

  setCardHeight() {
    if (this.currentHeight) {
      this.cardElement.nativeElement.style.height = `${this.currentHeight}px`;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    const targets = [
      this.cardElement.nativeElement,
      this.dragHandleElement.nativeElement,
      this.leftDragHandleElement.nativeElement
    ];
    if (targets.includes(event.target)) {
      this.isDragging = true;
      this.initialY = event.clientY;
      this.initialHeight = this.currentHeight;
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      document.body.classList.add('resizing')
    }
  }
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) {
      return;
    }
    console.log(event.clientY);
    const deltaY = event.clientY - this.initialY;
    let newHeight = this.initialHeight + deltaY;
    // apply height constraints

    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));
    this.currentHeight = newHeight;
    this.setCardHeight();
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.body.classList.remove('resizing');
    }
  }
}
