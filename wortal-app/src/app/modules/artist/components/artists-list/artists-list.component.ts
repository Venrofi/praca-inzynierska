import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
  artistData!: MatTableDataSource<ArtistList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private artistService: ArtistService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.artistService.getArtistsList().subscribe((artists: ArtistList[]) => {
      this.artistData = new MatTableDataSource<ArtistList>(artists);
      this.cdr.detectChanges();

      this.sort.active = 'rank';
      this.sort.direction = 'asc';
      this.artistData.paginator = this.paginator;
      this.artistData.sort = this.sort;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.artistData.filter = filterValue.trim().toLowerCase();

    if (this.artistData.paginator) {
      this.artistData.paginator.firstPage();
    }
  }
}
