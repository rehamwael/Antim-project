import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLenderComponent } from './notification-lender.component';

describe('NotificationLenderComponent', () => {
  let component: NotificationLenderComponent;
  let fixture: ComponentFixture<NotificationLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
