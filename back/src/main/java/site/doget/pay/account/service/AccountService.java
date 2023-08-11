package site.doget.pay.account.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.account.repository.AccountMapper;
import site.doget.pay.common.responseUtil.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class AccountService {

    private final AccountMapper accountMapper;

    public AccountService(AccountMapper accountMapper) {
        this.accountMapper = accountMapper;
    }

    public CommonResponse isAccountDuplicate(Map<String, Object> paramMap) {
        String accountNo = (String) paramMap.get("accountNo");
        // 랜덤 문자 호출
        String authCode = "D" + generateRandomString();

        // 1원 송금
        paramMap.put("authCode", authCode);

        if (accountMapper.getAccountByAccountNo(accountNo) == null) {
            int resultCount = accountMapper.checkAccount(accountNo);
            if (resultCount == 0) {
                // 1원 입금
                accountMapper.accountAuth(paramMap);
            } else {
                // authCode 갱신
                accountMapper.updateAuthCode(paramMap);
            }
            return new CommonSuccessResponse();
        }
        return new CommonFailResponse("중복된 계좌번호 입니다. 다시 확인해주세요");
    }

    @Transactional
    public CommonResponse registerAccount(Map<String, Object> paramMap) {
        List<Map<String, Object>> accountsList = accountMapper.getAccountsByPayId((int) paramMap.get("payId"));
        String accountNo = (String) paramMap.get("accountNo");

        // 두 번째 페이지에서 입력한 송금자명 가져오기
        String inputSenderName = (String) paramMap.get("authCode");
        String authCode = accountMapper.getAuthCode(accountNo);
        authCode = authCode.substring(1, 5);

        System.out.println(inputSenderName);
        System.out.println(authCode);

        if (inputSenderName.equals(authCode)) {
            // 송금자명이 일치하면 계좌 등록 성공
            if (accountsList.isEmpty()) {
                paramMap.put("mainAccountYN", "Y");
                accountMapper.registerAccountY(paramMap);
            } else {
                paramMap.put("mainAccountYN", "N");
                accountMapper.registerAccountN(paramMap);
            }

            Map<String, Object> accountInfo = accountMapper.getAccountByAccountNo(accountNo);
            CommonSuccessResponse commonSuccessResponse = new CommonSuccessResponse(accountInfo);
            commonSuccessResponse.setStatus(201);
            commonSuccessResponse.setMessage("계좌가 성공적으로 등록되었습니다.");
            return commonSuccessResponse;
        }

        return new CommonFailResponse("송금자명이 일치하지 않습니다. 다시 확인해주세요.");

    }

    public CommonResponse deleteAccount(String accountNo) {
        accountMapper.deleteHistory(accountNo);
        accountMapper.deleteAccount(accountNo);
        CommonSuccessResponse commonSuccessResponse = new CommonSuccessResponse();
        commonSuccessResponse.setMessage("계좌가 성공적으로 해지되었습니다.");
        return commonSuccessResponse;
    }

    public CommonResponse getAccountsByPayId(int payId) {
        List<Map<String, Object>> accountsList = accountMapper.getAccountsByPayId(payId);
        if (accountsList.isEmpty()) {
            return new CommonFailResponse("현재 등록된 계좌가 없습니다.");
        }
        Map<String, Object> response = new HashMap<>();
        response.put("accounts", accountsList);
        return new CommonSuccessResponse(response);
    }



    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // 랜덤 문자 생성 로직
    public static String generateRandomString() {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 4; i++) {
            int randNumber = random.nextInt(10);
            char randChar = CHARACTERS.charAt(random.nextInt(CHARACTERS.length()));

            // 순서도 섞기 위해서 정의
            int rand = random.nextInt(2);
            if (rand == 0) {
                sb.append(randNumber);
            } else {
                sb.append(randChar);
            }
        }
        return sb.toString();
    }


    public CommonResponse updateMainAccount(String accountNo) {
        Map<String, Object> account = accountMapper.getAccountByAccountNo(accountNo);
//        String mainAccountYN = (String) account.get("mainAccountYN");

        accountMapper.updateMainToSub();
        accountMapper.updateSubToMain(accountNo);

        return new CommonSuccessResponse();
    }
}
