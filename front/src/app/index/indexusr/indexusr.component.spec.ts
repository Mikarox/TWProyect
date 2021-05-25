import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexusrComponent } from './indexusr.component';

describe('IndexusrComponent', () => {
  let component: IndexusrComponent;
  let fixture: ComponentFixture<IndexusrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexusrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexusrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
