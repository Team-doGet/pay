package site.doget.pay.pay.transfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.pay.transfer.DTO.TransferAccountDTO;
import site.doget.pay.pay.transfer.DTO.TransferDTO;
import site.doget.pay.pay.transfer.service.TransferService;
import site.doget.pay.pay.transfer.DTO.TransferReqDTO;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/transfer")
public class TransferController {

    @Autowired
    TransferService transferService;

    /**
     * userId를 통해 pay 계좌의 전체 잔액을 return
     *
     * @param paramMap userId:String
     */
    @GetMapping ("/*")
    @ResponseBody
    public CommonResponse payTransferGet(@RequestParam Map<String, Object> paramMap) {

        Optional<Long> senderAccountAmount = transferService.getPayAccount((String) paramMap.get("userId"));

        // 계좌 유무
        if(senderAccountAmount.isEmpty()) {
            return new CommonFailResponse("해당 사용자가 없습니다");
        }
        return new CommonSuccessResponse(new TransferAccountDTO(senderAccountAmount.get()));
    }

    @PostMapping("/*")
    @ResponseBody
    public CommonResponse payTransferPost(@RequestBody Map<String, Object> paramMap) {
        TransferReqDTO tReqDTO = new TransferReqDTO(paramMap);
//        System.out.println(tReqDTO.getReceiver()+"asdadad");

            // receiver 회원 일치 존재 여부 확인
            if(transferService.findUserByPhone(tReqDTO.getReceiver()).isEmpty()) {
                return new CommonFailResponse("존재하지않는 받는 사람 정보입니다.");
            }

            // sender 페이 계좌 조회 후 잔액부족 여부 검사
            Optional<Long> senderAccountAmount = transferService.getPayAccount(tReqDTO.getSender());
            if(senderAccountAmount.isEmpty()) {
                return new CommonFailResponse("페이 계좌 정보가 없습니다.");
                // service 단 에러처리 catch
            }
            else if(senderAccountAmount.get() - tReqDTO.getAmount() < 0) {
                return new CommonFailResponse("잔액 부족입니다.");
            }

        try {
            // sender 페이계좌에서 출금, receiver 페이계좌에 충전
            transferService.payTransferService(tReqDTO);
        } catch (Exception e) {
            return new CommonFailResponse("송금, 충전과정에서 문제 발생");
        } finally {
            // 성공시 성공코드 201과 결과 반환
            TransferDTO tDTO = new TransferDTO(tReqDTO.getAmount(), getNowTime(),tReqDTO.getReceiver());

            return new CommonSuccessResponse(tDTO);
        }
    }

    private String getNowTime() {
        return new SimpleDateFormat("yyyy.MM.dd HH:mm:ss").format(new Date());
    }
}