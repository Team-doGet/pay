package site.doget.pay.pay.withdraw.controller;

import org.springframework.web.bind.annotation.*;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.pay.withdraw.service.WithdrawService;

import java.util.Map;

@RestController
@RequestMapping("/withdraw")
public class WithdrawController {

    private final WithdrawService withdrawService;

    public WithdrawController(WithdrawService withdrawService) {
        this.withdrawService = withdrawService;
    }

    @PostMapping("/withdraw")
    @ResponseBody
    public CommonResponse withdraw(@RequestBody Map<String, Object> paramMap) throws Exception {
        Integer payId = Integer.parseInt(String.valueOf(paramMap.get("payId")));
        Long amount = Long.parseLong(String.valueOf(paramMap.get("amount")));
        String accountNo = (String) paramMap.get("accountNo");


        return withdrawService.processWithdraw(payId, amount, accountNo);
    }
}
