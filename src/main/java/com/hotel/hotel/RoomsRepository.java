package com.hotel.hotel;


import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoomsRepository extends MongoRepository<Rooms, String> {
    Rooms findRoomsById(String id);
    List<Rooms> findByNightlyPriceLessThan(int nightlyPrice);
    Rooms findByRoomNum(int roomNum);
    List<Rooms> findByType(String type);
}
