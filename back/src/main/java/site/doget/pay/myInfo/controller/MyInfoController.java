package site.doget.pay.myInfo.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import site.doget.pay.myInfo.service.MyInfoService;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("/myInfo")
public class MyInfoController {

	private final MyInfoService myInfoService;

	@PostMapping("/password")
	public CommonResponse passwordConfig(@RequestBody Map<String, Object> newPassword) {
		String userId = (String) newPassword.get("userId");
		String passwordNo = (String) newPassword.get("passwordNo");
		// 공백 검증
		if (passwordNo == null) {
			return new CommonFailResponse("비밀번호는 필수값입니다.");
		}
			
		if (myInfoService.reConfigPassword(userId, passwordNo) >= 1) {
			return new CommonSuccessResponse("비밀번호 변경 성공");
		} else {
			return new CommonFailResponse("비밀번호 변경 실패");
		}
	}

	@PostMapping("/resetpassword")
	public CommonResponse resetpasswordConfig(@RequestBody Map<String, String> newresetPassword) {
		String userId = newresetPassword.get("userId");
		String newSimplePassword = newresetPassword.get("newSimplePassword");
		
		// 비밀번호 공백 검증
		if (newSimplePassword == null) {
			return new CommonFailResponse("비밀번호는 필수값입니다.");
		}
		// 간편 비밀번호 업데이트 (숫자 6자리)
		boolean updateSuccess = myInfoService.reConfigSimplePassword(userId, newSimplePassword);

		if (updateSuccess) {
			return new CommonSuccessResponse("간편 비밀번호가 업데이트되었습니다.");
		} else {
			return new CommonFailResponse("간편 비밀번호 업데이트에 실패하였습니다.");
		}
	}

	@PostMapping("/checkOldPassword")
	public CommonResponse checkOldPassword(@RequestBody Map<String, Object> oldPasswordData) {
		String userId = (String) oldPasswordData.get("userId");
		String oldPassword = (String) oldPasswordData.get("oldPassword");

		// 기존 비밀번호가 데이터베이스에 저장된 비밀번호와 일치하는지 확인
		boolean isPasswordCorrect = myInfoService.checkOldPassword(userId, oldPassword);

		if (isPasswordCorrect) {
			return new CommonSuccessResponse(" 비밀번호가 일치합니다.");
		} else {
			return new CommonFailResponse(" 비밀번호가 일치하지 않습니다.");
		}
	}

	@PostMapping("/checkOldSimplePassword")
	public CommonResponse checkOldSimplePassword(@RequestBody Map<String, String> oldSimplePasswordData) {
		String userId = oldSimplePasswordData.get("userId");
		String oldSimplePassword = oldSimplePasswordData.get("oldSimplePassword");

		// 기존 간편 비밀번호가 데이터베이스에 저장된 간편 비밀번호와 일치하는지 확인
		boolean isSimplePasswordCorrect = myInfoService.checkOldSimplePassword(userId, oldSimplePassword);

		if (isSimplePasswordCorrect) {
			return new CommonSuccessResponse(" 간편 비밀번호가 일치합니다.");
		} else {
			return new CommonFailResponse(" 간편 비밀번호가 일치하지 않습니다.");
		}
	}
}