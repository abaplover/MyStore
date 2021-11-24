import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CategoryRoutingModule } from './category-routing.module';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';


@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class CategoryModule { }
