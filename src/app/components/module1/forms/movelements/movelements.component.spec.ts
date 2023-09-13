import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovelementsComponent } from './movelements.component';

describe('MovelementsComponent', () => {
  let component: MovelementsComponent;
  let fixture: ComponentFixture<MovelementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovelementsComponent]
    });
    fixture = TestBed.createComponent(MovelementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
