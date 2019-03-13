import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
   MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
    MatDividerModule, MatSnackBarModule, MatMenuModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {UserService} from './entity/user/user.service';
import { IndexComponent } from './components/index/index.component';
import {HeaderComponent} from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Template1Component } from './components/homepage/template1/template1.component';
import { Template2Component } from './components/homepage/template2/template2.component';
import {ResumeTemplate1Component} from './components/resume/template1/template1.component';
import { StyleComponent } from './components/setup/style/style.component';
import { InfoComponent } from './components/setup/info/info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


 // reflect urls to components
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {path: 'index', component : IndexComponent},
  {path: 'dashboardTest', component : DashboardComponent},
  {path: 'template1', component: Template1Component},
  {path: 'template2', component: Template2Component},
  {path: 'resume', component: ResumeTemplate1Component},
  {path: 'init_style', component: StyleComponent},
  {path: 'init_info/:id', component: InfoComponent},


  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    Template1Component,
    Template2Component,
    ResumeTemplate1Component,
    StyleComponent,
    InfoComponent,
    DashboardComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
