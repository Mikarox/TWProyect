import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavdocComponent } from './componentes/navs/navdoc/navdoc.component';
import { NavnurseComponent } from './componentes/navs/navnurse/navnurse.component';
import { NavusrComponent } from './componentes/navs/navusr/navusr.component';
import { IndexComponent } from './index/index.component';
import { IndexdocComponent } from './index/indexdoc/indexdoc.component';
import { IndexnurseComponent } from './index/indexnurse/indexnurse.component';
import { IndexusrComponent } from './index/indexusr/indexusr.component';
import { UsrlistComponent } from './componentes/pages/usrlist/usrlist.component';
import { ConsulthistoryComponent } from './componentes/pages/consulthistory/consulthistory.component';
import { PrescriptsviewComponent } from './componentes/pages/prescriptsview/prescriptsview.component';
import { ConsultplayComponent } from './componentes/pages/consultplay/consultplay.component';
import { UsrviewComponent } from './componentes/pages/usrview/usrview.component';
import { UsreditComponent } from './componentes/pages/usredit/usredit.component';
import { UsrrmComponent } from './componentes/pages/usrrm/usrrm.component';
import { DiseseslistComponent } from './componentes/pages/diseseslist/diseseslist.component';
import { DiseseseditComponent } from './componentes/pages/disesesedit/disesesedit.component';
import { DisesesaddComponent } from './componentes/pages/disesesadd/disesesadd.component';
import { DisesesrmComponent } from './componentes/pages/disesesrm/disesesrm.component';
import { UsraddComponent } from './componentes/pages/usradd/usradd.component';
import { UsraddwantsComponent } from './componentes/pages/usraddwants/usraddwants.component';
import { VerifyComponent } from './componentes/pages/verify/verify.component';
import { RegistroComponent } from './componentes/pages/registro/registro.component';
import { ForgotpassComponent } from './componentes/pages/forgotpass/forgotpass.component';


const routes: Routes = [
  {path: 'doc', component: NavdocComponent, 
    children: [
      {path: 'consulthistory', component: ConsulthistoryComponent},
      {path: 'prescriptview', component: PrescriptsviewComponent},
      {path: 'consultplay', component: ConsultplayComponent},
      {path: 'usrlist', component: UsrlistComponent},
      {path: 'usrview', component: UsrviewComponent},
      {path: 'usredit', component: UsreditComponent},
      {path: 'usrrm', component: UsrrmComponent},
      {path: 'diseaseslist', component: DiseseslistComponent},
      {path: 'diseasesedit', component: DiseseseditComponent},
      {path: 'diseasesadd', component: DisesesaddComponent},
      {path: 'diseasesrm', component: DisesesrmComponent},
      {path: '', redirectTo: '**', pathMatch: 'full' },
      {path: '**', component: IndexdocComponent}
    ]},
  {path: 'usr', component: NavusrComponent, 
    children: [
      {path: 'consulthistory', component: ConsulthistoryComponent},
      {path: 'prescriptview', component: PrescriptsviewComponent},
      {path: '', redirectTo: '**', pathMatch: 'full'},
      {path: '**', component: IndexusrComponent}
    ]},
  {path: 'nurse', component: NavnurseComponent, 
    children: [
      {path: 'usrlist', component: UsrlistComponent},
      {path: 'usrview', component: UsrviewComponent},
      {path: 'usredit', component: UsreditComponent},
      {path: 'usradd', component: UsraddComponent},
      {path: 'usraddwants/:patient', component: UsraddwantsComponent},
      {path: 'usrrm', component: UsrrmComponent},
      {path: 'diseaseslist', component: DiseseslistComponent},
      {path: '', redirectTo: '**', pathMatch: 'full' },
      {path: '**', component: IndexnurseComponent}
    ]},
  {path: 'registro', component: RegistroComponent},
  {path: 'forgotpass', component: ForgotpassComponent},
  {path: 'verify/:email', component: VerifyComponent},
  {path: 'diseaseslist', component: DiseseslistComponent},
  {path: '**', component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
