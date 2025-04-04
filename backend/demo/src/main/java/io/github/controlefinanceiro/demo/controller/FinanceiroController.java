package io.github.controlefinanceiro.demo.controller;

import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroRequestDTO;
import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroResponseDTO;
import io.github.controlefinanceiro.demo.Service.FinanceiroService;
import io.github.controlefinanceiro.demo.model.Financeiro;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/financies")
public class FinanceiroController {

    private FinanceiroService service;

    public FinanceiroController(FinanceiroService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<FinanceiroResponseDTO>> GetAllFinancies() {

        List<FinanceiroResponseDTO> financeiroResponse = service.AllFinancies();

        return ResponseEntity.ok(financeiroResponse);
    }

    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody @Valid FinanceiroRequestDTO dto) {
        Financeiro salvar = service.salvar(dto);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(salvar.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFinancieById(@PathVariable("id") String id) {

        Financeiro financeById = service.getFinanceById(UUID.fromString(id));

        return ResponseEntity.ok(financeById);
    }

    @PutMapping("/{id}")
    public FinanceiroResponseDTO updateFinancieById(@PathVariable String id,
                                                    @RequestBody @Valid FinanceiroRequestDTO dto) {

        Financeiro financeById = service.UpdateById(id, dto);

        return new FinanceiroResponseDTO(
                financeById.getId(),
                financeById.getDescricao(),
                financeById.getCategoria(),
                financeById.getDataCadastro(),
                financeById.getPreco(),
                financeById.getPago()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFinanceById(@PathVariable("id") String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
