import { Component } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { Password} from 'primeng/password';
import { Divider } from 'primeng/divider';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    standalone: true,
    imports: [
        Avatar,
        InputGroup,
        InputGroupAddon,
        FloatLabel,
        FormsModule,
        InputText,
        Password,
        Divider,
    ],
    styleUrl: 'login.component.css',
})
export class Login {
    protected email = '';
    protected password = '';

    onLogin(event: Event) {
        event.preventDefault();


    }

}
