import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewGroupDialogComponent } from './create-new-group-dialog.component';

describe('CreateNewGroupDialogComponent', () => {
  let component: CreateNewGroupDialogComponent;
  let fixture: ComponentFixture<CreateNewGroupDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewGroupDialogComponent]
    });
    fixture = TestBed.createComponent(CreateNewGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
