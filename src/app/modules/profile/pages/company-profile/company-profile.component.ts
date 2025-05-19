import { Component, OnInit, Signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';  // Importa el servicio
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';

@Component({
  selector: 'company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  activeTab: string = 'ods';
  Odslist: any[] = [];
  AllOds: any [] = [];
  userType: string = '';
  companyProfile: any;
  isLogged: boolean = false;
  imageUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getCompanyProfile();
    this.getUserType();
    this.getAllOds();
    this.authService.getCurrentUser().subscribe((user: User) => {
      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
        });
      }
    });
  }

  getCompanyProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        this.companyProfile = profile;
        console.log('Perfil de la empresa:', this.companyProfile);
        console.log('ODS de la empresa:', this.companyProfile.userOdsList);
        this.Odslist = this.getOds(this.companyProfile.userOdsList);

      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );

  }

  getUserType(): void {
    this.profileService.getCurrentUser().subscribe((user) => {
      this.userType = user.userType.toLowerCase();
      console.log("User type:", this.userType);
    })
  }

  getOds(userOdsList: any[]): any[] {
    userOdsList.forEach((ods: any) => {

      if(!ods.image.startsWith('http')){
        this.authService.getImage('ods', ods.image).subscribe((imageUrl: string) => {
          console.log("Nombre de la ods", ods.name, "nombre de la imagen", imageUrl)
          ods.image = imageUrl;
        })
      }
    });
    return userOdsList
  }

  getAllOds():void{
    this.profileService.getOds().subscribe((ods)=>{
      console.log("ODS todas", ods)
      this.AllOds.push(...ods)
    })
  }
  onOdsUpdated(newIdsSelected: number[]): void {
    const data = { odsIdList: newIdsSelected };
    let osdFilter = this.AllOds.filter((ods) => newIdsSelected.includes(ods.id));
    console.log("Ods filtradas", osdFilter)
    this.Odslist = this.getOds(osdFilter)
    console.log("User ods", this.Odslist)


    this.profileService.updateOds(data, this.userType).subscribe(
      (response) => {
        console.log('ODS updated successfully:', response);

      },
      (error) => {
        console.error('Error updating ODS:', error);
      }
    );
    
  }
  onOdsSuggested(suggestedOdsIds: number[]){
    const data = {odsIdList: suggestedOdsIds}
    
    // Actualizar la UI inmediatamente con las ODS seleccionadas
    let odsFilter = this.AllOds.filter((ods) => suggestedOdsIds.includes(ods.id));
    console.log("ODS sugeridas filtradas:", odsFilter);
    this.Odslist = this.getOds(odsFilter);
    
    // Actualizar en el backend
    this.profileService.updateOds(data, this.userType).subscribe(
      (response) => {
        console.log('ODS updated successfully:', response);
        
        // Actualizar el perfil de la compañía con las nuevas ODS
        this.companyProfile.userOdsList = [...odsFilter];
      },
      (error) => {
        console.log('Error updating ODS:', error);
        // Si hay error, volver a cargar para asegurar sincronización
        this.getCompanyProfile();
      }
    );
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

}
