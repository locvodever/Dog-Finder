import { Component, Input } from '@angular/core';
import { Dog } from '../../models/dog';
import { Observable, of } from 'rxjs';
import { DogCardComponent } from '@components/dog-card/dog-card.component';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [AsyncPipe, DogCardComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  @Input()
  set id(id: string) {
    console.log(id);
    this.dog$ = of({
      id: 4,
      name: 'Corgi 4',
      thumbnailUrl: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    },);
  }

  dog$!: Observable<Dog>

  constructor(private router: Router) {}

  onCardSwiped(direction:'left' | 'right') {
    console.log(direction);
    this.router.navigate(['']);
  }
}
