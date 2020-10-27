package singispace.controllers.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import singispace.domain.User;
import singispace.dto.FriendDTO;
import singispace.dto.UserViewDTO;
import singispace.service.FriendsService;
import singispace.service.UserAccService;

import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    FriendsService friendsService;

    @Autowired
    UserAccService userAccService;

    @GetMapping(value = "/friends/{id}")
    public ResponseEntity<Iterable<FriendDTO>> getUserFriends(@PathVariable String id) {
        return new ResponseEntity<Iterable<FriendDTO>>(this.friendsService.getUsersFriends(id), HttpStatus.OK);
    }


    @GetMapping(value="/{username}")
    public ResponseEntity<UserViewDTO> findUserByUsername(@PathVariable String username) {
        Optional<UserViewDTO> accountData = userAccService.findUserViewByUsername(username);
        if(accountData.isPresent()) {
            return new ResponseEntity<UserViewDTO>(accountData.get(), HttpStatus.OK);
        }
        return new ResponseEntity<UserViewDTO>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value="/friend/{id}")
    public ResponseEntity<FriendDTO> findFriendById(@PathVariable String id) {
        Optional<FriendDTO> friend = friendsService.getFriendById(id);
        if(friend.isPresent()) {
            return new ResponseEntity<FriendDTO>(friend.get(), HttpStatus.OK);
        }
        return new ResponseEntity<FriendDTO>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value="update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User user){
        return new ResponseEntity<>(userAccService.updateUser(id, user), HttpStatus.OK);
    }
}
