import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomoticAppService } from '../domotic-app.service';
import { Sensor } from '../model/sensor'
@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
})
  
export class SensoresPage implements OnInit {
  private sensores: Array<Sensor> = [];
  private tamanio = 15;
  constructor(private domoticService: DomoticAppService,
              private activatedRoute: ActivatedRoute) {
    
               }

  public async ngOnInit() {
    this.domoticService.obtenerSensores().subscribe(datos => {
      console.log(datos);
      this.sensores = datos;
      this.tamanio = this.sensores.length;  
     });

  }

}
