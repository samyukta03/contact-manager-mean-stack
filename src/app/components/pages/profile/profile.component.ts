import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
  }
  getProfile(){
    this.auth.getProfile()
      .subscribe(
        res =>{
          if(res.success){
            this.data = res.data;
          }
        },err => {

        }
      )
  }
  logout(){
    localStorage.clear() 
    this.router.navigate(['/contacts/login'])
  }

}
