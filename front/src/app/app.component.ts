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
      date: new FormControl()
    })
  }

  onSearch(){
    const fromCity: string = this.formGroup.get('from')?.value;
    const toCity: string = this.formGroup.get('to')?.value;
    const date: string = this.formatDate(this.formGroup.get('date')?.value);

    const url = `http://localhost:3000/search?from=${fromCity}&to=${toCity}&departureDate=${date}&departureTime=20:00`;
    
    this.connections = this.http.get<connection[]>(url);
  }

  formatDate(date: Date){
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
