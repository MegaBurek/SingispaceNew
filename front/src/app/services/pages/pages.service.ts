import {Injectable} from '@angular/core';
import {Page} from '../../model/page';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {catchError, map} from 'rxjs/operators';
import {Post} from '../../model/post';
import {Theme} from '../../model/theme';
import {NotificaitionService} from '../notificaition.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private baseUrl = 'http://localhost:8080/pages';

  constructor(
    private http: HttpClient,
    private notify: NotificaitionService,
    private router: Router
  ) {
  }

  createPage(page) {
    return this.http.post<Page>(this.baseUrl + `/create`, page); // add id of page to user page subs
  }

  deletePageByID(id) {
    return this.http.delete<string>(this.baseUrl + `/${id}`);
  }

  editPage(id, page) {
    return this.http.put<Page>(this.baseUrl + `/${id}`, page);
  }

  getUserPageSubs(id) {
    return this.http.get<Page[]>(this.baseUrl + `/user-subscribed` + `/${id}`);
  }

  subscribe(uid, id) {
    return this.http.post(this.baseUrl + `/subscribe`, {userId: uid, socialGroupId: id}, {responseType: 'text'});
  }

  unsubscribe(uid, id) {
    return this.http.post(this.baseUrl + `/unsubscribe`, {userId: uid, socialGroupId: id}, {responseType: 'text'});
  }

  getPageByName(name) {
    return this.http.get<Page>(this.baseUrl + `/page` + `/${name}`);
  }

  getUserOwnedPages(id) {
    return this.http.get<Page[]>(this.baseUrl + `/owner` + `/${id}`);
  }

  getPageFeed(id) {
    return this.http.get<Post[]>(this.baseUrl + `/feed` + `/${id}`);
  }

  getPageByID(id) {
    return this.http.get<Page>(this.baseUrl + `/${id}`);
  }

}
