package singispace.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import singispace.domain.Page;
import singispace.domain.Theme;
import singispace.service.PagesService;
import singispace.service.ThemesService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/discovery")
public class DiscoveryController {

    @Autowired
    private ThemesService themesService;

    @Autowired
    private PagesService pagesService;

//    @GetMapping("/freshThemes")
//    public ResponseEntity<Iterable<Theme>> getFreshThemes() {
//        return new ResponseEntity<>(this.themesService.getTop5Themes(), HttpStatus.OK);
//    }

//    @GetMapping("/freshPages")
//    public ResponseEntity<Iterable<Page>> getFreshPages() {
//
//    }
}
