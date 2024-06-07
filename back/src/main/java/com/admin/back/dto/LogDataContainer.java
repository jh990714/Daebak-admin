package com.admin.back.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LogDataContainer {
    private List<LoginData> logins = new ArrayList<>();
    private List<RegistrationData> registrations = new ArrayList<>();
    private List<OrderData> orders = new ArrayList<>();
    private List<OrderData> cancels = new ArrayList<>();
}
