package com.hotel.hotel;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rooms")
public class RoomsController {

    private RoomsRepository roomsRepository;

    public RoomsController(RoomsRepository roomsRepository) {
        this.roomsRepository = roomsRepository;
    }

    // Leaving getmapping without parameter is fine.
    // Render to the view all of the current rooms available.
    @GetMapping
    public List<Rooms> getAllRooms() {
        List<Rooms> rooms = this.roomsRepository.findAll();
        return rooms;
    }

    @PutMapping("/{id}")
    public void insert(@PathVariable("id") String id, @RequestBody Rooms room) {
        //this.roomsRepository.insert(room);
        
        Rooms requestedRoom = this.roomsRepository.findById(id).orElse(null);
        System.out.println(requestedRoom);

        if(requestedRoom != null) {
            System.out.println("Reached here.");
            requestedRoom.setRoomNum(room.getRoomNum());
            requestedRoom.setNightlyPrice(room.getNightlyPrice());
            requestedRoom.setType(room.getType());
            requestedRoom.setAvailability(room.getAvailability());

            this.roomsRepository.save(requestedRoom);
        }

    }

    @PostMapping
    public String update(@RequestBody Rooms room) {
        this.roomsRepository.save(room);
        return room.getId();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id) {
        System.out.println("delete reached:" + id);
        this.roomsRepository.deleteById(id);
    }
}
