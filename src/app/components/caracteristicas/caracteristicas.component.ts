import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-caracteristicas',
  imports: [],
  templateUrl: './caracteristicas.component.html',
  styleUrl: './caracteristicas.component.scss'
})
export class CaracteristicasComponent implements AfterViewInit {
  @ViewChild('video1') video1!: ElementRef<HTMLVideoElement>;
  @ViewChild('video2') video2!: ElementRef<HTMLVideoElement>;

  activeVideo: number = 1;

  ngAfterViewInit() {
    this.video1.nativeElement.play();
  }

  setActiveVideo(videoNumber: number) {
    this.activeVideo = videoNumber;

    if (videoNumber === 1) {
      this.video1.nativeElement.play();
      this.video2.nativeElement.pause();
    } else {
      this.video2.nativeElement.play();
      this.video1.nativeElement.pause();
    }
  }
}
