package site.doget.pay.common.googleTOTP.service;

import de.taimos.totp.TOTP;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import site.doget.pay.common.googleTOTP.TOTPTokenGenerator;
import site.doget.pay.common.googleTOTP.repository.TOTPMapper;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Map;

@Service
public class TOTPService {

    public final TOTPMapper totpMapper;

    private final JavaMailSender emailSender;

    @Autowired
    public TOTPService(TOTPMapper totpMapper, JavaMailSender emailSender) {
        this.totpMapper = totpMapper;
        this.emailSender = emailSender;
    }

    public String getSecretKey(Map<String, Object> paramMap) {
        String userId = (String) paramMap.get("user_id");
        return totpMapper.getSecretKey(userId);
    }

    public CommonResponse updateSecretKey(Map<String, Object> paramMap) throws MessagingException {
        String emailNo = (String) paramMap.get("emailNo");

        String newSecretKey = TOTPTokenGenerator.generateSecretKey();
        String barcodeURL = TOTPTokenGenerator.getGoogleAuthenticatorBarcode(newSecretKey, emailNo, "doGet Pay");

        String fromMail = "doget2023@gmail.com";
        String title = "doGet페이 구글 Authenticator 등록";
        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, emailNo);
        message.setSubject(title);
        message.setFrom(fromMail);
        message.setText(barcodeURL, "utf-8");
        emailSender.send(message);


        paramMap.put("newSecretKey", newSecretKey);

        totpMapper.updateSecretKey(paramMap);

        return new CommonSuccessResponse();
    }

    public CommonResponse secretKeyToNull(Map<String, Object> paramMap) {
        String userId = (String) paramMap.get("userId");

        totpMapper.secretKeyToNull(userId);
        return new CommonSuccessResponse();
    }

    public CommonResponse validate(String inputCode, Map<String, Object> paramMap) {
        String code = getTOTPCode(paramMap);
        if (code.equals(inputCode)) {
            return new CommonSuccessResponse("인증 성공");
        } else {
            return new CommonFailResponse("인증 실패");
        }
    }

    private String getTOTPCode(Map<String, Object> paramMap) {
        String secretKey = getSecretKey(paramMap);
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(secretKey);
        String hexKey = Hex.encodeHexString(bytes);
        return TOTP.getOTP(hexKey);
    }
}
