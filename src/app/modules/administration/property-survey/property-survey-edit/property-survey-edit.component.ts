import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { Form } from 'src/app/interfaces/form';
import { Orientation } from 'src/app/interfaces/orientation';
import { PropertySurvey } from 'src/app/interfaces/property-survey';
import { PropertySurveyStatus } from 'src/app/interfaces/property-survey-status';
import { PropertyType } from 'src/app/interfaces/property-type';
import { User } from 'src/app/interfaces/user';
import { Observable, pipe } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-property-survey-edit',
  templateUrl: './property-survey-edit.component.html',
  styleUrls: ['./property-survey-edit.component.sass']
})
export class PropertySurveyEditComponent implements OnInit {

  data!: Observable<number>;

  editForm!: FormGroup;
  propertySurveyId!: number;

  propertySurvey!: PropertySurvey;
  assignedUsers: User[] = [];
  propertyTypes: PropertyType[] = [];
  orientations: Orientation[] = [];
  forms: Form[] = [];
  propertySurveyStatuses: PropertySurveyStatus[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private datepipe: DatePipe,
    private message: NzMessageService,
    private route: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.propertySurveyId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }

  ngOnInit(): void {
    this.getData()
    this.editForm = this.fb.group({
      assigned_user_id: [this.propertySurvey.assigned_user_id, [Validators.required]],
      meeting_date: [this.propertySurvey.meeting_date, [Validators.required]],
      contact: [this.propertySurvey.contact, [Validators.required]],
      address: [this.propertySurvey.address, [Validators.required]],
      property_type_id: [this.propertySurvey.property_type_id, []],
      latitude: [this.propertySurvey.latitude, []],
      longitude: [this.propertySurvey.longitude, []],
      typology: [this.propertySurvey.typology, []],
      uncovered_surface: [this.propertySurvey.uncovered_surface, []],
      covered_surface: [this.propertySurvey.covered_surface, []],
      front_surface: [this.propertySurvey.front_surface, []],
      back_surface: [this.propertySurvey.back_surface, []],
      property_identification: [this.propertySurvey.property_identification, []],
      departure_matrix: [this.propertySurvey.departure_matrix, []],
      orientation_id: [this.propertySurvey.orientation_id, []],
      observations: [this.propertySurvey.observations, []],
      form_id: [this.propertySurvey.form_id, []],
      property_survey_status_id: [this.propertySurvey.property_survey_status_id, []],
    })

    this.editForm.controls['contact'].setErrors(null);
    this.editForm.controls['contact'].updateValueAndValidity();

  }

  submitForm(): void {
    for (const i in this.editForm.controls) {
      if (this.editForm.controls.hasOwnProperty(i)) {
        this.editForm.controls[i].markAsDirty();
        this.editForm.controls[i].updateValueAndValidity();
      }
    }

    if(!this.editForm.invalid)
      this.postForm().subscribe(
        response => {
          console.log(response)
          this.createMessage('success', 'Relevamiento creado exitosamente')
          this.route.navigate(['../'])
        }
      )

      

  }

  getData() {
    this.api.get<PropertySurvey>('propertySurvey').subscribe(
      propertySurvey => this.propertySurvey = propertySurvey
    ),
    this.api.get<User[]>('administration/users').subscribe(
      users => this.assignedUsers = users
    )
    this.api.get<PropertyType[]>('administration/propertyTypes').subscribe(
      propertyTypes => this.propertyTypes = propertyTypes
    )
    this.api.get<Orientation[]>('administration/orientations').subscribe(
      orientations => this.orientations = orientations
    )
    this.api.get<Form[]>('administration/forms').subscribe(
      forms => this.forms = forms
    )
    this.api.get<PropertySurveyStatus[]>('administration/propertySurveyStatuses').subscribe(
      propertySurveyStatuses => this.propertySurveyStatuses = propertySurveyStatuses
    )
  }

  postForm(): Observable<PropertySurvey>{
    console.log('Antes: ' + this.editForm.value.meeting_date)
    this.editForm.value.meeting_date = this.datepipe.transform(this.editForm.value.meeting_date, 'yyyy-MM-dd HH:mm');
    console.log('Dps: ' + this.editForm.value.meeting_date)
    return this.api.post<PropertySurvey>('propertySurveys', this.editForm.value)
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }

}
