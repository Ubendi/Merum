import { Routes } from '@angular/router';
import { AddWineFormComponent } from './components/forms/wine/add-wine-form/add-wine-form.component';

export const routes: Routes = [
    {path: 'wines', 
        children: [
            {path: 'addWine', component: AddWineFormComponent}
        ]
    }
];
