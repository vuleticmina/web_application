package com.example.backend.exception;

public class EmailAlreadyExistsException extends Exception{
    public EmailAlreadyExistsException(){
        super("Email already exists!");
    }
}
