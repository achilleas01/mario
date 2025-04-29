import { LevelOverview } from './../data/level-info';
import { Component, effect, ElementRef, inject, linkedSignal, signal, viewChild } from '@angular/core';
import { TilesMapLoader } from '../data/tiles-map.loader';
import { LevelLoader } from '../data/level.loader';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  private tilesMapLoader = inject(TilesMapLoader);
  private levelLoader = inject(LevelLoader);

  canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  //levelKey = signal<string | undefined>(this.getFirstLevelKey());
  levelKey = linkedSignal<string | undefined>(() => this.getFirstLevelKey());

  // get titles map resource
  titleMapLoaderResource = this.tilesMapLoader.getTilesMapResource();

  // get level resource overview
  levelOverviewResource = this.levelLoader.getLevelOverviewResource();

  
  levelResource = this.levelLoader.getLevelResource(this.levelKey);

  constructor() {

    // effect(() => {
    //   console.log('effect is called 1');
    //   this.initCanvas();
    // });

    // effect(() => {
    //   console.log('effect is called 2');
    //   this.render();
    // });

    // status 2 status code undefined => status 4 status code 200
    effect(() => {
      console.log('-----------------------------------------------');
      console.log('levelKey', this.levelKey());
      console.log('status', this.levelOverviewResource.status());
      console.log('statusCode', this.levelOverviewResource.statusCode());
      console.log('titles mapResource', this.titleMapLoaderResource.value());
      console.log('level overviewResource', this.levelOverviewResource.value());
      console.log('levelResource', this.levelResource.value());
      console.log('-----------------------------------------------');
    });
  }

  ngAfterViewInit() {
    // console.log('ngAfterViewInit');
    this.initCanvas();
  }

  private getFirstLevelKey(): string | undefined {
    // get first level key from level overview resource
    if (!this.levelOverviewResource) {
      return undefined;
    }
    return this.levelOverviewResource.value()?.levels?.[0]?.levelKey;
  }

  private initCanvas() {
    //console.log('initCanvas');
    const canvas = this.canvas()?.nativeElement;

    if (canvas) {
      const context = getContext(canvas);
      context.scale(3, 3);
      this.render();
    }
  }

  private render() {
    // console.log('rendering...');
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) {
      return;
    }
    const width = canvas.width;
    const height = canvas.height;
    const offset = 0;

    // console.log('rendering', width, height, offset);

    const context = getContext(canvas);
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, width, height);
  }
}


function getContext(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('2d context expected');
  }
  return context;
}