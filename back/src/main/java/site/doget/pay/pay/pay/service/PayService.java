package site.doget.pay.pay.pay.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.service.SmsService;
import site.doget.pay.pay.charge.repository.ChargeMapper;
import site.doget.pay.pay.pay.repository.PayMapper;
import site.doget.pay.pay.transfer.repository.TransferMapper;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PayService {

    DecimalFormat formatter = new DecimalFormat("###,###");

    @Autowired
    private SmsService smsService;

    @Autowired
    private PayMapper payMapper;
    @Autowired
    private ChargeMapper chargeMapper;

    public Optional<String> getStoreInfo(String storeId) {
        return payMapper.getStore(storeId);
    }

    @Transactional
    public Map<String, Object> payment(String userId, int amount, String storeName) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        int paymoneyBalance = payMapper.getPaymoneyBalance(userId);

        // 페이머니가 결제금액보다 클 경우 자동 충전
        if (amount > paymoneyBalance) {
            Map<String, Object> accountInfo = payMapper.getAccountInfo(userId);
            if (accountInfo == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "등록된 계좌가 없습니다.");
                return error;
            }
            int accountBalance = (int) accountInfo.get("accountBalance");
            String accountNo = (String) accountInfo.get("accountNo");
            String bankCode = (String) accountInfo.get("bankCode");

            int needAccountMoney = (int) (Math.ceil((float) (amount - paymoneyBalance) / 10000) * 10000);
            if (accountBalance < needAccountMoney) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "주계좌 잔액을 확인해주세요.");
                return error;
            }
            Map<String, Object> chargeReq = new HashMap<>();

            // 계좌에서 인출
            Map<String, Object> withdrawReq = new HashMap<>();
            withdrawReq.put("amount", needAccountMoney);
            withdrawReq.put("payId", userId);
            chargeMapper.withdrawAccountMoney(withdrawReq);

            // 페이머니에 충전
            chargeReq.put("amount", needAccountMoney);
            chargeReq.put("payId", userId);
            chargeMapper.chargePaymoney(chargeReq);

            // 충전 기록 거래내역에 남기기
            Map<String, Object> historyReq = new HashMap<>();
            historyReq.put("accountNo", accountNo);
            historyReq.put("payId", userId);
            historyReq.put("bankCode", bankCode);
            historyReq.put("paymoneyBalance", paymoneyBalance + Math.round((float) (amount - paymoneyBalance) / 10000) * 10000);
            historyReq.put("amount", Math.round((float) (amount - paymoneyBalance) / 10000) * 10000);
            chargeMapper.insertToHistory(historyReq);
        }

        // 페이머니에서 업데이트
        Map<String, Object> withdrawReq = new HashMap<>();
        withdrawReq.put("amount", amount);
        withdrawReq.put("payId", userId);
        payMapper.withdrawPayMoney(withdrawReq);

        // 결제 기록 거래내역에 남기기
        Map<String, Object> accountInfo = payMapper.getAccountInfo(userId);
        if (accountInfo == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "등록된 계좌가 없습니다.");
            return error;
        }
        int accountBalance = (int) accountInfo.get("accountBalance");
        String accountNo = (String) accountInfo.get("accountNo");
        String bankCode = (String) accountInfo.get("bankCode");

        int updatedPayBalance = payMapper.getPaymoneyBalance(userId);
        Map<String, Object> historyReq = new HashMap<>();
        historyReq.put("payId", userId);
        historyReq.put("paymoneyBalance", updatedPayBalance);
        historyReq.put("amount", amount);
        historyReq.put("storeName", storeName);
        historyReq.put("accountNo", accountNo);
        historyReq.put("bankCode", bankCode);
        payMapper.insertToHistory(historyReq);

        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter1);

        Map<String, Object> res = new HashMap<>();
        res.put("amount", amount);
        res.put("dateTime", formattedDateTime);
        res.put("storeName", storeName);
        long a =  Long.parseLong(String.valueOf(res.get("amount")));
        smsService.sendSms(new MessageDTO("01055373077", "[doGet-Pay]\n결제가 정상적으로 완료되었습니다.\n결제 금액 : " + formatter.format(a)
                + "원\n\n잔액 : " + formatter.format(Long.parseLong(String.valueOf(updatedPayBalance))) + "원"));

        return res;
    }

}
