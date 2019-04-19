import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ResumeService} from '../../entity/resume/resume.service';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})
export class CreateResumeComponent implements OnInit {

  public skillForm: FormGroup;
  public eduForm: FormGroup;
  public expForm: FormGroup;

  constructor(private _fb: FormBuilder, private resumeService: ResumeService,
               private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.skillForm = this._fb.group({
      skillRows: this._fb.array([this.initSkillRows()])
    });
    this.eduForm = this._fb.group({
      eduRows: this._fb.array([this.initEduRows()])
    });
    this.expForm = this._fb.group({
      expRows: this._fb.array([this.initExpRows()])
    });
  }

  get skillFormArr() {
    return this.skillForm.get('skillRows') as FormArray;
  }
  get eduFormArr() {
    return this.eduForm.get('eduRows') as FormArray;
  }
  get expFormArr() {
    return this.expForm.get('expRows') as FormArray;
  }

  initSkillRows() {
    return this._fb.group({
      skill: ['']
    });
  }
  initEduRows() {
    return this._fb.group({
      degree: [''],
      major: [''],
      school: [''],
      from: [''],
      to: [''],
    });
  }
  initExpRows() {
    return this._fb.group({
      job: [''],
      company: [''],
       from: [''],
      to: [''],
      descrip: ['']
    });
  }
  addSkillRow() {
    this.skillFormArr.push(this.initSkillRows());
  }
  addEduRow() {
    this.eduFormArr.push(this.initEduRows());
  }
  addExpRow() {
    this.expFormArr.push(this.initExpRows());
  }

  deleteSkillRow(index: number) {
    this.skillFormArr.removeAt(index);
  }
  deleteEduRow(index: number) {
    this.eduFormArr.removeAt(index);
  }
  deleteExpRow(index: number) {
    this.expFormArr.removeAt(index);
  }

finish() {

   console.log('experience: \n');
   for (const exp of this.expForm.value.expRows) {
    console.log(exp);
  }

   this.resumeService.save(this.cookieService.get('domainSource'),this.eduForm.value.eduRows,this.expForm.value.expRows,this.skillForm.value.skillRows).subscribe(
     ()=>{
        this.router.navigate(['resume']);
     }
   );
}

}
