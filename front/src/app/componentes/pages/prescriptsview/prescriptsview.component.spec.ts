import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptsviewComponent } from './prescriptsview.component';

describe('PrescriptsviewComponent', () => {
  let component: PrescriptsviewComponent;
  let fixture: ComponentFixture<PrescriptsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptsviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
