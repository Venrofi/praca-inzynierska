import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GroupList } from 'src/app/core/core.model';
import { SharedMaterialModule } from 'src/app/material.module';
import { GroupRoutingModule } from '../../group-routing.module';
import { GroupService } from '../../services/group.service';
import { GroupsListComponent } from './groups-list.component';

describe('GroupsListComponent', () => {
  let component: GroupsListComponent;
  let fixture: ComponentFixture<GroupsListComponent>;
  let groupService: jasmine.SpyObj<GroupService>;

  beforeEach(async () => {
    groupService = jasmine.createSpyObj('GroupService', ['getGroupsList']);

    await TestBed.configureTestingModule({
      declarations: [GroupsListComponent],
      imports: [
        BrowserAnimationsModule,
        GroupRoutingModule,
        SharedMaterialModule,
      ],
      providers: [
        { provide: GroupService, useValue: groupService },
        ChangeDetectorRef
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListComponent);
    component = fixture.componentInstance;
  });

  it('should call getGroupsList on ngOnInit and set up the data source', () => {
    const mockGroups = [{ id: '1', name: 'Group 1', rank: '1' }, { id: '2', name: 'Group 2', rank: '2' }] as GroupList[];
    groupService.getGroupsList.and.returnValue(of(mockGroups));

    fixture.detectChanges();

    expect(groupService.getGroupsList).toHaveBeenCalled();
    expect(component.groupsData.filteredData).toEqual(mockGroups);
  });

  it('should apply filter when applyFilter is called', () => {
    const mockEvent = { target: { value: 'Group 1' } } as unknown as Event;
    const mockFilteredGroups = [{ id: '1', name: 'Group 1', rank: '1' }, { id: '2', name: 'Group 2', rank: '2' }] as GroupList[];

    component.groupsData = new MatTableDataSource(mockFilteredGroups);
    component.applyFilter(mockEvent);

    expect(component.groupsData.filter).toBe('group 1');
    expect(component.groupsData.filteredData).toEqual([{ id: '1', name: 'Group 1', rank: '1' }] as GroupList[]);
  });

  it('should display a message when no data is available', () => {
    groupService.getGroupsList.and.returnValue(of([]));

    fixture.detectChanges();

    const noDataRow = fixture.nativeElement.querySelector('.mat-mdc-no-data-row');
    expect(noDataRow).toBeTruthy();
    expect(noDataRow.textContent).toContain('Nie znaleziono grup zawierających w nazwie');
  });
});
