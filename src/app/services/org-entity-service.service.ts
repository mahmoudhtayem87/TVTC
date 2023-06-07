import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare const Liferay : any
@Injectable({
  providedIn: 'root'
})
export class OrgEntityServiceService {
  constructor(private http:HttpClient) { }

  public async getMainEntity()
  {
    let prom = new Promise((resolve, reject)=>{
      this.http.get(`/o/c/organizationentities/?page=0&filter=r_parentBox_c_organizationEntityId%20eq%20%270%27&p_auth=${Liferay.authToken}`)
          .subscribe(result=>{
            resolve(result);
          },error => {
            resolve(error);
          })
    });
    return prom;
  }
  public async getEntitySubItems(parentId:number)
  {
    let prom = new Promise((resolve, reject)=>{
      this.http.get(`/o/c/organizationentities/?page=0&filter=r_parentBox_c_organizationEntityId%20eq%20%27${parentId}%27&p_auth=${Liferay.authToken}`)
          .subscribe(result=>{
            resolve(result);
          },error => {
            resolve(error);
          })
    });
    return prom;
  }

}
