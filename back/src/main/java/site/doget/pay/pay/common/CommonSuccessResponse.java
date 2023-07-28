package site.doget.pay.pay.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter @Setter
public class CommonSuccessResponse implements CommonResponse{
    private int status;
    private String message;
    private Object data;

    public CommonSuccessResponse() {
        this.status = HttpStatus.OK.value();
        this.message = "정상적으로 완료되었습니다.";
    }

    /**
     *
     * @param dataDTO response 객체에 넣을 dateDTO 객체 생성자
     */
    public CommonSuccessResponse(Object dataDTO) {
        this.status = HttpStatus.OK.value();
        this.message = "정상적으로 완료되었습니다.";
        this.data = dataDTO;
    }
}
