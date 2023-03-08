import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent {
  constructor(private _router: Router) {
  }

  goToLogin(): void {
    this._router.navigate(['/auth/login'])
  }
}
