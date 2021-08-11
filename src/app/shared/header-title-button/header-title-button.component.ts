import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-title-button',
  templateUrl: './header-title-button.component.html',
  styleUrls: ['./header-title-button.component.sass']
})
export class HeaderTitleButtonComponent implements OnInit {

  @Input() title: string = "";
  @Input() buttonShow: boolean = true;
  @Input() buttonText: string = "";
  @Input() iconType: string = "";
  @Input() buttonRoute: string = "";


  constructor() { }

  ngOnInit() {
  }

}
