package singispace.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import singispace.domain.Category;

import java.util.Optional;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findByName(String name);
}
