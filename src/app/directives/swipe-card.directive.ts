import { AfterContentInit, ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, NgZone, Output, QueryList, output } from '@angular/core';
import 'hammerjs';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appSwipeCard]',
  standalone: true,
})
export class SwipeCardDirective {
  removed = false;
  constructor(public el: ElementRef, private cd: ChangeDetectorRef) {}
  ngOnInit() {}
}

@Directive({
  selector: '[appSwipeCards]',
  standalone: true,
})
export class SwipeCardsDirective implements AfterContentInit {
  @ContentChildren(SwipeCardDirective) cards!: QueryList<SwipeCardDirective>;
  @Output() loaded = new EventEmitter<boolean>();
  @Output() cardSwiped = new EventEmitter<{ direction: 'left' | 'right'; index: number }>();

  private destroy$ = new Subject<void>();
  constructor(private ngzone: NgZone) {}
  ngAfterContentInit(): void {
    this.initEventCards();
    this.cards.changes.subscribe(() => {
      this.initEventCards();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initEventCards() {
    const cards = this.cards.filter((e) => !e.removed);
    cards.forEach((card, index) => {
      card.el.nativeElement.style.zIndex = this.cards.length - index;
      card.el.nativeElement.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      card.el.nativeElement.style.opacity = (10 - index) / 10;
    });
    this.loaded.next(true);
    if (cards[0]) {
      this.initListener(cards[0], 0);
    }
  }

  initListener(card: SwipeCardDirective, index: number) {
    const hammer = new Hammer(card.el.nativeElement);
    hammer.on('pan', (event) => {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      const xMulti = event.deltaX * 0.03;
      const yMulti = event.deltaY / 80;
      const rotate = xMulti * yMulti;
      card.el.nativeElement.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
    });
    hammer.on('panend', (event) => {
      const moveOutWidth = document.body.clientWidth;
      const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

      if (keep) {
        card.el.nativeElement.style.transform = '';
      } else {
        const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
        const toX = event.deltaX > 0 ? endX : -endX;
        const endY = Math.abs(event.velocityY) * moveOutWidth;
        const toY = event.deltaY > 0 ? endY : -endY;
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        card.el.nativeElement.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        card.removed = true;
        this.cardSwiped.next({ direction: toX > 0 ? 'right' : 'left', index });
      }
    });
  }
}
