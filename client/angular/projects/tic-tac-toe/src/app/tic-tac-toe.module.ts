import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { IAppConfig, AppConfig, ConfigLoader } from './app.config';
import { NicknameInterceptor } from './services/nickname.interceptor';
import { NicknameStoreService } from './services/nickname-store.service';
import { StoreModule, Store } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { CredentialsEffects } from './store/effects/credentials.effects';
import { EffectsModule } from '@ngrx/effects';
import { provideBootstrapEffects } from './store/effects/provider.effects';
import { TrainingEffects } from './store/effects/training.effects';
import { GameEffects } from './store/effects/game.effects';

@NgModule({
    declarations: [
        TicTacToeComponent,
        BoardComponent,
        CellComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot(appReducer)
    ],
    providers: [
        {
            provide: IAppConfig,
            useClass: AppConfig
        },
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [IAppConfig],
            multi: true
        },
        NicknameStoreService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NicknameInterceptor,
            deps: [NicknameStoreService],
            multi: true
        },
        provideBootstrapEffects([CredentialsEffects, TrainingEffects, GameEffects])
    ],
    bootstrap: [TicTacToeComponent]
})
export class TicTacToeModule {
}
