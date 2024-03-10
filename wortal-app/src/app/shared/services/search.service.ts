import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/authentication.service';
import { SearchResult } from 'src/app/core/core.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class SearchService {

  private API_ROOT = environment.apiBaseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSearchedData(searchTerm: string) {
    const userId = this.authService.getLoggedInUser() || '';
    const params = new HttpParams().set('input', searchTerm).set('id', userId);

    return this.http.get<SearchResult>(`${this.API_ROOT}/Search/search`, { params });
  }
}
