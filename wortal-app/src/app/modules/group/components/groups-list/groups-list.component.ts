import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GroupList } from "../../../../core/core.model";
import { GroupService } from "../../services/group.service";

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
})
export class GroupsListComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'name'];
  groupData!: MatTableDataSource<GroupList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private groupService: GroupService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.groupService.getGroupsList().subscribe((artists: GroupList[]) => {
      this.groupData = new MatTableDataSource<GroupList>(artists);
      this.cdr.detectChanges();

      this.sort.active = 'rank';
      this.sort.direction = 'asc';
      this.groupData.paginator = this.paginator;
      this.groupData.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.groupData.filter = filterValue.trim().toLowerCase();

    if (this.groupData.paginator) {
      this.groupData.paginator.firstPage();
    }
  }
}
