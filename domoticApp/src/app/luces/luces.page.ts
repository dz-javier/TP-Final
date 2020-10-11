import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DomoticAppService } from '../domotic-app.service';
import { Luz } from '../model/luz';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
})
export class LucesPage implements OnInit {
  private luces;
  constructor(private domoticService: DomoticAppService,
              private activatedRoute: ActivatedRoute,
              private loadingController: LoadingController,
              private alertController: AlertController) { }

  
  public async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
          let obs: any;
          obs = this.domoticService.obtenerLuces()
            .subscribe(datos => {
              this.luces = datos;
              loading.dismiss();
            });
      });
  }

  public async isLigthOn(luz: Luz){ 
    alert(luz.estado);
    return (luz.estado == "on");
  }
  
  public async turnLight(luz: Luz){ 
    alert(luz.estado);
    //return luz.estado == "on";
  }

  public async agregarLuz() {
    let luz: Luz = new Luz();
    luz.ubicacion = "Living";
    luz.IP = "192.168.00.125";
    luz.estado = "off";
    
    let alert = this.alertController.create({
      header: "Agregar luz",
      inputs: [
        {
          name: 'ubicacion',
          placeholder: 'Ubicación'
        },
        {
          name: 'IP',
          placeholder: 'IP',
        },
        {
          name: 'estado',
          placeholder: 'estado',
        }
      ],
      buttons: [
        {
          text: "OK",
          handler: data => {
            luz.ubicacion = data.ubicacion;
            luz.IP = data.IP;
            luz.estado = data.estado;
            this.domoticService.agregarLuz(luz).subscribe(
                response => {
                  this.domoticService.obtenerLuces();
               });
          } 
        },
        "Cancel"]
    });
    
    (await alert).present();
  
		
    

  }
}


