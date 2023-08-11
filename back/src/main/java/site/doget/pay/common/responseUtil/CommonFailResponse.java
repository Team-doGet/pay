package site.doget.pay.common.responseUtil;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter @Setter
@AllArgsConstructor
public class CommonFailResponse implements CommonResponse {
    private int status = 404;
    private String message;

    public CommonFailResponse() {
        this.status = HttpStatus.BAD_REQUEST.value();
        this.message = "잘못된 요청입니다.";
    }

    public CommonFailResponse(String msg) {
        this.status = HttpStatus.BAD_REQUEST.value();
        this.message = msg;
    }
}
