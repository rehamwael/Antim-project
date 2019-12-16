import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunderRequestsDetailsComponent } from './funder-requests-details.component';

describe('FunderRequestsDetailsComponent', () => {
  let component: FunderRequestsDetailsComponent;
  let fixture: ComponentFixture<FunderRequestsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunderRequestsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunderRequestsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
