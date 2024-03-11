import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomepageService } from '../../services/homepage.service';
import { AuthService } from "../../../../core/authentication.service";
import { Event } from 'src/app/core/core.model';


@Component({
  selector: 'app-events-list',
  templateUrl: 'events-list.component.html',
})
export class EventsListComponent implements OnInit {
  eventsList!: Observable<Event[]>;

  constructor(private homepageService: HomepageService, private authService: AuthService) { }

  ngOnInit(): void {
    const userID = this.authService.getLoggedInUser();
    this.eventsList = this.homepageService.getEventList(userID);

    this.authService.loginSuccess.subscribe(() => {
      const userID = this.authService.getLoggedInUser();
      this.eventsList = this.homepageService.getEventList(userID);
    });

    this.authService.logoutSuccess.subscribe(() => {
      this.eventsList = this.homepageService.getEventList();
    });
  }
}
