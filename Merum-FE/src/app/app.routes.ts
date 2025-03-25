import { Routes } from '@angular/router';
import { AddWineFormComponent } from './components/wine/forms/add-wine-form/add-wine-form.component';
import { WineListComponent } from './components/wine/wine-list/wine-list.component';
import { WineDetailsComponent } from './components/wine/wine-details.component';
import { EditWineFormComponent } from './components/wine/forms/edit-wine-form/edit-wine-form.component';
import { LocationListComponent } from './location/location-list/location-list.component';

export const routes: Routes = [
    {path: 'borok', 
        children: [
            {path: '', component: WineListComponent},
            {path: 'hozzaadas', component: AddWineFormComponent},
            {path: ':id', component: WineDetailsComponent},
            {path: 'szerkesztes', children: [
                {path: ':id', component: EditWineFormComponent}
            ]}
        ]
    },
    {path: 'teruletek',
        children: [
            {path: '',component: LocationListComponent}
        ]
    }
];
