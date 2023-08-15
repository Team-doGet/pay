package site.doget.pay.common.googleTOTP.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.doget.pay.common.googleTOTP.service.TOTPService;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;

import javax.mail.MessagingException;
import java.util.Map;

@RestController
@RequestMapping("/totp")
public class TOTPController {

    public final TOTPService totpService;

    public TOTPController(TOTPService totpService) {
        this.totpService = totpService;
    }
    // secretkey 넣는거
    @PostMapping("/update")
    public CommonResponse updateTOTP(@RequestBody  Map<String, Object> paramMap) {
        try {
            totpService.updateSecretKey(paramMap);
            return new CommonSuccessResponse();
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return new CommonFailResponse();
    }
    // null로 바꾸는거
    @PostMapping("/stop")
    public CommonResponse stopTOTP(@RequestBody Map<String, Object> paraMap) {
        return totpService.secretKeyToNull(paraMap);
    }
    // 검증
    @PostMapping("/validate")
    public CommonResponse validateTOTP(String inputCode, Map<String, Object> paramMap) {
        return totpService.validate(inputCode, paramMap);
    }
}
