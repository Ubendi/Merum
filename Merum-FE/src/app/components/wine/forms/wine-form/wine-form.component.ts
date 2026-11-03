import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { WineFormViewModel } from '../../../../models/view-models';
import { LocationDTO, LocationsService } from '../../../../services/locations.service';
import { GrapeVarietiesService, GrapeVarietyDTO } from '../../../../services/grape-varieties.service';

@Component({
  selector: 'app-wine-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './wine-form.component.html',
  styleUrl: './wine-form.component.scss'
})
export class WineFormComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'edit';
  @Input() title: string = "Test";
  @Input() initialValue?: WineFormViewModel;

  wineFormSubmit = output<{ value: WineFormViewModel, file?: File}>();

  locations: LocationDTO[] = [];
  grapeVarieties: GrapeVarietyDTO[] = [];
  file?: File;

  constructor(
    private locationsService: LocationsService,
    private gvService: GrapeVarietiesService,
    private fb: FormBuilder
  ){}

  form = this.fb.group({
    name: this.fb.nonNullable.control<string>('AddWineTest', {validators: Validators.required}),
    year: this.fb.nonNullable.control<number>(2000, { validators: [Validators.required] }),
    description: this.fb.control<string | null>(null),
    locationEntityId: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    grapeVarietyEntityId: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    relativeDens: this.fb.control<number | null>(null),
    totalAlc: this.fb.control<number | null>(null),
    realAlc: this.fb.control<number | null>(null),
    totalExtract: this.fb.control<number | null>(null),
    totalAcid: this.fb.control<number | null>(null),
    volatileAcid: this.fb.control<number | null>(null),
    totalSDiox: this.fb.control<number | null>(null),
    freeSDiox: this.fb.control<number | null>(null),
    ph: this.fb.control<number | null>(null),
    totalSugar: this.fb.control<number | null>(null),
    sugarFreeExtract: this.fb.control<number | null>(null),
    titratableAcid: this.fb.control<number | null>(null),
    picturePath: this.fb.control<string | null>(null),
    quantity: this.fb.control<number | null>(null),
    archivedFlag: this.fb.nonNullable.control<boolean>(false)
  });

  ngOnInit(){
    this.loadGrapeVarieties();
    this.loadLocations();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['initialValue'] && this.initialValue){
      this.form.patchValue(this.initialValue);
    }
  }

  ngOnSubmit(){
    this.wineFormSubmit.emit({
      value: this.form.getRawValue(),
      file: this.file,
    });
  }

  onPictureSelected(event: any): void{
    this.file = event.target.files[0];
  }

  loadGrapeVarieties(){
    this.gvService.getAllGrapeVarieties().subscribe(data => 
      {
        this.grapeVarieties = data;
        if(!this.initialValue){
          this.form.patchValue({
            grapeVarietyEntityId: this.grapeVarieties[0]?.id ?? null
          })
        }
      })
  }

  loadLocations(){
    this.locationsService.getAllLocations().subscribe(data => 
      {
        this.locations = data;
        if(!this.initialValue){
          this.form.patchValue({
            locationEntityId: this.locations[0]?.id ?? null
          });
        }
      })
  }
}
