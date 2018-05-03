import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {SidebarModule} from 'primeng/sidebar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

const modules = [ MenubarModule, ButtonModule, InputTextModule, TableModule, DropdownModule, SidebarModule, ProgressSpinnerModule];

@NgModule({
  imports: modules,
  exports: modules
})

export class AppPrimeNGModule { }
