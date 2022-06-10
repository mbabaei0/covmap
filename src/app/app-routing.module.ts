import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo:'report', pathMatch:'full'
  },
  {
    path: 'report', loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
