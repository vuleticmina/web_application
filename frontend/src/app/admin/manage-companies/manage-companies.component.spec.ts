import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompaniesComponent } from './manage-companies.component';

describe('ManageCompaniesComponent', () => {
  let component: ManageCompaniesComponent;
  let fixture: ComponentFixture<ManageCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCompaniesComponent]
    });
    fixture = TestBed.createComponent(ManageCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
