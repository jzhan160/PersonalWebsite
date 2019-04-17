import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material';
import { RepoService } from '../../entity/repo/repo.service'
import { CookieService } from "ngx-cookie-service";

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
  private fileContent:any;
  private shownFileName:any;
  //TODO: this.cookieService.get('domainSource'),
  private curPath = "testDomain";


  constructor(private snackBar: MatSnackBar, private repoService: RepoService, private cookieService: CookieService) {

  }

  ngOnInit() {
    this.getAllFiles(this.curPath);
    this.shownFileName = 'No file selected.';
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      //TODO:this.cookieService.get('domainSource')
      file.file.name = 'testDomain.' + file.file.name;
    };


    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.snackBar.open('Added Successfully!', 'Dismiss', {
        duration: 2000
      });
    }
    this.uploader._onErrorItem = (item: any, response: any, status: any, headers: any) => {
      this.snackBar.open('Something wrong!', 'Dismiss', {
        duration: 2000
      });
    }
  }

  onSubmit() {
    this.uploader.uploadAll()
  }

  //invoked when click the folder name 
  onSwitchFolder(folder) {
    this.curPath = this.curPath + '/' + folder;
    this.getAllFiles(this.curPath);
  }

  //return to the father level
  onGoBack() {
    //TODO: this.cookieService.get('domainSource'),
    if (this.curPath == 'testDomain') {
      this.snackBar.open('Currently in the highest directory!', 'Dismiss', {
        duration: 2000
      });
      return;
    }
    this.curPath = this.curPath.substr(0, this.curPath.length - this.curPath.split('/').pop().length - 1);
    console.log(this.curPath);
    this.getAllFiles(this.curPath);
  }

  //refresh current directory
  onRefreash() {
    this.getAllFiles(this.curPath);
  }

  //show file content when click on it
  onShowFileContent(fileName){
    const ex = fileName.split('.').pop();
    if(ex != 'cpp' && ex != 'h' && ex != 'cs' && ex != 'txt' && ex != 'h'){
      this.snackBar.open('Currently don\'t support this type of file', 'Dismiss', {
        duration: 2000
      });
      return;
    }
    this.repoService.getFileContent(this.curPath + '/' + fileName).subscribe(
      val =>{
        this.shownFileName = fileName;
       this.fileContent = val;
      },
      err =>{
        this.snackBar.open(err, 'Dismiss', {
          duration: 2000
        });
      })
  }

  //a private funtion
  getAllFiles(path) {
    this.repoService.getFoldersList(path).subscribe(
      val => {
        this.folders = val;
        console.log(this.folders);
      },
      error => {
        console.log(error);
      }
    );
    this.repoService.getFileList(path).subscribe(
      val => {
        this.files = val;
        console.log(this.files);
      },
      error => {
        console.log(error);
      }
    );
  }
}
