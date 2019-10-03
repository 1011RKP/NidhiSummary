import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-coding',
  templateUrl: './color-coding.component.html',
  styleUrls: ['./color-coding.component.css']
})
export class ColorCodingComponent implements OnInit {

  gtsymbol: string;
  lssymbol: string;
  gesymbol: string;
  lesymbol: string;

  constructor() { }

  ngOnInit() {
    this.gesymbol = ">=";
    this.lesymbol = "<=";
    this.gtsymbol = ">";
    this.lssymbol = "<";
  }

}
