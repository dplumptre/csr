import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Authservice } from "./services/authservice";
import { map, take } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class AuthGuardUser implements CanActivate {
  constructor(private authService: Authservice, private route: Router) {}

  /** We had to use the map operator in order to get the boolean
   * */
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.AuthUserData.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (user.rolesSlug == "user") {
          // switch (user.rolesSlug) {
          //   case "admin":
          //     return true;
          //     break;
          //   case "user":
          //     return this.route.createUrlTree(["/dashboard"]);
          //     break;
          //   default:
          //     return this.route.createUrlTree(["/dashboard"]);
          // }
          // return true;
          return this.route.createUrlTree(["/dashboard"]);
        }
        return true;
        //  return this.route.createUrlTree(["/"]);
      })
    );
  }
}
