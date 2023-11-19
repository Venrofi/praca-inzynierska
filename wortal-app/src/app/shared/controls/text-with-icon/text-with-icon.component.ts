import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-with-icon',
  templateUrl: './text-with-icon.component.html',
})
export class TextWithIconComponent {

  @Input({ required: true }) icon!: string;

  @Input({ required: true }) text!: string;

}
