import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesreferenceComponent } from './servicesreference.component';

describe('ServicesreferenceComponent', () => {
  let component: ServicesreferenceComponent;
  let fixture: ComponentFixture<ServicesreferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesreferenceComponent]
    });
    fixture = TestBed.createComponent(ServicesreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
