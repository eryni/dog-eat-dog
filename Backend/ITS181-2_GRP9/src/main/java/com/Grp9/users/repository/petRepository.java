package com.Grp9.users.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Grp9.users.models.Pet;

public interface petRepository extends JpaRepository<Pet, Integer> {
}
