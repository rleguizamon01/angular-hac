import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { PropertySurvey } from 'src/app/interfaces/property-survey';

@Component({
  selector: 'app-property-survey-edit',
  templateUrl: './property-survey-edit.component.html',
  styleUrls: ['./property-survey-edit.component.sass']
})
export class PropertySurveyEditComponent implements OnInit {

  propertySurvey!: PropertySurvey;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

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
      console.log(this.propertySurvey)
    }); 
  }

}
