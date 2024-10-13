package aretec.aretecproj.controller;

import aretec.aretecproj.dao.CheckReponseModel;
import aretec.aretecproj.model.dto.InfoDto;
import aretec.aretecproj.service.MockProductDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BarCodeController {

    private final MockProductDataService mockProductDataService;

    @Autowired
    public BarCodeController(MockProductDataService mockProductDataService) {
        this.mockProductDataService = mockProductDataService;
    }


    @PostMapping("/sendInfo")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CheckReponseModel> receiveJson(@RequestBody InfoDto barCode) {

        System.out.println("Received message: " + barCode.getMessage());


        CheckReponseModel response = mockProductDataService.getMockData();
        return ResponseEntity.ok(response);
    }
}
