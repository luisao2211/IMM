import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalserviceComponent } from './medicalservice.component';

describe('MedicalserviceComponent', () => {
  let component: MedicalserviceComponent;
  let fixture: ComponentFixture<MedicalserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalserviceComponent]
    });
    fixture = TestBed.createComponent(MedicalserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
