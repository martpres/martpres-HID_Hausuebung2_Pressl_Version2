import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay, of } from 'rxjs';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component
({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})

export class SensorsDataComponent implements OnInit 
{
  columnsToDisplay: string[] = ['sensor', 'datum', 'temperature', 'humidity','location','position','delete'];
  public isLoading = true;
  public dataSource: any;
  public edit:Boolean = false;
  public aktID = 0;

 
  
  @ViewChild('paginator') paginator: MatPaginator | undefined;


  public get SensorPosition() {return SensorPosition; }

  constructor(private backendService: BackendService, public storeService: StoreService) { }

  async ngOnInit() {
  
    this.isLoading = true;

    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();

    of(this.storeService.sensorenDaten).pipe(delay(1000))
    .subscribe(data => {
      console.log(this.isLoading);
      this.isLoading = false; 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }


  async setDataSource() 
  {
    
  }

  async deleteSensordata(id: number) {
    await this.backendService.deleteSensorsDaten(id);
    window.location.reload();
  }
  
}
