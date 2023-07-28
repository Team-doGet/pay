package site.doget.pay.user.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginResultDTO {

    private int userId;

    private String emailNo;

    private String userName;

    private String phoneNo;

}
