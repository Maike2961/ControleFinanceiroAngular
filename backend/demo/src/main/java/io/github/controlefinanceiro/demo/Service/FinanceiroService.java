package io.github.controlefinanceiro.demo.Service;

import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroRequestDTO;
import io.github.controlefinanceiro.demo.Repository.FinanceiroRepository;
import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroResponseDTO;
import io.github.controlefinanceiro.demo.exception.FinanceiroNotFoundException;
import io.github.controlefinanceiro.demo.model.Financeiro;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FinanceiroService {

    private FinanceiroRepository repository;

    public FinanceiroService(FinanceiroRepository repository) {
        this.repository = repository;
    }

    public Financeiro salvar(FinanceiroRequestDTO financeiro) {
        Financeiro entity = financeiro.toEntity();
        System.out.println("Create: " + entity);
        return repository.save(entity);
    }

    public List<FinanceiroResponseDTO> AllFinancies() {
        return repository.findAll().stream().map(
                Financeiro::toDTO).collect(Collectors.toList());
    }

    public Financeiro getFinanceById(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new FinanceiroNotFoundException("Id Não encontrado"));
    }

    public Financeiro UpdateById(String id, FinanceiroRequestDTO dto) {
        Financeiro financeById = repository.findById(UUID.fromString(id))
                .orElseThrow(() -> new FinanceiroNotFoundException("Para atualizar, é preciso que esteja cadastrado"));

        financeById.setDescricao(dto.descricao());
        financeById.setCategoria(dto.categoria());
        financeById.setDataCadastro(dto.data());
        financeById.setPreco(dto.preco());
        financeById.setPago(dto.isPago());

        return repository.save(financeById);
    }

    public void deleteById(String id) {
        UUID idFound = UUID.fromString(id);
        boolean user = repository.existsById(idFound);
        if (user) {
            repository.deleteById(idFound);
        }
    }
}
