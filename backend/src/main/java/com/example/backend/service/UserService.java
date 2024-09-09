package com.example.backend.service;

import com.example.backend.exception.*;
import com.example.backend.model.entity.ArrangingEntity;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.model.enums.UserRegistrationStatus;
import com.example.backend.model.enums.UserType;
import com.example.backend.repository.ArrangingRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.LoginRequest;
import com.example.backend.request.UserRequest;
import com.example.backend.request.UpdatePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import javax.management.relation.Role;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArrangingRepository arrangingRepository;


    public UserEntity login(LoginRequest loginRequest) throws InactiveUserException, UserNotFoundException, IncorrectPasswordException, BlockedDecoratorException {
        UserEntity user =  userRepository.findByUsernameEquals(loginRequest.getUsername());
        if(user == null){
            throw new UserNotFoundException();
        }
        if(Objects.equals(user.getRole(), UserType.DECORATOR.toString()) && (Objects.equals(user.getRegistrationStatus(), UserRegistrationStatus.INACTIVE.toString()) || this.isBlocked(user.getUserId()))){
            throw new BlockedDecoratorException();
        }
        if(!Objects.equals(user.getRegistrationStatus(), UserRegistrationStatus.APPROVED.toString())){
            throw new InactiveUserException();
        }
        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return user;
        }
        else {
            throw new IncorrectPasswordException();
        }
    }

    public UserEntity loginAdmin(LoginRequest loginRequest) throws NotAuthorizedAccessException, UserNotFoundException, IncorrectPasswordException {
        UserEntity user =  userRepository.findByUsernameEquals(loginRequest.getUsername());
        if(user == null){
            throw new UserNotFoundException();
        }
        if(!user.getRole().equals(UserType.ADMIN.toString())){
            throw new NotAuthorizedAccessException();
        }
        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new IncorrectPasswordException();
        }
        return user;
    }

    private boolean checkUsernameAvailability(String username){
        UserEntity user =  userRepository.findByUsernameEquals(username);
        return user == null;
    }

    private boolean checkEmailAvailability(String email){
        UserEntity user = userRepository.findByEmailEquals(email);
        return user == null;
    }
    public void register(UserRequest userRequest) throws UsernameAlreadyExistsException, EmailAlreadyExistsException, RegisterUserException {
        String username = userRequest.getUsername();
        if (!this.checkUsernameAvailability(username)) {
            throw new UsernameAlreadyExistsException();
        }
        String email = userRequest.getEmail();
        if (!this.checkEmailAvailability(email)) {
            throw new EmailAlreadyExistsException();
        }

        UserEntity user = new UserEntity();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setGender(userRequest.getGender());
        user.setAddress(userRequest.getAddress());
        user.setPhone(userRequest.getPhone());
        user.setEmail(userRequest.getEmail());
        user.setCreditCardNumber(userRequest.getCreditCardNumber());
        user.setRegistrationStatus(UserRegistrationStatus.PENDING.toString());
        user.setRole(UserType.OWNER.toString());
        try {
            user.setProfilePicture(userRequest.getProfilePicture().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            userRepository.save(user);
        } catch (Exception e) {
            throw new RegisterUserException();
        }

    }

    public void updatePassword(UpdatePasswordRequest updatePasswordRequest) throws UserNotFoundException, IncorrectPasswordException{
        UserEntity user = userRepository.findByUsernameEquals(updatePasswordRequest.getUsername());
        if(user == null){
            throw new UserNotFoundException();
        }
        if(!passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())){
            throw new IncorrectPasswordException();
        }
        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        this.userRepository.save(user);
    }

    public Long getOwnerCount(){
        return this.userRepository.countAllByRoleEquals(UserType.OWNER.toString());
    }

    public Long getDecoratorCount(){
        return this.userRepository.countAllByRoleEquals(UserType.DECORATOR.toString());
    }

    /*public HomeSummaryResponse getSummary(){
        long totalRestaurants = restaurantRepository.count();
        long totalGuests = userRepository.findAllByRegistrationStatusEqualsAndRoleEquals(UserRegistrationStatus.APPROVED.toString(), UserType.GUEST.toString()).size();
        long reservationsLast24Hours = 0;//reservationRepository.countByCreatedAtAfter(LocalDateTime.now().minusDays(1));
        long reservationsLast7Days = 0;//reservationRepository.countByCreatedAtAfter(LocalDateTime.now().minusDays(7));
        long reservationsLast30Days =0;//reservationRepository.countByCreatedAtAfter(LocalDateTime.now().minusDays(30));

        return new HomeSummaryResponse(totalRestaurants, totalGuests, reservationsLast24Hours, reservationsLast7Days, reservationsLast30Days);
    }*/

    /*public List<RestaurantDto> getRestaurantsWithWaiters(String name, String address, String type, String sortBy, String order){
        Specification<RestaurantsEntity> spec = Specification.where(null);

        if (name != null && !name.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("name"), "%" + name + "%"));
        }
        if (address != null && !address.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("address"), "%" + address + "%"));
        }
        if (type != null && !type.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("type"), "%" + type + "%"));
        }

        Sort sort = Sort.by(Sort.Direction.ASC, "name");
        if (sortBy != null && order != null) {
            Sort.Direction direction = "asc".equals(order) ? Sort.Direction.ASC : Sort.Direction.DESC;
            sort = Sort.by(direction, sortBy);
        }

        List<RestaurantsEntity> restaurants = restaurantRepository.findAll(spec, sort);

        List<RestaurantDto> result = new ArrayList<>();
        for(RestaurantsEntity restaurant: restaurants){
            List<WaiterAssignmentsEntity> waiterAssignments = waiterAssignmentsRepository.findAllByRestaurantId(restaurant.getRestaurantId());

            List<WaiterDto> waiters = new ArrayList<WaiterDto>();
            for(WaiterAssignmentsEntity assignment: waiterAssignments){
                Optional<UserEntity> optionalWaiter = userRepository.findById(assignment.getUserId());
                if(optionalWaiter.isPresent()){
                    UserEntity existedWaiter = optionalWaiter.get();
                    waiters.add(new WaiterDto(
                            existedWaiter.getFirstName(),
                            existedWaiter.getLastName()));
                }
            }
            result.add(new RestaurantDto(restaurant.getRestaurantId(), restaurant.getName(), restaurant.getAddress(),  restaurant.getType(), waiters));
        }

        return result;
    }*/

    public UserEntity updateUser(UserRequest user){
        UserEntity userOld = userRepository.findByUsernameEquals(user.getUsername());
        if(userOld != null){
            userOld.setFirstName(user.getFirstName());
            userOld.setLastName(user.getLastName());
            userOld.setGender(user.getGender());
            userOld.setAddress(user.getAddress());
            userOld.setPhone(user.getPhone());
            userOld.setEmail(user.getEmail());
            userOld.setCreditCardNumber(user.getCreditCardNumber());

            try {
                userOld.setProfilePicture(user.getProfilePicture().getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            userRepository.save(userOld);
            return userOld;
        }
        return null;
    }

    public List<UserEntity> getRegistrationRequests(){
        return userRepository.findAllByRegistrationStatusEquals("PENDING");
    }

    public void acceptRegistrationRequest(String username){
        UserEntity user = userRepository.findByUsernameEquals(username);
        user.setRegistrationStatus(UserRegistrationStatus.APPROVED.toString());
        userRepository.save(user);
    }

    public void rejectRegistrationRequest(String username){
        UserEntity user = userRepository.findByUsernameEquals(username);
        user.setRegistrationStatus(UserRegistrationStatus.REJECTED.toString());
        userRepository.save(user);
    }

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    public void deactivateUser(String username){
        UserEntity user = userRepository.findByUsernameEquals(username);
        user.setRegistrationStatus(UserRegistrationStatus.INACTIVE.toString());
        userRepository.save(user);
    }

    public void reactivateUser(String username){
        UserEntity user = userRepository.findByUsernameEquals(username);
        user.setRegistrationStatus(UserRegistrationStatus.APPROVED.toString());
        userRepository.save(user);
    }

    public void addDecorator(UserRequest userRequest) throws UsernameAlreadyExistsException, EmailAlreadyExistsException, RegisterUserException{
        String username = userRequest.getUsername();
        if (!this.checkUsernameAvailability(username)) {
            throw new UsernameAlreadyExistsException();
        }
        String email = userRequest.getEmail();
        if (!this.checkEmailAvailability(email)) {
            throw new EmailAlreadyExistsException();
        }

        UserEntity user = new UserEntity();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstName(userRequest.getFirstName());
        user.setLastName(userRequest.getLastName());
        user.setGender(userRequest.getGender());
        user.setAddress(userRequest.getAddress());
        user.setPhone(userRequest.getPhone());
        user.setEmail(userRequest.getEmail());
        user.setCreditCardNumber(userRequest.getCreditCardNumber());
        user.setRegistrationStatus(UserRegistrationStatus.APPROVED.toString());
        user.setRole(UserType.DECORATOR.toString());
        if(userRequest.getCompanyId() != -1) {
            user.setCompanyId(userRequest.getCompanyId());
        }

        if(user.getCompanyId() != null) user.setCompanyId(user.getCompanyId());
        try {
            user.setProfilePicture(userRequest.getProfilePicture().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        userRepository.save(user);

    }

    public List<UserEntity> getAllUnemployedDecorators(){
        return this.userRepository.findAllByRoleAndCompanyIdIsNull(UserType.DECORATOR.toString());
    }

    public void setCompanyId(String username, Integer companyId){
        UserEntity user = this.userRepository.findByUsernameEquals(username);
        user.setCompanyId(companyId);
        userRepository.save(user);
    }

    public List<UserEntity> getAllDecoratorFromCompany(Integer companyId){
        return this.userRepository.findAllByCompanyId(companyId);
    }

    public boolean isBlocked(Integer decoratorId) throws UserNotFoundException {
        Optional<UserEntity> optionalUser = this.userRepository.findById(decoratorId);
        UserEntity user;
        if(optionalUser.isPresent()){
            user = optionalUser.get();
            Instant instant = Instant.now().minus(24, ChronoUnit.HOURS);
            List<ArrangingEntity> arrangements = this.arrangingRepository.findAllByDecoratorIdEqualsAndRealisationDateBeforeAndPictureIsNull(decoratorId, Timestamp.from(instant));
            if(!arrangements.isEmpty()){
                user.setRegistrationStatus(UserRegistrationStatus.INACTIVE.toString());
                this.userRepository.save(user);
                return true;
            } return false;
        }

        throw new UserNotFoundException();
    }


}
