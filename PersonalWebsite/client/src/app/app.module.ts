import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
   MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
    MatDividerModule, MatSnackBarModule, MatMenuModule } from '@angular/material';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { CookieService } from 'ngx-cookie-service';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectDirective } from 'ng2-file-upload';


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
import {ResumeTemplate2Component} from './components/resume/template2/template2.component';
import {ResumeTemplate3Component} from './components/resume/template3/template3.component';
import {WebStatsService} from './entity/webStats/web-stats.service';


import { StyleComponent } from './components/setup/style/style.component';
import { InfoComponent } from './components/setup/info/info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FilterComponent} from './components/filter/filter.component';
import { HistoryComponent } from './components/history/history.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { CreateStoryComponent } from './components/create-story/create-story.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ManageRepoComponent } from './components/manage-repo/manage-repo.component';

  // reflect urls to components
const routes: Routes = [

  { path: 'login', component: LoginComponent},
  {path: 'dashboardTest', component : DashboardComponent},
  {path: 'htest', component : HistoryComponent},
  {path: 'home1', component: Template1Component},
  {path: 'home2', component: Template2Component},
  {path: 'resume', component: ResumeTemplate1Component},
  {path: 'init_style', component: StyleComponent},
  {path: 'init_info/:id', component: InfoComponent},
 // { path: '**', loadChildren: 'FilterModule' },
 {path: 'dashboard/createStory', component: CreateStoryComponent},
  { path: '**', component: FilterComponent},
  // { path: '', redirectTo: 'home1', pathMatch: 'full'},
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
    ResumeTemplate2Component,
    ResumeTemplate3Component,
    StyleComponent,
    InfoComponent,
    DashboardComponent,
    FilterComponent,
    FileSelectDirective,
    HistoryComponent,
    CreateStoryComponent,
    ProfileComponent,
    ResumeComponent,
    ManageRepoComponent
   ],
  imports: [
    BrowserModule,
    NgxEchartsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    FormsModule,
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
    MatMenuModule,
    BsDropdownModule.forRoot(),

  ],
  providers: [UserService,CookieService,WebStatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
