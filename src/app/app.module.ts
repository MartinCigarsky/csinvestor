import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TableComponent} from "./components/table/table.component";
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddNewInvestmentComponent } from './components/modal/add-new-investment/add-new-investment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";


const firebaseConfig = {
  apiKey: "AIzaSyAZv7L0mn-VIoP6yYuSTM4nbCK-LV3zW04",
  authDomain: "cs-investor.firebaseapp.com",
  projectId: "cs-investor",
  storageBucket: "cs-investor.appspot.com",
  messagingSenderId: "427386028274",
  appId: "1:427386028274:web:8dc341afbbabbcdc2b106b"
}

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AddNewInvestmentComponent
  ],
    imports: [
        BrowserModule,
        TableModule,
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideFirestore(() => getFirestore()),
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        InputTextModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
