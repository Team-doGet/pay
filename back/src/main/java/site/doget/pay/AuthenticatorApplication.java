package site.doget.pay;

import site.doget.pay.common.googleTOTP.TOTPTokenGenerator;

import java.util.Scanner;

public class AuthenticatorApplication {
    public static void main(String[] args) {
        validAuthenticatorCode();
    }

    private static void validAuthenticatorCode() {
        Scanner scanner = new Scanner(System.in);
        String code = scanner.nextLine();
    }

    private static void generateSecurityKey() {
        // secretKey 생성
        String secretKey = TOTPTokenGenerator.generateSecretKey();
        String account = "dydwns2564@naver.com";
        String issuer = "test";
        // secretKey + account + issuer => QR 바코드 생성
        String barcodeUrl = TOTPTokenGenerator.getGoogleAuthenticatorBarcode(secretKey, account, issuer);
    }
}
