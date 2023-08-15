package site.doget.pay.pay.transfer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.pay.charge.repository.ChargeMapper;
import site.doget.pay.pay.pay.repository.PayMapper;
import site.doget.pay.pay.transfer.repository.TransferMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static site.doget.pay.common.Util.getNowTime;

@Transactional
@Service
public class TransferService {

    @Autowired
    TransferMapper transferMapper;
    @Autowired
    ChargeMapper chargeMapper;
    @Autowired
    PayMapper payMapper;

    public CommonResponse payTransferService(Map<String, Object> paramMap) {
        // receiver 회원 일치 존재 여부 확인
        if(findUserByPhone((String) paramMap.get("receiver")).isEmpty()) {
            return new CommonFailResponse("존재하지않는 받는 사람 정보입니다.");
        }
        // sender 페이 계좌 조회
        Optional<Long> senderAccountAmount = getPayAccount(paramMap);
        if(senderAccountAmount.isEmpty()) {
            return new CommonFailResponse("페이 계좌 정보가 없습니다.");
        }

        // 페이머니 부족 시 계좌로부터 충전
//        if(senderAccountAmount.get() - (Long) paramMap.get("amount") < 0) {
//            int needAccountMoney = (int) ((((Long) paramMap.get("amount") - senderAccountAmount.get()) / 10000 + 1)*10000);
//            // 계좌에서 인출
//            Map<String, Object> withdrawReq = new HashMap<>();
//            withdrawReq.put("amount", needAccountMoney);
//            withdrawReq.put("payId", dto.getSender());
//            chargeMapper.withdrawAccountMoney(withdrawReq);
//
//            // 페이머니에 충전
//            Map<String, Object> chargeReq = new HashMap<>();
//            chargeReq.put("amount", needAccountMoney);
//            chargeReq.put("payId", dto.getSender());
//            chargeMapper.chargePaymoney(chargeReq);
//
//            // 충전 기록 남기기
//            Map<String, Object> historyReq = new HashMap<>();
//            historyReq.put("accountNo", findUserByPhone(dto.getReceiver()));
//            historyReq.put("payId", dto.getSender());
//            historyReq.put("bankCode", "002");
//            historyReq.put("paymoneyBalance", senderAccountAmount.get() + Math.round((float) (dto.getAmount() - senderAccountAmount.get()) / 10000) * 10000);
//            historyReq.put("amount", Math.round((float) (dto.getAmount() - senderAccountAmount.get()) / 10000) * 10000);
//            chargeMapper.insertToHistory(historyReq);
//
//        }

        if(withDrawPayAccount(paramMap) == 0 || chargePayAccount(paramMap) == 0) {
            return new CommonFailResponse("페이머니 인출 중 에러");
        }

//        // 결제 기록 거래내역에 남기기
//        Map<String, Object> accountInfo = payMapper.getAccountInfo(dto.getSender());
//        if (accountInfo == null) {
//            return new CommonFailResponse("등록된 계좌가 없습니다.");
//        }
//        int accountBalance = (int) accountInfo.get("accountBalance");
//        String accountNo = (String) accountInfo.get("accountNo");
//        String bankCode = (String) accountInfo.get("bankCode");
//
//        int updatedPayBalance = payMapper.getPaymoneyBalance(dto.getSender());
//        Map<String, Object> historyReq = new HashMap<>();
//        historyReq.put("payId", dto.getSender());
//        historyReq.put("paymoneyBalance", updatedPayBalance);
//        historyReq.put("amount", dto.getAmount());
//        historyReq.put("storeName", dto.getReceiver());
//        historyReq.put("accountNo", accountNo);
//        historyReq.put("bankCode", bankCode);
//        payMapper.insertToHistory(historyReq);

        Map<String, Object> result = new HashMap<>();
        result.put("amount", paramMap.get("amount"));
        result.put("date", getNowTime());
        result.put("receiver", paramMap.get("receiver"));

        return new CommonSuccessResponse(result);
    }

    public Optional<Integer> findUserByPhone(String receiver) {

        return transferMapper.findUserByPhone(receiver);
    }

    public Optional<Long> getPayAccount(Map<String, Object> paramMap) {

        return transferMapper.getPayAccount((String) paramMap.get("sender"));
    }

    public Integer withDrawPayAccount(Map<String ,Object> paramMap) {

        return transferMapper.withDrawPayAccount(paramMap);
    }

    public Integer chargePayAccount(Map<String ,Object> paramMap) {

        paramMap.put("receiver", transferMapper.findUserByPhone((String) paramMap.get("receiver")).get());
        return transferMapper.chargePayAccount(paramMap);
    }

}