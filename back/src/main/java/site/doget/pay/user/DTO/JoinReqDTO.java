package site.doget.pay.user.DTO;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class JoinReqDTO {

    private Long user_id;

    @Email
    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    private String emailNo;

    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    private String passwordNo;

    @NotEmpty(message = "이름은 필수 입력 값입니다.")
    private String userName;

    @NotEmpty(message = "핸드폰 번호는 필수 입력 값입니다.")
    private String phoneNo;

    @NotEmpty
    private String agree1Yn;

    @NotEmpty
    private String agree2Yn;

    @NotEmpty
    private String agree3Yn;

}
