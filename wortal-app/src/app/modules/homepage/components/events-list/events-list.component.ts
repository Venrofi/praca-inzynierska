import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../homepage.model';
import { HomepageService } from '../../services/homepage.service';


@Component({
  selector: 'app-events-list',
  templateUrl: 'events-list.component.html',
})
export class EventsListComponent {
  eventsList!: Observable<Event[]>;

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.eventsList = this.homepageService.getEventList();
  }
}
