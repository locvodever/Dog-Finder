import { Component, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { DogBreed } from '../../models/dog';
import { DogCardComponent } from '@components/dog-card/dog-card.component';
import { SwipeCardDirective, SwipeCardsDirective } from '../../directives/swipe-card.directive';
import { MainService } from '../../services/main.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDataService } from '../../services/user-data.service';

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
  activeDogCards = signal<DogBreed[] | null>(null);
  page = 0;
  limit = 10;
  constructor(private mainService: MainService, private userDataService: UserDataService) {}

  ngOnInit() {
    const { page, breedIdsVotedInCurrentPage } = this.userDataService.data;
    this.page = page;
    this.loadDogCards(this.page, breedIdsVotedInCurrentPage);
  }

  onCardSwiped(event: { direction: 'left' | 'right'; index: number }) {
    const { direction, index } = event;
    const dogCards = this.activeDogCards();

    if (!(dogCards && dogCards[0])) {
      return;
    }
    const [dogBreed] = dogCards.splice(0, 1);
    this.activeDogCards.set(dogCards);

    this.userDataService.votedDogbreed(dogBreed.id);

    if (dogCards.length < 3) {
      this.loadDogCards(this.page + 1);
    }
    this.mainService.postVote(dogBreed.reference_image_id, direction === 'left' ? -1 : 1).subscribe();
  }

  private loadDogCards(page: number, breedIdsVotedInCurrentPage?: number[]) {
    this.mainService.getBreeds(page, this.limit).subscribe((breeds) => {
      const currenCards = this.activeDogCards() || [];
      const fitlerBreeds = breeds.filter((e) => !(breedIdsVotedInCurrentPage || []).includes(e.id));
      this.activeDogCards.set([...currenCards, ...fitlerBreeds]);
    });
  }
}
