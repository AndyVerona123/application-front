import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ClipboardModule} from 'ngx-clipboard';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {TableModule} from 'primeng/table';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyABUdJt7KP2RBsJSRrWR4nzlyMTepj9qhI'
    }),
    AgmDirectionModule,
    TableModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
