import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';
import { DogBreed } from '../../models/dog';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { MainService } from '../../services/main.service';
import { Observable } from 'rxjs';

export const swiperight = [style({ opacity: 1 }), style({ transform: 'translate3d(200%, 0, 0) rotate3d(0, 0, 1, 120deg)', opacity: 0 })];

export const swipeleft = [style({ opacity: 1 }), style({ transform: 'translate3d(-200%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: 0 })];

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [AsyncPipe, NgStyle, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('cardAnimator', [transition('* => right', animate(200, keyframes(swiperight))), transition('* => left', animate(200, keyframes(swipeleft)))])],
})
export class DogCardComponent {
  @Input('data') set _data(value: DogBreed) {
    this.data = value;
    this.thumbnailUrl$ = this.mainService.getImage(value.reference_image_id);
  };
  @Input() detaiPage = false;
  @Output() cardSwiped = new EventEmitter<'left' | 'right'>();

  @HostBinding('@cardAnimator')
  get cardAnimator() {
    return this.direction;
  }

  @HostListener('@cardAnimator.done')
  cardAnimatorDone() {
    return this.onAnimationDone();
  }
  data!: DogBreed;
  thumbnailUrl$!: Observable<string>;
  direction: 'left' | 'right' | null = null;

  constructor(private cd: ChangeDetectorRef, private mainService: MainService) {}

  onCardSwiped(direction: 'left' | 'right') {
    this.startAnimation(direction);
    this.cd.detectChanges();
  }

  startAnimation(state: 'left' | 'right') {
    if (!this.direction) {
      this.direction = state;
    }
  }

  onAnimationDone() {
    if (!this.direction) {
      return;
    }
    this.cardSwiped.emit(this.direction);
  }
}
