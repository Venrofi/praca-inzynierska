import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from '../../../homepage.model';


@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {

  @Input() event!: Event;

}
