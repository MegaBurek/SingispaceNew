import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignInComponent} from './shared/components/sign-in/sign-in.component';
import {HomeComponent} from './shared/layout/home/home.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import { MyThemesComponent } from './shared/components/my-themes/my-themes.component';
import { MyPagesComponent} from './shared/components/my-pages/my-pages.component';
import {RegisterComponent} from './shared/components/register/register.component';
import {PageCreationComponent} from './shared/components/page-creation/page-creation.component';
import {ThemeCreationComponent} from './shared/components/theme-creation/theme-creation.component';
import {PageDetailComponent} from './shared/components/page-detail/page-detail.component';
import {ThemeDetailComponent} from './shared/components/theme-detail/theme-detail.component';
import {CustomPreloadingStrategy} from './custom-preload-route';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CreateTutorComponent} from './dashboard/create-tutor/create-tutor.component';
import {CreateAdminComponent} from './dashboard/create-admin/create-admin.component';
import {ManageUsersComponent} from './dashboard/manage-users/manage-users.component';
import {FlaggedContentComponent} from './dashboard/flagged-content/flagged-content.component';
import {DiscoveryPageComponent} from './shared/components/discovery-page/discovery-page.component';
import {CreatePostComponent} from './shared/components/create-post/create-post.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: SignInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, data: {preload: true}},
  {path: 'discovery', component: DiscoveryPageComponent, data: {preload: true}},
  {path: 'user/:username', component: UserProfileComponent, data: {preload: true}},
  {path: 'my-themes', component: MyThemesComponent, data: {preload: true}},
  {path: 'my-pages', component: MyPagesComponent, data: {preload: true}},
  {path: 'dashboard', component: DashboardComponent, data: {preload: true}},
  {path: 'create-tutor', component: CreateTutorComponent},
  {path: 'create-admin', component: CreateAdminComponent},
  {path: 'manage-users', component: ManageUsersComponent},
  {path: 'flagged-content', component: FlaggedContentComponent},
  {path: 'create-page', component: PageCreationComponent},
  {path: 'create-theme', component: ThemeCreationComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'page/:id', component: PageDetailComponent, data: {preload: true}},
  {path: 'theme/:id', component: ThemeDetailComponent, data: {preload: true}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule {
}
