import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { Member, SearchResult } from 'src/app/core/core.model';
import { SearchService } from '../../services/search.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { StoreModel } from 'src/app/app-state.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
})
export class SearchResultsComponent implements OnInit {

  searchResult!: Observable<SearchResult>;

  member: Member | undefined;

  isWideScreen: boolean = window.innerWidth > 900;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 900;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<StoreModel>,
    private snackBar: MatSnackBar,
    private searchService: SearchService) { }

  ngOnInit() {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.searchResult = this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.searchService.getSearchedData(params['input'])
        })
      )
      .pipe(
        catchError(() => {
          this.snackBar.open('Wystąpił błąd podczas wyszukiwania.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });

          this.router.navigate(['/']);

          return of({} as SearchResult);
        }),
      );
  }
}
