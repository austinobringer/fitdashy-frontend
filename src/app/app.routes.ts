import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ExerciseComponent } from './features/exercise/exercise.component';
import { DietComponent } from './features/diet/diet.component';
import { LoginComponent } from './core/components/auth/login/login.component';
import { AuthComponent } from './core/components/auth/auth.component';
import { RegisterComponent } from './core/components/auth/register/register.component';
import { MyDietComponent } from './features/diet/components/my-diet/my-diet.component';
import { MealsComponent } from './features/diet/components/meals/meals.component';
import { IngredientsComponent } from './features/diet/components/ingredients/ingredients.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: 'login', component: LoginComponent, title: 'FitDashy - Login' },
    { path: 'register', component: RegisterComponent, title: 'FitDashy - Register' },
    { path: '', redirectTo: 'login', pathMatch: 'prefix' }
  ]},
  { path: 'dashboard', component: DashboardComponent, title: 'FitDashy - Dashboard' },
  { path: 'diet', component: DietComponent, title: 'FitDashy - Diet', children: [
    { path: 'my-diet', component: MyDietComponent, title: 'FitDashy - My Diet' },
    { path: 'meals', component: MealsComponent, title: 'FitDashy - Meals' },
    { path: 'ingredients', component: IngredientsComponent, title: 'FitDashy - Ingredients' },
    { path: '', redirectTo: 'my-diet', pathMatch: 'prefix' }
  ]},
  { path: 'exercise', component: ExerciseComponent, title: 'FitDashy - Exercise' },
  { path: '', redirectTo: '/diet', pathMatch: 'full' },
  { path: '**', redirectTo: '/diet' }  // Catches all undefined/unmatched routes
];
