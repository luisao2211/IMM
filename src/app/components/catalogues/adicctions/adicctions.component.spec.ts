import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicctionsComponent } from './adicctions.component';

describe('AdicctionsComponent', () => {
  let component: AdicctionsComponent;
  let fixture: ComponentFixture<AdicctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicctionsComponent]
    });
    fixture = TestBed.createComponent(AdicctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
