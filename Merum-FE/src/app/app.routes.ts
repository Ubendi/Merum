import { Routes } from '@angular/router';
import { AddWineFormComponent } from './components/wine/forms/add-wine-form/add-wine-form.component';
import { WineListComponent } from './components/wine/wine-list/wine-list.component';
import { WineDetailsComponent } from './components/wine/wine-details.component';
import { EditWineFormComponent } from './components/wine/forms/edit-wine-form/edit-wine-form.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { LocationDetailsComponent } from './components/location/location-details.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
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
            {path: '',component: LocationListComponent},
            {path: ':id', component: LocationDetailsComponent}
        ]
    }
];
