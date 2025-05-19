import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { FormComponent } from './pages/form/form.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "tables",
        component: TablesComponent
    },
    {
        path: "form",
        component: FormComponent
    }
];
