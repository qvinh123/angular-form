import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  fobiddenUserNames = ["Anna", "Ben"]

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.fobiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      }),
      'hobbies': new FormArray([]),
      'gender': new FormControl('male'),
    })
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset()
  }

  onAddHobbies() {
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl('', Validators.required))
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls
  }

  fobiddenNames(control: FormControl): { [s: string]: boolean } {
    console.log(this)
    if (this.fobiddenUserNames.indexOf(control.value) !== -1) {
      return { "nameIsFobidden": true }
    }
    return null
  }

  forbiddenEmail = (control: FormControl): Promise<any> | Observable<any> => {
    return new Observable<any>(function(observer){
      setTimeout(() => {
        if (control.value == 'test@gmail.com') {
          observer.next({ 'emailFobidden': true })
        } else {
          observer.next(null)
        }
        observer.complete()
      }, 1500)
    })
  }
}
