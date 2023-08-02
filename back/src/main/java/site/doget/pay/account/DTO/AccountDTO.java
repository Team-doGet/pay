package site.doget.pay.account.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {

    private String accountNo;
    private String bankCode;
    private String accountHolderName;
    private int accountBalance;
    private String registeredDate;
    private int registerId;
    private int payId;
    private String mainAccountYN;

}
