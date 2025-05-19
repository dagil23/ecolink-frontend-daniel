import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Match } from '../../../../core/models/Match';
import { MatchService } from '../../services/match.service';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { Pagination } from '../../../../core/models/Pagination';
import { ProfileService } from '../../../profile/services/profile.service';
import * as bootstrap from 'bootstrap'; // Importar Bootstrap para usar el toast
import { Router } from '@angular/router'; // Importar Router para la navegación

export interface Country {
  code?: string,
  name: string
}

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.scss'
})

export class MatchListComponent implements OnInit, AfterViewInit {

  // Añadir referencia al toast
  @ViewChild('matchToast') toastEl!: ElementRef;
  private toast: any;

  matchedUsers: Match[] = [];
  userProfile: any;
  currentPage = 0;
  totalPages = 0;
  pageSize = 8;
  loading = false;
  countryName: string = '';
  userType: String = '';
  listCountryOfUser = new Set<Country>();
  
  // Objeto para almacenar los filtros actuales
  currentFilters = {  country: '', order: '' }; // Orden descendente por defecto
  

  constructor(
    private matchService: MatchService, 
    private authService: AuthService, 
    private profileService: ProfileService,
    private router: Router  // Añadir Router para navegación
  ) { }

  ngOnInit(): void {
    try {
      this.getCompatibilities();
      this.getUserType();
      this.getUserProfile();
 
    } catch (error) {
      console.error(error)
    }
  }

  ngAfterViewInit(): void {
    // Inicializar el toast después de que la vista esté lista
    if (this.toastEl) {
      this.toast = new bootstrap.Toast(this.toastEl.nativeElement);
    }
  }

  // Método para mostrar el toast con un mensaje personalizado
  showToast(title: string = 'EcoMatch', message: string, delay: number = 3000): void {
    if (this.toast) {
      // Si quieres cambiar el título y mensaje dinámicamente
      const toastElement = this.toastEl.nativeElement;
      const titleEl = toastElement.querySelector('.toast-header strong');
      const messageEl = toastElement.querySelector('.toast-body');
      const timeEl = toastElement.querySelector('.toast-header small');
      
      if (titleEl) titleEl.textContent = title;
      if (messageEl) messageEl.textContent = message;
      if (timeEl) timeEl.textContent = 'Just now';
      
      // Configurar auto-ocultar después de 'delay' ms
      this.toast._config.autohide = true;
      this.toast._config.delay = delay;
      
      // Mostrar el toast
      this.toast.show();
    }
  }

  getCompatibilities(): void {
    this.loading = true;
    this.matchService.getCompability(this.currentFilters, this.currentPage, this.pageSize).subscribe(
      (matchedUser: Pagination<Match>) => {
        console.log("Estas son las compatibilidades", matchedUser);
        this.matchedUsers = matchedUser.content;
        this.totalPages = matchedUser.totalPages;

        // Procesar países y obtener imágenes
        this.matchedUsers.forEach(matchedUser => {
          this.countryName = matchedUser.location;
          this.addCountryNameToTheList(this.parseLocationToCountry(this.countryName));
          this.getImage(matchedUser);
          this.getImageOds(matchedUser);
        });
        this.loading = false;
        
        // Mostrar toast cuando se completa la carga de compatibilidades
        //this.showToast('EcoMatch', `Found ${this.matchedUsers.length} compatible matches`);
      },
      error => {
        console.error("Error, failed to load matches:", error);
        this.loading = false;
        
        // Mostrar toast de error
        //this.showToast('Error', 'Failed to load matches. Please try again.');
      }
    );
  }

  // Métodos existentes...
  getUserProfile() {
    this.profileService.getProfile().subscribe(user => {
      this.userProfile = user;
      // Mostrar toast si el perfil está incompleto (sin ODS)
      if (!this.userProfile?.userOdsList || this.userProfile?.userOdsList.length === 0) {
        this.showProfileToast();
      }
    })
  }

  parseLocationToCountry(countryName: string): Country {
    const country: Country = {
      name: countryName
    };
    return country;
  }

  addCountryNameToTheList(country: Country): void {
    if (country != null) {
      const exists = Array.from(this.listCountryOfUser).some(c => c.name === country.name);
      if (!exists) {
        this.listCountryOfUser.add(country);
      }
    }
  }

  getImage(matchedUser: Match): void {
    this.authService.getImage('user', matchedUser.imageUrl).subscribe((imageUrl: string) => {
      matchedUser.imageUrl = imageUrl;
    })
  }

  getImageOds(matchedUser: Match): void {
    matchedUser.odsList.forEach(ods => {
      this.authService.getImage('ods', ods.image).subscribe((imageUrl: string) => {
        ods.image = imageUrl;
      });
    });
  }

  getUserType(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.userType = user.userType.toLowerCase();
    })
  }

  changePage(page: number) {
    if (page < 0 || (this.totalPages > 0 && page >= this.totalPages)) {
      return; // No hacer nada si intentamos ir a una página inválida
    }
    this.currentPage = page;
    this.getCompatibilities();
  }

  // Método para manejar cambios en los filtros
  onFilterChange(filters: {country: string, order: string}): void {
    console.log('Filtros recibidos:', filters);
    this.currentFilters = filters;
    this.currentPage = 0; // Reinicia a la primera página al aplicar filtros
    this.getCompatibilities(); // Obtener datos con los nuevos filtros
 
  }
  
  // Método para eliminar un filtro específico
  removeFilter(filterName: string): {country: string, order: string} {
    const newFilters = {...this.currentFilters};
    newFilters[filterName as keyof typeof newFilters] = '';
    return newFilters;
  }
  
  // Método para resetear todos los filtros
  resetFilters(): void {
    this.currentFilters = {  country: '', order: '' };
    this.currentPage = 0;
    this.getCompatibilities();
  }

  // Método para navegar al perfil del usuario
  goToProfile(): void {
    this.router.navigate(['/profile/edit']);
  }

  // Método específico para mostrar el toast del perfil
  showProfileToast(): void {
    if (this.toast) {
      // Configurar el toast para que permanezca más tiempo visible
      this.toast._config.autohide = true;
      this.toast._config.delay = 8000; // 8 segundos
      
      // Mostrar el toast
      this.toast.show();
    }
  }
}
