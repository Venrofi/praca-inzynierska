import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../../../core/authentication.service";
import { Album } from "../../homepage.model";
import { HomepageService } from "../../services/homepage.service";

@Component({
  selector: "app-premiere-list",
  templateUrl: "./premiere-list.component.html",
})
export class PremiereListComponent implements OnInit {
  premiereList!: Observable<Album[]>;

  constructor(private homepageService: HomepageService, private authService: AuthService) { }

  ngOnInit(): void {
    const userID = this.authService.getLoggedInUser();
    this.premiereList = this.homepageService.getPremiereList(userID);

    this.authService.loginSuccess.subscribe(() => {
      const userID = this.authService.getLoggedInUser();
      this.premiereList = this.homepageService.getPremiereList(userID);
    });

    this.authService.logoutSuccess.subscribe(() => {
      this.premiereList = this.homepageService.getPremiereList();
    });
  }
}
