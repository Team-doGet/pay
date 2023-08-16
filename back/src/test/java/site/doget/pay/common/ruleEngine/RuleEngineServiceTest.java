package site.doget.pay.common.ruleEngine;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.HashMap;
import java.util.Map;

@ActiveProfiles(value = "dev")
@SpringBootTest
class RuleEngineServiceTest {

    @Autowired
    RuleEngineService ruleEngineService;

    @Test
    public void ruleEngineTest () throws Exception {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("payId", 11);
        paramMap.put("amount", 100000);
        paramMap.put("oppositeName", "test3");

        ruleEngineService.checkFDS(paramMap);
    }


}