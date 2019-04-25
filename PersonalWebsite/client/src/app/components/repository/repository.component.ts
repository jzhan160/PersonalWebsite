import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { MatSnackBar } from '@angular/material';
import {RepoService} from '../../entity/repo/repo.service'
import {saveAs} from 'file-saver'

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  private folders: any = [];
  private files: any = [];
  private fileContent:any;
  private shownFileName:any;

  private curPath = this.cookieService.get('domainDest');


  constructor(private snackBar: MatSnackBar, private repoService: RepoService, private cookieService: CookieService) {

  }

  ngOnInit() {
    this.getAllFiles(this.curPath);
    this.shownFileName = 'No file selected.';
  }

  //invoked when click the folder name 
  onSwitchFolder(folder) {
    this.curPath = this.curPath + '/' + folder;
    this.getAllFiles(this.curPath);
  }

  //return to the father level
  onGoBack() {
    if (this.curPath == this.cookieService.get('domainSource')) {
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
    if(ex != 'cpp' && ex != 'h' && ex != 'cs' && ex != 'txt' && ex != 'h' && ex != 'sln'){
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


  onDownloadFile(fileName){
    this.repoService.downloadFile(this.curPath + '/' + fileName).subscribe(
      data => {
        saveAs(data, fileName);
      },
      err => {
        console.log(err);
        this.snackBar.open("Problem while downloading the file.", 'Dismiss', {
          duration: 2000 
        });
      }
    );
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
