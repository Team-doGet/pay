package site.doget.pay.pay.transfer.transferDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class TransferData {

    private int amount;
    private String date;
}
