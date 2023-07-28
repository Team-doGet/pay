package site.doget.pay;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.service.SmsService;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;

import static site.doget.pay.openAPI.service.SmsService.createSmsKey;

@SpringBootTest
class PayApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	private SmsService smsService;

	// 인증번호 테스트
	@Test
	void sendSms() throws JsonProcessingException, ParseException, UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException {
		smsService.sendSms(new MessageDTO("01092510383", "[doGet-Pay 본인확인]\n인증번호 ["+createSmsKey() + "]를 입력해주세요.\n이 인증번호는 3분간 유효합니다."));
	}
}
