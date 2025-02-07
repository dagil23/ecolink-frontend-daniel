import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title='ecolink';

  ngOnInit(): void {
    AOS.init({
      duration: 1200, // Duración de las animaciones
      once: true      // Ejecutar solo una vez
    });
  }
}
