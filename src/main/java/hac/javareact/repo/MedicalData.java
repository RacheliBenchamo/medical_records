package hac.javareact.repo;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;

@Entity
public class MedicalData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "First name is mandatory")
    private String firstName;

    @NotEmpty(message = "Last name is mandatory")
    private String lastName;

    @NotEmpty(message = "Date of birth is mandatory")
    private String dateOfBirth;

    @NotEmpty(message = "Address is mandatory")
    private String address;

    @NotEmpty(message = "City is mandatory")
    private String city;

    private String zipCode;

    @NotEmpty(message = "Landline is mandatory")
    private String landline;

    @NotEmpty(message = "Cellphone is mandatory")
    private String cellphone;

    @NotNull(message = "Infected Before is mandatory")
    private Boolean infectedBefore;

    @ElementCollection
    private List<String> conditions; // Stores the selected conditions

    private String otherConditions; // Stores the "Other" conditions

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public boolean isInfectedBefore() {
        return infectedBefore;
    }

    public void setInfectedBefore(boolean infectedBefore) {
        this.infectedBefore = infectedBefore;
    }

    public List<String> getConditions() {
        return conditions;
    }

    public void setConditions(List<String> conditions) {
        this.conditions = conditions;
    }

    public String getOtherConditions() {
        return otherConditions;
    }

    public void setOtherConditions(String otherConditions) {
        this.otherConditions = otherConditions;
    }
}