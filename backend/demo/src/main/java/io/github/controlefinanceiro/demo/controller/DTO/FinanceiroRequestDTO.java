package io.github.controlefinanceiro.demo.controller.DTO;

import io.github.controlefinanceiro.demo.model.Financeiro;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record FinanceiroRequestDTO(

        @NotBlank(message = "Campo obrigatório")
        String descricao,

        @NotNull(message = "Campo obrigatório")
        String categoria,

        @NotNull(message = "Campo obrigatório")
        BigDecimal preco,

        @NotNull(message = "Campo obrigatório")
        LocalDate data,

        @NotNull(message = "Campo obrigatório")
        Boolean isPago
) {

    public Financeiro toEntity(){
        return new Financeiro(
                descricao,
                categoria,
                preco,
                data,
                isPago);
    }
}
