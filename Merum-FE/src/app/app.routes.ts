import { Routes } from '@angular/router';
import { AddWineFormComponent } from './components/wine/forms/add-wine-form/add-wine-form.component';
import { WineCardComponent } from './components/wine/card/wine-card.component';

export const routes: Routes = [
    {path: 'wines', 
        children: [
            {path: 'addWine', component: AddWineFormComponent},
            {path: 'getWineById/:id', component: WineCardComponent}
        ]
    }
];
