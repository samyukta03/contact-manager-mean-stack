import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/models/iContact';
import { IGroup } from 'src/app/models/iGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean = false;
  public contact:IContact= {} as IContact ;
  public errorMessage: string | null = null;
  public groups:IGroup[] = [] as IGroup[];

  constructor(private contactService : ContactService,
              private router: Router  //to direct to home page after creating a contact 
    ) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data)=>{
      this.groups = data;
    }, (error) => {
      this.errorMessage=error;
      this.loading=false; 
   })
  }
 
  public createSubmit(){
    this.contactService.createContact(this.contact).subscribe((data)=>{
      this.router.navigate(['/contacts/admin']).then(); //to admin page 
    }, (error) => {
      this.errorMessage=error;
      this.router.navigate(['/contacts/add']).then(); //dont navigate anywhere stay same page
   });
  }
}
