import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public invoiceForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });
  }

  get formArr() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
      itemname: ['']
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  readForm(){
    console.log(this.formArr.value[0].itemname);
  }
}
