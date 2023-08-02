package site.doget.pay.pay.charge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.service.SmsService;
import site.doget.pay.pay.charge.repository.ChargeMapper;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

@Transactional
@Service
public class ChargeService {
    DecimalFormat formatter = new DecimalFormat("###,###");

    private final ChargeMapper chargeMapper;

    @Autowired
    private SmsService smsService;

    @Autowired
    public ChargeService(ChargeMapper chargeMapper) {
        this.chargeMapper = chargeMapper;
    }

    @Transactional
    public CommonResponse processCharge(int payId, long amount) throws Exception {
        if (amount <= 0) {
            return new CommonFailResponse("0 보다 큰 금액을 입력해주세요");
        }

        Map<String, Object> balances = chargeMapper.getPaymoneyAndAccountMoney(payId);
        if (balances == null) {
            return new CommonFailResponse("등록된 계좌가 없습니다.");
        }

        long paymoneyBalance = Long.parseLong(String.valueOf(balances.get("paymoneyBalance")));
        long accountBalance = Long.parseLong(String.valueOf(balances.get("accountBalance")));
        String accountNo = (String) balances.get("accountNo");
        String bankCode = (String) balances.get("bankCode");

        if (amount <= accountBalance) {
            Map<String, Object> params = new HashMap<>();
            params.put("payId", payId);
            params.put("amount", amount);

            paymoneyBalance += amount;
            accountBalance -= amount;

            chargePaymoney(params);
            withdrawAccountMoney(params);

            params.put("accountNo", accountNo);
            params.put("payId", payId);
            params.put("bankCode", bankCode);
            params.put("paymoneyBalance", paymoneyBalance);
            params.put("amount", amount);

            insertToHistory(params);

            Map<String, Object> response = new HashMap<>();
            response.put("paymoneyBalance", paymoneyBalance);

            smsService.sendSms(new MessageDTO("01092510383", "[doGet-Pay]\n충전이 정상적으로 완료되었습니다.\n충전 금액 : " + formatter.format(amount)
                + "원\n\n잔액 : " + formatter.format(paymoneyBalance) + "원"));

            return new CommonSuccessResponse(response);
        }
        return new CommonFailResponse("잔액보다 충전 금액이 큽니다. 다시 확인해주세요.");
    }

    public Map<String, Object> getBalance(int payId) {
        return chargeMapper.getPaymoneyAndAccountMoney(payId);
    }

    public Integer chargePaymoney(Map<String, Object> paramMap) {
        return chargeMapper.chargePaymoney(paramMap);
    }

    public Integer withdrawAccountMoney(Map<String, Object> paramMap) {
        return chargeMapper.withdrawAccountMoney(paramMap);
    }

    public void insertToHistory(Map<String, Object> paramMap) {
        chargeMapper.insertToHistory(paramMap);
    }
}
