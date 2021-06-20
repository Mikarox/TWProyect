import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsraddwantsComponent } from './usraddwants.component';

describe('UsraddwantsComponent', () => {
  let component: UsraddwantsComponent;
  let fixture: ComponentFixture<UsraddwantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsraddwantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsraddwantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
