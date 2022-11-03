import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IContact } from '../models/iContact';
import { IGroup } from '../models/iGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl: string = 'http://localhost:9000'; //json server url 

  constructor(private httpClient : HttpClient ) { 
  }
  //get all contacts 
  public getAllContacts() : Observable<IContact[]> {
    let dataURL: string = `${this.serverUrl}/contacts`;
    return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  //get one contact
  public getContact(contactId : string): Observable<IContact> { 
    let dataURL : string = `${this.serverUrl}/contacts/${contactId}`; 
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

   //create contact
   public createContact(contact: IContact):Observable<IContact> {
    let dataURL : string = `${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL , contact).pipe (catchError(this.handleError));
      /*  This method makes an asynchronous call to the server URL and sends the data along with the headers.
     HttpClient receives the JSON response as of type object. 
     The Pipe function lets you define a comma-separated sequence of operators. */
   }

   //update contact
   public updateContact (contact: IContact, contactId :string): Observable<IContact>{ 
    let dataURL: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact >(dataURL, contact).pipe(catchError(this.handleError));
   }
   
   //delete contact
   public deleteContact (contactId :string): Observable<{}> {
    let dataURL : string = `${this.serverUrl}/contacts/${contactId}` ;
    return this.httpClient.delete<{ }>(dataURL).pipe(catchError(this.handleError));
    }
    
    //get all groups 
    public getAllGroups(): Observable<IGroup[]>{
      let dataURL : string = `${this.serverUrl}/groups`;
      return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
    }

    //get one group
  public getGroup(contact: IContact): Observable<IGroup> { 
    let dataURL : string = `${this.serverUrl}/groups/${contact.groupId}`; 
    return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
  
  }

  //error handling 
  public handleError(error:HttpErrorResponse) //fn to check error while fetching data
  {
    let errorMessage:string = ''; 
    if(error.error instanceof ErrorEvent){
    // client Error 
    errorMessage = `Error : ${error.error.message}`
    }
    else{
    // server error 
    errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
    }
}
