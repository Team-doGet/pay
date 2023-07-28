package site.doget.pay.pay.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter @Setter
@AllArgsConstructor
public class CommonResponse {
    private int status;
    private String message;
    private Object data;

    public CommonResponse() {
        this.status = HttpStatus.OK.value();
        this.message = "정상적으로 완료되었습니다.";
    }
}
