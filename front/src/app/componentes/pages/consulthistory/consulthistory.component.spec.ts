import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulthistoryComponent } from './consulthistory.component';

describe('ConsulthistoryComponent', () => {
  let component: ConsulthistoryComponent;
  let fixture: ComponentFixture<ConsulthistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulthistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulthistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
