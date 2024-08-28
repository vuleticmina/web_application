package com.example.backend.exception;

public class UsernameAlreadyExistsException extends Error{
    public UsernameAlreadyExistsException(){
        super("Username Already Exists!");
    }
}
