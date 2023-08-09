package site.doget.pay.account.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface AccountMapper {

    void registerAccountY(Map<String, Object> paramMap);
    void registerAccountN(Map<String, Object> paramMap);

    Map<String, Object> getAccountByAccountNo(String accountNo);

    void deleteAccount(String accountNo);

    void deleteHistory(String accountNo);

    List<Map<String, Object>> getAccountsByPayId(int payId);

    void accountAuth(Map<String, Object> paramMap);

    int checkSenderName(@Param("authCode") String authCode);

    int checkAccount(String accountNo);

    void updateAuthCode(Map<String, Object> paramMap);
    String getAuthCode(String accountNo);

    void updateMainToSub();

    void updateSubToMain(String accountNo);

}
