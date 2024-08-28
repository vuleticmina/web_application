import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicingComponent } from './servicing.component';

describe('ServicingComponent', () => {
  let component: ServicingComponent;
  let fixture: ComponentFixture<ServicingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicingComponent]
    });
    fixture = TestBed.createComponent(ServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
