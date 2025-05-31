import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-box',
  imports: [CommonModule],
  templateUrl: './success-box.component.html',
  styleUrl: './success-box.component.scss'
})
export class SuccessBoxComponent {
  @Input() successMessage: string | null = null;
  @Output() successMessageChange = new EventEmitter<string | null>();

  clear() {
    this.successMessage = null;
    this.successMessageChange.emit(null);
  }
}
