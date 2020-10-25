package singispace.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import singispace.domain.Page;
import singispace.domain.Post;
import singispace.domain.Theme;
import singispace.repositories.MainFeedRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MainFeedService {

    @Autowired
    private MainFeedRepository mainFeedRepository;

    @Autowired
    private PagesService pagesService;

    @Autowired
    private PostService postService;

    @Autowired
    private ThemesService themesService;

    public void getNext10Posts(String id, Integer page_number) {
        List<Post> mainFeed = new ArrayList<>();
        Integer pagination;
        if(page_number == 1){
            pagination = 0;
        } else {
            pagination = (page_number * 10) - 1;
        }
        List<String> postIds;
        Optional<Post> post;

        List<Page> page_subs;
        page_subs = pagesService.getPageSubsForFeed(id);

        for (Page page_sub : page_subs) {
            postIds = page_sub.getFeed();
            for (int i = pagination; i < page_number * 10; i++) {
                post = postService.getById(postIds.get(i));
                mainFeed.add(post.get());
            }
        }

        List<Theme> theme_subs;
        theme_subs = themesService.getThemeSubsForFeed(id);

        for (Theme theme_sub : theme_subs) {
            postIds = theme_sub.getFeed();
            for (int i = pagination; i < page_number * 10; i++) {
                post = postService.getById(postIds.get(i));
                mainFeed.add(post.get());
            }
        }


        System.out.println(mainFeed);
    }
}
