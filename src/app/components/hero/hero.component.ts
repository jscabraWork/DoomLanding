import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit() {
    const heroContainer = document.querySelector('.hero-container');
    if (!heroContainer) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.resetAndAnimate();
          } else {
            this.resetTitles(); // 👈 reinicia textos cuando sale de pantalla
          }
        });
      },
      { threshold: 0.3 }
    );

    this.observer.observe(heroContainer);
  }

  resetTitles() {
    const title1 = document.querySelector('#title-1') as HTMLElement;
    const title2 = document.querySelector('#title-2') as HTMLElement;

    if (title1) title1.innerHTML = 'This is a movement.';
    if (title2) title2.innerHTML = 'This is DOOM';
  }

  resetAndAnimate() {
    this.resetTitles();
    this.splitTextAnimation();
  }

  splitTextAnimation() {
    const title1 = document.querySelector('#title-1') as HTMLElement;
    const title2 = document.querySelector('#title-2') as HTMLElement;

    if (!title1 || !title2) return;

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

    gsap.fromTo(letters1,
      { opacity: 0, y: 100, rotationX: -90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)', delay: 0.8 }
    );

    gsap.fromTo(letters2,
      { opacity: 0, y: 100, rotationX: -90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.03, ease: 'back.out(1.7)', delay: 0.8 }
    );
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
