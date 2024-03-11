import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { EventDetails } from 'src/app/core/core.model';


@Component({
  selector: 'app-event',
  templateUrl: 'event.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent {

  @Input() event!: EventDetails;

  isWideScreen: boolean = window.innerWidth > 700;

  @HostListener('window:resize', ['$event'])
  onResize(event: EventDetails): void {
    this.isWideScreen = window.innerWidth > 700;
  }

}
