package com.example.SpringRestAPI.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.SpringRestAPI.document.User;

public interface UserRepository extends MongoRepository<User, String> {

	User findByName(String name);
	User findByMobileNo(String mobileNo);
}
