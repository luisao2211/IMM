import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoweffectComponent } from './loweffect.component';

describe('LoweffectComponent', () => {
  let component: LoweffectComponent;
  let fixture: ComponentFixture<LoweffectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoweffectComponent]
    });
    fixture = TestBed.createComponent(LoweffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
