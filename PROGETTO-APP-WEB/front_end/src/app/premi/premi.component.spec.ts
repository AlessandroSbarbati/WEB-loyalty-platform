import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiComponent } from './premi.component';

describe('PremiComponent', () => {
  let component: PremiComponent;
  let fixture: ComponentFixture<PremiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiComponent]
    });
    fixture = TestBed.createComponent(PremiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
