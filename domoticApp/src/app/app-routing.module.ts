import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: "",
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      }
    ]
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'sensores',
    loadChildren: () => import('./sensores/sensores.module').then( m => m.SensoresPageModule)
  },
  {
    path: 'luces',
    children: [
      {
        path: "",
        loadChildren: () => import('./luces/luces.module').then( m => m.LucesPageModule)
      },
      {

        path: ":ID",
        loadChildren: () => import('./edit-luz/edit-luz.module').then(m => m.EditLuzPageModule)
      }
    ]
  },

  {
    path: 'edit-luz',
    loadChildren: () => import('./edit-luz/edit-luz.module').then( m => m.EditLuzPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
