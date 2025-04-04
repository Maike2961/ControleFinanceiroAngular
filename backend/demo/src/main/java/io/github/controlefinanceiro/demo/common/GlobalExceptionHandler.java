package io.github.controlefinanceiro.demo.common;

import io.github.controlefinanceiro.demo.common.dto.Erro;
import io.github.controlefinanceiro.demo.common.dto.ErroCampo;
import io.github.controlefinanceiro.demo.exception.FinanceiroNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<?> handlerCampoINvalido(MethodArgumentNotValidException e) {

        // Extrai os erros de campo
        List<FieldError> fieldError = e.getFieldErrors();

        // Converte para lista de ErroCampo
        List<ErroCampo> collect = fieldError.stream().map(fieldError1 -> new ErroCampo(
                fieldError1.getField(),
                fieldError1.getDefaultMessage()
        )).collect(Collectors.toList());

        Erro erro = new Erro("Erro de validação", collect);

        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY.value())
                .body(erro);
    }

    @ExceptionHandler(FinanceiroNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<?> handlerFInanceiroNotFound(FinanceiroNotFoundException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND.value()).body(
                new Erro("Recurso Não encontrado", List.of(new ErroCampo("id", e.getMessage())))
        );

    }

    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<?> handleOperacaoNaoPermitida(IllegalArgumentException e) {

        Erro erro = Erro.resposta400(e.getMessage());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST.value()).body(erro);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<?> handlerErroInterno(Exception e) {

        Erro erro = Erro.resposta500(e.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR.value()).body(erro);
    }
}
