package site.doget.pay.common.ruleEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.openAPI.dto.MessageDTO;
import site.doget.pay.openAPI.service.SmsService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RuleEngineService {

    @Autowired
    RuleEngineMapper ruleEngineMapper;

    @Autowired
    private SmsService smsService;


    public List<Map<String, Object>> getRules() {
        return ruleEngineMapper.getRules();
    }

    public CommonResponse checkFDS(Map<String, Object> paramMap) throws Exception{
        for(Map<String, Object> c : getRules()) {
            c.put("reqAmount", paramMap.get("reqAmount"));
            c.put("payId", paramMap.get("payId"));
            c.put("oppositeName", paramMap.get("oppositeName"));
            c.put("bankCode", paramMap.get("bankCode"));
            c.put("accountNo", paramMap.get("accountNo"));
            c.put("paymoneyBalance", paramMap.get("paymoneyBalance"));
            ruleEngineMapper.insertIntoHistory(c);
            if(c.get("is_same_receiver").equals(0)) {
                int cnt = ruleEngineMapper.notSameReceiver(c);
                System.out.println("fds = " + cnt);
                if (cnt >= Integer.parseInt(String.valueOf(c.get("count")))) {
                    System.out.println("cnt = " + cnt);
                    System.out.println("Integer.parseInt(String.valueOf(c.get(\"count\"))) = " + Integer.parseInt(String.valueOf(c.get("count"))));
                    ruleEngineMapper.deleteFromHistory(c);
                    smsService.sendSms(new MessageDTO("01055373077", "[doGet-Pay]\n이상금융거래가 탐지되었습니다.\nOTP를 통해 본인 인증을 해주시기 바랍니다."));
                    return new CommonFailResponse(401,"FDS");
                }
            }
            else if (c.get("is_same_receiver").equals(1)) {
                Map<String, Object> fds1 = ruleEngineMapper.sameReceiver(c);
                System.out.println("fds1 = " + fds1);
                int cnt = 0;
                if (fds1 == null) {
                    cnt = 0;
                }
                else {
                    cnt = Integer.parseInt(String.valueOf(fds1.get("cnt")));
                }
                if (cnt >= Integer.parseInt(String.valueOf(c.get("count")))) {
                    System.out.println("cnt = " + cnt);
                    System.out.println("Integer.parseInt(String.valueOf(c.get(\"count\"))) = " + Integer.parseInt(String.valueOf(c.get("count"))));
                    ruleEngineMapper.deleteFromHistory(c);
                    smsService.sendSms(new MessageDTO("01055373077", "[doGet-Pay]\n이상금융거래가 탐지되었습니다.\nOTP를 통해 본인 인증을 해주시기 바랍니다."));
                    return new CommonFailResponse(401, "FDS");
                }
            }
            ruleEngineMapper.deleteFromHistory(c);
        }
        return new CommonSuccessResponse("성공~");
    }

}
