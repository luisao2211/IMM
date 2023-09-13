import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AuthenticationGuard } from './authentication.guard';
import { Module1RoutingModule } from './components/module1/module1-routing.module';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '/autenticacion/iniciosesion',
        pathMatch: 'full'
      },
      {
        path: 'autenticacion',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
   
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthenticationGuard],

    children: [
      {
        path: '',
        redirectTo: '/defecto',
        pathMatch: 'full'
      },
      {
        path: 'defecto',
        loadComponent: () => import('./demo/default/default.component')
      },
      {path: 'catalogos', loadChildren: () => import('./components/catalogues/catalogues.module').then((m) => m.CataloguesModule)},
      {path: 'modulo1', loadChildren: () => import('./components/module1/module1.module').then((m) => m.Module1Module)}

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
