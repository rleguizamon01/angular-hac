import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { PropertySurvey } from 'src/app/interfaces/property-survey';
import { timer } from 'rxjs';
import { Page } from 'src/app/interfaces/page';

@Component({
  selector: 'app-property-survey-detail',
  templateUrl: './property-survey-detail.component.html',
  styleUrls: ['./property-survey-detail.component.sass']
})
export class PropertySurveyDetailComponent implements OnInit {

  propertySurvey!: PropertySurvey;
  pages: Page[] = [];

  loading : boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    const propertySurveyId = Number(params.get('id'));

    this.getPropertySurvey(propertySurveyId);
    this.loading = false;
  }

  getPropertySurvey(id: number){
    this.api.get<PropertySurvey>('propertySurveys/' + id, {})
    .subscribe(propertySurvey => {
      this.propertySurvey = propertySurvey; 
      if(this.propertySurvey.form_id != null)
        this.getPages()
    }); 
  }

  getPages(){
    console.log('form_id: ' + this.propertySurvey.form_id);
    this.api.get<Page[]>('administration/forms/' + this.propertySurvey.form_id + '/pages', {})
    .subscribe(pages => {this.pages = pages; console.log(pages)});
  }

}
