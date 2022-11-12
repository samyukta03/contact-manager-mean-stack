import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // form:FormGroup = new FormGroup({});
  form:FormGroup;
  message:string = '';
  className= 'd-none' ;
  isProcessing = false;
  constructor(private fb:FormBuilder , private auth:AuthService) {
    this.form = this.fb.group({
      'displayName' : ['',Validators.required],
      'email' : ['',Validators.required],
      'phno' : ['',Validators.required],
      'password' : ['',Validators.required],
      'confirm' : ['',Validators.required]
        })
   }

  ngOnInit(): void {
  }
  signup(){
    this.isProcessing = true;
    const data = this.form.value; 
    delete data['confirm']
    this.auth.signup(data)
    .subscribe(
      res => {
        if(res.success){
          this.isProcessing = false;
          this.message = "Account created successfully "
          this.className = 'alert alert-success'
        }else{
          this.isProcessing = false;
          this.message = res.message;
          this.className='alert alert-danger'
        }
      },
      err =>{
        this.isProcessing = false;
          this.message = "Server error";
          this.className='alert alert-danger'
      }
    )
  }

getClass() {
    return this.className;
  }
}
