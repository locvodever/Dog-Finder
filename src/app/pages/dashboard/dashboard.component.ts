import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import { Dog } from '../../models/dog';
import { DogCardComponent } from '@components/dog-card/dog-card.component';
import { SwipeCardDirective, SwipeCardsDirective } from '../../directives/swipe-card.directive';


const CoreModules = [AsyncPipe];
const MaterialModules = [MatCardModule];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...CoreModules, ...MaterialModules, DogCardComponent, SwipeCardsDirective, SwipeCardDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  dogDatas: Dog[] = [
    {
      id: 0,
      name: 'Corgi',
      thumbnailUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 1,
      name: 'Corgi 1',
      thumbnailUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 2,
      name: 'Corgi 2',
      thumbnailUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 3,
      name: 'Corgi 3',
      thumbnailUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
    {
      id: 4,
      name: 'Corgi 4',
      thumbnailUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },
  ];

  activeDogCard = signal<Dog[]|null>(null);

  constructor() {}

  ngOnInit() {
    this.loadDogCards();
  }

  onCardSwiped(event: {direction:'left' | 'right', index: number}) {
    const {direction, index} = event
    console.log(direction, index);
    this.dogDatas.splice(0, 1);
    this.loadDogCards();
  }

  private loadDogCards() {
    this.activeDogCard.set(this.dogDatas);
  }
}
