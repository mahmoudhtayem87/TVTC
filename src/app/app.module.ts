import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {createCustomElement} from "@angular/elements";
import { ChartMainComponent } from './components/chart-main/chart-main.component';
import {ChartBoardMembersComponent} from "./components/chart-board-members/chart-board-members.component";
import { MemeberCardComponent } from './components/chart-board-members/memeber-card/memeber-card.component';
import { EmptyComponent } from './components/shared/empty/empty.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ChartFacilityServicesComponent } from './components/chart-facility-services/chart-facility-services.component';
import { FacilityServiceComponent } from './components/chart-facility-services/facility-service/facility-service.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartMainComponent,
    ChartBoardMembersComponent,
    MemeberCardComponent,
    EmptyComponent,
    ChartFacilityServicesComponent,
    FacilityServiceComponent
  ],
  imports:
      [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
  providers: [],
  bootstrap: []
})
export class AppModule {

  ngDoBootstrap() {}


  constructor(private injector: Injector) {
    const sample = createCustomElement(ChartMainComponent, {
      injector: this.injector
    });
    customElements.define("chart-window", sample);

    const ChartBoardMembers = createCustomElement(ChartBoardMembersComponent, {
      injector: this.injector
    });
    customElements.define("chart-board-members", ChartBoardMembers);

    const FacilityService = createCustomElement(ChartFacilityServicesComponent, {
      injector: this.injector
    });
    customElements.define("chart-facility-services", FacilityService);
  }

}
