import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { ContenidoPrincipalComponent } from './components/contenido-principal/contenido-principal.component';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { PiePaginaComponent } from './components/pie-pagina/pie-pagina.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreloaderComponent, EncabezadoComponent, ContenidoPrincipalComponent, CaracteristicasComponent, GaleriaComponent, PiePaginaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'DoomLanding';
  private locomotiveScroll: any = null;

  async ngAfterViewInit() {
    // Desactivado temporalmente Locomotive Scroll
    // setTimeout(() => {
    //   this.initLocomotiveScroll();
    // }, 3500);
  }

  async initLocomotiveScroll() {
    // const LocomotiveScroll = (await import('locomotive-scroll')).default;

    // this.locomotiveScroll = new LocomotiveScroll({
    //   el: document.querySelector('[data-scroll-container]') as HTMLElement,
    //   smooth: true,
    //   multiplier: 1,
    //   class: 'is-inview',
    //   smartphone: {
    //     smooth: true
    //   },
    //   tablet: {
    //     smooth: true
    //   }
    // });

    // setTimeout(() => {
    //   if (this.locomotiveScroll) {
    //     this.locomotiveScroll.update();
    //   }
    // }, 500);
  }

  ngOnDestroy() {
    if (this.locomotiveScroll) {
      this.locomotiveScroll.destroy();
    }
  }
}
