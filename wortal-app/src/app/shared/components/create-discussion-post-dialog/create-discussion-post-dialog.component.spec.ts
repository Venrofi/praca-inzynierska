import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscussionPostDialogComponent } from './create-discussion-post-dialog.component';

describe('CreateDiscussionPostDialogComponent', () => {
  let component: CreateDiscussionPostDialogComponent;
  let fixture: ComponentFixture<CreateDiscussionPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDiscussionPostDialogComponent]
    });
    fixture = TestBed.createComponent(CreateDiscussionPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
