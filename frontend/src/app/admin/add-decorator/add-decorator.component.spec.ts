import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecoratorComponent } from './add-decorator.component';

describe('AddDecoratorComponent', () => {
  let component: AddDecoratorComponent;
  let fixture: ComponentFixture<AddDecoratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDecoratorComponent]
    });
    fixture = TestBed.createComponent(AddDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
