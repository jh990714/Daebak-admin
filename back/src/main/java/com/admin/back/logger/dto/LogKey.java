package com.admin.back.logger.dto;

import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LogKey {
    private String memberId;
    private String id;
    private String type;

    public LogKey(String memberId, String id, String type) {
        this.memberId = memberId;
        this.id = id;
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LogKey logKey = (LogKey) o;
        return 
        // Objects.equals(date, logKey.date) &&
        //        Objects.equals(message, logKey.message) &&
               Objects.equals(memberId, logKey.memberId) &&
               Objects.equals(id, logKey.id) &&
               Objects.equals(type, logKey.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memberId, id, type);
    }
}
