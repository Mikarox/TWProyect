import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrviewComponent } from './usrview.component';

describe('UsrviewComponent', () => {
  let component: UsrviewComponent;
  let fixture: ComponentFixture<UsrviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsrviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
