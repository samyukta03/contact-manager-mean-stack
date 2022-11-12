import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linnavbar',
  templateUrl: './linnavbar.component.html',
  styleUrls: ['./linnavbar.component.css']
})
export class LinnavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear() 
    this.router.navigate(['/contacts/login'])
   }
}
