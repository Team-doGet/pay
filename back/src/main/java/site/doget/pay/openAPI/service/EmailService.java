package site.doget.pay.openAPI.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender emailSender;
    private String authNumber;

    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i=0;i<8;i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNumber = key.toString();
    }

    public String sendEmail(String toMail) throws MessagingException {
        createCode();
        String fromMail = "doget2023@gmail.com";
        String title = "doGet페이 회원가입 인증번호";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(Message.RecipientType.TO, toMail);
        message.setSubject(title);
        message.setFrom(fromMail);
        message.setText(authNumber, "utf-8");
        emailSender.send(message);

        return authNumber;
    }

}
