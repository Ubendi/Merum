import { Routes } from '@angular/router';
import { AddWineFormComponent } from './components/wine/forms/add-wine-form/add-wine-form.component';
import { WineCardComponent } from './components/wine/card/wine-card.component';
import { WineListComponent } from './components/wine/list/wine-list/wine-list.component';
import { WineDetailsComponent } from './components/wine/wine-details.component';

export const routes: Routes = [
    {path: 'borok', 
        children: [
            {path: '', component: WineListComponent},
            {path: 'addWine', component: AddWineFormComponent},
            {path: ':id', component: WineDetailsComponent}
        ]
    }
];
