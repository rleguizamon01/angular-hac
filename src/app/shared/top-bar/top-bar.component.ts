import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.sass']
})
export class TopBarComponent implements OnInit {

  @Input() text: string = "";
  @Input() iconType: string = "";
  @Input() buttonText: string = "";
  @Input() buttonRoute: string = "";
  @Input() buttonRouteBack: string = "";


  constructor(private location: Location) { }

  ngOnInit() {
  }


}
