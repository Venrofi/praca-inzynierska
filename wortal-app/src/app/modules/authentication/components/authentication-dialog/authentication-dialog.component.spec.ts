import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from 'src/app/core/authentication.service';
import { AuthenticationModule } from '../../authentication.module';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';
import { AuthenticationDialogComponent } from './authentication-dialog.component';

describe('AuthenticationDialogComponent', () => {
  let component: AuthenticationDialogComponent;
  let fixture: ComponentFixture<AuthenticationDialogComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let matDialogRef: jasmine.SpyObj<MatDialogRef<AuthenticationDialogComponent>>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['login', 'register', 'setLoggedInUser', 'notifyLoginSuccess']);
    matDialog = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    matSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [AuthenticationDialogComponent],
      imports: [
        BrowserAnimationsModule,
        AuthenticationModule,
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: MatDialog, useValue: matDialog },
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MatSnackBar, useValue: matSnackBar },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationDialogComponent);
    component = fixture.componentInstance;
  });

  it('should initialize with LOGIN as the default authType', () => {
    expect(component.authType).toBe('LOGIN');
  });

  // it('should authType be set based on clicked toggle button', async () => {
  //   const authToggleButtons = fixture.nativeElement.querySelectorAll('.mat-button-toggle-button');

  //   console.log(authToggleButtons);

  //   if (authToggleButtons.length === 2) {
  //     authToggleButtons[1].click();
  //     authToggleButtons[1].dispatchEvent(new Event('click'));
  //     await fixture.whenStable();
  //     fixture.detectChanges(); // Ensure Angular updates the view
  //     expect(component.authType).toBe('REGISTER');

  //     authToggleButtons[0].click();
  //     await fixture.whenStable();
  //     fixture.detectChanges(); // Ensure Angular updates the view
  //     expect(component.authType).toBe('LOGIN');
  //   }
  // });

  it('should open the ForgotPasswordDialogComponent when calling forgotPassword()', () => {
    component.forgotPassword();
    expect(matDialog.open).toHaveBeenCalledWith(ForgotPasswordDialogComponent, { width: '90vw', maxWidth: '500px' });
  });

  it('should call the login method of AuthService when calling authenticate()', () => {
    component.loginCredentials = { username: 'testuser', password: 'testpassword' };

    authService.login.and.returnValue(of({ code: 'success' }) as any);
    component.authenticate();

    expect(authService.login).toHaveBeenCalledWith(component.loginCredentials);
    expect(matDialogRef.close).toHaveBeenCalled();
  });

  it('should call the register method of AuthService when calling register()', () => {
    component.registerCredentials = { username: 'testuser', password: 'testpassword', confirmPassword: 'testpassword', email: 'test@example.com' };

    authService.register.and.returnValue(of({ code: 'success' }) as any);
    component.register();

    expect(authService.register).toHaveBeenCalledWith(component.registerCredentials);
    expect(matDialogRef.close).toHaveBeenCalled();
    expect(matSnackBar.open).toHaveBeenCalledWith(
      'Rejestracja pomyślna! Sprawdź pocztę pod wskazanym adresem e-mail w celu weryfikacji konta.',
      'OK',
      { horizontalPosition: 'center', panelClass: ['snackbar-success'] }
    );
  });

});
