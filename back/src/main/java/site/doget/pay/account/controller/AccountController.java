package site.doget.pay.account.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.account.service.AccountService;
import site.doget.pay.pay.common.CommonResponse;

import java.util.Map;

@RestController
@RequestMapping("/pay/accounts")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/checkDuplicate")
    public CommonResponse checkDuplicate(@RequestBody Map<String, Object> paramMap) {
        String accountNo = (String) paramMap.get("accountNo");
        return accountService.isAccountDuplicate(paramMap);
    }

    @PostMapping("/register")
    @ResponseBody
    public CommonResponse registerAccount(@RequestBody Map<String, Object> paramMap) {
        return accountService.registerAccount(paramMap);
    }

    @PostMapping("/delete/{accountNo}")
    public CommonResponse deleteAccount(@PathVariable String accountNo) {
        return accountService.deleteAccount(accountNo);
    }

    @GetMapping("/{payId}")
    @ResponseBody
    public CommonResponse getAccountByPayId(@PathVariable int payId) {
        return accountService.getAccountsByPayId(payId);
    }

    @PostMapping("/updateMainAcc/{accountNo}")
    public CommonResponse updateMainAccount(@PathVariable String accountNo) {
        return accountService.updateMainAccount(accountNo);
    }
}
