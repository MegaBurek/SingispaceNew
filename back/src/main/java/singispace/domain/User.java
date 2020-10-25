package singispace.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

@Document
public class User {

    @Id
    private String id;
    private String name;
    private String surname;
    private String username;
    private String password;
    private String email;
    private String imgUrl;
    private List<String> page_subs;
    private List<String> theme_subs;
    private List<String> friends;
    private boolean enabled;

    private Permission permission;


    public User() {
    }

    public User(String id, String name, String surname, String username, String password, String email, String imgUrl, List<String> page_subs, List<String> theme_subs, List<String> friends, boolean enabled, Permission permission) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.imgUrl = imgUrl;
        this.page_subs = page_subs;
        this.theme_subs = theme_subs;
        this.friends = friends;
        this.enabled = enabled;
        this.permission = permission;
    }

    public User(String name, String surname, String username, String password, String email, String imgUrl, List<String> page_subs, List<String> theme_subs, List<String> friends, Permission permission) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.email = email;
        this.imgUrl = imgUrl;
        this.page_subs = page_subs;
        this.theme_subs = theme_subs;
        this.friends = friends;
        this.permission = permission;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {
        this.permission = permission;
    }

    public List<String> getPage_subs() {
        return page_subs;
    }

    public void setPage_subs(List<String> page_subs) {
        this.page_subs = page_subs;
    }

    public List<String> getTheme_subs() {
        return theme_subs;
    }

    public void setTheme_subs(List<String> theme_subs) {
        this.theme_subs = theme_subs;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }
}
