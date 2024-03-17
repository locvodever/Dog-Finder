import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Dog Finder';
  routerEnd$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));
  title$ = this.routerEnd$.pipe(
    map(() => this.activatedRoute.snapshot.firstChild?.title)
  );
  showBack$ = this.routerEnd$.pipe(
    map(() => this.activatedRoute.snapshot.firstChild?.data['showBack']),
  );
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  onback() {
    this.router.navigate(['']);
  }
}
