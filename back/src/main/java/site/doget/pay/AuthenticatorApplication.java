package site.doget.pay;

import site.doget.pay.common.googleTOTP.TOTPTokenGenerator;

import java.util.Scanner;

public class AuthenticatorApplication {
    public static void main(String[] args) {
//        generateSecurityKey();
        validAuthenticatorCode();
    }

    private static void validAuthenticatorCode() {
        Scanner scanner = new Scanner(System.in);
        String code = scanner.nextLine();
//        if (TOTPTokenValidation.validate(code)) {
//            System.out.println("Logged in successfully");
//        } else {
//            System.out.println("Invalid 2FA Code");
//        }
    }

    private static void generateSecurityKey() {
        // secretKey 생성
        String secretKey = TOTPTokenGenerator.generateSecretKey();
        System.out.println(secretKey);
        String account = "dydwns2564@naver.com";
        String issuer = "test";
        // secretKey + account + issuer => QR 바코드 생성
        String barcodeUrl = TOTPTokenGenerator.getGoogleAuthenticatorBarcode(secretKey, account, issuer);
        System.out.println(barcodeUrl);
    }
}
