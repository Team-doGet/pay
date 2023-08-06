package site.doget.pay.pay.collect.controller;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.pay.collect.repository.CollectDTO;
import site.doget.pay.pay.collect.service.CollectService;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;
import site.doget.pay.pay.transfer.DTO.TransferReqDTO;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/collect")
public class CollectController {

    @Autowired
    CollectService collectService;

    @PostMapping("/decode")
    @ResponseBody
    public CommonResponse collectDecodeGet(@RequestBody Map<String, Object> paramMap) {

        if(String.valueOf(paramMap.get("encoded")) == null || String.valueOf(paramMap.get("encoded")).length() < 30)
            return new CommonFailResponse();

        String decodedData = collectService.decryptPath(String.valueOf(paramMap.get("encoded")));
        Map<String, Object> resMap = collectService.parseQueryString(decodedData);

        return new CommonSuccessResponse(resMap);
    }

    /**
     * Post 방식으로 수금할 사람의 ID, 수금할 금액을 받아 전송 링크와 QR코드를 생성해 전송
     *
     * @param paramMap receiver ID, amount
     * @return statue, msg, link, qr code
     */
    @PostMapping("/*")
    @ResponseBody
    public CommonResponse collectPayMoneyPost(@RequestBody Map<String, Object> paramMap) throws Exception {

        CollectDTO collectDTO = collectService.genereatePayCollectData(paramMap);
        return new CommonSuccessResponse(collectDTO);
    }
}
