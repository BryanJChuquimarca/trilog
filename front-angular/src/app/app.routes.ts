import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        loadComponent: () => import('./components/inicio/inicio.component').then(m => m.InicioComponent)
    },
    {
        path: 'diario',
        loadComponent: () => import('./components/diario/diario.component').then(m => m.DiarioComponent)
    },
    {
        path: 'progreso',
        loadComponent: () => import('./components/progreso/progreso.component').then(m => m.ProgresoComponent)
    },
    {
        path: 'historial',
        loadComponent: () => import('./components/historial/historial.component').then(m => m.HistorialComponent)
    }
];
