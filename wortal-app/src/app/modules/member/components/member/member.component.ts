import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreModel } from 'src/app/app-state.model';
import { Member } from 'src/app/core/core.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html'
})
export class MemberComponent {

  member: Observable<Member | undefined>;

  isWideScreen: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
  }

  constructor(private store: Store<StoreModel>) {
    this.member = this.store.select(state => state.app.member);
  }
}
