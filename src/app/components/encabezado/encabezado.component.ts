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

  ngAfterViewInit() {
    this.setupLetterAnimations();
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

        if (linkText === 'gallery') {
          // GALLERY: Efecto carrusel - letras rotan como en un carrusel
          gsap.fromTo(letters,
            {
              rotationY: 0,
              opacity: 1
            },
            {
              rotationY: 360,
              opacity: 0.8,
              duration: 0.6,
              stagger: 0.05,
              ease: 'power2.inOut'
            }
          );
        } else if (linkText === 'shop') {
          // SHOP: Efecto de monedas cayendo - letras caen y rebotan
          gsap.fromTo(letters,
            {
              y: 0,
              rotation: 0,
              opacity: 1
            },
            {
              y: 15,
              rotation: 360,
              opacity: 0.8,
              duration: 0.5,
              stagger: 0.04,
              ease: 'bounce.out',
              yoyo: true,
              repeat: 1
            }
          );
        }
      });

      // Resetear al salir del hover
      link.addEventListener('mouseleave', () => {
        const letters = link.querySelectorAll('.letter');

        gsap.to(letters, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }
}
