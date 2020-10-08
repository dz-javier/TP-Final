import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DomoticAppService } from '../domotic-app.service';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
})
export class LucesPage implements OnInit {
  private luces;
  private bla;
  constructor(private domoticService: DomoticAppService,
              private activatedRoute: ActivatedRoute,
              private loadingControler: LoadingController,
              private alertController: AlertController) { }

  
  public async ngOnInit() {
    const loading = await this.loadingControler.create();
    await loading.present();
    this.activatedRoute.paramMap.subscribe(
        paramMap => {
          this.bla = this.domoticService.obtenerLuces()
            .subscribe(datos => {
              this.luces = datos;
              loading.dismiss();
            });
      });
        
          
    }
}


