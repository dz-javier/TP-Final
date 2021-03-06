import { Component, OnInit } from '@angular/core';
import { Sensor } from '../model/sensor'
import { Luz } from '../model/luz'
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DomoticAppService } from '../domotic-app.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  private cantSensores;
  private sensores: Array<Sensor>;
  private luces: Array<Luz>;
  private cantLuces;
  
  constructor(private loadingControler: LoadingController,
              private activatedRoute: ActivatedRoute,
              private domoticService: DomoticAppService) {
  setInterval(() => { 
    this.domoticService.obtenerSensores().subscribe(
      datos => {
        this.sensores = datos;
        this.cantSensores = datos.length;
      });
      this.domoticService.obtenerLuces()
      .subscribe(datos => {
        this.luces = datos;
        this.luces.filter
        this.cantLuces = datos.length;
      });
      }, 3000); // actualizar cada 3 segundos
    
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
              this.cantSensores = datos.length;
              loading.dismiss();  
            
          });
        
      });
      await loading.present();
      this.activatedRoute.paramMap.subscribe(
        paramMap => {
          let obs;
          obs = this.domoticService.obtenerLuces()
            .subscribe(datos => {
              this.luces = datos;
              this.cantLuces = datos.length;
              loading.dismiss();
            });
        });
  

  }
  
  
}
