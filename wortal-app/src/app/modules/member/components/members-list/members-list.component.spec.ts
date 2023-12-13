import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MemberList } from 'src/app/core/core.model';
import { SharedMaterialModule } from 'src/app/material.module';
import { MemberRoutingModule } from '../../member-routing.module';
import { MemberService } from '../../services/member.service';
import { MembersListComponent } from './members-list.component';

describe('MembersListComponent', () => {
  let component: MembersListComponent;
  let fixture: ComponentFixture<MembersListComponent>;
  let memberService: jasmine.SpyObj<MemberService>;

  beforeEach(async () => {
    memberService = jasmine.createSpyObj('MemberService', ['getMembersList']);

    await TestBed.configureTestingModule({
      declarations: [MembersListComponent],
      imports: [
        BrowserAnimationsModule,
        MemberRoutingModule,
        SharedMaterialModule,
      ],
      providers: [
        { provide: MemberService, useValue: memberService },
        ChangeDetectorRef
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersListComponent);
    component = fixture.componentInstance;
  });

  it('should call getMembersList on ngOnInit and set up the data source', () => {
    const mockMembers = [
      { id: '1', name: 'Member #1', rank: '1', avatar: 'https://picsum.photos/100' },
      { id: '2', name: 'Member #2', rank: '2', avatar: 'https://picsum.photos/100' },
    ] as MemberList[];
    memberService.getMembersList.and.returnValue(of(mockMembers));

    fixture.detectChanges();

    expect(memberService.getMembersList).toHaveBeenCalled();
    expect(component.membersData.filteredData).toEqual(mockMembers);
  });

  it('should apply filter when applyFilter is called', () => {
    const mockEvent = { target: { value: 'Member #1' } } as unknown as Event;
    const mockFilteredGroups = [
      { id: '1', name: 'Member #1', rank: '1', avatar: 'https://picsum.photos/100' },
      { id: '2', name: 'Member #2', rank: '2', avatar: 'https://picsum.photos/100' },
    ] as MemberList[];

    component.membersData = new MatTableDataSource(mockFilteredGroups);
    component.applyFilter(mockEvent);

    expect(component.membersData.filter).toBe('member #1');
    expect(component.membersData.filteredData).toEqual([{ id: '1', name: 'Member #1', rank: '1', avatar: 'https://picsum.photos/100' }] as MemberList[]);
  });

  it('should display a message when no data is available', () => {
    memberService.getMembersList.and.returnValue(of([]));

    fixture.detectChanges();

    const noDataRow = fixture.nativeElement.querySelector('.mat-mdc-no-data-row');
    expect(noDataRow).toBeTruthy();
    expect(noDataRow.textContent).toContain('Nie znaleziono członków zawierających w nazwie');
  });
});
