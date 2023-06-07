import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare const Liferay : any;

@Injectable({
  providedIn: 'root'
})
export class ChartBoardMembersService {

  public async getBoardMemebers(entityId:number)
  {
    let prom = new Promise((resolve, reject)=>{
      this.http.get(`/o/c/boardmembers/?filter=r_organizationEntity_c_organizationEntityId%20eq%20%27${entityId}%27&page=0&p_auth=${Liferay.authToken}`)
          .subscribe(result=>{
            resolve(result);
          },error => {
            resolve(error);
          })
    });
    return prom;
  }
  constructor(private http:HttpClient) { }
}
