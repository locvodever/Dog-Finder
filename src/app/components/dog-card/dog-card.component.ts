import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Dog } from '../../models/dog';
import { MatCardModule } from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';

export const swiperight = [style({ opacity: 1 }), style({ transform: 'translate3d(200%, 0, 0) rotate3d(0, 0, 1, 120deg)', opacity: 0 })];

export const swipeleft = [style({ opacity: 1 }), style({ transform: 'translate3d(-200%, 0, 0) rotate3d(0, 0, 1, -120deg)', opacity: 0 })];

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [NgStyle, RouterModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('cardAnimator', [transition('* => right', animate(200, keyframes(swiperight))), transition('* => left', animate(200, keyframes(swipeleft)))])],
})
export class DogCardComponent {
  @Input() data!: Dog;
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

  constructor(private cd: ChangeDetectorRef) {}

  direction: 'left' | 'right' | null = null;
  onCardSwiped(direction: 'left' | 'right') {
    if (!this.detaiPage) {
      this.startAnimation(direction);
      this.cd.detectChanges();
    } else {
      this.cardSwiped.emit(direction);
    }
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
