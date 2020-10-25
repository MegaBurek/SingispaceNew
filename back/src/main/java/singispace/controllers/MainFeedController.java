package singispace.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import singispace.domain.Post;
import singispace.service.MainFeedService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/mainFeed")
public class MainFeedController {

    @Autowired
    private MainFeedService mainFeedService;


    @GetMapping(value =  "/get10Posts/{id}")
    public ResponseEntity<String> getNext10Posts(@PathVariable String id){
        mainFeedService.getNext10Posts(id, 1);
        return new ResponseEntity<String>("good", HttpStatus.OK);
    }
}
