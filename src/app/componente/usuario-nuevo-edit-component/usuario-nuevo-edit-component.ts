import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {UsuarioService} from '../../services/usuario-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../model/usuario';
import {MatHint, MatFormField, MatLabel} from '@angular/material/form-field';
@Component({
  selector: 'app-proveedor-nuevo-edit-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatHint,//add
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule, // add
  ],
  templateUrl: './usuario-nuevo-edit-component.html',
  styleUrl: './usuario-nuevo-edit-component.css'
})
export class UsuarioNuevoEditComponent {
  usuarioForm: FormGroup;
  fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  router = inject(Router);
  edicion: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
      this.usuarioService.listId(this.id).subscribe(data => {
        console.log(data);
        this.usuarioForm.patchValue({
          idUsuario: data.idUsuario,
          nombre: data.nombre,
          fechaNacimiento: data.fechaNacimiento,
          correo: data.correo,
          password: data.password,
        });
      });
    }
  }
  onSubmit(){
    if(this.usuarioForm.valid){
      let usuario : Usuario = new Usuario();
      usuario = this.usuarioForm.value; //ojo resumen
      if(!this.edicion){
        console.log("Datos leidos del form:", usuario);
        this.usuarioService.insert(usuario).subscribe((data) => {
          console.log(data);
          console.log("Usuario registrado");
          this.router.navigate(['usuarios']);
        });
      }else{
        console.log("Datos leidos del form:", usuario);
        this.usuarioService.update(usuario).subscribe((data) => {
          console.log(data);
          console.log("Usuario Actualizado");
          this.router.navigate(['/usuarios']);
        })
      }
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
