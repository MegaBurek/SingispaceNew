package singispace.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import singispace.domain.Post;

public interface MainFeedCustomRepository {

    Page<Post> get10Posts(Pageable pageable);
}
