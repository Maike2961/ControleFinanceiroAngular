package io.github.controlefinanceiro.demo.controller.DTO;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record FinanceiroResponseDTO(
        UUID id,
        String descricao,
        String categoria,
        LocalDate data,
        BigDecimal preco,
        Boolean isPago
        ) {

}
