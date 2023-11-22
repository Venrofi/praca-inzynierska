import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Artist } from 'src/app/core/core.model';
import { ArtistService } from "../../services/artist.service";

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.scss']
})
export class ArtistProfileComponent implements OnInit {
  artist!: Observable<Artist | undefined>;

  constructor(private artistService: ArtistService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.artist = this.route.queryParams.pipe(
      switchMap(params => {
        return this.artistService.getArtistInformation(params['id']);
      })
    );
  }
}
