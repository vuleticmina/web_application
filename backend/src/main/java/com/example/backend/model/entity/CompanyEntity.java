package com.example.backend.model.entity;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "company", schema = "your_imagination_your_garden", catalog = "")
public class CompanyEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "company_id")
    private int companyId;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "services")
    private String services;
    @Basic
    @Column(name = "map_location")
    private String mapLocation;
    @Basic
    @Column(name = "contact_person")
    private String contactPerson;
    @Basic
    @Column(name = "vacations")
    private String vacations;

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    public String getMapLocation() {
        return mapLocation;
    }

    public void setMapLocation(String mapLocation) {
        this.mapLocation = mapLocation;
    }

    public String getContactPerson() {
        return contactPerson;
    }

    public void setContactPerson(String contactPerson) {
        this.contactPerson = contactPerson;
    }

    public String getVacations() {
        return vacations;
    }

    public void setVacations(String vacations) {
        this.vacations = vacations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CompanyEntity company = (CompanyEntity) o;
        return companyId == company.companyId && Objects.equals(name, company.name) && Objects.equals(address, company.address) && Objects.equals(services, company.services) && Objects.equals(mapLocation, company.mapLocation) && Objects.equals(contactPerson, company.contactPerson) && Objects.equals(vacations, company.vacations);
    }

    @Override
    public int hashCode() {
        return Objects.hash(companyId, name, address, services, mapLocation, contactPerson, vacations);
    }
}
