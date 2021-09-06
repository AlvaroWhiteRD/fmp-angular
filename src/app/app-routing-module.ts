import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

const ROUTES: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch:'full' },
    {path:'inicio', component:DashboardComponent, children:[
        { path: '', component: DashboardComponent },
   
    ]}, 
   
    { path: '**', redirectTo: '/inicio', pathMatch:'full' },
   ];
   
   @NgModule({
     imports: [RouterModule.forRoot(ROUTES)],
     exports: [RouterModule],
   })
   
   
   
   export class AppRoutingModule { }