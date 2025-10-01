import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-preloader',
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.scss'
})
export class PreloaderComponent implements OnInit, AfterViewInit {
  progress: number = 0;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.animatePreloader();
  }

  animatePreloader() {
    const timeline = gsap.timeline({
      onComplete: () => {
        // Ocultar el preloader después de la animación
        gsap.to('.preloader-container', {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            const preloader = document.querySelector('.preloader-container') as HTMLElement;
            if (preloader) {
              preloader.style.display = 'none';
            }
          }
        });
      }
    });

    // Animar la imagen de fondo - zoom suave continuo
    gsap.fromTo('.background-image',
      {
        scale: 1,
        filter: 'grayscale(100%) brightness(0.2)'
      },
      {
        scale: 1.1,
        filter: 'grayscale(100%) brightness(0.4)',
        duration: 3,
        ease: 'power1.inOut'
      }
    );

    // Animar el logo
    timeline.fromTo('.doom-logo',
      {
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Animar la barra de progreso
    timeline.to('.progress-fill', {
      width: '100%',
      duration: 2.5,
      ease: 'power2.inOut'
    }, '-=0.5'); // Empieza 0.5s antes de que termine la animación del logo

    // Pequeña pausa antes de desaparecer
    timeline.to({}, { duration: 0.5 });
  }
}
