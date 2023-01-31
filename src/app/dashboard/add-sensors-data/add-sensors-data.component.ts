import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';


@Component
({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})

export class AddSensorsDataComponent implements OnInit 
{
  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService) { }
  public sensorenDataForm: any;
  public showAddTask: boolean = false;

  ngOnInit(): void 
  {
    this.sensorenDataForm = this.formBuilder.group
    ({
      sensorId: [0, [ Validators.required ] ],
      temperature: ['', [ Validators.required ] ],
      humidity: ['', [ Validators.required ] ],
      date:  [null, [ Validators.required ] ]
    });
  }

  async onSubmit() 
  {
    if(this.sensorenDataForm?.valid) 
    {
      await this.backendService.addSensorsData(this.sensorenDataForm.value);
      this.sensorenDataForm.reset();
      window.location.reload();
    }
  }

  toggleAddTask() 
  {
    this.showAddTask = !this.showAddTask;
  }
}
