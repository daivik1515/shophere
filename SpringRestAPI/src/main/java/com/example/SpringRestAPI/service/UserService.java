package com.example.SpringRestAPI.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringRestAPI.document.User;
import com.example.SpringRestAPI.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
//	public String register(User user) {
//		if(userRepository.findByUserName(user.getUserName()) != null) {
//			return "Email already exists!";
//		}
//		userRepository.save(user);
//		return "User registred successfully";
//	}
	
	public Response register(User user) {
	    if (userRepository.findByMobileNo(user.getMobileNo()) != null) {
	        return new Response("Mobile number already exists!", false, null);
	    }
	    userRepository.save(user);
	    return new Response("User registered successfully", true, user);
	}

	
//	public String login(String userName, String password) {
//		User user = userRepository.findByUserName(userName);
//		if(user == null || !user.getPassword().equals(password)) {
//			return "Invalid credentials";
//		}
//		return "Login successful";
//	}
	
	public Response login(String Name, String Password) {
	    User user = userRepository.findByName(Name);
	    System.out.println(user);
	    if (user == null || !user.getPassword().equals(Password)) {
	        return new Response("Invalid credentials", false, null);
	    }
	    return new Response("Login successful", true, user);
	}



}
