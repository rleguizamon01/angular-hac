import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { PropertySurvey } from 'src/app/interfaces/property-survey';
import { timer } from 'rxjs';
import { Page } from 'src/app/interfaces/page';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    console.log(this.auth.getToken())
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
      console.log(this.propertySurvey)
    }); 
  }

  getPages(){
    console.log('form_id: ' + this.propertySurvey.form_id);
    this.api.get<Page[]>('administration/forms/' + this.propertySurvey.form_id + '/pages', {})
    .subscribe(pages => {this.pages = pages; console.log(pages)});
  }

}
