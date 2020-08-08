import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  passwordVisible = false;
  confirmPasswordVisible = false;

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  // updateConfirmValidator(): void {

  //   Promise.resolve().then(() => this.signupForm.controls.confirmPassword.updateValueAndValidity());
  // }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  submitSignup(){
    if(this.signupForm.invalid){
      for (const i in this.signupForm.controls) {
        console.log(i);
        console.log(this.signupForm.controls[i]);
        this.signupForm.controls[i].markAsDirty();
        this.signupForm.controls[i].updateValueAndValidity();
      }
      return;
    }
  }

}
