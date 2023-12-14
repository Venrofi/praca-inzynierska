import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TruncateTextDirective } from './truncate-text.directive';

@Component({
  template: `<div appTruncateText>{{ text }}</div>`,
  styles: [`div { width: 50px; }`]
})
class TestComponent {
  text: string = 'This is a long text that needs to be truncated';
}

describe('TruncateTextDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TruncateTextDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(TruncateTextDirective));
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    const directive = new TruncateTextDirective(directiveElement);
    expect(directive).toBeTruthy();
  });

  it('should truncate text if it overflows', () => {
    // Assuming the initial text is longer than the container width
    const directive = new TruncateTextDirective(directiveElement);
    const originalText = component.text;

    // Check if the text has been truncated
    expect(directiveElement.nativeElement.innerText).not.toEqual(originalText);

    // Change the width of the container
    spyOn(directiveElement.nativeElement, 'getBoundingClientRect').and.returnValue({
      "x": 0,
      "y": 50,
      "width": 500,
      "height": 168,
      "top": 50,
      "right": 50,
      "bottom": 218,
      "left": 0
    } as DOMRect);

    // Trigger window resize to invoke the checkTruncation method
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    // Check if the truncation has been removed
    expect(directiveElement.nativeElement.innerText).toEqual(originalText);
  });

  it('should not truncate if the text fits', () => {
    // Assuming the initial text is shorter than the container width
    const originalText = 'Short text';

    directiveElement.nativeElement.innerText = originalText;
    component.text = originalText;
    fixture.detectChanges();

    // Trigger window resize to invoke the checkTruncation method
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    // Check if the text has been restored
    expect(directiveElement.nativeElement.innerText).toEqual(originalText);
  });
});
