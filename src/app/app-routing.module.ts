import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormProjectComponent } from './form-project/form-project.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "template-driven",
    pathMatch: "full"
  },
  {
    path: "template-driven",
    component: TemplateDrivenComponent
  },
  {
    path: "reactive-form",
    component: ReactiveFormComponent
  },
  {
    path: "form-builder",
    component: FormBuilderComponent
  },
  {
    path: "form-project",
    component: FormProjectComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
