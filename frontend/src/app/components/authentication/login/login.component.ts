import {Component} from '@angular/core';
import {Avatar} from 'primeng/avatar';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    imports: [
        Avatar,
        InputGroup,
        InputGroupAddon,
        FloatLabel,
        InputMask
    ],
    styleUrl: 'login.component.css'
})
export class Login {

}
