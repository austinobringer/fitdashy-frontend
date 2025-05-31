import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-box',
  imports: [CommonModule],
  templateUrl: './error-box.component.html',
  styleUrl: './error-box.component.scss'
})
export class ErrorBoxComponent {
  @Input() errorMessage: string | null = null;
  @Output() errorMessageChange = new EventEmitter<string | null>();

  clear() {
    this.errorMessage = null;
    this.errorMessageChange.emit(null);
  }
}
