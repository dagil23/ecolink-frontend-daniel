import { Component, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  // export class AboutUsComponent implements AfterViewInit {

  constructor() { }

  // npm install leaflet @types/leaflet
  // ngAfterViewInit(): void {
  //   this.initMap();
  // }

  // private initMap(): void {
  //   const map = L.map('map').setView([38.361895, -0.491099], 13);

  //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '© OpenStreetMap contributors'
  //   }).addTo(map);

  //   L.marker([38.361895, -0.491099]).addTo(map)
  //     .bindPopup('Our location<br> <a href="/index">Ecolink Office</a>')
  //     .openPopup();
  // }
}
