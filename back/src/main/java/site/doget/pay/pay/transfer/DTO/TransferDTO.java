package site.doget.pay.pay.transfer.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class TransferDTO {

    private long amount;
    private String date;
    private String receiver;
}
