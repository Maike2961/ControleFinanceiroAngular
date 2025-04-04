package io.github.controlefinanceiro.demo.Service;

import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroRequestDTO;
import io.github.controlefinanceiro.demo.Repository.FinanceiroRepository;
import io.github.controlefinanceiro.demo.controller.DTO.FinanceiroResponseDTO;
import io.github.controlefinanceiro.demo.exception.FinanceiroNotFoundException;
import io.github.controlefinanceiro.demo.model.Financeiro;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ActiveProfiles("test")
@DataJpaTest
@ExtendWith(MockitoExtension.class)
class FinanceiroServiceTest {

    @Mock
    private FinanceiroRepository repository;

    @InjectMocks
    private FinanceiroService service;

    @Captor
    private ArgumentCaptor<Financeiro> captor;

    @Captor
    private ArgumentCaptor<UUID> uuidArgumentCaptor;

    @BeforeEach
    void setup(){
        MockitoAnnotations.initMocks(this);
    }

    @Nested
    class createFinancie{

        @Test
        @DisplayName("Should Create A Finance With Success")
        void shouldCreateAFinanceWithSuccess(){

            var teste = createDTOTest("McDonalds", "FastFood", true);

            doReturn(teste.toEntity()).when(repository).save(captor.capture());

            Financeiro salvar = service.salvar(teste);

            assertNotNull(salvar);
            assertEquals(salvar.getCategoria(), captor.getValue().getCategoria());
            assertEquals(salvar.getDescricao(), captor.getValue().getDescricao());
            assertEquals(salvar.getPreco(), captor.getValue().getPreco());
            assertEquals(salvar.getPago(), captor.getValue().getPago());

        }

    }

    @Nested
    class  ListAllFinancies{
        @Test
        @DisplayName("should list all the financies with success")
        void shouldListAllTheFinanciesWithSuccess(){

            var teste = createDTOTest("McDonalds", "FastFood", true);
            var teste2 = createDTOTest("Gasolina", "Carro", true);
            var teste3 = createDTOTest("Devendo ao Chama", "Pessoa", false);

            ArrayList<Financeiro> arrayList = new ArrayList<>();

            arrayList.add(teste.toEntity());
            arrayList.add(teste2.toEntity());
            arrayList.add(teste3.toEntity());

            doReturn(arrayList).when(repository).findAll();

            List<FinanceiroResponseDTO> financeiroResponseDTOS = service.AllFinancies();

            assertEquals(3, financeiroResponseDTOS.size());

            verify(repository, times(1)).findAll();

        }
    }

    @Nested
    class getFinancieById{

        @Test
        @DisplayName("should get a Finance By id With Success")
        void shouldGetAFinanceByIdWithSuccess(){

            var entity = new Financeiro();
            entity.setId(UUID.randomUUID());
            entity.setDescricao("Alcool");
            entity.setCategoria("Carro");

            // Mockando o repositório para retornar o objeto quando chamado com o UUID capturado
            doReturn(Optional.of(entity)).when(repository).findById(uuidArgumentCaptor.capture());

            Financeiro financeById = service.getFinanceById(entity.getId());


            assertEquals(financeById.getId(), uuidArgumentCaptor.getValue());

        }

        @Test
        @DisplayName("Should get user by id with success when optional is empty")
        void shouldGetUserByIdWithSuccessWhenOptionalIsEmpty(){

            var uuid = UUID.randomUUID();

            doReturn(Optional.empty()).when(repository).findById(uuidArgumentCaptor.capture());

            assertThrows(FinanceiroNotFoundException.class, () -> {
                Financeiro financeById = service.getFinanceById(uuid);
                assertEquals(financeById.getId(), uuidArgumentCaptor.getValue());
            });

            assertEquals(uuid, uuidArgumentCaptor.getValue());

            verify(repository, times(1)).findById(uuidArgumentCaptor.getValue());
            verifyNoMoreInteractions(repository);
        }
    }

    @Nested
    class deleteById{

