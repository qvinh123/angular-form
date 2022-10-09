import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  matchPassword(password: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control || !control.parent) {
        return null;
      }
      return control.value === control.parent.get(password).value ? null : { passwordMismatch: true };
    }
  }

  validateUserName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control.value) {
        return null
      }
      const UserList = ['admin', 'user']
      return UserList.indexOf(control.value) > -1 ? { userNameNotAvailable: true } : null
    }
  }

  validatePhone(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control.value) {
        return null
      }

      const regex = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)
      const valid = regex.test(control.value)

      return valid ? null : { isPhone: true }
    }
  }

}
