import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../responses/user.response';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsComponent {
  readonly userDetails$: Observable<UserResponse> = this._usersService.getUserData();

  constructor(private _usersService: UsersService) {
  }
}
