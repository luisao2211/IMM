import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatecivilComponent } from './statecivil.component';

describe('StatecivilComponent', () => {
  let component: StatecivilComponent;
  let fixture: ComponentFixture<StatecivilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatecivilComponent]
    });
    fixture = TestBed.createComponent(StatecivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
