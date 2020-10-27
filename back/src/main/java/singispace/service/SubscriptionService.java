package singispace.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import singispace.domain.Page;
import singispace.domain.Subscription;
import singispace.domain.Theme;
import singispace.domain.User;
import singispace.repositories.PagesRepository;
import singispace.repositories.ThemesRepository;

import java.util.Optional;

@Service
public class SubscriptionService {

    @Autowired
    private ThemesRepository themesRepository;

    @Autowired
    private ThemesService themesService;

    @Autowired
    private PagesRepository pagesRepository;

    @Autowired
    private PagesService pagesService;

    @Autowired
    private MongoTemplate mongoTemplate;

    public String subscribeToTheme(Subscription subscription) {
        Query query1 = new Query();
        Query query2 = new Query();
        String userId = subscription.getUserId();
        String themeId = subscription.getSocialGroupId();
        String message = "";

        Optional<Theme> a = themesService.getById(themeId);
        if (a.isPresent()) {
            query1.addCriteria(Criteria.where("id").is(themeId));
            mongoTemplate.updateFirst(query1, new Update().push("members", userId), Page.class);
            query2.addCriteria(Criteria.where("id").is(userId));
            mongoTemplate.updateFirst(query2, new Update().push("theme_subs", themeId), User.class);
            message = "Subscribed";
        } else {
            message = "Page Not Found";
        }
        return message;
    }

    public String unsubscribeFromTheme(Subscription subscription) {
        Query query1 = new Query();
        Query query2 = new Query();
        String userId = subscription.getUserId();
        String themeId = subscription.getSocialGroupId();
        String message = "";

        Optional<Theme> a = themesService.getById(themeId);
        if (a.isPresent()) {
            query1.addCriteria(Criteria.where("id").is(themeId));
            mongoTemplate.updateFirst(query1, new Update().pull("members", userId), Page.class);
            query2.addCriteria(Criteria.where("id").is(userId));
            mongoTemplate.updateFirst(query2, new Update().pull("theme_subs", themeId), User.class);
            message = "Unsubscribed";
        }else {
            message = "Page Not Found";
        }
        return message;
    }

    public String subscribeToPage(Subscription subscription) {
        Query query1 = new Query();
        Query query2 = new Query();
        String userId = subscription.getUserId();
        String pageId = subscription.getSocialGroupId();
        String message = "";

        Optional<Page> a = pagesService.getById(pageId);
        if (a.isPresent()) {
            query1.addCriteria(Criteria.where("id").is(pageId));
            mongoTemplate.updateFirst(query1, new Update().push("members", userId), Page.class);
            query2.addCriteria(Criteria.where("id").is(userId));
            mongoTemplate.updateFirst(query2, new Update().push("page_subs", pageId), User.class);
            message = "Subscribed";
        } else {
            message = "Page Not Found";
        }
        return message;
    }

    public String unsubscribeFromPage(Subscription subscription) {
        Query query1 = new Query();
        Query query2 = new Query();
        String userId = subscription.getUserId();
        String pageId = subscription.getSocialGroupId();
        String message = "";

        Optional<Page> a = pagesService.getById(pageId);
        if (a.isPresent()) {
            query1.addCriteria(Criteria.where("id").is(pageId));
            mongoTemplate.updateFirst(query1, new Update().pull("members", userId), Page.class);
            query2.addCriteria(Criteria.where("id").is(userId));
            mongoTemplate.updateFirst(query2, new Update().pull("page_subs", pageId), User.class);
            message = "Unsubscribed";
        }else {
            message = "Page Not Found";
        }
        return message;
    }

}
