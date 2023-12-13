import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsListComponent } from './artists-list.component';
import { ArtistRoutingModule } from '../../artist-routing.module';
import { ArtistService } from '../../services/artist.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from 'src/app/material.module';
import { ChangeDetectorRef } from '@angular/core';
import { ArtistList } from 'src/app/core/core.model';
import { of } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

describe('ArtistsListComponent', () => {
  let component: ArtistsListComponent;
  let fixture: ComponentFixture<ArtistsListComponent>;
  let artistService: jasmine.SpyObj<ArtistService>;

  beforeEach(async () => {
    artistService = jasmine.createSpyObj('ArtistService', ['getArtistsList']);

    await TestBed.configureTestingModule({
      declarations: [ArtistsListComponent],
      imports: [
        BrowserAnimationsModule,
        ArtistRoutingModule,
        SharedMaterialModule,
      ],
      providers: [
        { provide: ArtistService, useValue: artistService },
        ChangeDetectorRef
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsListComponent);
    component = fixture.componentInstance;
  });

  it('should call getArtistsList on ngOnInit and set up the data source', () => {
    const mockArtists = [
      { id: '1', name: 'Artist #1', rank: '1', image: 'https://picsum.photos/100' },
      { id: '2', name: 'Artist #2', rank: '2', image: 'https://picsum.photos/100' },
    ] as ArtistList[];
    artistService.getArtistsList.and.returnValue(of(mockArtists));

    fixture.detectChanges();

    expect(artistService.getArtistsList).toHaveBeenCalled();
    expect(component.artistsData.filteredData).toEqual(mockArtists);
  });

  it('should apply filter when applyFilter is called', () => {
    const mockEvent = { target: { value: 'Artist #1' } } as unknown as Event;
    const mockFilteredGroups = [
      { id: '1', name: 'Artist #1', rank: '1', image: 'https://picsum.photos/100' },
      { id: '2', name: 'Artist #2', rank: '2', image: 'https://picsum.photos/100' },
    ] as ArtistList[];

    component.artistsData = new MatTableDataSource(mockFilteredGroups);
    component.applyFilter(mockEvent);

    expect(component.artistsData.filter).toBe('artist #1');
    expect(component.artistsData.filteredData).toEqual([{ id: '1', name: 'Artist #1', rank: '1', image: 'https://picsum.photos/100' }] as ArtistList[]);
  });

  it('should display a message when no data is available', () => {
    artistService.getArtistsList.and.returnValue(of([]));

    fixture.detectChanges();

    const noDataRow = fixture.nativeElement.querySelector('.mat-mdc-no-data-row');
    expect(noDataRow).toBeTruthy();
    expect(noDataRow.textContent).toContain('Nie znaleziono artystów zawierających w nazwie');
  });
});
