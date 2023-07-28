package site.doget.pay.pay.transfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.pay.transfer.service.TransferService;
import site.doget.pay.pay.transfer.transferDTO.TransferRequestBody;
import site.doget.pay.pay.transfer.transferDTO.TransferResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/transfer")
public class TransferController {

    @Autowired
    TransferService transferService;

    @GetMapping ("/*")
    @ResponseBody
    public int payTransfer(@RequestParam String userId) {
        System.out.println(userId);

        // userID로 전체 잔액 return
        // transferService.getUserNo(userId);

        return 10000;
    }

    @PostMapping("/*")
    @ResponseBody
    public TransferResponseBody payTransfer(@RequestBody TransferRequestBody tbody) {
        TransferResponseBody tResBody = new TransferResponseBody();

        showRequestBody(tbody);

        String nowTime = getNowTime();
        System.out.println("nowTime = " + nowTime);

        System.out.println("findUser(tbody.getReceiver()) = " + transferService.findUser(tbody.getReceiver()));
        // receiver 회원 일치 존재 여부 확인 - 에러처리
        if(transferService.findUser(tbody.getReceiver()) == 0) {
            //receiver 정보 없음
            tResBody.setStatus(400);
            tResBody.setMessage("받는 사람 정보가 없다.");
        }

        // sender 페이 계좌 조회 후 잔액부족 여부 검사 - 에러처리
        transferService.isNomoney(tbody.getSender());

        // 둘 다 확인 후 sender에서 돈 빼고, 임시 변수에 저장 후 receiver에 송금
        int tempBank = transferService.getMoney();
        transferService.addMoney();

        // 성공시 성공코드와 결과 반환

        return tResBody;
    }

    private void showRequestBody(TransferRequestBody tbody) {
        System.out.println("------------RequestBody Test-------------");
        System.out.println("tbody sender = " + tbody.getSender());
        System.out.println("tbody receiver = " + tbody.getReceiver());
        System.out.println("tbody amount = " + tbody.getAmount());
        System.out.println("tbody message = " + tbody.getMessage());
    }

    private String getNowTime() {
        return new SimpleDateFormat("yyyyMMdd").format(new Date());
    }
}