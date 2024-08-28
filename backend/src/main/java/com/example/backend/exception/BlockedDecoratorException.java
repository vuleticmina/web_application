package com.example.backend.exception;

public class BlockedDecoratorException extends Exception{
    public BlockedDecoratorException(){
        super("Decorator is blocked!");
    }
}
