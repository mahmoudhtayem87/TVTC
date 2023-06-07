import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {OrgEntityServiceService} from "../../services/org-entity-service.service";
import {AfterContentInit, ElementRef, Inject, NgZone, PLATFORM_ID, ViewChild, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import am4themes_animated from '@amcharts/amcharts5/themes/animated';
import * as am5map from '@amcharts/amcharts5/map';
import * as am4geodata_uae from '@amcharts/amcharts5-geodata/worldHigh';
import * as am5 from "@amcharts/amcharts5";
import {ChartBoardMembersComponent} from "../chart-board-members/chart-board-members.component";

declare const document : any;

@Component({
    selector: 'app-chart-main',
    templateUrl: './chart-main.component.html',
    styleUrls: ['./chart-main.component.css']
})
export class ChartMainComponent implements OnInit, AfterViewInit {

    public MainEntity: any;
    public entities = {};
    // @ts-ignore

    @ViewChild('chartdiv', {static: true})
    // @ts-ignore
    chartdiv: ElementRef<HTMLElement>;

    chartBoardMembers!: ElementRef;


    // @ts-ignore

    private currentPoints = {};
    private Country: string = "SA";
    private MapColor: string = "rgb(14,19,40)";
    private MapBorderColor: string = "#1524cb";
    @Input('height')
    public Height: string = "500px";
    private paddingX: number = 10;
    private paddingY = 10;
    private map!: am5map.MapChart;
    // @ts-ignore
    private root;
    private colors: any;
    private chart: any;
    private stateSeries: any;
    private uaeSeries: any;
    public points =
        {
            type: "FeatureCollection",
            features: []
        };
    private chartFacilityServices: any;

    constructor(private srv: OrgEntityServiceService, @Inject(PLATFORM_ID)
    private platformId: Object, private zone: NgZone, public elementRef: ElementRef) {

    }

    browserOnly(f: () => void) {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                f();
            });
        }
    }

    ngAfterViewInit() {
        this.chartBoardMembers = this.elementRef.nativeElement.querySelector('chart-board-members');
        console.log(this.chartBoardMembers);
        this.browserOnly(() => {
            this.root = am5.Root.new(this.chartdiv.nativeElement);
            this.colors = am5.ColorSet.new(this.root, {});
            this.root.setThemes([
                am4themes_animated.new(this.root)
            ]);
            this.chart = this.root.container.children.push(am5map.MapChart.new(this.root, {
                wheelY: "none",
                panX: "none",
                panY: "none",
                projection: am5map.geoMercator(),
                paddingTop: this.paddingY,
                paddingBottom: this.paddingY,
                paddingLeft: this.paddingX,
                paddingRight: this.paddingX,
                width: am5.p100
            }));
            this.uaeSeries = this.chart.series.push(am5map.MapPolygonSeries.new(this.root, {
                geoJSON: am4geodata_uae.default,
                showingTooltip: true,
                interactive: true,
                include: [this.Country]
            }));
            this.uaeSeries.mapPolygons.template.setAll({
                stroke: am5.color(this.MapBorderColor),
                strokeWidth: 2,
                fillOpacity: 0.5,
                fill: am5.color(this.MapColor)
            });
            // GeoJSON data

        });
        this.loadMainEntity();
    }

    async loadMainEntity() {
        this.MainEntity = await this.srv.getMainEntity();
        this.getPoints(this.MainEntity["items"], 0);
    }
    async loadSubEntities(parentId: any,entityName:string) {
        if (parentId in this.entities) {
            this.showMemebers("none","");
            this.showServices("none","")
            this.deleteEntity(parentId);
            return;
        } else {
            let subEntities = await this.srv.getEntitySubItems(parentId);
            // @ts-ignore
            this.getPoints(subEntities["items"], parentId);
            this.showMemebers(parentId,entityName);
            this.showServices(parentId,entityName);
        }
    }
    private deleteEntity(parentId: any) {
        try {
            // @ts-ignore
            let entityUID = this.entities[parentId];
            const mapSeries = this.chart.series;
            mapSeries.each((series: any) => {
                if (series.uid == entityUID) {
                    // @ts-ignore
                    delete this.entities[parentId];
                    series.dispose();
                }
            });
        }catch (exp)
        {
        }

    }
    getPoints(pnt: [] | any, parentId: any) {
        let points = {
            parentId: parentId,
            type: "FeatureCollection",
            features: []
        }
        for (let index = 0; index < pnt.length; index++) {
            var point = {
                "type": "Feature",
                "properties": {
                    "name": pnt[index]['title'],
                    "color": pnt[index]['color'],
                    "description": pnt[index]['description'],
                    "id": pnt[index]['id']
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [pnt[index]['locationLng'], pnt[index]['locationLat']]
                }
            };
            // @ts-ignore
            points.features.push(point);
        }

        var pointSeries = this.chart.series.push(
            am5map.MapPointSeries.new(this.root, {
                geoJSON: points,
                name: 'parentId_' + parentId
            })
        );
        // @ts-ignore
        this.entities[parentId] = pointSeries.uid;

        pointSeries.bullets.push((root: any, series: any, dataItem: any) => {

            var container = am5.Container.new(this.root, {
                // @ts-ignore
                tooltip: {
                    // @ts-ignore
                    active: false
                }
            });
            var label = container.children.push(
                am5.Label.new(this.root, {
                    text: dataItem.dataContext.name,
                    paddingTop: 10,
                    paddingBottom: 0,
                    rotation: 0,
                    textAlign: "center",
                    fontSize: "0.8rem"
                })
            );
            var circle = container.children.push(
                am5.Circle.new(this.root, {
                    radius: 4,
                    fill: am5.color(dataItem.dataContext.color),
                    strokeOpacity: 0,
                })
            );
            var circle2 = container.children.push(
                am5.Circle.new(root, {
                    radius: 4,
                    fill: am5.color(dataItem.dataContext.color),
                    strokeOpacity: 0
                })
            );
            circle.animate({
                key: "scale",
                from: 1,
                to: 5,
                duration: 1500,
                easing: am5.ease.out(am5.ease.linear),
                loops: Infinity
            });
            circle.animate({
                key: "opacity",
                from: 1,
                to: 0,
                duration: 1500,
                easing: am5.ease.out(am5.ease.linear),
                loops: Infinity
            });
            container.events.on("click", (ev: any) => {
                // @ts-ignore
                this.pointClick(dataItem.dataContext.id,dataItem.dataContext.name);
            });
            return am5.Bullet.new(root, {
                sprite: container
            });
        });

    }
    pointClick(entityId:any,entityName:string)
    {
        // @ts-ignore
        this.loadSubEntities(entityId,entityName);
    }
    ngOnInit(): void {
    }
    showMemebers(entityId:any,entityName:string) {
        // @ts-ignore
        this.chartBoardMembers = document.querySelector('chart-board-members');
        if (this.chartBoardMembers)
        {
            // @ts-ignore
            this.chartBoardMembers.setAttribute('entity-id',entityId);
            // @ts-ignore
            this.chartBoardMembers.setAttribute('entity-name',entityName);
        }else
        {
            console.log(`Chart Board Memebers Widget is not available on this page, no action will be taken!`);
        }

    }
    showServices(entityId:any,entityName:string) {
        // @ts-ignore
        this.chartFacilityServices = document.querySelector('chart-facility-services');
        if (this.chartFacilityServices)
        {
            // @ts-ignore
            this.chartFacilityServices.setAttribute('entity-id',entityId);
            // @ts-ignore
            this.chartFacilityServices.setAttribute('entity-name',entityName);
        }else
        {
            console.log(`Chart Facility Services Widget is not available on this page, no action will be taken!`);
        }

    }
}
