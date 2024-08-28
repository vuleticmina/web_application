package com.example.backend.exception;

public class InactiveUserException extends Exception{
    public InactiveUserException(){
        super("Inactive user!");
    }
}
