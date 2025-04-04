package io.github.controlefinanceiro.demo.common.dto;

import java.util.List;

public record Erro(String title, List<ErroCampo> message) {


    public static Erro resposta400(String message){

        return new Erro("Erro 400 -Requisição inválida", List.of(
                new ErroCampo("", message)));
    }

    public static Erro resposta500(String message){

        return new Erro("Erro 500 -Erro interno", List.of(
                new ErroCampo("",message)));
    }
}
