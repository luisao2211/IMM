import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Module4Component } from './module4.component';

describe('Module4Component', () => {
  let component: Module4Component;
  let fixture: ComponentFixture<Module4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Module4Component]
    });
    fixture = TestBed.createComponent(Module4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
