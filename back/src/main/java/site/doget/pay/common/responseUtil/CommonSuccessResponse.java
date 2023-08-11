package site.doget.pay.common.responseUtil;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter @Setter
@AllArgsConstructor
public class CommonSuccessResponse implements CommonResponse{
    private int status;
    private String message;
    private Object data;

    public CommonSuccessResponse() {
        this.status = HttpStatus.OK.value();
        this.message = "정상적으로 완료되었습니다.";
    }

    public CommonSuccessResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public CommonSuccessResponse(String message, Object data) {
        this.status = HttpStatus.OK.value();
        this.message = message;
        this.data = data;
    }

    public CommonSuccessResponse(String message) {
        this.status = HttpStatus.OK.value();
        this.message = message;
    }

    public CommonSuccessResponse(Object dataDTO) {
        this.status = HttpStatus.OK.value();
        this.message = "정상적으로 완료되었습니다.";
        this.data = dataDTO;
    }
}
