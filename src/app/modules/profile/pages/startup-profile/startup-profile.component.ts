import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { User } from '../../../../core/models/User';
import { AuthService } from '../../../../auth/services/AuthService.service';
import { Product } from '../../../startups/models/Product';

@Component({
  selector: 'startup-profile',
  templateUrl: './startup-profile.component.html',
  styleUrl: './startup-profile.component.scss'
})
export class StartupProfileComponent implements OnInit {
  activeTab: string = 'ods';
  startupProfile: any;
  Odslist: any = [];
  userType: string = '';
  AllOds: any [] = [];
  imageUrl: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';

  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getStartupProfile();
    this.getAllOds();
    this.getUserType();
    this.authService.getCurrentUser().subscribe((user: User) => {
      if (user?.imageUrl) {
        this.authService.getImage('user', user.imageUrl).subscribe((imageUrl: string) => {
          this.imageUrl = imageUrl;
        });
      }
    });
  }

  getUserType(): void {
    this.profileService.getCurrentUser().subscribe((user) => {
      this.userType = user.userType.toLowerCase();
      console.log("User type:", this.userType);
    })
  }

  getStartupProfile(): void {
    this.profileService.getProfile().subscribe(
      (profile) => {
        console.log('Perfil:', profile);
        this.startupProfile = profile;
        this.Odslist = this.getOds(this.startupProfile.userOdsList)
        this.startupProfile.products.forEach((product: Product) => {
          this.authService.getImage('product', product.imageUrl).subscribe((imageUrl: string) => {
            product.imageUrl = imageUrl;
          });
        });
      },
      (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    );
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
    console.log("User type", this.userType)


    this.profileService.updateOds(data, this.userType).subscribe(
      (response) => {
        console.log('ODS updated successfully:', response);

      },
      (error) => {
        console.error('Error updating ODS:', error.error);
      }
    );
    
  }
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
