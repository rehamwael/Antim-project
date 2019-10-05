import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredLenderComponent } from './dashbored-lender.component';

describe('DashboredLenderComponent', () => {
  let component: DashboredLenderComponent;
  let fixture: ComponentFixture<DashboredLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboredLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboredLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
