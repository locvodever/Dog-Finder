import { Component, Input } from '@angular/core';
import { DogBreed } from '../../models/dog';
import { Observable, of, share } from 'rxjs';
import { DogCardComponent } from '@components/dog-card/dog-card.component';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MainService } from '../../services/main.service';
import { UserDataService } from '../../services/user-data.service';

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
    this.dog$ = this.mainService.getBreed(id);
  }

  dog$!: Observable<DogBreed>

  constructor(private router: Router, private mainService: MainService, private userDataService: UserDataService) {}

  onCardSwiped(direction:'left' | 'right', dog: DogBreed) {
    console.log(direction);
    this.userDataService.votedDogbreed(dog.id);
    this.mainService.postVote(dog.reference_image_id, direction === 'left' ? -1 : 1).subscribe();
    this.router.navigate(['']);
  }
}
