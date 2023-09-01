import { Component } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable} from "rxjs";

function getParams(activatedRoute: ActivatedRoute, parentLevel?: number): Observable<Params> {
  let route = activatedRoute
  if (parentLevel) {
    for (let i = 0; i < parentLevel; i++) {
      if (route.parent) {
        route = route.parent
      }
    }
  }
  return route.params
}
@Component({
  selector:'company-detail',
  templateUrl:'./company-detail.component.html',
  styleUrls:['./company-detail.component.css']
})
export class CompanyDetailComponent{

  

}
