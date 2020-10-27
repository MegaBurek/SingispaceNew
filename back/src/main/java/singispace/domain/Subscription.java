package singispace.domain;

public class Subscription {

    String userId;
    String socialGroupId;

    public Subscription(String userId, String socialGroupId) {
        this.userId = userId;
        this.socialGroupId = socialGroupId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSocialGroupId() {
        return socialGroupId;
    }

    public void setSocialGroupId(String socialGroupId) {
        this.socialGroupId = socialGroupId;
    }
}
