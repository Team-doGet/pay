package site.doget.pay.pay.transfer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.pay.transfer.DTO.TransferAccountDTO;
import site.doget.pay.pay.transfer.service.TransferService;
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

        paramMap.put("sender", paramMap.get("userId"));
        Optional<Integer> senderAccountAmount = transferService.getPayAccount(paramMap);
        // 계좌 유무
        if(senderAccountAmount.isEmpty()) {
            return new CommonFailResponse("해당 사용자가 없습니다");
        }
        return new CommonSuccessResponse(new TransferAccountDTO(senderAccountAmount.get()));
    }

    @PostMapping("/*")
    @ResponseBody
    public CommonResponse payTransferPost(@RequestBody Map<String, Object> paramMap) {
        return transferService.payTransferService(paramMap);
    }
}