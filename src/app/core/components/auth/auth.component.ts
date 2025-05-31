import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImgCarouselComponent } from '../img-carousel/img-carousel.component';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, ImgCarouselComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
