import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {UserResponse} from '../../responses/user.response';
import {UsersService} from '../../services/users.service';
import {take} from "rxjs/operators";
import {BioValidator} from "../../validators/bio.validator";

@Component({
    selector: 'app-bio',
    templateUrl: './bio.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BioComponent {
    readonly userDetails$: Observable<UserResponse> = this._usersService.getUserData();
    readonly completeBio: FormGroup = new FormGroup({
        content: new FormControl('', [
            Validators.required,
            BioValidator.sentenceValidation,
        ])
    });

    constructor(private _usersService: UsersService) {
    }

    onCompleteBioSubmitted(completeBio: FormGroup): void {
        if (!completeBio.valid) return
        this._usersService.addBio(completeBio.value.content).pipe(
            take(1)
        ).subscribe({})
    }
}
