package com.admin.back.logger.dto;

import java.util.*;

import com.admin.back.logger.dto.Coupon.CouponErrorData;
import com.admin.back.logger.dto.Login.LoginErrorData;
import com.admin.back.logger.dto.Order.OrderErrorData;
import com.admin.back.logger.dto.Order.OrderItemErrorData;
import com.admin.back.logger.dto.Point.PointErrorData;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LogDataErrorContainer {
    private List<LoginErrorData> logins = new ArrayList<>();
    private List<RegistrationErrorData> registrations = new ArrayList<>();
    private List<OrderItemErrorData> orderItems = new ArrayList<>();
    private List<OrderItemErrorData> cancelItems = new ArrayList<>();
    private List<OrderErrorData> orders = new ArrayList<>();
    private List<OrderErrorData> cancels = new ArrayList<>();
    private List<CouponErrorData> coupns = new ArrayList<>();
    private List<PointErrorData> points = new ArrayList<>();
}
