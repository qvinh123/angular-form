import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

type User = {
  username: string,
  email: string,
  secret: string,
  gender: string,
  answer: string
}

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent{

  @ViewChild('f') signupForm: NgForm;
  defaultQuestion: string = "teacher"
  answer: string = ""
  genders: string[] = ['male', 'female']
  user: User = {
    username: "",
    email: "",
    secret: "",
    gender: "",
    answer: ""
  }
  submitted: boolean = false

  constructor() { }

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    this.submitted = true
    this.user.username = this.signupForm.value.userData.username
    this.user.email = this.signupForm.value.userData.email
    this.user.secret = this.signupForm.value.secret
    this.user.gender = this.signupForm.value.gender
    this.user.answer = this.signupForm.value.answer

    // this.signupForm.resetForm()

    console.log(this.signupForm)
  }

}
