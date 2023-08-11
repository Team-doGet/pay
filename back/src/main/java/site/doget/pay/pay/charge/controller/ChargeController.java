package site.doget.pay.pay.charge.controller;

import org.springframework.web.bind.annotation.*;
import site.doget.pay.pay.charge.service.ChargeService;
import site.doget.pay.common.responseUtil.CommonResponse;

import java.util.Map;

@RestController
@RequestMapping("/charge")
public class ChargeController {

    private final ChargeService chargeService;

    public ChargeController(ChargeService chargeService) {
        this.chargeService = chargeService;
    }

    @PostMapping("/charge")
    @ResponseBody
    public CommonResponse payCharge(@RequestBody Map<String, Object> paramMap) throws Exception {
        Integer payId = Integer.parseInt(String.valueOf(paramMap.get("payId")));
        Long amount = Long.parseLong(String.valueOf(paramMap.get("amount")));
        String accountNo = (String) paramMap.get("accountNo");

        return chargeService.processCharge(payId, amount, accountNo);
    }
}
