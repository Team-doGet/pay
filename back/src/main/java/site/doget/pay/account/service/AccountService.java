package site.doget.pay.account.service;

import org.springframework.stereotype.Service;
import site.doget.pay.account.DTO.AccountDTO;
import site.doget.pay.account.repository.AccountMapper;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class AccountService {
    private final AccountMapper accountMapper;

    public AccountService(AccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    public void registerAccount(AccountDTO accountDTO) {
        // 등록일자 설정
        accountDTO.setRegisteredDate(new SimpleDateFormat("yyyyMMdd").format(new Date()));
//        accountDTO.setRegisteredDate(new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").format(new Date()));
        // 계좌 등록 메서드 호출
        accountMapper.registerAccount(accountDTO);
    }

    // 중복된 계좌가 있는지 확인
    public boolean isAccountDuplicate(String accountNo) {
        return accountMapper.getAccountByAccountNo(accountNo) != null;
    }


    public void deleteAccount(String accountNo) {
        // 계좌 해지 메서드 호출
        accountMapper.deleteAccount(accountNo);
    }

    public AccountDTO getAccountByPayId(int payId) {
        return accountMapper.getAccountByPayId(payId);
    }

    public List<AccountDTO> getAccountsByPayId(int payId) {
        return accountMapper.getAccountsByPayId(payId);
    }
}


