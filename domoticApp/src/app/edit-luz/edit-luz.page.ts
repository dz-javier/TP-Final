import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
              private domoticService: DomoticAppService) {
                setInterval(() => { 
                 this.domoticService.obtenerLuzPorID(this.luz.ID)
                    .subscribe(datos => {
                      this.luz = datos;
                    });
                    }, 3000); // actualizar cada 3 segundos  
    
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
    const loading = await this.loadingController.create();
    await loading.present();
    this.domoticService.borrarLuz(luz).subscribe(
      response => { 
        delete this.luz;
        loading.dismiss();
      });
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