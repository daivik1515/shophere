package com.example.SpringRestAPI.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.SpringRestAPI.document.Product;

public interface ProductService {

	
	List<Product> fetchAllProducts();
	Product fetchById(String id);
	Product createProduct(Product product);
	Product updateProduct(Product product);
	Product deleteProduct(Product product);
	Product getImage(String id);
	Product saveProduct(MultipartFile file, String name, String category, String brand) throws IOException;
	
}
