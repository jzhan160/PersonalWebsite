import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import {MatSnackBar} from '@angular/material';
import {RepoService} from '../../entity/repo/repo.service'


const uri = 'http://localhost:8080/repo/upload'
@Component({
  selector: 'app-manage-repo',
  templateUrl: './manage-repo.component.html',
  styleUrls: ['./manage-repo.component.css']
})
export class ManageRepoComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: uri });

  private folders: any = [];
  private files: any = [];

  constructor(private snackBar: MatSnackBar, private repoService: RepoService) {

  }

  ngOnInit() {
    //TODO: this.cookieService.get('domainSource'),
    this.repoService.getFoldersList('testDomain').subscribe(
      val => {
        this.folders = val;
        console.log(this.folders);
      },
      error =>{
        console.log(error);
      }
    );
    
    //TODO: this.cookieService.get('domainSource'),
    this.repoService.getFileList('testDomain').subscribe(
      val => {
        this.files = val;
        console.log(this.files);
      },
      error =>{
        console.log(error);
      }
    );

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      //TODO:this.cookieService.get('domainSource')
      file.file.name = 'testDomain.' + file.file.name;
    };


    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.snackBar.open('Added Successfully!', 'Dismiss',{
        duration: 2000
      });
    }
    this.uploader._onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this.snackBar.open('Something wrong!', 'Dismiss',{
        duration: 2000
      });
    }
  }

  onSubmit(){
    this.uploader.uploadAll()
  }

  onSwitchFolder(){
    alert('todo');
  }
}
