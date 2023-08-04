package site.doget.pay.openAPI.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.openAPI.service.EmailService;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/join/auth")
    @ResponseBody
    public CommonResponse sendAuth(@RequestBody Map<String, Object> getAuthReq) {
        String emailNo = (String) getAuthReq.get("emailNo");
        try {
            String authCode = emailService.sendEmail(emailNo);
            Map<String, Object> data = new HashMap<>();
            data.put("authCode", authCode);
            return new CommonSuccessResponse("인증번호가 전송되었습니다.", data);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return new CommonFailResponse("인증번호가 전송에 실패하였습니다.");
    }

    @GetMapping("/join/auth")
    @ResponseBody
    public CommonResponse checkAuth(@RequestParam String emailNo, @RequestParam String authCode) {
        if (emailService.checkAuth(emailNo, authCode)) {
            return new CommonSuccessResponse("인증번호가 일치합니다.");
        }
        return new CommonFailResponse("인증번호가 일치하지 않습니다.");
    }

}