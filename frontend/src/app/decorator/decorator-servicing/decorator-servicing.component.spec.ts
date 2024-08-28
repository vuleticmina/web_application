import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorServicingComponent } from './decorator-servicing.component';

describe('DecoratorServicingComponent', () => {
  let component: DecoratorServicingComponent;
  let fixture: ComponentFixture<DecoratorServicingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorServicingComponent]
    });
    fixture = TestBed.createComponent(DecoratorServicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
