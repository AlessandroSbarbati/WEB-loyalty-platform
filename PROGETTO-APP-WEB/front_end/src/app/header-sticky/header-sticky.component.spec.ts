import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderStickyComponent } from './header-sticky.component';

describe('HeaderStickyComponent', () => {
  let component: HeaderStickyComponent;
  let fixture: ComponentFixture<HeaderStickyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStickyComponent]
    });
    fixture = TestBed.createComponent(HeaderStickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
