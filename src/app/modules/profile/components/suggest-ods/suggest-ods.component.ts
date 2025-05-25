import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Ods } from '../../../../core/models/Ods';

@Component({
  selector: 'app-suggest-ods',
  templateUrl: './suggest-ods.component.html',
  styleUrls: ['./suggest-ods.component.scss']
})
export class SuggestOdsComponent implements OnInit {


  isLoading: boolean = false;
  selectOdsId = new Set<number>();
  @Output() odsSuggested = new EventEmitter<number[]>();
  @Input() suggestsOds: Ods[] = [];
  @Input() profile: any;
  hadSelectedAOds: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void { }

  // Method to find the ods for the company
  async getOdsForCompany(): Promise<void> {
    const desc = this.profile.description;
    if (!desc) { return; }

    this.isLoading = true;
    try {
      this.profileService.getOdsByDescription(desc).subscribe({
        next: (data) => {
          if (data.body) {
            this.suggestsOds = [];
            console.log("Esto es lo que me llega desde el back", data)
            console.log("Esto es lo que le envio al metodo", data.body)
            this.parseBodyRequestToOds(data.body)
            console.log("Ods sugeridas", this.suggestsOds)
          }
          this.isLoading = false
        },
        error: (err) => {
          console.log(err)
          this.isLoading = false
        }
      })
    } catch (err) {
      console.error(err);
    }
  }

  parseBodyRequestToOds(bodyRequest: any[]) {
    bodyRequest.forEach(item => {
      console.log("Entrando en el metodo para parsear las ods", item);

      const ods: Ods = {
        id: item.id,
        name: item.name,
        image: item.imageUrl
      };
      try {
        this.suggestsOds.push(ods);
      } catch (error) {
        console.error(error);
      }
    });
  }

  onChangeInput(event: Event) {
    const checkBox = event.target as HTMLInputElement;
    this.hasAnyOdsSelected(checkBox.checked)
    const id = parseInt(checkBox.value);
    this.toggleOds(id);
    console.log(typeof id, ":tipo de dato")
    console.log("Id de la ods", this.suggestsOds)


  }

  toggleOds(odsId: number): void {
    if (this.selectOdsId.has(odsId)) {
      this.selectOdsId.delete(odsId);
    } else {
      this.selectOdsId.add(odsId);
    }
  }

  onChangeAcceptButton(): void {
    console.log("ids de las ods enviadas al padre", this.selectOdsId)
    this.odsSuggested.emit([...this.selectOdsId])
  }


  onClick() {
    this.getOdsForCompany()
  }

  clearSuggetedOds() {
    this.suggestsOds = [];
  }

  hasAnyOdsSelected(checkInputValue: boolean): boolean {
    return this.hadSelectedAOds = checkInputValue;
  }
}

