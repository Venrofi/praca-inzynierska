import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscussionPostDialogComponent } from './edit-discussion-post-dialog.component';

describe('EditDiscussionPostDialogComponent', () => {
  let component: EditDiscussionPostDialogComponent;
  let fixture: ComponentFixture<EditDiscussionPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDiscussionPostDialogComponent]
    });
    fixture = TestBed.createComponent(EditDiscussionPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
