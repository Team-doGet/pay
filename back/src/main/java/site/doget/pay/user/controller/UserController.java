package site.doget.pay.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.security.jwt.TokenInfo;
import site.doget.pay.user.DTO.JoinReqDTO;
import site.doget.pay.user.DTO.LoginReqDTO;
import site.doget.pay.user.DTO.LoginResultDTO;
import site.doget.pay.user.service.UserService;

@RestController
@Slf4j
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

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
        if (userInfo.getSimplePasswordNo() != null) {
            resData.put("simplePw", true);
        } else {
            resData.put("simplePw", false);
        }

        if (userInfo.getSecretKey() != null) {
            resData.put("fds", true);
        } else {
            resData.put("fds", false);
        }

        if (userInfo.getAccountNo() == null) {
            resData.put("accountNo", "");
            resData.put("bankCode", "");
        } else {
            resData.put("accountNo", userInfo.getAccountNo());
            resData.put("bankCode", userInfo.getBankCode());
        }

        CommonSuccessResponse res = new CommonSuccessResponse(resData);
        res.setMessage("로그인에 성공하였습니다.");
        return res;
    }

    @PostMapping("/join")
    public CommonResponse join(@RequestBody JoinReqDTO joinReq, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String message = "";
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                message = fieldError.getDefaultMessage();
            }
            return new CommonFailResponse(message);
        }

        try {
            userService.join(joinReq);
            return new CommonSuccessResponse("회원가입에 성공하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return new CommonFailResponse("이미 가입된 계정입니다.");
        }

    }

    @PostMapping("/simplepw/check")
    public CommonResponse checkSimplePw(@RequestBody Map<String, Object> req) {
        String userId = (String) req.get("userId");
        String simplePw = (String) req.get("simplePw");

        if (userService.checkSimplePw(userId, simplePw)) {
            return new CommonSuccessResponse("간편비밀번호가 일치합니다.");
        }

        return new CommonFailResponse("간편비밀번호가 일치하지 않습니다.");
    }

    @PostMapping("/simplepw/register")
    public CommonResponse regSimplePw(@RequestBody Map<String, Object> req) {
        String userId = (String) req.get("userId");
        String simplePw = (String) req.get("simplePw");
        if (userService.regSimplePw(userId, simplePw)) {
            return new CommonSuccessResponse("간편 비밀번호가 등록되었습니다.");
        }
        return new CommonFailResponse("간편 비밀번호 등록에 실패하였습니다.");
    }

}
