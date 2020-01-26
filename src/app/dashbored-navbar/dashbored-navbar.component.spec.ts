import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredNavbarComponent } from './dashbored-navbar.component';

describe('DashboredNavbarComponent', () => {
  let component: DashboredNavbarComponent;
  let fixture: ComponentFixture<DashboredNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboredNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboredNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
