import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

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
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private currentX: number = 0;
  private isDragging: boolean = false;

  ngAfterViewInit() {
    this.setupSwipeListeners();
    this.setupVideoListeners();

    // Intentar reproducir el primer video
    this.playVideo(this.video1.nativeElement);
  }

  private setupVideoListeners() {
    // Asegurar que los videos se mantengan en loop
    this.video1.nativeElement.addEventListener('ended', () => {
      if (this.activeVideo === 1) {
        this.video1.nativeElement.currentTime = 0;
        this.playVideo(this.video1.nativeElement);
      }
    });

    this.video2.nativeElement.addEventListener('ended', () => {
      if (this.activeVideo === 2) {
        this.video2.nativeElement.currentTime = 0;
        this.playVideo(this.video2.nativeElement);
      }
    });

    // Listener para cuando el video se pausa inesperadamente
    this.video1.nativeElement.addEventListener('pause', () => {
      if (this.activeVideo === 1 && !this.isDragging) {
        setTimeout(() => {
          if (this.activeVideo === 1) {
            this.playVideo(this.video1.nativeElement);
          }
        }, 100);
      }
    });

    this.video2.nativeElement.addEventListener('pause', () => {
      if (this.activeVideo === 2 && !this.isDragging) {
        setTimeout(() => {
          if (this.activeVideo === 2) {
            this.playVideo(this.video2.nativeElement);
          }
        }, 100);
      }
    });

    // Listener para cuando el documento se vuelve visible (cambio de tabs)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        if (this.activeVideo === 1) {
          this.playVideo(this.video1.nativeElement);
        } else {
          this.playVideo(this.video2.nativeElement);
        }
      }
    });
  }

  private playVideo(video: HTMLVideoElement) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }

  setActiveVideo(videoNumber: number) {
    this.activeVideo = videoNumber;

    if (videoNumber === 1) {
      this.video2.nativeElement.pause();
      this.video2.nativeElement.currentTime = 0;
      setTimeout(() => {
        this.playVideo(this.video1.nativeElement);
      }, 100);
    } else {
      this.video1.nativeElement.pause();
      this.video1.nativeElement.currentTime = 0;
      setTimeout(() => {
        this.playVideo(this.video2.nativeElement);
      }, 100);
    }
  }

  nextVideo() {
    if (this.activeVideo === 1) {
      this.setActiveVideo(2);
    }
  }

  prevVideo() {
    if (this.activeVideo === 2) {
      this.setActiveVideo(1);
    }
  }

  private setupSwipeListeners() {
    const videosCube = document.querySelector('.videos-cube') as HTMLElement;
    if (videosCube) {
      videosCube.addEventListener('touchstart', (e: any) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.currentX = 0;
        this.isDragging = true;
      });

      videosCube.addEventListener('touchmove', (e: any) => {
        if (this.isDragging) {
          this.currentX = e.changedTouches[0].screenX - this.touchStartX;
          const activeWrapper = videosCube.querySelector('.video-wrapper.active') as HTMLElement;
          if (activeWrapper) {
            activeWrapper.style.transform = `translateX(${this.currentX}px) rotateY(0deg)`;
          }
        }
      });

      videosCube.addEventListener('touchend', (e: any) => {
        this.isDragging = false;
        this.touchEndX = e.changedTouches[0].screenX;

        const activeWrapper = videosCube.querySelector('.video-wrapper.active') as HTMLElement;
        if (activeWrapper) {
          activeWrapper.style.transform = '';
        }

        this.handleSwipe();
      });
    }
  }

  private handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next video
        this.nextVideo();
      } else {
        // Swipe right - prev video
        this.prevVideo();
      }
    }
  }
}
