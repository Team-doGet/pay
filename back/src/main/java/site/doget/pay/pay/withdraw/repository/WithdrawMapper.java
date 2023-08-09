package site.doget.pay.pay.withdraw.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface WithdrawMapper {

    List<Map<String, Object>> getPaymoneyAndAccountMoney(int payId);
    Integer withdrawPaymoney(Map<String, Object> paramMap);

    Integer chargeAccountMoney(Map<String, Object> paramMap);

    void insertToHistory(Map<String, Object> paramMap);


}
