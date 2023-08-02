package site.doget.pay.user.DTO;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginReqDTO {

    //@Email
    @NotEmpty
    private String emailNo;

    @NotBlank
    private String passwordNo;
}
