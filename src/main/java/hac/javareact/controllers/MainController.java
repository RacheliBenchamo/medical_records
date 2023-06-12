package hac.javareact.controllers;
import hac.javareact.repo.MedicalData;
import hac.javareact.repo.MedicalDataRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class MainController {

    @Autowired
    private MedicalDataRepository repository; // this is the JPA repository (SQL database)

    @GetMapping("/medical-data")
    public List<MedicalData> getAllData() {
        return repository.findAll();
    }

    @PostMapping("/register")
    public ResponseEntity<?> addPurchase(@Valid @RequestBody MedicalData medicalData , BindingResult bindingResult) {
        if (bindingResult.hasErrors())
        {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        repository.save(medicalData);
        return ResponseEntity.ok(medicalData);
    }

}
