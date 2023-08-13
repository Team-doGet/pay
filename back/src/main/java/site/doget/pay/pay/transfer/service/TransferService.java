package site.doget.pay.pay.transfer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.pay.charge.repository.ChargeMapper;
import site.doget.pay.pay.pay.repository.PayMapper;
import site.doget.pay.pay.transfer.DTO.TransferDTO;
import site.doget.pay.pay.transfer.DTO.TransferReqDTO;
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

    public CommonResponse payTransferService(TransferReqDTO dto) throws Exception {

        // receiver 회원 일치 존재 여부 확인
        if(findUserByPhone(dto.getReceiver()).isEmpty()) {
            return new CommonFailResponse("존재하지않는 받는 사람 정보입니다.");
        }
        // sender 페이 계좌 조회 후 잔액부족 여부 검사
        Optional<Long> senderAccountAmount = getPayAccount(dto.getSender());
        if(senderAccountAmount.isEmpty()) {
            return new CommonFailResponse("페이 계좌 정보가 없습니다.");
        }

        // 페이머니 부족 시 계좌로부터 충전
        if(senderAccountAmount.get() - dto.getAmount() < 0) {
            // 부족한 금액이 n원 일 경우 계좌에서 충전할 금액 ((n/10000)+1)*10000
            // 부족한 금액 (10000원 단위)
            int needAccountMoney = (int) (((dto.getAmount() - senderAccountAmount.get()) / 10000 + 1)*10000);
            // 계좌에서 인출
            Map<String, Object> withdrawReq = new HashMap<>();
            withdrawReq.put("amount", needAccountMoney);
            withdrawReq.put("payId", dto.getSender());
            chargeMapper.withdrawAccountMoney(withdrawReq);

            // 페이머니에 충전
            Map<String, Object> chargeReq = new HashMap<>();
            chargeReq.put("amount", needAccountMoney);
            chargeReq.put("payId", dto.getSender());
            chargeMapper.chargePaymoney(chargeReq);

            // 충전 기록 남기기
            Map<String, Object> historyReq = new HashMap<>();
            historyReq.put("accountNo", findUserByPhone(dto.getReceiver()));
            historyReq.put("payId", dto.getSender());
            historyReq.put("bankCode", "002");
            historyReq.put("paymoneyBalance", senderAccountAmount.get() + Math.round((float) (dto.getAmount() - senderAccountAmount.get()) / 10000) * 10000);
            historyReq.put("amount", Math.round((float) (dto.getAmount() - senderAccountAmount.get()) / 10000) * 10000);
            chargeMapper.insertToHistory(historyReq);

        }

        Integer withDraw = withDrawPayAccount(dto);
        Integer chargePay = chargePayAccount(dto);

        if(withDraw == 0 || chargePay == 0) {
            return new CommonFailResponse("페이머니 인출 중 에러");
        }

        // 결제 기록 거래내역에 남기기
        Map<String, Object> accountInfo = payMapper.getAccountInfo(dto.getSender());
        if (accountInfo == null) {
            return new CommonFailResponse("등록된 계좌가 없습니다.");
        }
        int accountBalance = (int) accountInfo.get("accountBalance");
        String accountNo = (String) accountInfo.get("accountNo");
        String bankCode = (String) accountInfo.get("bankCode");

        int updatedPayBalance = payMapper.getPaymoneyBalance(dto.getSender());
        Map<String, Object> historyReq = new HashMap<>();
        historyReq.put("payId", dto.getSender());
        historyReq.put("paymoneyBalance", updatedPayBalance);
        historyReq.put("amount", dto.getAmount());
        historyReq.put("storeName", dto.getReceiver());
        historyReq.put("accountNo", accountNo);
        historyReq.put("bankCode", bankCode);
        payMapper.insertToHistory(historyReq);

        TransferDTO tDTO = new TransferDTO(dto.getAmount(), getNowTime(),dto.getReceiver());

        return new CommonSuccessResponse(tDTO);
    }

    public Optional<Integer> findUserByPhone(String receiver) {

        return transferMapper.findUserByPhone(receiver);
    }

    @Transactional
    public Optional<Long> getPayAccount(String sender) {

        return transferMapper.getPayAccount(sender);
    }

    public Integer withDrawPayAccount(TransferReqDTO dto) {

        return transferMapper.withDrawPayAccount(dto);
    }

    public Integer chargePayAccount(TransferReqDTO dto) {

        dto.setReceiver(transferMapper.findUserByPhone(dto.getReceiver()).get().toString());
        return transferMapper.chargePayAccount(dto);
    }

    public void createHistory() {

    }
}