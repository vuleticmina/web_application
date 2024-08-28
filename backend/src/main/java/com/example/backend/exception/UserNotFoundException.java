package com.example.backend.exception;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(){
        super("User not found!");
    }
}
