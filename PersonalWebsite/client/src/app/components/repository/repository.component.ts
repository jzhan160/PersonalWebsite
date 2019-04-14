import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  selectedFile = null;

  constructor() { }

  onFileSelected(event){
      console.log(event);
      this.selectedFile = <File>event.target.files[0];
  }

  ngOnInit() {

  }

  onUpload(){

  }

}
