import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LevelComponent } from './level/level.component';

export const routes: Routes = [
    { path: 'mygame', component: GameComponent },
    { path: 'supermario', component: LevelComponent}
];
