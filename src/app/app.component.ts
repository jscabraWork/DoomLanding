import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'DoomLanding';
}
