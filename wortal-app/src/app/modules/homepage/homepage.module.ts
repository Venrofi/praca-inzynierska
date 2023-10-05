import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HomepageComponent
  ],
  providers: [],
})
export class HomepageModule { }
