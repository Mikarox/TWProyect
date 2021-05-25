import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { LoginService } from './services/login.service';

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
    PrescriptsviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
