import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/iContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {
  
  public loading: boolean = false;
  public contacts: IContact[] =[];
  public errorMessage: string | null = null;

  constructor(private contactService : ContactService) {

   }

//fn that's called on change detection 
  ngOnInit(): void {
   this.getAllContactsFromServer();
  }

//to update the front end we declare another function that'd obtain updated data from server 
  public getAllContactsFromServer(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data)=> {
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage=error;
      this.loading=false;
    })
   /* Invokes the service class method getAllContacts() 
   which makes an HTTP call to server URL and the Observable containing the response is returned. 
   You can subscribe to the observable and use the 'next' callback 
   to handle the successfully returned value, as needed.*/
  }

//delete fn to delete in server on clicking delete button
  public clickDeleteContact(contactId:string | undefined ){
      if(contactId){
        this.contactService.deleteContact(contactId).subscribe((data)=>{
          this.getAllContactsFromServer();
        }, (error) => {
          this.errorMessage=error;
         
       });
      }
  }

}
