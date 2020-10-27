import {Component, OnInit} from '@angular/core';
import {NotificaitionService} from '../../services/notificaition.service';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {ModalService} from '../../_modal';
import {ImgService} from '../../services/img.service';
import {RegisterUser} from '../../store/user-store/user.actions';
import {User} from '../../model/user';
import {UserAccService} from '../../services/users/user-acc.service';

@Component({
  selector: 'app-create-tutor',
  templateUrl: './create-tutor.component.html',
  styleUrls: ['./create-tutor.component.scss']
})
export class CreateTutorComponent implements OnInit {
  rePassword = '';
  public imagePath;
  imageSrc: any;

  selectedFile: File;

  user: User = {
    id: null,
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    dob: null,
    imgUrl: '',
    page_subs: [],
    theme_subs: [],
    friends: [],
    provider: 'local',
    permission: {
      id: null,
      authority: 'ROLE_TUTOR'
    }
  };

  constructor(
    private notify: NotificaitionService,
    private store: Store,
    private router: Router,
    private modal: ModalService,
    private imgService: ImgService,
    private userAccService: UserAccService
  ) {
  }

  ngOnInit() {
  }

  openAccountCompletion(id) {
    this.modal.open(id);
  }

  checkIfEmpty() {
    if (this.user.name === '' || this.user.surname === '' || this.user.email === '' || this.user.dob === null) {
      return false;
    } else {
      return true;
    }
  }

  checkIfCompletionEmpty() {
    if (this.user.username === '' || this.user.password === '' || this.rePassword === '') {
      return false;
    } else {
      return true;
    }
  }

  tryRegister() {
    if (this.user.name === '') {
      this.notify.showError('Please enter a name', 'Notification');
    } else if (this.user.surname === '') {
      this.notify.showError('Please enter a surname', 'Notification');
    } else if (this.user.email === '') {
      this.notify.showError('Please enter your email', 'Notification');
    } else if (!this.validateEmail(this.user.email)) {
      this.notify.showError('Your email is not valid', 'Notification');
    } else if (this.user.dob === null) {
      this.notify.showError('Please enter your date of birth', 'Notification');
    } else if (this.user.username === '') {
      this.notify.showError('Please enter a username', 'Notification');
    } else if (this.user.password === '') {
      this.notify.showError('Please enter a password', 'Notification');
    } else if (this.rePassword === '') {
      this.notify.showError('Please re-enter your password', 'Notification');
    } else if (this.user.password !== this.rePassword) {
      this.notify.showError('Your passwords do not match', 'Notification');
    } else if (this.user.password.length < 6) {
      this.notify.showError('Your password has less than 6 characters', 'Notification');
    } else {
      const selectedFileName = this.selectedFile.name;
      const uniqueName = this.makeid(10) + selectedFileName;
      const blob = this.selectedFile.slice(0, this.selectedFile.size);
      const newFile = new File([blob], uniqueName);
      this.imgService.uploadProfile(newFile).subscribe(
        imgUrl => {
          this.user.imgUrl = imgUrl.toString();
          console.log(this.user.imgUrl);
          this.userAccService.registerTutor(this.user).subscribe(user => {
            console.log(user);
          });
          this.notify.showSuccess('You have successfully created a tutor', 'Notification');
        }, error => {
          console.log(error);
          this.selectedFile = undefined;
        }
      );
      this.selectedFile = undefined;
      this.router.navigate(['/dashboard']);
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

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(email);
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

}
