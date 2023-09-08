import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotiveComponent } from './motive.component';

describe('MotiveComponent', () => {
  let component: MotiveComponent;
  let fixture: ComponentFixture<MotiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MotiveComponent]
    });
    fixture = TestBed.createComponent(MotiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
