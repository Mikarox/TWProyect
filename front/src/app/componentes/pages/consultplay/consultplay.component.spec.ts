import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultplayComponent } from './consultplay.component';

describe('ConsultplayComponent', () => {
  let component: ConsultplayComponent;
  let fixture: ComponentFixture<ConsultplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
