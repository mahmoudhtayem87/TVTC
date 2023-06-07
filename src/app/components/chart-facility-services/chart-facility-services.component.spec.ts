import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFacilityServicesComponent } from './chart-facility-services.component';

describe('ChartFacilityServicesComponent', () => {
  let component: ChartFacilityServicesComponent;
  let fixture: ComponentFixture<ChartFacilityServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartFacilityServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartFacilityServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
