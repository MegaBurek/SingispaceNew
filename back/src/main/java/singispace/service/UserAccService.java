package singispace.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import singispace.domain.*;
import singispace.dto.FriendDTO;
import singispace.dto.UserViewDTO;
import singispace.repositories.users.UserAccRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserAccService {

    @Autowired
    PermissionService permissionService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserAccRepository userAccRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Iterable<User> getAll() {
        return userAccRepository.findAll();
    }

    public Optional<User> getById(String id) {
        return userAccRepository.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userAccRepository.findByUsername(username);
    }

    public Optional<UserViewDTO> findUserViewByUsername(String username) {
        Optional<User> user = findByUsername(username);
        return Optional.of(convertToDto(user.get()));
    }

    public void addUser(User user) {
        userAccRepository.save(user);
    }

    public String updateUser(String id, User user){
        Optional<User> found_user = getById(id);
        String message = "";

        if(found_user.isPresent()){
            User opt_found_user = found_user.get();
            opt_found_user.setId(user.getId());
            opt_found_user.setName(user.getName());
            opt_found_user.setSurname(user.getSurname());
            opt_found_user.setEmail(user.getEmail());
            opt_found_user.setPage_subs(user.getPage_subs());
            opt_found_user.setTheme_subs(user.getTheme_subs());
            opt_found_user.setFriends(user.getFriends());
            userAccRepository.save(opt_found_user);
            message = "Updated";
        } else {
            message = "User Not Found";
        }
        return message;
    }

    public void removeUserAccData(String id) {
        Optional<User> user = userAccRepository.findById(id);
        userAccRepository.delete(user.get());
    }

    public void updateUserAccData(String id, User user) {

        Optional<User> a = userAccRepository.findById(id);

        if (a.isPresent()) {
            user.setId(a.get().getId());
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            userAccRepository.save(user);
        }

    }

    public HttpStatus addAdmin(User user) {

        Optional<User> accountData = userAccRepository.findByUsername(user.getUsername());
        if (accountData.isPresent()) {
            return HttpStatus.IM_USED;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            permissionService.addAdminPermission(user.getPermission());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }

    public HttpStatus addLearner(User user) {
        Optional<User> accountData = userAccRepository.findByUsername(user.getUsername());
        if (accountData.isPresent()) {
            return HttpStatus.IM_USED;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            permissionService.addLearnerPermission(user.getPermission());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }

    public HttpStatus addTutor(User user) {
        Optional<User> accountData = userAccRepository.findByUsername(user.getUsername());
        if (accountData.isPresent()) {
            return HttpStatus.IM_USED;
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            permissionService.addTutorPermission(user.getPermission());
            userAccRepository.save(user);
            return HttpStatus.CREATED;
        }
    }

    private UserViewDTO convertToDto(User user) {
        UserViewDTO userViewDTO = modelMapper.map(user, UserViewDTO.class);
        return userViewDTO;
    }


}
