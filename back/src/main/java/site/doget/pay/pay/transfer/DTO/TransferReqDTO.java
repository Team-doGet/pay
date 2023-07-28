package site.doget.pay.pay.transfer.transferDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequestBody {

    private String sender;
    private String receiver;
    private int amount;
    private String message;
}