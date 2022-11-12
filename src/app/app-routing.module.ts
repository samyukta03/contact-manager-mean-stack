import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactManagerComponent } from './components/contact-manager/contact-manager.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewContactComponent } from './components/view-contact/view-contact.component';
import { LoginComponent  } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component'
import { ProfileComponent } from './components/pages/profile/profile.component';
const routes: Routes = [
    {path: '', redirectTo: 'contacts/login', pathMatch: 'full'}, //default directed path contacts/admin
    {path: 'contacts/login', component: LoginComponent},
    {path: 'contacts/signup', component: SignupComponent},
    {path: 'contacts/profile', component: ProfileComponent},
    {path: 'contacts/admin', component: ContactManagerComponent},
    {path: 'contacts/add', component: AddContactComponent}, 
    {path:'contacts/edit/:contactId', component: EditContactComponent}, 
    {path: 'contacts/view/:contactId', component: ViewContactComponent},
    {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
