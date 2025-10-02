import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contenido-principal',
  imports: [],
  templateUrl: './contenido-principal.component.html',
  styleUrl: './contenido-principal.component.scss'
})
export class ContenidoPrincipalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private img!: HTMLImageElement;
  private mouseX = -1000;
  private mouseY = -1000;
  private prevMouseX = -1000;
  private prevMouseY = -1000;
  private animationId?: number;
  private isMouseMoving = false;
  private mouseTimeout?: number;
  private imageData!: ImageData;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    // Configurar canvas para toda la pantalla
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Cargar imagen
    this.img = new Image();
    this.img.src = '/assets/images/17.jpg';
    this.img.onload = () => {
      this.drawBaseImage();
      this.animate();
    };
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;

    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    if (this.img && this.img.complete) {
      this.drawBaseImage();
    }
  }

  private drawBaseImage() {
    const canvas = this.canvasRef.nativeElement;

    // Calcular escala para cubrir el canvas manteniendo aspect ratio
    const imgRatio = this.img.width / this.img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      // Canvas es más ancho que la imagen
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      // Canvas es más alto que la imagen
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }

    this.ctx.drawImage(this.img, offsetX, offsetY, drawWidth, drawHeight);

    // Guardar imageData para manipulación
    this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;

    if (!this.isMouseMoving) {
      // Mostrar imagen normal
      this.ctx.putImageData(this.imageData, 0, 0);
    } else {
      // Aplicar efecto de distorsión RGB/glitch
      const tempImageData = new ImageData(
        new Uint8ClampedArray(this.imageData.data),
        canvas.width,
        canvas.height
      );

      // Calcular la velocidad del mouse
      const velocityX = this.mouseX - this.prevMouseX;
      const velocityY = this.mouseY - this.prevMouseY;
      const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

      // Área de influencia basada en la posición del mouse
      const influenceRadius = 200;
      const glitchIntensity = Math.min(velocity * 1.2, 60);

      // Aplicar distorsión en la zona del mouse
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const dx = x - this.mouseX;
          const dy = y - this.mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < influenceRadius) {
            const influence = 1 - (distance / influenceRadius);
            const offset = Math.floor(influence * glitchIntensity);

            const index = (y * canvas.width + x) * 4;

            // Desplazar canal rojo
            const redIndex = (y * canvas.width + Math.min(x + offset, canvas.width - 1)) * 4;
            tempImageData.data[index] = this.imageData.data[redIndex];

            // Mantener canal verde
            tempImageData.data[index + 1] = this.imageData.data[index + 1];

            // Desplazar canal azul en dirección opuesta
            const blueIndex = (y * canvas.width + Math.max(x - offset, 0)) * 4;
            tempImageData.data[index + 2] = this.imageData.data[blueIndex + 2];

            // Mantener alpha
            tempImageData.data[index + 3] = this.imageData.data[index + 3];
          }
        }
      }

      this.ctx.putImageData(tempImageData, 0, 0);

      // Actualizar posición anterior del mouse
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.isMouseMoving = true;

    // Resetear timeout para detener el efecto cuando el mouse se detiene
    if (this.mouseTimeout) {
      clearTimeout(this.mouseTimeout);
    }

    this.mouseTimeout = window.setTimeout(() => {
      this.isMouseMoving = false;
      this.mouseX = -1000;
      this.mouseY = -1000;
    }, 100);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.mouseTimeout) {
      clearTimeout(this.mouseTimeout);
    }
    window.removeEventListener('resize', () => this.resizeCanvas());
  }
}
