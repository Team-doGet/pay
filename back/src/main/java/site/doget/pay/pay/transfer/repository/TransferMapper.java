package site.doget.pay.pay.transfer.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;
import java.util.Optional;

@Mapper
public interface TransferMapper {
    Optional<Integer> findUserByPhone(@Param("receiver") String receiver);

    Optional<Integer> getPayAccount(String sender);

    Integer withDrawPayAccount(Map<String,Object> paramMap);

    Integer chargePayAccount(Map<String,Object> paramMap);

    String findUserName(Map<String,Object> paramMap);

    void insertTransferToHistory(Map<String,Object> paramMap);

    Map<String ,Object> getBankData(Map<String, Object> paramMap);
}
