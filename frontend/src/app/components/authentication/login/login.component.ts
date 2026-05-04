import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports: [
        Avatar,
        InputGroup,
        InputGroupAddon,
        FloatLabel,
        FormsModule,
        InputText,
    ],
    styleUrl: 'login.component.css',
})
export class Login {
    value = '';
}
