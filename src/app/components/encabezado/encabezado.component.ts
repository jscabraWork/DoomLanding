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

      // Animaciones específicas por sección
      link.addEventListener('mouseenter', () => {
        const letters = link.querySelectorAll('.letter');

        if (linkText === 'shop') {
          // SHOP: Efecto flip - letras se voltean en el eje X como tarjetas de precio
          gsap.fromTo(letters,
            {
              rotationX: 0,
              opacity: 1
            },
            {
              rotationX: 360,
              opacity: 0.8,
              duration: 0.5,
              stagger: 0.04,
              ease: 'power2.inOut'
            }
          );
        } else if (linkText === 'contenido') {
          // CONTENIDO: Efecto wave - ondas de arriba a abajo
          gsap.fromTo(letters,
            {
              y: 0
            },
            {
              y: -10,
              duration: 0.4,
              stagger: 0.03,
              ease: 'power1.inOut',
              yoyo: true,
              repeat: 1
            }
          );
        } else if (linkText === 'galería') {
          // GALERÍA: Efecto scatter - letras se dispersan
          gsap.fromTo(letters,
            {
              x: 0,
              y: 0,
              rotation: 0
            },
            {
              x: () => Math.random() * 10 - 5,
              y: () => Math.random() * 10 - 5,
              rotation: () => Math.random() * 20 - 10,
              duration: 0.3,
              stagger: 0.02,
              ease: 'power2.out'
            }
          );
        } else if (linkText === 'características') {
          // CARACTERÍSTICAS: Efecto bounce - rebotan como elementos
          gsap.fromTo(letters,
            {
              y: 0,
              scale: 1
            },
            {
              y: -8,
              scale: 1.1,
              duration: 0.3,
              stagger: 0.03,
              ease: 'bounce.out'
            }
          );
        }
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
