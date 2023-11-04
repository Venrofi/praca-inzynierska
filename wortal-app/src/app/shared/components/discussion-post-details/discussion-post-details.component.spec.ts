import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionPostDetailsComponent } from './discussion-post-details.component';

describe('DiscussionPostDetailsComponent', () => {
  let component: DiscussionPostDetailsComponent;
  let fixture: ComponentFixture<DiscussionPostDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscussionPostDetailsComponent]
    });
    fixture = TestBed.createComponent(DiscussionPostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
