package site.doget.pay.pay.pay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;
import site.doget.pay.pay.pay.service.PayService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/pay")
public class PayController {

    @Autowired
    private PayService payService;

    @GetMapping
    public CommonResponse getStoreInfo(@RequestParam String storeId) {
        if (storeId == null) {
            return new CommonFailResponse("존재하지 않는 상점입니다.");
        }

        Optional<String> storeInfo = payService.getStoreInfo(storeId);
        if (storeInfo.isPresent()) {
            Map<String, Object> result = new HashMap<>();
            result.put("storeName", storeInfo);
            return new CommonSuccessResponse("상점 정보를 성공적으로 불러왔습니다.", result);
        }

        return new CommonFailResponse("존재하지 않는 상점입니다.");
    }

    @PostMapping
    public CommonResponse requestPayment(@RequestBody Map<String, Object> payReq) {
        String userId = (String) payReq.get("userId");
        int amount = (int) payReq.get("amount");
        String storeName = (String) payReq.get("storeName");

        if (userId == null || amount == 0 || storeName == null) {
            return new CommonFailResponse("결제에 실패하였습니다. 입력한 정보를 확인하세요.");
        }

        Map<String, Object> result = payService.payment(userId, amount, storeName);
        if (result != null) {
            return new CommonSuccessResponse("결제가 성공적으로 완료되었습니다.", result);
        }
        return new CommonFailResponse("결제에 실패하였습니다. 주계좌 잔액을 확인하세요.");
    }

}
