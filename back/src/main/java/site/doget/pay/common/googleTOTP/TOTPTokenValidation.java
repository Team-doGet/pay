package site.doget.pay.common.googleTOTP;

import de.taimos.totp.TOTP;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Hex;

public class TOTPTokenValidation {
    private static String secretKey = "2M5Y576JUVSC6PJPN5ZDSRG3777X55HF";

    public static boolean validate(String inputCode) {
        String code = getTOTPCode();
        return code.equals(inputCode);
    }

    // OTP 검증 요청 때마다 개인키로 OTP 생성
    public static String getTOTPCode() {
        Base32 base32 = new Base32();
        byte[] bytes = base32.decode(TOTPTokenValidation.secretKey);
        String hexKey = Hex.encodeHexString(bytes);
        return TOTP.getOTP(hexKey);
    }
}
