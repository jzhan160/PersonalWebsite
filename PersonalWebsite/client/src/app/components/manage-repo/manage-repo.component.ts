import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material';
import { RepoService } from '../../entity/repo/repo.service'
import { CookieService } from "ngx-cookie-service";
import { saveAs } from "file-saver"

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

  private curPath = this.cookieService.get('domainSource');


  constructor(private snackBar: MatSnackBar, private repoService: RepoService, private cookieService: CookieService) {

  }

  ngOnInit() {
    this.getAllFiles(this.curPath);
    this.shownFileName = 'No file selected.';

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
      file.file.name =this.cookieService.get('domainSource') + '.' + file.file.name;
    };


    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      this.snackBar.open('Added Successfully!', 'Dismiss', {
        duration: 2000
      });
      this.getAllFiles(this.curPath);
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
        this.shownFileName = this.curPath + '/' + fileName;
       this.fileContent = val;
      },
      err =>{
        this.snackBar.open(err, 'Dismiss', {
          duration: 2000
        });
      })
  }


  //delete folder
  onDeleteFolder(folderName){
    this.repoService.delFolder(this.curPath + '/' + folderName).subscribe(
      val => {
        this.snackBar.open('Deleted folder ' + folderName +  ' successfully', 'Dismiss', {
          duration: 2000
        });
        this.getAllFiles(this.curPath);
      }
    )
  }

  onDeleteFile(fileName){
    this.repoService.delFile(this.curPath + '/' + fileName).subscribe(
      val => {
        this.snackBar.open('Deleted file ' + fileName +  ' successfully', 'Dismiss', {
          duration: 2000
        });
        this.getAllFiles(this.curPath);
      }
    )
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
