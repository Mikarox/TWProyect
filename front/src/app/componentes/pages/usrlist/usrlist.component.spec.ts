import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrlistComponent } from './usrlist.component';

describe('UsrlistComponent', () => {
  let component: UsrlistComponent;
  let fixture: ComponentFixture<UsrlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
