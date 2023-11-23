import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberList } from 'src/app/core/core.model';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
})
export class MembersListComponent {
  displayedColumns: string[] = ['rank', 'name'];
  membersData!: MatTableDataSource<MemberList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private memberService: MemberService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.memberService.getMembersList().subscribe((artists: MemberList[]) => {
      this.membersData = new MatTableDataSource<MemberList>(artists);
      this.cdr.detectChanges();

      this.sort.active = 'rank';
      this.sort.direction = 'asc';
      this.membersData.paginator = this.paginator;
      this.membersData.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.membersData.filter = filterValue.trim().toLowerCase();

    if (this.membersData.paginator) {
      this.membersData.paginator.firstPage();
    }
  }
}
