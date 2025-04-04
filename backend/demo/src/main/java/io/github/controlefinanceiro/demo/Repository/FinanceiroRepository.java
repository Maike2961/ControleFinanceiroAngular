package io.github.controlefinanceiro.demo.Repository;

import io.github.controlefinanceiro.demo.model.Financeiro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface FinanceiroRepository extends JpaRepository<Financeiro, UUID> {

    Optional<Financeiro> findById(UUID id);
}
