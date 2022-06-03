import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrais contenir le texte Angular Social',()=>{
    let element : DebugElement = fixture.debugElement;
    let el = element.query(By.css('.social-text'));
    expect(el.nativeElement.textContent).toBe("Angular Social");
  })

  it('devrais avoir un footer gris',()=>{
    let element : DebugElement = fixture.debugElement;
    let el = element.query(By.css('.footer'));
    expect((el.nativeElement as HTMLElement).classList.contains('bg-gray-800')).toBeTruthy();
  })

  it('devrais contenir un copyright',()=>{
    let element : DebugElement = fixture.debugElement;
    let el = element.query(By.css('.copyright-text'));
    expect(el.nativeElement.textContent).toContain("©");
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
