import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisprogramsComponent } from './axisprograms.component';

describe('AxisprogramsComponent', () => {
  let component: AxisprogramsComponent;
  let fixture: ComponentFixture<AxisprogramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AxisprogramsComponent]
    });
    fixture = TestBed.createComponent(AxisprogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
