import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/services/auth.guard';
import { ProfiloComponent } from './profilo/profilo.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CarteComponent } from './carte/carte.component';
import { PremiComponent } from './premi/premi.component';
import { BenvenutoComponent } from './benvenuto/benvenuto.component';

const routes: Routes = [
  { path: '', component: BenvenutoComponent },
  { path: 'home', component: BenvenutoComponent },
  { path: 'profilo', component: ProfiloComponent, canActivate:[AuthGuard] },
  { path: 'mainpage', component: MainpageComponent, canActivate:[AuthGuard] },
  { path: 'carte', component: CarteComponent, canActivate:[AuthGuard] },
  { path: 'premi', component: PremiComponent, canActivate:[AuthGuard] },

  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
