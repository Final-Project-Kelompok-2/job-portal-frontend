import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    PasswordModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule,
    OverlayModule,
    OverlayPanelModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    CardModule,
    TabViewModule,
    ToastModule

  ],
  exports: [
    InputTextModule,
    ButtonModule,
    TableModule,
    PasswordModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule,
    OverlayModule,
    OverlayPanelModule,
    AvatarGroupModule,
    AvatarModule,
    MenuModule,
    CardModule,
    TabViewModule,
    ToastModule
  ]
})
export class SharedModuleComponent {

}
