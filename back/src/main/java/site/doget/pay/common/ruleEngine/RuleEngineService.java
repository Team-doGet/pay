package site.doget.pay.common.ruleEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.common.responseUtil.CommonFailResponse;
import site.doget.pay.common.responseUtil.CommonResponse;
import site.doget.pay.common.responseUtil.CommonSuccessResponse;
import site.doget.pay.pay.pay.repository.PayMapper;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RuleEngineService {

    @Autowired
    RuleEngineMapper ruleEngineMapper;
    @Autowired
    PayMapper payMapper;

    public List<Map<String, Object>> getRules() {
        return ruleEngineMapper.getRules();
    }

    @Transactional
    public CommonResponse checkFDS(Map<String, Object> paramMap) {
        Map<String, Object> accountInfo = payMapper.getAccountInfo((String) paramMap.get("payId"));
//        System.out.println("paramMap = " + paramMap);
//        System.out.println("accountInfo = " + accountInfo);
        for(Map<String, Object> c : getRules()) {
            c.put("amount", paramMap.get("amount"));
            c.put("payId", paramMap.get("payId"));
            c.put("oppositeName", paramMap.get("oppositeName"));
            c.put("bankCode", (String) accountInfo.get("bankCode"));
            c.put("accountNo", accountInfo.get("accountNo"));
            c.put("paymoneyBalance", 10000);
            payMapper.insertToHistory(c);
            System.out.println("paramMap = " + paramMap);
            if(c.get("is_same_receiver").equals(0)) {
                Map<String ,Object> fds = ruleEngineMapper.notSameReceiver(c);
                System.out.println("fds1 = " + fds);
                if (fds == null) {
                    continue;
                }
                if (Integer.parseInt(String.valueOf(fds.get("cnt"))) >= Integer.parseInt(String.valueOf(c.get("count")))) {
                    return new CommonFailResponse(401,"FDS");
                }
            }
            else if (c.get("is_same_receiver").equals(1)) {
                Map<String, Object> fds1 = ruleEngineMapper.sameReceiver(c);
                System.out.println("fds2 = " + fds1);
                if (fds1 == null) {
                    continue;
                }

                if (Integer.parseInt(String.valueOf(fds1.get("cnt"))) >= Integer.parseInt(String.valueOf(c.get("count")))) {
                    return new CommonFailResponse(401, "FDS");
                }
            }
        }
        return new CommonSuccessResponse("성공~");
    }

}
