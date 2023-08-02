package site.doget.pay.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.account.DTO.AccountDTO;
import site.doget.pay.account.service.AccountService;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pay/accounts")
public class AccountController {
    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    public CommonResponse registerAccount(@RequestBody AccountDTO accountDTO) {
        List<AccountDTO> accountDTOList = accountService.getAccountsByPayId(accountDTO.getPayId());
        String accountNo = accountDTO.getAccountNo();

        if (accountService.isAccountDuplicate(accountNo)) {
            return new CommonFailResponse("이미 등록된 계좌입니다.");
        }
        CommonSuccessResponse commonSuccessResponse = new CommonSuccessResponse(accountDTO);
        commonSuccessResponse.setStatus(201);
        commonSuccessResponse.setMessage("계좌가 성공적으로 등록되었습니다.");

        if (accountDTOList.isEmpty()) {
            accountService.registerAccountY(accountDTO);
        }
        else {
            accountService.registerAccountN(accountDTO);

        }
        return commonSuccessResponse;
    }

    @PostMapping("/delete/{accountNo}")
    public CommonResponse deleteAccount(@PathVariable String accountNo) {
        accountService.deleteAccount(accountNo);
        CommonSuccessResponse commonSuccessResponse = new CommonSuccessResponse();
        commonSuccessResponse.setMessage("계좌가 성공적으로 해지되었습니다.");
        return commonSuccessResponse;
    }

    @GetMapping("/{payId}")
    @ResponseBody
    public CommonResponse getAccountByPayId(@PathVariable int payId) {
        List<AccountDTO> accountDTOList = accountService.getAccountsByPayId(payId);
        Map<String, Object> response = new HashMap<>();

        if (!accountDTOList.isEmpty()) {
//            // 조회 성공 응답
//            response.put("status", HttpStatus.OK.value());
//            response.put("message", "조회 성공");

            List<Map<String, String>> accountInfos = new ArrayList<>();
            for (AccountDTO accountDTO : accountDTOList) {
                Map<String, String> accountInfo = new HashMap<>();
                accountInfo.put("bankCode", accountDTO.getBankCode());
                accountInfo.put("accountNo", accountDTO.getAccountNo());
                accountInfo.put("mainAccountYN", accountDTO.getMainAccountYN());
                accountInfos.add(accountInfo);
            }

//            Map<String, List<Map<String, String>>> data = new HashMap<>();
            response.put("accounts", accountInfos);
//            data.put("accounts", accountInfos);
//            response.put("data", data);
        } else {
            // 계좌가 없을 때 응답
//            response.put("status", HttpStatus.NOT_FOUND.value());
//            response.put("message", "해당 payId에 연결된 계좌가 없습니다.");
            return new CommonFailResponse("현재 등록된 계좌가 없습니다.");
        }

        return new CommonSuccessResponse(response);
    }


}


