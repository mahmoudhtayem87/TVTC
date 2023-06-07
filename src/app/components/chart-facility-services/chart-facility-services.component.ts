import {Component, Input, SimpleChanges} from '@angular/core';
import {ChartFacilityServicesService} from "../../services/chart-facility-services.service";

@Component({
  selector: 'chart-facility-services',
  templateUrl: './chart-facility-services.component.html',
  styleUrls: ['./chart-facility-services.component.css']
})
export class ChartFacilityServicesComponent {
  services : [] = [];
  @Input('entityId')
  EntityId:string = "none";
  @Input('entityName')
  entityName:string = "";
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['EntityId']) {
      if (this.EntityId == "none")
      {
        this.services = [];
      }
      else
      {
        this.loadData(this.EntityId);
      }
    }
  }
  constructor(private srv:ChartFacilityServicesService) {
  }
  async loadData(entityId:any)
  {
    this.services = [];
    // @ts-ignore
    this.services = (await this.srv.getFacilityServices(entityId))["items"];
  }
}
