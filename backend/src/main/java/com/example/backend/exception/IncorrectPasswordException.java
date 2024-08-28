package com.example.backend.exception;

public class IncorrectPasswordException extends Exception{
    public IncorrectPasswordException(){
        super("Incorrect password!");
    }
}
