import { CustomValidationService } from './customValidation.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {
  formSignup!: FormGroup
  isSubmitted: boolean = false

  constructor(private fb: FormBuilder, private customValidationService: CustomValidationService) { }

  public nameControls = {
    username: 'username',
    email: 'email',
    password: 'password',
    confirmPassword: 'confirmPassword',
    address: 'address',
    street1: 'street1',
    street2: 'street2',
    zipCode: 'zipCode',
    city: 'city',
    state: 'state',
    country: 'country',
    phones: 'phones',
  }

  private keysMsgError = {
    required: "Field is required",
    email: "Enter a valid email address",
    isPhone: "Enter a valid phone",
    passwordMismatch: "Passwords doesnot match",
    userNameNotAvailable: "User Name is not available",
    invalidPassword: "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number",
  }

  ngOnInit() {
    this.formSignup = this.fb.group({
      [this.nameControls.username]: this.fb.control(null, [Validators.required, this.customValidationService.validateUserName()]),
      [this.nameControls.email]: this.fb.control(null, [Validators.required, Validators.email]),
      [this.nameControls.password]: this.fb.control(null, [Validators.required, this.customValidationService.patternValidator()]),
      [this.nameControls.phones]: this.fb.array([this.fb.control(null, [Validators.required, this.customValidationService.validatePhone()])]),
      [this.nameControls.confirmPassword]: this.fb.control(null, [Validators.required, this.customValidationService.matchPassword(this.nameControls.password)]),
      [this.nameControls.address]: this.fb.group({
        [this.nameControls.street1]: this.fb.control(null, Validators.required),
        [this.nameControls.street2]: this.fb.control(null, Validators.required),
        [this.nameControls.zipCode]: this.fb.control(null, Validators.required),
        [this.nameControls.city]: this.fb.control(null, Validators.required),
        [this.nameControls.state]: this.fb.control(null, Validators.required),
        [this.nameControls.country]: this.fb.control(null, Validators.required),
      })
    })
  }

  get phones(): FormArray {
    return this.formSignup.get(this.nameControls.phones) as FormArray
  }

  public addPhone() {
    return (this.formSignup.get(this.nameControls.phones) as FormArray).push(this.fb.control(null, [Validators.required, this.customValidationService.validatePhone()]))
  }

  public isControlValid(nameControl: string) {
    const control = this.formSignup.get(nameControl)

    if (!control) {
      return false
    }

    return (control.invalid && control.touched) || (this.isSubmitted && control.untouched)
  }

  public messageErrorOfControl(nameControl: string) {
    const control = this.formSignup.get(nameControl)

    if (!control || !control.errors) {
      return ""
    }

    const keysOfControl = Object.keys(control.errors)

    for (const key of keysOfControl) {
      return this.keysMsgError[key]
    }

    return ""

  }

  private removeControlFromFormArray() {
    const phones = (this.formSignup.get(this.nameControls.phones) as FormArray)
    for (let i = phones.length - 1; i > 0; i--) {
      phones.removeAt(i)
    }
  }

  public onSubmit() {
    this.isSubmitted = true
    if (this.formSignup.valid) {
      this.formSignup.reset()
      this.removeControlFromFormArray()
      this.isSubmitted = false
    }
  }
}
