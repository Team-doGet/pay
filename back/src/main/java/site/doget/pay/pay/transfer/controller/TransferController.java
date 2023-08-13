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
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static site.doget.pay.common.Util.getNowTime;

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
    public CommonResponse payTransferPost(@RequestBody Map<String, Object> paramMap) throws Exception {
        TransferReqDTO tReqDTO = new TransferReqDTO(paramMap);

        return transferService.payTransferService(tReqDTO);
    }
}