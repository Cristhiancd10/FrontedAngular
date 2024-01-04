import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';

import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
// import {MomentDateModule} from '@angular/material-moment-adapter';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddUserComponent } from './components/users/add-user/add-user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';

import {MatDividerModule} from '@angular/material/divider';

import { LoginComponent } from './components/users/login/login.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
import { msalConfig, loginRequest, protectedResources } from './auth-config';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { UsersService } from './services/users.service';
export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication(msalConfig);
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map < string,
        Array < string >> ();
   // protectedResourceMap.set(protectedResources.todoListApi.endpoint, protectedResources.todoListApi.scopes);
    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap
    };
}
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: loginRequest
    };
}

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    AddUserComponent,
    LoginComponent


  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDividerModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MsalModule,
    MatToolbarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        }, {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        }, {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        }, {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
        MsalGuard,
        MsalBroadcastService,
        UsersService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
