package site.doget.pay.pay.common;

import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

@Component
public class AesUtil {

    private String secretKey = "dogetAESkey";

    // 암호화
    public String encryption(String text) {
        System.out.println(secretKey);
        try {
            Cipher cipher = Cipher.getInstance("AES");

            byte[] key = new byte[16];
            int i = 0;

            for(byte b : secretKey.getBytes()) {
                key[i++%16] ^= b;
            }

            cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(key, "AES"));

            return new String(Hex.encodeHex(cipher.doFinal(text.getBytes("UTF-8")))).toUpperCase();
        } catch(Exception e) {
            return text;
        }
    }

    // 복호화
    public String decryption(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance("AES");

            byte[] key = new byte[16];
            int i = 0;

            for(byte b : secretKey.getBytes()) {
                key[i++%16] ^= b;
            }

            cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(key, "AES"));

            return new String(cipher.doFinal(Hex.decodeHex(encryptedText.toCharArray())));
        } catch(Exception e) {
            return encryptedText;
        }
    }
}
