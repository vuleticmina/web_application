package com.example.backend.exception;

public class NotAuthorizedAccessException extends Exception{
    public NotAuthorizedAccessException(){
        super("Access denied! Not an admin!");
    }
}
