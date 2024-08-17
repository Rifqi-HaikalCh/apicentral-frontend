import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostmanSwaggerComponent } from './main-page/postman-swagger.component';

const routes: Routes = [
  { path: 'postman-swagger', component: PostmanSwaggerComponent },
  { path: '', redirectTo: '/postman-swagger', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
