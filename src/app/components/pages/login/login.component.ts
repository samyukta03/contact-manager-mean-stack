import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedin!: boolean | false;
  form:FormGroup;
  constructor(private fb:FormBuilder, private router: Router, private auth: AuthService) {
    this.form = this.fb.group({
      'email' : ['',Validators.required],
      'password' : ['',Validators.required]
        })
   }
  ngOnInit(): void {
  }
  login(){
    // alert("logged in")
    const data = this.form.value
    this.auth.signin(data)
        .subscribe (
          res => {
            if(res.success){
              this.isLoggedin = true;
              localStorage.setItem('token',res.token)
              // alert(res.message)
              this.router.navigate(['/contacts/admin']);
            }else{
              this.isLoggedin = false;
              alert(res.message)
            }
          },
          err => {
            this.isLoggedin = false;
            alert("login failed")
          }
        )
   }
}
