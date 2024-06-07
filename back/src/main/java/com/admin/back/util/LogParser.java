package com.admin.back.util;

import com.admin.back.dto.LogDataContainer;
import com.admin.back.dto.LoginData;
import com.admin.back.dto.OrderData;
import com.admin.back.dto.RegistrationData;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class LogParser {
    private static final Pattern LOGIN_PATTERN = Pattern.compile("(\\d{4}-\\d{2}-\\d{2}.*) INFO .*Login Success - ID: (\\d+), type: (\\w+)");
    private static final Pattern REGISTRATION_PATTERN = Pattern.compile("(\\d{4}-\\d{2}-\\d{2}.*) INFO .*Registration Success - ID: (\\d+), type: (\\w+)");
    private static final Pattern ORDER_PATTERN = Pattern.compile("(\\d{4}-\\d{2}-\\d{2}.*) INFO .*Order Item - ID: (\\d+), Name: (.+), Quantity: (\\d+), Amount: (.+)");
    private static final Pattern CANCEL_PATTERN = Pattern.compile("(\\d{4}-\\d{2}-\\d{2}.*) INFO .*Cancel Item - ID: (\\d+), Name: (.+), Quantity: (\\d+), Amount: (.+)");

    private LogDataContainer dataContainer = new LogDataContainer();

    public void reset() {
        dataContainer = new LogDataContainer();
    }

    public int parseLog(File file, int startLine) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            int lineNumber = 0;

            while ((line = br.readLine()) != null) {
                if (lineNumber++ < startLine) {
                    continue;
                }
                parseLogLine(line);
            }

            return lineNumber;
        }
    }

    private void parseLogLine(String logMessage) {
        Matcher matcher;

        matcher = LOGIN_PATTERN.matcher(logMessage);
        if (matcher.find()) {
            dataContainer.getLogins().add(new LoginData(matcher.group(2), matcher.group(3), matcher.group(1)));
        }

        matcher = REGISTRATION_PATTERN.matcher(logMessage);
        if (matcher.find()) {
            dataContainer.getRegistrations().add(new RegistrationData(matcher.group(2), matcher.group(3), matcher.group(1)));
        }

        matcher = ORDER_PATTERN.matcher(logMessage);
        if (matcher.find()) {
            BigDecimal amount = new BigDecimal(matcher.group(5));
            dataContainer.getOrders().add(new OrderData(matcher.group(2), matcher.group(3), Integer.parseInt(matcher.group(4)), matcher.group(1), amount));
        }

        matcher = CANCEL_PATTERN.matcher(logMessage);
        if (matcher.find()) {
            BigDecimal amount = new BigDecimal(matcher.group(5));
            dataContainer.getCancels().add(new OrderData(matcher.group(2), matcher.group(3), Integer.parseInt(matcher.group(4)), matcher.group(1), amount));
        }
    }

    public LogDataContainer getLogData() {
        return dataContainer;
    }
}
