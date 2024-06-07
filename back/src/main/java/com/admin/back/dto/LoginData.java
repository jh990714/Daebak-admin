package com.admin.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginData {
    private String id;
    private String type;
    private String date;

    public LoginData(String id, String type, String date) {
        this.id = id;
        this.type = type;
        this.date = date;
    }
}