package com.example.SpringRestAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.SpringRestAPI.document.Product;
import com.example.SpringRestAPI.repository.ProductRepository;
import java.io.IOException;


@Service
public class ProductServiceImpl implements ProductService {

	
	@Autowired
	private ProductRepository productRepository ;
	
	@Override
	public List<Product> fetchAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product fetchById(String id) {
		return productRepository.findById(id).get();
	}

	@Override
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Product deleteProduct(Product product) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
    public Product saveProduct(MultipartFile file, String name, String category, String brand) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setCategory(category);      
        product.setBrand(brand);    
        product.setImageData(file.getBytes());  

        return productRepository.save(product);
    }
    
    @Override
    public Product getImage(String id) {
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("Image not found"));
    }

	

}
