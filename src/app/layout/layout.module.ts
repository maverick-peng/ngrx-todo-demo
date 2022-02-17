import { NgModule } from "@angular/core";
import { AppRoutingModule } from "../app-routing.module";
import { ShareModule } from "../shared/share.module";

import { HeaderComponent } from "./components/header/header.component";
import { LayoutComponent } from "./components/layout/layout.component";

@NgModule({
  declarations: [ HeaderComponent, LayoutComponent ],
  imports: [ ShareModule, AppRoutingModule ],
  exports: [ LayoutComponent ]
}) export class LayoutModule {}
