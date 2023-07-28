package site.doget.pay.user.controller;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;
import site.doget.pay.security.jwt.TokenInfo;
import site.doget.pay.user.DTO.LoginReqDTO;
import site.doget.pay.user.DTO.LoginResultDTO;
import site.doget.pay.user.service.UserService;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    public CommonResponse login(@RequestBody @Validated LoginReqDTO loginReq, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String message = "";
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                message = fieldError.getDefaultMessage();
            }
            return new CommonFailResponse(message);
        }

        TokenInfo token = null;
        try {
            token = userService.login(loginReq.getEmailNo(), loginReq.getPasswordNo());
        } catch (AuthenticationException e) {
            return new CommonFailResponse("아이디 또는 비밀번호가 일치하지 않습니다.");
        }

        LoginResultDTO userInfo = userService.getUserInfo(loginReq.getEmailNo());
        Map<String, Object> resData = new HashMap<>();
        resData.put("userId", userInfo.getUserId());
        resData.put("emailNo", userInfo.getEmailNo());
        resData.put("userName", userInfo.getUserName());
        resData.put("phoneNo", userInfo.getPhoneNo());
        resData.put("accessToken", token.getAccessToken());
        resData.put("refreshToken", token.getRefreshToken());

        CommonSuccessResponse res = new CommonSuccessResponse(resData);
        res.setMessage("로그인에 성공하였습니다.");
        return res;
    }

}
