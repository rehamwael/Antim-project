import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLenderComponent } from './request-lender.component';

describe('RequestLenderComponent', () => {
  let component: RequestLenderComponent;
  let fixture: ComponentFixture<RequestLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
