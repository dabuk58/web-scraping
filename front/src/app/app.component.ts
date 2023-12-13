import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

interface connection{
  fromTime: string,
  toTime: string,
  dateFrom: string,
  dateTo: string,
  link?: string,
  form?: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  formGroup!: FormGroup;
  buyGroup!: FormGroup;
  connections!: Observable<connection[]>;
  isBuyFormDone!: Observable<string>;
  isModal = false
  ticketUrl = ''

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

    this.buyGroup = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      }),
      surname: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      }),
      email: new FormControl(null, {
        updateOn: 'change',
        validators: Validators.required
      }),
      ifBothWays: new FormControl(null, {
        updateOn: 'change',
      }),
      ifDog: new FormControl(null, {
        updateOn: 'change',
      }),
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

  onBuyTicket() {
    const name: string = this.buyGroup.get('name')?.value;
    const surname: string = this.buyGroup.get('surname')?.value;
    const email: string = this.buyGroup.get('email')?.value;
    const ifBothWays: string = this.buyGroup.get('ifBothWays')?.value;
    const ifDog: string = this.buyGroup.get('ifDog')?.value;
    
    const url = `http://localhost:3000/buy`

    console.log(url);

    const body = {
      name: name,
      surname: surname,
      email: email,
      ifBothWays: ifBothWays,
      ifDog: ifDog,
      ticketUrl: this.ticketUrl
    };
  

    this.isBuyFormDone = this.http.post<string>(url, body);
  }

  showModal(link: string) {
    this.ticketUrl = link;
    this.isModal = true
  }

  hideModal() {
    this.isModal = false
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

      case 'DeutscheBahn':
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
