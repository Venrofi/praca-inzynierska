import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { PremiereAlbum } from "../../homepage.model";
import { HomepageService } from "../../services/homepage.service";

@Component({
  selector: "app-premiere-list",
  templateUrl: "./premiere-list.component.html",
})
export class PremiereListComponent implements OnInit {
  premiereList!: Observable<PremiereAlbum[]>;

  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.premiereList = this.homepageService.getPremiereList();
  }

  navigateToArtistProfile(artist: string) {
    console.log(`Navigate to author profile at: /forum/${artist}`);
  }

  openAlbumModal(album: PremiereAlbum) {
    console.log(`Open post modal at: /forum/${album.artist}/${album.id}`);
  }
}
