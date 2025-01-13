package com.admin.back.logger.dto.Order;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OrderErrorData {
    private String date;
    private String message;
    private Long memberId;
    private String id;
    private String impUid;

    public OrderErrorData(String date, String message, Long memberId, String id, String impUid) {
        this.date = date;
        this.message = message;
        this.memberId = memberId;
        this.id = id;
        this.impUid = impUid;
    }
}
