import { Component, OnInit } from "@angular/core";
import { noop, Observable } from "rxjs";
import { PremiereAlbum } from "../../homepage.model";
import { HomepageService } from "../../services/homepage.service";
import { AuthService } from "../../../../core/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-premiere-list",
  templateUrl: "./premiere-list.component.html",
})
export class PremiereListComponent implements OnInit {
  premiereList!: Observable<PremiereAlbum[]>;

  constructor(private homepageService: HomepageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.premiereList = this.homepageService.getPremiereList();

    this.authService.loginSuccess.subscribe(() => {
      const userID = this.authService.getLoggedInUser() || undefined;
      this.premiereList = this.homepageService.getPremiereList(userID);
    });

    this.authService.logoutSuccess.subscribe(() => {
      this.premiereList = this.homepageService.getPremiereList();
    });
  }

  navigateToArtistProfile(artist: string) {
    this.router.navigate(['/artist'], { queryParams: { id: artist } }).catch(noop);
  }

  openAlbumModal(album: PremiereAlbum) {
    console.log(`Open post modal at: /forum/${album.artist}/${album.id}`);
  }
}
