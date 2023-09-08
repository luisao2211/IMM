import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gomez Palacio';
  constructor(private titleService: Title) {
    this.titleService.setTitle('Nuevo Título de la Página'); // Cambia el título de la página
  }
}
