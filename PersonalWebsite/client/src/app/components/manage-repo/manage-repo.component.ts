import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import {MatSnackBar} from '@angular/material';

const uri = 'http://localhost:8080/repo/upload'
@Component({
  selector: 'app-manage-repo',
  templateUrl: './manage-repo.component.html',
  styleUrls: ['./manage-repo.component.css']
})
export class ManageRepoComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: uri });

  attachmentList: any = [];


  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
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
      this.snackBar.open('something wrong!', 'Dismiss',{
        duration: 2000
      });
    }
  }

  onSubmit(){
    this.uploader.uploadAll()
  }

}
