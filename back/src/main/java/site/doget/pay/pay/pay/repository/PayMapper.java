package site.doget.pay.pay.pay.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;
import java.util.Optional;

@Mapper
public interface PayMapper {

    Optional<String> getStore(String storeId);

    int getPaymoneyBalance(String userId);

    Map<String, Object> getAccountInfo(String payId);

    int withdrawPayMoney(Map<String, Object> req);

    int insertToHistory(Map<String, Object> req);

}
