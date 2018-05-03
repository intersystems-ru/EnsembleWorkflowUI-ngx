import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

import {AppPrimeNGModule} from './vendor-import/AppPrimeNGModule';
import { ToastrModule } from 'ngx-toastr';

import {TasksService} from './services/tasks.service';
import {MessageService} from 'primeng/components/common/messageservice';
import {ErrorService} from './services/error.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TasksGridComponent } from './components/tasks-grid/tasks-grid.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TasksGridComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppPrimeNGModule,
    ToastrModule.forRoot()
  ],
  providers: [TasksService, MessageService, ErrorService],
  bootstrap: [AppComponent]
})

export class AppModule { }
