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
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-survey-create',
  templateUrl: './property-survey-create.component.html',
  styleUrls: ['./property-survey-create.component.sass']
})
export class PropertySurveyCreateComponent implements OnInit {

  createForm!: FormGroup;
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
    private route: Router
    ) {}

  ngOnInit(): void {
    this.getData()
    this.createForm = this.fb.group({
      assigned_user_id: [null, [Validators.required]],
      meeting_date: [null, [Validators.required]],
      contact: [null, [Validators.required]],
      address: [null, [Validators.required]],
      property_type_id: [null, []],
      latitude: [12.25, []],
      longitude: [14.68, []],
      typology: ['Tipología', []],
      uncovered_surface: [10, []],
      covered_surface: [40, []],
      front_surface: [60, []],
      back_surface: [89, []],
      property_identification: ['ABC123', []],
      departure_matrix: ['Matriz', []],
      orientation_id: [null, []],
      observations: ['Observaciones', []],
      form_id: [null, []],
      property_survey_status_id: [1, []],
    })

    this.createForm.controls['contact'].setErrors(null);
    this.createForm.controls['contact'].updateValueAndValidity();

  }

  submitForm(): void {
    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }

    if(!this.createForm.invalid)
      this.postForm().subscribe(
        response => {
          console.log(response)
          this.createMessage('success', 'Relevamiento creado exitosamente')
          this.route.navigate(['../'])
        }
      )

      

  }

  getData() {
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
    console.log('Antes: ' + this.createForm.value.meeting_date)
    this.createForm.value.meeting_date = this.datepipe.transform(this.createForm.value.meeting_date, 'yyyy-MM-dd HH:mm');
    console.log('Dps: ' + this.createForm.value.meeting_date)
    return this.api.post<PropertySurvey>('propertySurveys', this.createForm.value)
  }

  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}
