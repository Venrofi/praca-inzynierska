import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-side-menu',
  templateUrl: './header-side-menu.component.html',
})
export class HeaderSideMenuComponent {

  @Input()
  memberAuthenticated: boolean = false;

  @Output()
  memberLogout = new EventEmitter<boolean>();

  @Output()
  memberAuthenticate = new EventEmitter<boolean>();

  onMemberLogout(): void {
    this.memberLogout.emit(true);
  }

  onAuthenticateMember(): void {
    this.memberAuthenticate.emit(true);
  }
}
