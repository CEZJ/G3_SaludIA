import {Sintoma} from './sintoma';

export interface Enfermedad {
  id: number;
  idEnfermedad?: number; // Alias opcional

  nombre: string;
  descripcion: string;

  // CORRECCIÓN: Debe llamarse EXACTAMENTE como en tu DTO Java
  idsSintomas: number[];

  // Mantenemos esto por si el backend devuelve la entidad completa en el listado
  sintomas?: Sintoma[];
}
