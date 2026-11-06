import { CanActivate } from "@angular/router";
import { AuthService } from "../../../../services/generic/auth.service";
import { Router } from "@angular/router";
import { Injectable, inject } from "@angular/core";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    private authService = inject(AuthService);
    private router = inject(Router);

    canActivate(): boolean {
        if(this.authService.isLoggedIn()){
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}