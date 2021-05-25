import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexnurseComponent } from './indexnurse.component';

describe('IndexnurseComponent', () => {
  let component: IndexnurseComponent;
  let fixture: ComponentFixture<IndexnurseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexnurseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexnurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
