import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form: FormGroup;
  constructor( private fb:FormBuilder){
    this.form=fb.group({
      UserName:['',Validators.required],
      Email:['',Validators.required,Validators.email],
      FullName:['',Validators.required],
      CreatedAt:['',Validators.required],
      Role:['', Validators.required]
    });
  }
  submit(){
    if(this.form.valid){
      console.log('Sign Up Succesfully!!!',this.form.value)
    }
  }
}
