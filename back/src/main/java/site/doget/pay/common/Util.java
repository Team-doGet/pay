package site.doget.pay.common;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Util {

    // 현재시간을 반환하는 함수
    public static String getNowTime() {
        return new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").format(new Date());
    }
}
