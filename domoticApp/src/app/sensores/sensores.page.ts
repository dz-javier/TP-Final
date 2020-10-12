import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DomoticAppService } from '../domotic-app.service';
import { Sensor } from '../model/sensor'
@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
})
  
export class SensoresPage implements OnInit {
  private sensores;
  private tamanio = 0;
  private intervalTimer;

  constructor(private domoticService: DomoticAppService,
    private activatedRoute: ActivatedRoute,
    private loadingControler: LoadingController,
    private alertController: AlertController) {
    setInterval(() => {
      this.domoticService.obtenerSensores().subscribe(
        datos => {
          this.sensores = datos;
        });
    },3000);
  }
               

  public async ngOnInit() {
    const loading = await this.loadingControler.create();
    await loading.present();
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        let obs;
        obs = this.domoticService.obtenerSensores()
          .subscribe(datos => {
            this.sensores = datos;
            this.tamanio = this.sensores.length;
            loading.dismiss();
            
          });
      });
      
        
  }
  public isSensorOn(sensor: Sensor){ 
    //alert(luz.estado);
    return (sensor.estado == "on");
  }
  public async turnSensor(sensor: Sensor){ 
    if (sensor.estado == "on")
      sensor.estado = "off";
    else
      if (sensor.estado == "off")
          sensor.estado = "on";
    
         
    this.domoticService.editarSensor(sensor).subscribe(response => {
      this.domoticService.obtenerSensores()
    });
      
      
  }
  public trackByFunc(index, item) {
    return index;

  }

  public actualizarDatos() { 
      
  }


}
