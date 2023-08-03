package site.doget.pay.openAPI.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.dto.SmsRequestDTO;
import site.doget.pay.openAPI.dto.SmsResponseDTO;
import site.doget.pay.user.repository.UserMapper;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@RequiredArgsConstructor
@Service
public class SmsService {

    private final UserMapper userMapper;

    @Value("${naver-cloud-sms.accessKey}")
    private String accessKey;

    @Value("${naver-cloud-sms.secretKey}")
    private String secretKey;

    @Value("${naver-cloud-sms.serviceId}")
    private String serviceId;

    @Value("${naver-cloud-sms.senderPhone}")
    private String phone;

    // Signature 필드 값 생성 메소드
    public String makeSignature(Long time) throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String method = "POST";
        String url = "/sms/v2/services/" + this.serviceId + "/messages";
        String timestamp = time.toString();
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
            .append(method)
            .append(space)
            .append(url)
            .append(newLine)
            .append(timestamp)
            .append(newLine)
            .append(accessKey)
            .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

    // 문자 보내기
    public SmsResponseDTO sendSms(MessageDTO messageDto) throws JsonProcessingException, RestClientException, URISyntaxException, InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException {
        Long time = System.currentTimeMillis();

        // 헤더에서 여러 설정값들을 잡아준다.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        // signature 서명
        headers.set("x-ncp-apigw-signature-v2", makeSignature(time));

        List<MessageDTO> messages = new ArrayList<>();
        // 보내는 사람(to)에게 내용(content)을 보냄.
        messages.add(messageDto);

        // 전체 json에 대한 메시지 만들기
        SmsRequestDTO request = SmsRequestDTO.builder()
            .type("SMS")
            .contentType("COMM")
            .countryCode("82")
            .from(phone)
            .content(messageDto.getContent())
            .messages(messages)
            .build();

        // 쌓아온 바디를 json 형태로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);
        // 위에서 조립한 jsonBody와 헤더를 조립
        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);

        // restTemplate로 post 요청을 보낸다. 별 일 없으면 202 코드 반환됨.
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        SmsResponseDTO response = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+ serviceId +"/messages"), httpBody, SmsResponseDTO.class);

        return response;
    }

    // 회원가입 인증번호 6자리(랜덤 값)
    public static String createSmsKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 6; i++) {
            key.append((rnd.nextInt(10)));
        }
        return key.toString();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public String sendAuth(String authId) throws UnsupportedEncodingException, URISyntaxException, NoSuchAlgorithmException, InvalidKeyException, JsonProcessingException {
        String authCode = createSmsKey();
        sendSms(new MessageDTO(authId, "[doGet-Pay]\n인증번호 ["+ authCode +"]를 입력해주세요."));
        userMapper.saveAuth(authId, authCode);
        return authCode;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public String checkAuth(String authId, String authCode) {
        try {
            Integer result = userMapper.checkAuth(authId, authCode);
            if (result >= 1) {
                return authCode;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
