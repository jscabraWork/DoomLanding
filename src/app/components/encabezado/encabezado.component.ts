import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-encabezado',
  imports: [CommonModule],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.scss'
})
export class EncabezadoComponent implements AfterViewInit {
  isMenuOpen = false;

  ngAfterViewInit() {
    this.setupLetterAnimations();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  scrollToSection(sectionId: string) {
    const section = document.querySelector(`app-${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  setupLetterAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      const text = link.textContent || '';
      const linkText = text.trim().toLowerCase();
      link.innerHTML = '';

      // Dividir el texto en letras individuales
      text.split('').forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? '\u00A0' : letter;
        span.classList.add('letter');
        span.style.display = 'inline-block';
        link.appendChild(span);
      });

      // Animación de rotación suave para todos los links
      link.addEventListener('mouseenter', () => {
        const letters = link.querySelectorAll('.letter');

        // Efecto de rotación suave en su sitio
        gsap.fromTo(letters,
          {
            rotation: 0
          },
          {
            rotation: 360,
            duration: 0.6,
            stagger: 0.04,
            ease: 'power2.inOut'
          }
        );
      });

      // Resetear al salir del hover
      link.addEventListener('mouseleave', () => {
        const letters = link.querySelectorAll('.letter');

        // Detener todas las animaciones en progreso antes de resetear
        gsap.killTweensOf(letters);

        gsap.to(letters, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          clearProps: 'all'
        });
      });
    });
  }
}
