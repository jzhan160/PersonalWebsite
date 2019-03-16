import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-resume-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class ResumeTemplate1Component implements OnInit {

  constructor() { }

  ngOnInit() {
    // $(function() {
    //   $('a[href*="#"]:not([href="#"])').click(function() {
    //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //       var target = $(this.hash);
    //       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    //       if (target.length) {
    //         $('html, body').animate({
    //           scrollTop: target.offset().top
    //         }, 1000);
    //         return false;
    //       }
    //     }
    //   });
    // });
  }

}
