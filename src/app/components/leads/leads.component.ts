import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../responses/user.response';
import { UsersService } from '../../services/users.service';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  readonly userDetails$: Observable<UserResponse> = this._usersService.getUserData();

  constructor(private _usersService: UsersService, private _authService: AuthService, private _router: Router) {
  }
  logout(): void {
    this._authService.logout();
    this._router.navigate(['logged-out'])
  }
}
