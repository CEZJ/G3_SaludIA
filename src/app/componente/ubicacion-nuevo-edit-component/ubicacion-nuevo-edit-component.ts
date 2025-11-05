import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {UbicacionService} from '../../services/ubicacion-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Ubicacion} from '../../model/ubicacion';
import {MatHint, MatFormField, MatLabel} from '@angular/material/form-field';
import {Component, inject} from '@angular/core';
@Component({
  selector: 'app-ubicacion-nuevo-edit-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton,
    //MatHint,//add
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule, // add
  ],
  templateUrl: './ubicacion-nuevo-edit-component.html',
  styleUrl: './ubicacion-nuevo-edit-component.css',
})
export class UbicacionNuevoEditComponent {
  ubicacionForm: FormGroup;
  fb = inject(FormBuilder);
  private ubicacionService = inject(UbicacionService);
  router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.ubicacionForm = this.fb.group({
      idUbicacion: [''],
      distrito: ['', Validators.required],
      provincia: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      console.log("ID recibido:", this.id);
      this.edicion = data['id'] != null;
      this.cargaForm();
    });
  }

  cargaForm() {
    if (this.edicion) {
      this.ubicacionService.listId(this.id).subscribe(data => {
        console.log(data);
        this.ubicacionForm.patchValue({
          idUbicacion: data.idUbicacion,
          distrito: data.distrito,
          provincia: data.provincia,
          direccion: data.direccion,
        });
      });
    }
  }
  onSubmit(){
    if(this.ubicacionForm.valid){
      let ubicacion : Ubicacion = new Ubicacion();
      ubicacion = this.ubicacionForm.value; //ojo resumen
      if(!this.edicion){
        console.log("Datos leidos del form:", ubicacion);
        this.ubicacionService.insert(ubicacion).subscribe((data) => {
          console.log(data);
          console.log("Ubicacion registrada");
          this.router.navigate(['ubicaciones']);
        });
      }else{
        console.log("Datos leidos del form:", ubicacion);
        this.ubicacionService.update(ubicacion).subscribe((data) => {
          console.log(data);
          console.log("Ubicacion Actualizada");
          this.router.navigate(['/ubicaciones']);
        })
      }
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
