import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Sensor } from './model/sensor';
import { Luz } from './model/luz';



@Injectable({
  providedIn: 'root'
})
export class DomoticAppService {
  
  
  //private path = "http://localhost:3000";
  
  private path = "http://192.168.1.64:3000";

  constructor(private httpClient: HttpClient) { }
 
  public obtenerSensores() {
    return this.httpClient.get<Sensor[]>(this.path + "/sensores");   
  }
  
  public setIPserver(path: string) { 
    this.path = "http://" + path;
  }
  
  public obtenerLuces() {
    return this.httpClient.get<Luz[]>(this.path + "/luces"); 
  }
  
  public borrarLuz(luz: Luz) { 
    return this.httpClient.delete<Luz[]>(this.path + "/luces/" + luz.ID); 
   }

  public obtenerLuzPorID(id: string) { 
    return this.httpClient.get<Luz>(this.path + "/luces/" + id); 
  }

  public editarLuz(luz: Luz) { 
    return this.httpClient.put<Luz>(this.path + "/luces/" + luz.ID , luz); 
  }

  public agregarLuz(luz: Luz) { 
    return this.httpClient.post<Luz>(this.path + "/luces" , luz); 
  }

  public editarSensor(sensor: Sensor) {
    return this.httpClient.put<Sensor>(this.path + "/sensores/" + sensor.ID, sensor);
  }
}
