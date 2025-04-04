package io.github.controlefinanceiro.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroResponseDTO;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table
@EntityListeners(AuditingEntityListener.class)
public class Financeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String descricao;

    private String categoria;

    @Column(precision = 10, scale = 2)
    private BigDecimal preco;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate dataCadastro;

    private Boolean isPago;

    @LastModifiedDate
    private LocalDateTime dataAtualizacao;

    public Financeiro() {
    }

    public Financeiro(String descricao, String categoria, BigDecimal preco, LocalDate data, Boolean isPago) {
        this.descricao = descricao;
        this.categoria = categoria;
        this.preco = preco;
        this.dataCadastro = data;
        this.isPago = isPago;
    }

    @Override
    public String toString() {
        return "Financeiro{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                ", categoria='" + categoria + '\'' +
                ", preco=" + preco +
                ", dataCadastro=" + dataCadastro +
                ", isPago=" + isPago +
                ", dataAtualizacao=" + dataAtualizacao +
                '}';
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Boolean getPago() {
        return isPago;
    }

    public void setPago(Boolean pago) {
        isPago = pago;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public FinanceiroResponseDTO toDTO() {
        return new FinanceiroResponseDTO(
                this.getId(),
                this.getDescricao(),
                this.getCategoria(),
                this.getDataCadastro(),
                this.getPreco(),
                this.getPago());
    }
}
