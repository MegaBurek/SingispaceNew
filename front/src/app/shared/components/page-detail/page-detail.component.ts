import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Theme} from '../../../model/theme';
import {Post} from '../../../model/post';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {ModalService} from '../../../_modal';
import {NotificaitionService} from '../../../services/notificaition.service';
import {PostsService} from '../../../services/posts/posts.service';
import {ImgService} from '../../../services/img.service';
import {AuthService} from '../../../services/auth/auth.service';
import {PagesService} from '../../../services/pages/pages.service';
import {Page} from '../../../model/page';
import {Friend} from '../../../model/friend';
import {FriendsService} from '../../../services/friends/friends.service';
import {GetUserPageSubs} from '../../../store/user-store/page.actions';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent implements OnInit {

  selectedPage: Observable<Page>;
  selectedPageFeed: Observable<Post[]>;
  owner: Friend;
  page: Page;
  subscribed: boolean;

  public imagePath;
  imageSrc: any;
  selectedFile: File;

  textPost = false;
  imagePost = false;
  createPostopen = false;

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
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private modalService: ModalService,
    private notify: NotificaitionService,
    private postsService: PostsService,
    private imgService: ImgService,
    private pagesService: PagesService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.selectedPage = this.pagesService.getPageByID(id);
    this.selectedPageFeed = this.pagesService.getPageFeed(id);
    this.selectedPage.subscribe((page) => {
      this.page = page;
      const uid = this.authService.getCurrentUserID();
      // @ts-ignore
      if (this.page.members.includes(uid)) {
        this.subscribed = true;
      }
    });
  }

  subscribeToPage(id) {
    const uid = this.authService.getCurrentUserID();
    this.pagesService.subscribe(uid, id).subscribe((response) => {
      this.subscribed = !this.subscribed;
      this.store.dispatch(new GetUserPageSubs(uid));
      this.notify.showSuccess(response, 'Notification');
    }, error => console.error(error));
  }

  unsubscribeFromPage(id) {
    const uid = this.authService.getCurrentUserID();
    this.pagesService.unsubscribe(uid, id).subscribe((response) => {
      this.subscribed = !this.subscribed;
      this.store.dispatch(new GetUserPageSubs(uid));
      this.notify.showSuccess(response, 'Notification');
      this.router.navigate(['/home']);
    }, error => console.error(error));
  }

  tryCreatePost() {
    if (this.post.title === '') {
      this.notify.showError('Please enter a title', 'Notification');
    } else if (this.post.title.length <= 4) {
      this.notify.showError('Please enter at least 4 characters', 'Notification');
    } else if (this.post.textContent === '') {
      this.notify.showError('Please enter some text content', 'Notification');
    } else if (this.post.textContent.length <= 10) {
      this.notify.showError('Please enter at least 10 characters', 'Notification');
    } else {
      this.post.owner = this.authService.getCurrentUserID();
      if (this.textPost === true) {
          this.postsService.createPagePost(this.page.id, this.post).subscribe(_ => {
            this.selectedPageFeed = this.pagesService.getPageFeed(this.page.name);
            this.closeCreatePage('custom-modal-1');
            this.textPost = false;
            this.createPostopen = false;
            this.notify.showSuccess('You have successfully created a post', 'Notification');
          }, error1 => {
            console.error(error1);
          });
      } else {
        const selectedFileName = this.selectedFile.name;
        const uniqueName = this.makeid(10) + selectedFileName;
        const blob = this.selectedFile.slice(0, this.selectedFile.size);
        const newFile = new File([blob], uniqueName);
        this.imgService.uploadPagePhoto(newFile).subscribe((downloadUrl) => {
          this.post.imgContent = downloadUrl;
          this.postsService.createPagePost(this.page.id, this.post).subscribe(_ => {
              this.selectedPageFeed = this.pagesService.getPageFeed(this.page.id);
              this.closeCreatePage('custom-modal-1');
              this.imagePost = false;
              this.createPostopen = false;
              this.notify.showSuccess('You have successfully created a post', 'Notification');
            }, error1 => {
              console.error(error1);
            });
        }, error2 => {
          console.error(error2);
        });
      }

    }
  }

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  openCreatePage(id: string) {
    this.modalService.open(id);
  }

  closeCreatePage(id: string) {
    this.modalService.close(id);
  }

  openPost(id: string) {
    this.modalService.open(id);
  }

  closePost(id: string) {
    this.modalService.close(id);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.notify.showError('Only images are supported', 'Notification');
      return;
    }

    this.selectedFile = files[0];

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imageSrc = reader.result;
    };
  }

  openCreateTextPost() {
    this.textPost = true;
    this.createPostopen = true;
  }

  openCreateImagePost() {
    this.imagePost = true;
    this.createPostopen = true;
  }
}
