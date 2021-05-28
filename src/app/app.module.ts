import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './auth/interceptors/jwt.interceptor';
import {ErrorInterceptor} from './auth/interceptors/error.interceptor';
import {AuthState} from './auth/state/auth.state';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {NgxsModule} from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AboutComponent } from './about/about.component';
import {CategoriesState} from './forums/state/categories/categories.state';
import {QuestionsState, QuestionStateModel} from './forums/state/questions/questions.state';
import {RepliesState} from './forums/state/replies/replies.state';
import {environment} from '../environments/environment';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgbModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState, CategoriesState, QuestionsState, RepliesState]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
