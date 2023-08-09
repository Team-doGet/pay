package site.doget.pay.pay.charge.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChargeMapper {

    List<Map<String, Object>> getPaymoneyAndAccountMoney(int payId);
    Integer chargePaymoney(Map<String, Object> paramMap);
    Integer withdrawAccountMoney(Map<String, Object> paramMap);

    void insertToHistory(Map<String, Object> paramMap);
}
