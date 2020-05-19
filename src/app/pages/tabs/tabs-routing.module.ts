import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'scan',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../scan/scan.module').then(m => m.ScanPageModule)
          }
        ]
      },
      {
        path: 'recientes',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../recientes/recientes.module').then(m => m.RecientesPageModule)
          }
        ]
      },
      {
        path: 'inventario',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inventario/inventario.module').then(m => m.InventarioPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/scan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/scan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
