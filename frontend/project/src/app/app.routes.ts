import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TablesComponent } from './components/tables/tables.component';
import { FormularioComponent } from './components/formulario/formulario.component';

export const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'tables', component: TablesComponent},
    {path: 'form', component: FormularioComponent}
];
