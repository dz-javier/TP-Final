import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomoticAppService } from '../domotic-app.service';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.page.html',
  styleUrls: ['./luces.page.scss'],
})
export class LucesPage implements OnInit {

  constructor(private domoticService: DomoticAppService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

}
