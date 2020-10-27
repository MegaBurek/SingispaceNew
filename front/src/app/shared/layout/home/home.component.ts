import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../_modal';
import {Post} from '../../../model/post';
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedPost: Observable<Post>;

  post: Post = {
    id: null,
    title: '',
    owner: '',
    textContent: '',
    imgContent: '',
    comments: [],
    likes: []
  };

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  isAdminLogged() {
    return this.authService.isAdminLogged();
  }

  isTutorLogged() {
    return this.authService.isTutorLogged();
  }

  isStudentLogged() {
    return this.authService.isStudentLogged();
  }

  openPost(id: string) {
    this.modalService.open(id);
  }

  closePost(id: string) {
    this.modalService.close(id);
  }

}
