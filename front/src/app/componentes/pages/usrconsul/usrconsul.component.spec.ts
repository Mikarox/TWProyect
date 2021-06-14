import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrconsulComponent } from './usrconsul.component';

describe('UsrconsulComponent', () => {
  let component: UsrconsulComponent;
  let fixture: ComponentFixture<UsrconsulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrconsulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrconsulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
