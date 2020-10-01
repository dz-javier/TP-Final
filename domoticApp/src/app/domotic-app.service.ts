import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Sensor } from './model/sensor';
import { Luz } from './model/luz';



@Injectable({
  providedIn: 'root'
})
export class DomoticAppService {
  
  private path = "http://192.168.1.66:80";
  
  constructor(private httpClient: HttpClient) { }
 
  public obtenerSensores() {
    return this.httpClient.get<Sensor[]>(this.path + "/sensores"); 
     
 }
}
