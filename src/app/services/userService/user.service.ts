import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Page} from '../../models/page.model';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {User} from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://reqres.in/api/users';
  headers: HttpHeaders = new HttpHeaders();

  userToUpdate = new BehaviorSubject<User>({user: {}} as User);

  constructor(private http: HttpClient) {
  }

  getAll(pageToDisplay?: Page<User>) {
    const params = this.addPaginationToParameters(pageToDisplay);
    return this.http.get(this.baseUrl + params);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + user.id, user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.baseUrl + userId);
  }

  getUser(userId: number) {
    return this.http.delete(this.baseUrl + userId);
  }

  addPaginationToParameters(pageToDisplay: Page<User>) {
    let parameters: any = {};
    let parametersString = '?';
    if (pageToDisplay != null) {
      parameters.page = pageToDisplay.pageIndex + 1;
      parameters.per_page = pageToDisplay.pageSize;
    }
    Object.keys(parameters).forEach((key) => {
      const value = parameters[key];
      if (value != undefined) {
        parametersString += key + '=' + value + '&';
      }
    });
    return parametersString
  }
}
