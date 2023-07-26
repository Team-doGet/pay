package site.doget.pay.pay.charge.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    private Long id;
    private int accountNo;
    private int accountBalance;
    private int paymoney;
    private int amount;

    public void MemberDTO(int accountNo, int accountBalance, int paymoney, int amount) {
        this.accountNo = accountNo;
        this.accountBalance = accountBalance;
        this.paymoney = paymoney;
        this.amount = amount;
    }
}
