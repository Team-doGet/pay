package site.doget.pay.openAPI.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.dto.SmsResponseDTO;
import site.doget.pay.openAPI.service.SmsService;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;
import site.doget.pay.user.repository.UserMapper;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import static site.doget.pay.openAPI.service.SmsService.createSmsKey;

@Controller
@RequiredArgsConstructor
@RequestMapping("/sms")
public class SmsController {

    private final SmsService smsService;
    private final UserMapper userMapper;

    @PostMapping("/send")
    public String sendSms(MessageDTO messageDto, Model model) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        SmsResponseDTO response = smsService.sendSms(messageDto);
        model.addAttribute("response", response);
        return "result";
    }

    @PostMapping("/join/auth")
    @ResponseBody
    public CommonResponse sendAuth(@RequestBody Map<String, Object> smsReq) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        String phoneNo = (String) smsReq.get("authId");
        try {
            String authCode = smsService.sendAuth(phoneNo);
            HashMap<String, Object> resData = new HashMap<>();
            resData.put("authCode", authCode);
            return new CommonSuccessResponse("인증번호가 전송되었습니다.", resData);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new CommonFailResponse("인증번호 전송에 실패하였습니다.");
    }

    @GetMapping("/join/auth")
    @ResponseBody
    public CommonResponse checkAuth(@RequestParam("authId") String phoneNo, @RequestParam("authCode") String authCode) {
        String result = smsService.checkAuth(phoneNo, authCode);
        if (result == null) {
            return new CommonFailResponse("인증번호가 일치하지않습니다.");
        }
        return new CommonSuccessResponse("인증번호가 일치합니다.");
    }
}
