package com.example.backend.controller;


import com.example.backend.exception.*;
import com.example.backend.model.entity.UserEntity;
import com.example.backend.request.*;
import com.example.backend.response.InfoResponse;
import com.example.backend.service.ArrangingService;
import com.example.backend.service.RecaptchaService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/user")
public class UserControler {
    @Autowired
    private UserService userService;

    @Autowired
    private ArrangingService arrangingService;

    @Autowired
    private RecaptchaService recaptchaService;

    @PostMapping("login")
    public ResponseEntity<UserEntity> login(@RequestBody LoginRequest loginRequest){
        try{
            UserEntity user = userService.login(loginRequest);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (UserNotFoundException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(306));
        }
        catch (InactiveUserException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(307));
        }
        catch (IncorrectPasswordException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(308));
        }
        catch (BlockedDecoratorException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(309));
        }
        catch (Exception e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(304));
        }

    }

    @PostMapping("login-admin")
    public ResponseEntity<UserEntity> loginAdmin(@RequestBody LoginRequest loginRequest){
        try{
            UserEntity user = userService.loginAdmin(loginRequest);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (UserNotFoundException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(306));
        }
        catch (NotAuthorizedAccessException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(307));
        }
        catch (IncorrectPasswordException e){
            return new ResponseEntity<>(null, HttpStatusCode.valueOf(308));
        }
    }

    @PostMapping("register")
    public ResponseEntity<UserEntity> register(
            @ModelAttribute UserRequest userRequest,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture){

        if (!recaptchaService.verify(userRequest.getCaptchaToken())) {
            return new ResponseEntity<>(HttpStatusCode.valueOf(310));
        }

        try{
            userService.register(userRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (UsernameAlreadyExistsException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(306));
        }
        catch (EmailAlreadyExistsException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(307));
        }
        catch (RegisterUserException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(308));
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(304));
        }
    }


    @PostMapping("update-password")
    public ResponseEntity<Void> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest){
        try {
            userService.updatePassword(updatePasswordRequest);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.valueOf(306)).build();
        } catch (IncorrectPasswordException e) {
            return ResponseEntity.status(HttpStatus.valueOf(307)).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.valueOf(308)).build();
        }
    }


    @GetMapping("/info")
    public ResponseEntity<InfoResponse> getInfo() {
        long totalGardens = arrangingService.totalGardens();
        long totalOwners = userService.getOwnerCount();
        long totalDecorators = userService.getDecoratorCount();
        long reservationsLast24Hours = arrangingService.reservationsLast24Hours();
        long reservationsLast7Days = arrangingService.reservationsLast7Days();
        long reservationsLast30Days = arrangingService.reservationsLast30Days();
        InfoResponse infoResponse = new InfoResponse(totalGardens, totalOwners, totalDecorators, reservationsLast24Hours,
                reservationsLast7Days, reservationsLast30Days);


        return new ResponseEntity<>(infoResponse, HttpStatus.OK);
    }


    /*

    @GetMapping("/restaurants")
    public ResponseEntity<List<RestaurantDto>> getRestaurants(@RequestParam(required = false) String name,
                                              @RequestParam(required = false) String address,
                                              @RequestParam(required = false) String type,
                                              @RequestParam(required = false) String sortBy,
                                              @RequestParam(required = false) String order) {
        return ResponseEntity.ok(userService.getRestaurantsWithWaiters(name, address, type, sortBy, order));
    }*/

    @PostMapping("update")
    public ResponseEntity<UserEntity> updateUser(
            @ModelAttribute UserRequest userRequest,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture
    ){
        UserEntity user = userService.updateUser(userRequest);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("registration-requests")
    public ResponseEntity<List<UserEntity>> getRegistrationRequests(){
        List<UserEntity> requests = userService.getRegistrationRequests();
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PostMapping("accept-request")
    public ResponseEntity<Void> acceptRegistrationRequest(@RequestBody String username){
        userService.acceptRegistrationRequest(username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("reject-request")
    public ResponseEntity<Void> rejectRegistrationRequest(@RequestBody String username){
        userService.rejectRegistrationRequest(username);
        return ResponseEntity.ok().build();
    }

    @GetMapping("all")
    public ResponseEntity<List<UserEntity>> getAllUsers(){
        List<UserEntity> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @PostMapping("deactivate")
    public ResponseEntity<Void> deactivateUser(@RequestBody String username){
        userService.deactivateUser(username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("reactivate")
    public ResponseEntity<Void> reactivateUser(@RequestBody String username){
        userService.reactivateUser(username);
        return ResponseEntity.ok().build();
    }

    @PostMapping("add-decorator")
    public ResponseEntity<Void> registerDecorator(
            @ModelAttribute UserRequest userRequest,
            @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture){
        try{
            userService.addDecorator(userRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (UsernameAlreadyExistsException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(306));
        }
        catch (EmailAlreadyExistsException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(307));
        }
        catch (RegisterUserException e){
            return new ResponseEntity<>(HttpStatusCode.valueOf(308));
        }
    }

    @GetMapping("all-unemployed-decorators")
    public ResponseEntity<List<UserEntity>> getAllUnemployedDecorators(){
        List<UserEntity> users = userService.getAllUnemployedDecorators();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }




}
