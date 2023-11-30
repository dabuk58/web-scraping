import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

interface connection{
  fromTime: string,
  toTime: string,
  dateFrom: string,
  dateTo: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  formGroup!: FormGroup;
  connections!: Observable<connection[]>;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      from: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      }),
      to: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      }),
      date: new FormControl(),
      source: new FormControl(null, {
        validators: Validators.required
      })
    })
  }

  onSearch(){
    const fromCity: string = this.formGroup.get('from')?.value;
    const toCity: string = this.formGroup.get('to')?.value;
    const source: string = this.formGroup.get('source')?.value;
    const date: string = this.formatDate(this.formGroup.get('date')?.value, source);

    const url = `http://localhost:3000/search?from=${fromCity}&to=${toCity}&departureDate=${date}&departureTime=20:00&source=${source}`;
    
    this.connections = this.http.get<connection[]>(url);
  }

  formatDate(date: Date, source: string){

    let day: string | number = '';
    let month: string | number = '';
    let year: number = 1212;

    switch(source){
      case 'portalPasazera':
        day = ('0' + date.getDate()).slice(-2);
        month = ('0' + (date.getMonth() + 1)).slice(-2);
        year = date.getFullYear();
        return `${day}.${month}.${year}`;

      case 'rozkladJazdyPKP':
        day = date.getDate();
        month = date.getMonth() + 1; 
        year = date.getFullYear() % 100; 
        return `${day}.${month < 10 ? '0' : ''}${month}.${year < 10 ? '0' : ''}${year}`;
    }

    return `${day}.${month}.${year}`;
  }
}
