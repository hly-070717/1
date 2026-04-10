import { Routes } from '@angular/router';
import { HelpPageComponent } from './pages/help-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { InventoryPageComponent } from './pages/inventory-page.component';
import { PrivacyPageComponent } from './pages/privacy-page.component';
import { SearchPageComponent } from './pages/search-page.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
	{ path: 'home', component: HomePageComponent },
	{ path: 'inventory', component: InventoryPageComponent },
	{ path: 'search', component: SearchPageComponent },
	{ path: 'privacy-security', component: PrivacyPageComponent },
	{ path: 'help', component: HelpPageComponent },
	{ path: '**', redirectTo: 'home' }
];
