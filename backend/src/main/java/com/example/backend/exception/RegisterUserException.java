package com.example.backend.exception;

public class RegisterUserException extends Exception{
    public RegisterUserException(){
        super("Failed to register user!");
    }
}
