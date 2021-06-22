package com.hotel.hotel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class HotelApplication implements CommandLineRunner {

	@Autowired
	private RoomsRepository roomsRepository;

	public static void main(String[] args) {
		SpringApplication.run(HotelApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		this.roomsRepository.deleteAll();
		
		Rooms room1 = new Rooms(
			100, 
			450, 
			true,
			"Luxury"
			
		);

		Rooms room2 = new Rooms(
			50, 
			150, 
			true,
			"Family"
			
		);

		this.roomsRepository.save(room1);
		this.roomsRepository.save(room2);
	}

}
