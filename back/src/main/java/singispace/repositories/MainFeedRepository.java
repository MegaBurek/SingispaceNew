package singispace.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;
import singispace.domain.Post;

import java.util.List;

@Repository
public class MainFeedRepository implements MainFeedCustomRepository {

    private final MongoTemplate mongoTemplate;

    public MainFeedRepository(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Page<Post> get10Posts(Pageable pageable) {
        Query query = new Query();
        long count = this.mongoTemplate.count(query, Post.class);

        query.with(pageable);
        List<Post> posts = mongoTemplate.find(query, Post.class);
        return PageableExecutionUtils.getPage(posts, pageable, () -> count);
    }
}
