package io.github.controlefinanceiro.demo.exception;

public class FinanceiroNotFoundException extends RuntimeException {
    public FinanceiroNotFoundException(String message) {
        super(message);
    }
}
