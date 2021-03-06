import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule,
   MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule,
    MatDividerModule, MatSnackBarModule, MatMenuModule,MatListModule } from '@angular/material';
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
import {HeaderComponent} from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Template1Component } from './components/homepage/template1/template1.component';
import { Template2Component } from './components/homepage/template2/template2.component';
import {ResumeTemplate1Component} from './components/resume/template1/template1.component';
 import {WebStatsService} from './entity/webStats/web-stats.service';
import {MatExpansionModule} from '@angular/material/expansion';


import { StyleComponent } from './components/setup/style/style.component';
import { InfoComponent } from './components/setup/info/info.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {FilterComponent} from './components/filter/filter.component';
import { HistoryComponent } from './components/history/history.component';

import {StoryService} from './entity/story/story.service'
import { NgxEchartsModule } from 'ngx-echarts';
import { CreateStoryComponent } from './components/create-story/create-story.component';
import { ProfileComponent } from './components/profile/profile.component';
 import { ManageRepoComponent } from './components/manage-repo/manage-repo.component';
import { CreateResumeComponent } from './components/create-resume/create-resume.component';
import { DisplayStoryComponent } from './components/display-story/display-story.component';
import { MessageComponent } from './components/message/message.component';
import { DisplayMessageComponent } from './components/display-message/display-message.component';
import { RepositoryComponent } from './components/repository/repository.component';
import {RepoService} from './entity/repo/repo.service';
import { StoryComponent } from './components/story/story.component'

  // reflect urls to components
const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'resume', component: ResumeTemplate1Component},
  {path: 'story', component: StoryComponent},
  {path: 'repository', component: RepositoryComponent},
   {path: 'dashboard', component : DashboardComponent},
  {path: 'htest', component : HistoryComponent},
  {path: 'init_style', component: StyleComponent},
  {path: 'init_info/:id', component: InfoComponent},
  {path: 'dashboard/createStory', component: CreateStoryComponent},
  {path: 'messageTest', component: MessageComponent},
  {path: '**', component: FilterComponent},
 ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    Template1Component,
    Template2Component,
    ResumeTemplate1Component,
    StyleComponent,
    InfoComponent,
    DashboardComponent,
    FilterComponent,
    FileSelectDirective,
    HistoryComponent,
    CreateStoryComponent,
    ProfileComponent,
    ManageRepoComponent,
    CreateResumeComponent,
    DisplayStoryComponent,
    MessageComponent,
    DisplayMessageComponent,
    RepositoryComponent,
    StoryComponent
   ],
  imports: [
    MatExpansionModule,
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
    MatListModule,
    BsDropdownModule.forRoot(),

  ],
  providers: [UserService,CookieService,WebStatsService,StoryService,RepoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
