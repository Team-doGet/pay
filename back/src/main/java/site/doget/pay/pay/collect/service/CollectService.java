package site.doget.pay.pay.collect.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.pay.collect.repository.CollectDTO;
import site.doget.pay.pay.collect.repository.CollectMapper;
import site.doget.pay.common.AesUtil;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class CollectService {

    @Value("${localhost}")
    private String ipAddr;

    @Autowired
    CollectMapper collectMapper;

    public CollectDTO genereatePayCollectData(Map<String, Object> paramMap) throws Exception {
        CollectDTO collectDTO = new CollectDTO();

        String link = genereatePayLink(paramMap);
        link = "http://" + ipAddr + "/pay/transfer/" + link;
        collectDTO.setLink(link);

        Object qrCode = genereatePayCode(link);
        collectDTO.setQrCode(qrCode);

        return collectDTO;
    }

    // 링크 생성
    public String genereatePayLink(Map<String, Object> paramMap) {

        String phoneNum = (String) paramMap.get("receiver");
        int amount = Integer.valueOf(String.valueOf(paramMap.get("amount")));
        String url = "receiver=" + phoneNum + "&amount=" + String.valueOf(amount);

        return new AesUtil().encryption(url);
    }

    //QR 코드 생성
    public Object genereatePayCode(String link) throws Exception {

        int size = 300;
        BitMatrix matrix = new MultiFormatWriter().encode(link, BarcodeFormat.QR_CODE, size, size);

        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            MatrixToImageWriter.writeToStream(matrix, "PNG", out);

            return out.toByteArray();
        }
    }

    public String decryptPath(String path) {
        return new AesUtil().decryption(path);
    }

    public Map<String, Object> parseQueryString(String query) {
        Map<String, Object> mp = new HashMap<>();

        String[] queryArray = query.split("&");
        for(String s : queryArray) {
            String[] value = s.split("=");
            mp.put(value[0], value[1]);
        }

        return mp;
    }
}
