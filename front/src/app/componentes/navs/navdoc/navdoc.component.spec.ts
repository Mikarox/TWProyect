import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdocComponent } from './navdoc.component';

describe('NavdocComponent', () => {
  let component: NavdocComponent;
  let fixture: ComponentFixture<NavdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavdocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
