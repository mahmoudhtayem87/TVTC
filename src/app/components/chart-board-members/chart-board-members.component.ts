import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ChartBoardMembersService} from "../../services/chart-board-members.service";

@Component({
  selector: 'app-chart-board-members',
  templateUrl: './chart-board-members.component.html',
  styleUrls: ['./chart-board-members.component.css']
})
export class ChartBoardMembersComponent  implements  OnChanges{

  members : [] = [];
  @Input('entityId')
  EntityId:string = "none";
  @Input('entityName')
  entityName:string = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['EntityId']) {
      if (this.EntityId == "none")
      {
        this.members = [];
      }
      else
      {
        this.loadData(this.EntityId);
      }

    }
  }
  constructor(private srv:ChartBoardMembersService) {
  }
  async loadData(entityId:any)
  {
    this.members = [];
    // @ts-ignore
    this.members = (await this.srv.getBoardMemebers(entityId))["items"];
  }
}
