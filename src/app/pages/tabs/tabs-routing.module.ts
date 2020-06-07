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
        path: 'inicio',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../inicio/inicio.module').then(m => m.InicioPageModule)
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
        path: 'usuarios',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../usuarios/usuarios.module').then(m => m.UsuariosPageModule)
          }
        ]
      },
      {
        path: 'pedidos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pedidos/pedidos.module').then(m => m.PedidosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
