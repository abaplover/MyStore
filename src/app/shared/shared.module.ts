import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductsComponent } from '../shared/components/products/products.component';
import { ReversePipe } from '../shared/pipes/reverse.pipe';
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
import { VocalToNumberPipe } from '../shared/pipes/vocal-to-number.pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    VocalToNumberPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductsComponent,
    ReversePipe,
    TimeAgoPipe,
    HighlightDirective,
    VocalToNumberPipe
  ]
})
export class SharedModule { }
