package com.hotel.hotel;

import org.springframework.data.annotation.Id;

public class Rooms {
    @Id
    private String id;
    private int roomNum;
    private int nightlyPrice;
    private boolean availability;
    private String type;
    
    protected Rooms() {}

    public Rooms(int roomNum, int nightlyPrice, boolean availability, String type) {
        this.roomNum = roomNum;
        this.nightlyPrice = nightlyPrice;
        this.availability = availability;
        this.type = type;
    }

    // Setters
    public void setRoomNum(int roomNum) { this.roomNum = roomNum; } 
    public void setNightlyPrice(int nightlyPrice) { this.nightlyPrice = nightlyPrice; } 
    public void setAvailability(boolean availability) { this.availability = availability; } 
    public void setType(String type) { this.type = type; }
    
    // Getters
    public String getId() { return id; }
    public int getRoomNum() { return roomNum; }
    public int getNightlyPrice() { return nightlyPrice; }
    public boolean getAvailability() { return availability; }
    public String getType() { return type; }


}