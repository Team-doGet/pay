package site.doget.pay.pay.collect.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class CollectDTO {
    private String link;
    private Object qrCode;
}
