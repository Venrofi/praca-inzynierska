import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGroupProfileDialogComponent } from './edit-group-profile-dialog.component';

describe('EditGroupProfileDialogComponent', () => {
  let component: EditGroupProfileDialogComponent;
  let fixture: ComponentFixture<EditGroupProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGroupProfileDialogComponent]
    });
    fixture = TestBed.createComponent(EditGroupProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
