import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ArtistList } from "../../../../core/core.model";
import { ArtistService } from "../../services/artist.service";

@Component({
  selector: 'app-artists-list',
  templateUrl: './artists-list.component.html',
})
export class ArtistsListComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'name'];
  artistsData!: MatTableDataSource<ArtistList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private artistService: ArtistService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.artistService.getArtistsList().subscribe((artists: ArtistList[]) => {
      this.artistsData = new MatTableDataSource<ArtistList>(artists);
      this.cdr.detectChanges();

      this.sort.active = 'rank';
      this.sort.direction = 'asc';
      this.artistsData.paginator = this.paginator;
      this.artistsData.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.artistsData.filter = filterValue.trim().toLowerCase();

    if (this.artistsData.paginator) {
      this.artistsData.paginator.firstPage();
    }
  }
}
