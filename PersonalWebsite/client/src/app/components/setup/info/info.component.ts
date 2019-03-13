import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../entity/user/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  private infoForm: FormGroup;
  private imageForm: FormGroup;
  private templateId: number;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder,) {
    this.infoForm = this.fb.group({
      username: [''],
      email: [''],
      address: [''],
      phone: ['']

    });
    this.imageForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.templateId = params['id']);
    console.log(this.templateId);
    console.log("to service");
    this.userService.selectTemplate(this.templateId).subscribe(() => {
        console.log(this.templateId);

     });
  }

  setupFinish(username,email,address,phone) {
    this.userService.completeInfo(username,email,address,phone).subscribe(()=>{
       this.router.navigate(['/index']);
    });
  }

}
