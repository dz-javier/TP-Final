import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DomoticAppService } from '../domotic-app.service';
import { Luz } from '../model/luz';

@Component({
  selector: 'app-edit-luz',
  templateUrl: './edit-luz.page.html',
  styleUrls: ['./edit-luz.page.scss'],
})
export class EditLuzPage implements OnInit {
  
  private luz: Luz = new Luz();
  
    
  constructor(private activatedRoute: ActivatedRoute,
              private loadingController: LoadingController,
              private domoticService: DomoticAppService,
              private alertController: AlertController) {
               
               }

  public async ngOnInit() {
    const loading = await this.loadingController.create();
    
    await loading.present();
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        let obs: any; // observable
        obs = this.domoticService.obtenerLuzPorID(paramMap.get("ID"))
          .subscribe(datos => {
            this.luz = datos;
            loading.dismiss();
          });
      });
  }
  
  public async borrarLuz(luz: Luz) {
    let alert = this.alertController.create({
      header: "Borrar Luz",
      subHeader : "¿Está seguro que desea borrar este elemento?",
      buttons: [
        {
          text: "Aceptar",
          handler: data => {
            this.domoticService.borrarLuz(luz).subscribe();
          } 
        },
        "Cancelar"]
    });
    
    (await alert).present();
    
    
  }
  public async editarLuz(luz: Luz) {
    const loading = await this.loadingController.create();
    await loading.present();
    this.domoticService.editarLuz(luz).subscribe(
      response => {
        this.luz = response;
         // this.activatedRoute.paramMap.subscribe(
        //   paramMap => {
            
        //     this.bla = this.domoticService.obtenerLuces()
        //       .subscribe(datos => {
        //         this.luces = datos;
        loading.dismiss();
           
              // });
        });
  }
   
 
}