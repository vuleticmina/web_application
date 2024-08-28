import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorHomeComponent } from './decorator-home.component';

describe('DecoratorHomeComponent', () => {
  let component: DecoratorHomeComponent;
  let fixture: ComponentFixture<DecoratorHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorHomeComponent]
    });
    fixture = TestBed.createComponent(DecoratorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
