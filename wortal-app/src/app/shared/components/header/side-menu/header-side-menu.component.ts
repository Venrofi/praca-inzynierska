import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from 'src/app/core/core.model';

@Component({
  selector: 'app-header-side-menu',
  templateUrl: './header-side-menu.component.html',
})
export class HeaderSideMenuComponent {

  @Input()
  memberAuthenticated: boolean = false;

  @Output()
  memberLogout = new EventEmitter<boolean>();

  onMemberLogout(): void {
    this.memberLogout.emit(true);
  }
}
