import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core'; // <-- importProvidersFrom
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // <-- 1. Añadir animaciones
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// 2. Importar los módulos de Material que usará tu app
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    // Quité provideBrowserGlobalErrorListeners() porque no estaba en tu original
    // y no es estrictamente necesario para esto.
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    // --- ¡AÑADIR ESTO PARA ANGULAR MATERIAL! ---
    provideAnimations(), // 3. Proveer animaciones

    // 4. Proveer los módulos de Material
    importProvidersFrom([
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSnackBarModule
    ])
    // ---------------------------------------------
  ]
};
