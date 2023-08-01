package site.doget.pay.pay.transfer.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransferReqDTO {

    private String sender;
    private String receiver;
    private long amount;
    private String message;

    public  TransferReqDTO(Map<String, Object> paramMap) {
        this.sender = (String) paramMap.get("sender");
        this.receiver = (String) paramMap.get("receiver");
        this.amount = Long.valueOf(String.valueOf(paramMap.get("amount")));
        this.message = (String) paramMap.get("message");
    }
}