import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../homepage.model';
import { HomepageService } from '../../services/homepage.service';
import { AuthService } from "../../../../core/authentication.service";


@Component({
  selector: 'app-events-list',
  templateUrl: 'events-list.component.html',
})
export class EventsListComponent implements OnInit {
  eventsList!: Observable<Event[]>;

  constructor(private homepageService: HomepageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.eventsList = this.homepageService.getEventList();

    this.authService.loginSuccess.subscribe(() => {
      const userID = this.authService.getLoggedInUser() || undefined;
      this.eventsList = this.homepageService.getEventList(userID);
    });

    this.authService.logoutSuccess.subscribe(() => {
      this.eventsList = this.homepageService.getEventList();
    });
  }
}
