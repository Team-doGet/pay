package site.doget.pay.account.repository;

import org.apache.ibatis.annotations.Mapper;
import site.doget.pay.account.DTO.AccountDTO;

import java.util.List;

@Mapper
public interface AccountMapper {

    void registerAccount(AccountDTO accountDTO);

    AccountDTO getAccountByAccountNo(String accountNo);

    void deleteAccount(String accountNo);

    AccountDTO getAccountByPayId(int payId);

    List<AccountDTO> getAccountsByPayId(int payId);
}
