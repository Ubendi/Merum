import { Routes } from '@angular/router';
import { AddWineFormComponent } from './components/wine/forms/add-wine-form/add-wine-form.component';
import { WineListComponent } from './components/wine/wine-list/wine-list.component';
import { WineDetailsComponent } from './components/wine/wine-details/wine-details.component';
import { EditWineFormComponent } from './components/wine/forms/edit-wine-form/edit-wine-form.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { LocationDetailsComponent } from './components/location/location-details/location-details.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/helper/auth/authguard/authguard';
import { EbikeHomeComponent } from './components/ebike/ebike-home/ebike-home.component';
import { GuesthouseHomeComponent } from './components/guesthouse/guesthouse-home/guesthouse-home.component';
import { SupportHomeComponent } from './components/support/support-home/support-home.component';
import { ContactHomeComponent } from './components/contact/contact-home/contact-home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'borok', 
        children: [
            {path: '', component: WineListComponent},
            {path: 'hozzaadas', component: AddWineFormComponent, canActivate: [AuthGuard]},
            {path: ':id', component: WineDetailsComponent},
            {path: 'szerkesztes', children: [
                {path: ':id', component: EditWineFormComponent, canActivate: [AuthGuard]}
            ]}
        ]
    },
    {path: 'teruletek',
        children: [
            {path: '',component: LocationListComponent},
            {path: ':id', component: LocationDetailsComponent}
        ]
    },
    {path: 'ebike', component: EbikeHomeComponent },
    {path: 'vendeghaz', component: GuesthouseHomeComponent},
    {path: 'tamogatas', component: SupportHomeComponent},
    {path: 'kapcsolat', component: ContactHomeComponent}
];
