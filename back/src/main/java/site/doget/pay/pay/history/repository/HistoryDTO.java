package site.doget.pay.pay.history.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistoryDTO {

    private String processCode;
    private String processDatetime;
    private String accountNo;
    private String payId;
    private String bankCode;
    private int payMoneyBalance;
    private int processAmount;
}
