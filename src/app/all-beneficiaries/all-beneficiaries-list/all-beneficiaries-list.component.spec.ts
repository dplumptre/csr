import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBeneficiariesListComponent } from './all-beneficiaries-list.component';

describe('AllBeneficiariesListComponent', () => {
  let component: AllBeneficiariesListComponent;
  let fixture: ComponentFixture<AllBeneficiariesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBeneficiariesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBeneficiariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
