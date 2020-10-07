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
  private bla;
  private tamanio = 15;
  private intervalTimer;

  constructor(private domoticService: DomoticAppService,
              private activatedRoute: ActivatedRoute,
              private loadingControler: LoadingController,
              private alertController: AlertController)
  {
    
  }
               

  public async ngOnInit() {
    const loading = await this.loadingControler.create();
    await loading.present();
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.bla = this.domoticService.obtenerSensores()
          .subscribe(datos => {
            this.sensores = datos;
            this.tamanio = this.sensores.length;
            loading.dismiss();
            
          });
      });
      
        
  }

  public actualizarDatos() { 
      
  }


}
