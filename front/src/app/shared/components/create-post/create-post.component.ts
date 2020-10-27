import {Component, OnInit} from '@angular/core';
import {Post} from '../../../model/post';
import {Comment} from '../../../model/comment';
import {Like} from '../../../model/like';
import {NotificaitionService} from '../../../services/notificaition.service';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {ModalService} from '../../../_modal';
import {ImgService} from '../../../services/img.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

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
    private notify: NotificaitionService,
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private modal: ModalService,
    private imgService: ImgService,
  ) {
  }

  ngOnInit() {
  }

}
