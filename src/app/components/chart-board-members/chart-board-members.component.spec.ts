import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBoardMembersComponent } from './chart-board-members.component';

describe('ChartBoardMembersComponent', () => {
  let component: ChartBoardMembersComponent;
  let fixture: ComponentFixture<ChartBoardMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBoardMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartBoardMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
