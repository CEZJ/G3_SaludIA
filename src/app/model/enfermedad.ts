export interface Enfermedad {
  idEnfermedad?: number; // Clave primaria (puede ser undefined al crear)
  id?: number;           // Alias opcional por si el backend devuelve "id" genérico
  nombre: string;
  descripcion: string;
  // Relación ManyToMany: Array con los IDs de los síntomas seleccionados
  // Ejemplo: [1, 5, 10]
  sintomasIds: number[];
}
