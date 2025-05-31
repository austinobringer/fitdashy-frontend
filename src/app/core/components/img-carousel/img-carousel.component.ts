import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CarouselComponent,
  CarouselControlComponent,
  CarouselInnerComponent,
  CarouselItemComponent,
  ThemeDirective
} from '@coreui/angular';

@Component({
  selector: 'app-img-carousel',
  templateUrl: 'img-carousel.component.html',
  styleUrl: 'img-carousel.component.scss',
  imports: [ThemeDirective, CarouselComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink]
})
export class ImgCarouselComponent implements OnInit {
  slides: any[] = new Array(4).fill({ id: -1, src: '', title: '', subtitle: '' });

  ngOnInit(): void {
    this.slides[0] = {
      src: 'images/front-page/fitness1.jpg'
    };
    this.slides[1] = {
      src: 'images/front-page/fitness2.jpg'
    };
    this.slides[2] = {
      src: 'images/front-page/fitness3.jpg'
    };
    this.slides[3] = {
      src: 'images/front-page/fitness4.jpg'
    };
  }
}