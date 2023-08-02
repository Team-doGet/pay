package site.doget.pay.pay.withdraw.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.service.SmsService;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;
import site.doget.pay.pay.withdraw.repository.WithdrawMapper;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.Map;

@Transactional
@Service
public class WithdrawService {
    DecimalFormat formatter = new DecimalFormat("###,###");

    private final WithdrawMapper withdrawMapper;

    @Autowired
    private SmsService smsService;

    @Autowired
    public WithdrawService(WithdrawMapper withdrawMapper) {
        this.withdrawMapper = withdrawMapper;
    }

    @Transactional
    public CommonResponse processWithdraw(int payId, long amount) throws Exception {
        if (amount <= 0) {
            return new CommonFailResponse("0 보다 큰 금액을 입력해주세요");
        }

        Map<String, Object> balances = withdrawMapper.getPaymoneyAndAccountMoney(payId);
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

            paymoneyBalance -= amount;
            accountBalance += amount;

            withdrawPaymoney(params);
            chargeAccountMoney(params);

            params.put("accountNo", accountNo);
            params.put("payId", payId);
            params.put("bankCode", bankCode);
            params.put("paymoneyBalance", paymoneyBalance);
            params.put("amount", amount);

            insertToHistory(params);

            Map<String, Object> response = new HashMap<>();
            response.put("paymoneyBalance", paymoneyBalance);

            smsService.sendSms(new MessageDTO("01092510383", "[doGet-Pay]\n인출이 정상적으로 완료되었습니다.\n인출 금액 : " + formatter.format(amount)
                + "원\n\n잔액 : " + formatter.format(paymoneyBalance) + "원"));

            return new CommonSuccessResponse(response);
        }

        return new CommonFailResponse("잔액보다 인출 금액이 큽니다. 다시 확인해주세요.");
    }

    public Map<String, Object> getBalance(int payId) {
        return withdrawMapper.getPaymoneyAndAccountMoney(payId);
    }

    public Integer withdrawPaymoney(Map<String, Object> paramMap) {
        return withdrawMapper.withdrawPaymoney(paramMap);
    }

    public Integer chargeAccountMoney(Map<String, Object> paramMap) {
        return withdrawMapper.chargeAccountMoney(paramMap);
    }

    public void insertToHistory(Map<String, Object> paramMap) {
        withdrawMapper.insertToHistory(paramMap);
    }
}
