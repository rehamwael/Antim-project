import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLenderComponent } from './profile-lender.component';

describe('ProfileLenderComponent', () => {
  let component: ProfileLenderComponent;
  let fixture: ComponentFixture<ProfileLenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
