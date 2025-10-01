import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-pie-pagina',
  imports: [],
  templateUrl: './pie-pagina.component.html',
  styleUrl: './pie-pagina.component.scss'
})
export class PiePaginaComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    // Usar IntersectionObserver para detectar cuando el footer es visible
    const footer = document.querySelector('.footer');
    if (!footer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.splitTextAnimation();
            this.setupButtonHover();
            this.observer?.disconnect(); // Solo ejecutar una vez
          }
        });
      },
      { threshold: 0.05 } // Ejecutar cuando el 5% del footer sea visible
    );

    this.observer.observe(footer);
  }

  splitTextAnimation() {
    const title1 = document.querySelector('#title-1') as HTMLElement;
    const title2 = document.querySelector('#title-2') as HTMLElement;

    if (!title1 || !title2) return;

    // Dividir el texto en letras individuales
    const wrapLetters = (element: HTMLElement) => {
      const text = element.textContent || '';
      element.innerHTML = text
        .split('')
        .map(char => {
          if (char === ' ') return '<span style="display:inline-block;width:0.3em;"></span>';
          return `<span style="display:inline-block;opacity:0;">${char}</span>`;
        })
        .join('');
      return element.querySelectorAll('span');
    };

    const letters1 = wrapLetters(title1);
    const letters2 = wrapLetters(title2);

    // Animar las letras con split effect
    gsap.fromTo(letters1,
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)'
      }
    );

    gsap.fromTo(letters2,
      {
        opacity: 0,
        y: 100,
        rotationX: -90
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'back.out(1.7)',
        delay: 0.1
      }
    );

    // También animar el botón
    gsap.fromTo('.shop-tickets-btn',
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)'
      }
    );
  }

  setupButtonHover() {
    const button = document.querySelector('.shop-tickets-btn') as HTMLElement;
    if (!button) return;

    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -20;
      const rotateY = (x / rect.width) * 20;

      gsap.to(button, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
