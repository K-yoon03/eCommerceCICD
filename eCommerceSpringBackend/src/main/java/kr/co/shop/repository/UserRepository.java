package kr.co.shop.repository;

import kr.co.shop.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByIdUser(String idUser);

    boolean existsByIdUser(String idUser);

    boolean existsByNmEmail(String nmEmail);
}