        @Test
        @DisplayName("should delete a finance with success when id is present")
        void shouldDeleteAFinaceWithSuccessWhenIdIsPresent(){

            var entity = new Financeiro();
            entity.setId(UUID.randomUUID());
            entity.setDescricao("Alcool");
            entity.setCategoria("Carro");
            entity.setPreco(new BigDecimal(20));
            entity.setPago(false);

            doReturn(true).when(repository).existsById(uuidArgumentCaptor.capture());
            doNothing().when(repository).deleteById(uuidArgumentCaptor.capture());

            service.deleteById(entity.getId().toString());

            List<UUID> allValues = uuidArgumentCaptor.getAllValues();

            assertEquals(entity.getId(), allValues.get(0));
            assertEquals(entity.getId(), allValues.get(1));

            verify(repository, times(1)).existsById(uuidArgumentCaptor.getValue());
            verify(repository, times(1)).deleteById(uuidArgumentCaptor.getValue());
        }

        @Test
        @DisplayName("should not delete a finance with success when id is empty")
        void shouldNotDeleteAFinanceWithSuccessWhenIdIsEmpty(){

            var entity = new Financeiro();
            entity.setId(UUID.randomUUID());
            entity.setDescricao("Alcool");
            entity.setCategoria("Carro");
            entity.setPreco(new BigDecimal(20));
            entity.setPago(false);

            doReturn(false).when(repository).existsById(uuidArgumentCaptor.capture());

            service.deleteById(entity.getId().toString());

            var allValues = uuidArgumentCaptor.getValue();

            assertEquals(entity.getId(), allValues);

            verify(repository, times(1)).existsById(uuidArgumentCaptor.getValue());
            verify(repository, times(0)).deleteById(uuidArgumentCaptor.getValue());
        }
    }

    @Nested
    class updateFinanceById{

        @Test
        @DisplayName("should update a finance with success when id is present")
        void shouldUpdateAFinanceWithSuccessWhenIdIsPresent(){

            var entitynew = new Financeiro();
            entitynew.setId(UUID.randomUUID());
            entitynew.setDescricao("Gasolina");
            entitynew.setCategoria("Carro");
            entitynew.setDataCadastro(LocalDate.now());
            entitynew.setPreco(new BigDecimal(20));
            entitynew.setPago(true);

            var financeDto = createDTOTest("Alccol", "Carro", false);

            doReturn(Optional.of(entitynew)).when(repository).findById(uuidArgumentCaptor.capture());
            doReturn(entitynew).when(repository).save(captor.capture());

            Financeiro financeiro = service.UpdateById(entitynew.getId().toString(), financeDto);

            assertEquals(financeiro.getId(), uuidArgumentCaptor.getValue());

            assertEquals(financeiro.getCategoria(), captor.getValue().getCategoria());
            assertEquals(financeiro.getDescricao(), captor.getValue().getDescricao());

            verify(repository, times(1)).findById(uuidArgumentCaptor.getValue());
            verify(repository, times(1)).save(captor.getValue());

        }

        @Test
        @DisplayName("should not update a finance with success when id is empty")
        void shouldNotUpdateAFinanceWithSuccessWhenIdIsEmpty(){

            var entitynew = new Financeiro();
            entitynew.setId(UUID.randomUUID());
            entitynew.setDescricao("Gasolina");
            entitynew.setCategoria("Carro");
            entitynew.setDataCadastro(LocalDate.now());
            entitynew.setPreco(new BigDecimal(20));
            entitynew.setPago(true);

            var financeDto = createDTOTest("Alccol", "Carro", false);

            doReturn(Optional.empty()).when(repository).findById(uuidArgumentCaptor.capture());

            var exception = assertThrows(FinanceiroNotFoundException.class, () -> {
                service.UpdateById(entitynew.getId().toString(), financeDto);
            });

            assertEquals("Para atualizar, é preciso que esteja cadastrado", exception.getMessage());

            verify(repository, times(1)).findById(uuidArgumentCaptor.getValue());

            verify(repository, never()).save(financeDto.toEntity());
        }
    }


    private FinanceiroRequestDTO createDTOTest(String descricao, String categoria, Boolean isPago){
        return new FinanceiroRequestDTO(
                descricao,
                categoria,
                new BigDecimal(20),
                LocalDate.now(),
                isPago
        );
    }

}