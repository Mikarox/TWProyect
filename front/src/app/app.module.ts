import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//login
import { LoginComponent } from './componentes/login/login.component';
//navs
import { NavindexComponent } from './componentes/navs/navindex/navindex.component';
import { NavdocComponent } from './componentes/navs/navdoc/navdoc.component';
import { NavnurseComponent } from './componentes/navs/navnurse/navnurse.component';
import { NavusrComponent } from './componentes/navs/navusr/navusr.component';
//index
import { IndexComponent } from './index/index.component';
import { IndexdocComponent } from './index/indexdoc/indexdoc.component';
import { IndexusrComponent } from './index/indexusr/indexusr.component';
import { IndexnurseComponent } from './index/indexnurse/indexnurse.component';
//footer
import { FooterComponent } from './componentes/footer/footer.component';
//paginas enfermedades
import { DiseseslistComponent } from './componentes/pages/diseseslist/diseseslist.component';
import { DiseseseditComponent } from './componentes/pages/disesesedit/disesesedit.component';
import { DisesesaddComponent } from './componentes/pages/disesesadd/disesesadd.component';
import { DisesesrmComponent } from './componentes/pages/disesesrm/disesesrm.component';
//paginas usuario
import { UsrlistComponent } from './componentes/pages/usrlist/usrlist.component';
import { UsrviewComponent } from './componentes/pages/usrview/usrview.component';
import { UsreditComponent } from './componentes/pages/usredit/usredit.component';
import { UsrrmComponent } from './componentes/pages/usrrm/usrrm.component';
import { UsraddComponent } from './componentes/pages/usradd/usradd.component';
//paginas consultas
import { ConsulthistoryComponent } from './componentes/pages/consulthistory/consulthistory.component';
import { ConsultplayComponent } from './componentes/pages/consultplay/consultplay.component';
import { PrescriptsviewComponent } from './componentes/pages/prescriptsview/prescriptsview.component';
import { VerifyComponent } from './componentes/pages/verify/verify.component';
import { RegistroComponent } from './componentes/pages/registro/registro.component';
import { ForgotPassComponent } from './componentes/pages/forgot-pass/forgot-pass.component';
//Servicios
import { UsersService } from './services/users_service/users.service';
import { DiseasesService } from './services/diseases_service/diseases.service';
import { PatientsService } from './services/patients_service/patients.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavindexComponent,
    NavdocComponent,
    NavnurseComponent,
    IndexComponent,
    IndexdocComponent,
    IndexusrComponent,
    IndexnurseComponent,
    NavusrComponent,
    FooterComponent,
    DiseseslistComponent,
    DiseseseditComponent,
    DisesesaddComponent,
    DisesesrmComponent,
    UsrlistComponent,
    UsrviewComponent,
    UsreditComponent,
    UsrrmComponent,
    UsraddComponent,
    ConsulthistoryComponent,
    ConsultplayComponent,
    PrescriptsviewComponent,
    VerifyComponent,
    RegistroComponent,
    ForgotPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    UsersService,
    DiseasesService,
    PatientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
