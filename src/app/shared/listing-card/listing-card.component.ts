import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.sass']
})
export class ListingCardComponent implements OnInit {

  @Input() iconType: string = "";
  @Input() title: string = "";
  @Input() loading: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
