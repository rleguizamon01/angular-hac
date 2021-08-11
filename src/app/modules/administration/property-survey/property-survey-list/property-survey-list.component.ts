import { Component, OnInit } from '@angular/core';
import { PropertySurvey } from '../../../../interfaces/property-survey';
import { ApiService } from 'src/app/core/services/api.service';
import { PropertySurveyPagination } from 'src/app/interfaces/property-survey-pagination';
import { PropertySurveyStatus } from 'src/app/interfaces/property-survey-status';


@Component({
  selector: 'app-property-survey-list',
  templateUrl: './property-survey-list.component.html',
  styleUrls: ['./property-survey-list.component.sass']
})

export class PropertySurveyListComponent implements OnInit {

  propertySurveyStatuses: PropertySurveyStatus[] = [];

  propertySurveys: PropertySurvey[] = [];
  filter: string = "";
  total = 1;
  loading = true;
  pageSize = 8;
  pageIndex = 1;
  q = "";
  status: string = "";

  constructor(private api: ApiService) { 
  }

  ngOnInit() {
    this.getPropertySurveyStatuses();
    this.getPropertySurveysPaginated();
  }

  getPropertySurveyStatuses(): void {
    this.loading = true;
    this.api.get<PropertySurveyStatus[]>('administration/propertySurveyStatuses', {})
    .subscribe(propertySurveyStatuses => {
      console.log(propertySurveyStatuses);
      this.propertySurveyStatuses = propertySurveyStatuses;
      });
  }

  getPropertySurveysPaginated(): void {
    console.log(this.q);
    this.loading = true;
    this.api.get<PropertySurveyPagination>('propertySurveys/paginated/index', {page: this.pageIndex, q: this.q, s: this.status})
    .subscribe(propertySurveysPaginated => {
      console.log(propertySurveysPaginated);
      this.total = propertySurveysPaginated.total;
      this.loading = false;
      this.pageSize = propertySurveysPaginated.per_page;
      this.pageIndex = propertySurveysPaginated.current_page;
      if(propertySurveysPaginated.data != null)
        this.propertySurveys = propertySurveysPaginated.data;
      });
  }

  filterAddress(value: string){
    this.q = value;
    this.pageIndex = 1;
    this.getPropertySurveysPaginated();
  }

  filterStatus(value: string){
    this.status = value ;
    this.pageIndex = 1;
    this.getPropertySurveysPaginated();
  }


}
