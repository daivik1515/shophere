package com.example.SpringRestAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringRestAPI.document.User;
import com.example.SpringRestAPI.service.Response;
import com.example.SpringRestAPI.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public Response register(@RequestBody User user) {
		return userService.register(user);
	}
	
	@PostMapping("/login")
	public Response login(@RequestBody User user) {
		System.out.println(user.getName() + user.getPassword());
		return userService.login(user.getName(), user.getPassword());
	}

}
