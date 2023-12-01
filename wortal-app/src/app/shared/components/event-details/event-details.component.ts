import { Component, HostListener, OnInit } from '@angular/core';
import { Event, Member } from 'src/app/core/core.model';
import { ContentDetailsService } from '../../services/content-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, catchError, debounceTime, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as memberActions from '../../../store/member/member.actions';
import { StoreModel } from 'src/app/app-state.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
})
export class EventDetailsComponent implements OnInit {
  event!: Event;

  eventAttened: boolean = false;

  member: Member | undefined;

  private clickSubject = new Subject<void>();

  isWideScreen: boolean = window.innerWidth > 600;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isWideScreen = window.innerWidth > 600;
  }

  constructor(
    private contentDetailsService: ContentDetailsService,
    private store: Store<StoreModel>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.app.member).subscribe(member => this.member = member);

    this.route.queryParams
      .pipe(
        switchMap(params => {
          return this.contentDetailsService.getEventDetails(params['id'])
        })
      )
      .pipe(
        catchError(() => {
          this.snackBar.open('Wystąpił błąd podczas wczytywania szczegółów wydarzenia.', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-error']
          });

          this.router.navigate(['/']);

          return of({} as Event);
        })
      )
      .subscribe(event => {
        this.event = event;
        this.event.participants.find(participant => participant.id === this.member?.id) ? this.eventAttened = true : this.eventAttened = false;
      });

    this.clickSubject.pipe(debounceTime(500)).subscribe(() => {
      this.eventAttened ? this.unAttendEvent() : this.attendEvent();
    });
  }

  eventAction() {
    this.clickSubject.next();
  }

  attendEvent() {
    this.contentDetailsService.attendEvent(this.event.id).subscribe({
      next: () => {
        if (this.member) {
          this.eventAttened = true;

          // Update local state
          this.event.participants = [...this.event.participants, { id: this.member.id, name: this.member.name }];

          // Update global store state
          const attendedEvents = [...this.member.attendedEvents, { id: this.event.id, name: this.event.name }];
          this.store.dispatch(memberActions.update({ member: { ...this.member, attendedEvents } }));

          this.snackBar.open('Dołączyłeś do wydarzenia!', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-success']
          });
        }
      },
      error: () => {
        this.snackBar.open('Nie udało się dołączyć do wydarzenia!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  unAttendEvent() {
    this.contentDetailsService.unAttendEvent(this.event.id).subscribe({
      next: () => {
        if (this.member) {
          this.eventAttened = false;

          // Update local state
          this.event.participants = this.event.participants.filter(participant => participant.id !== this.member?.id);

          // Update global store state
          const attendedEvents = this.member.attendedEvents.filter(event => event.id !== this.event.id);

          this.store.dispatch(memberActions.update({ member: { ...this.member, attendedEvents } }));

          this.snackBar.open('Zrezygnowałeś z udziału w wydarzeniu!', 'OK', {
            duration: 3000,
            horizontalPosition: 'end',
            panelClass: ['snackbar-success']
          });
        }
      },
      error: () => {
        this.snackBar.open('Nie udało się zrezygnować z wydarzenia!', 'OK', {
          duration: 3000,
          horizontalPosition: 'end',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }
}
