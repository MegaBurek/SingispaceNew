import {Component, OnInit} from '@angular/core';
import {Friend} from 'src/app/model/friend';
import {FriendsService} from 'src/app/services/friends/friends.service';
import {UserState} from '../../../store/user-store/user.state';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';

@Component({
  selector: 'friends-tab',
  templateUrl: './friends-tab.component.html',
  styleUrls: ['./friends-tab.component.scss']
})
export class FriendsTabComponent implements OnInit {

  userFriends = [
    {
      name: 'Test',
      surname: 'User',
      imgUrl: 'http://localhost:8080/images/profile_photos/Wu6Nr15LCVee090c04-93a5-46f3-b656-91cbfc18ea97.jpg',
      username: 'testUser'
    },
    {
      name: 'Alex',
      surname: 'Kovac',
      imgUrl: 'http://localhost:8080/images/profile_photos/TfYd4DUHXJ5bde04b9-a69a-4037-9eaa-b33d97003fb5.jpg',
      username: 'alex12'
    },
    {
      name: 'Luka',
      surname: 'Kontrec',
      imgUrl: 'http://localhost:8080/images/profile_photos/W7xLR6YbFdoriginal.png',
      username: 'tutor'
    }
  ];

  constructor(
    private friendService: FriendsService
  ) {
  }

  ngOnInit() {
  }


}
