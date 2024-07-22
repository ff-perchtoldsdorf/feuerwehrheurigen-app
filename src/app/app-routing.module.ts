import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './components/routes/default/default.component';
import { TemplateSelectComponent } from './components/screen/template-select/template-select.component';
import { GalleryTextComponent } from './components/screen/gallery-text/gallery-text.component';

import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full', title: 'Startseite' + environment.title },
      {
        path: 'esm',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'gallery' },
          { path: 'gallery', component: TemplateSelectComponent, pathMatch: 'full', title: 'Galerie' + environment.title },
          { path: 'gallery/:uuid', component: GalleryTextComponent, pathMatch: 'full', title: 'Text Hinzufügen' + environment.title },
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
