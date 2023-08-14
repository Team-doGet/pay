package site.doget.pay.common.ruleEngine;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles(value = "dev")
@SpringBootTest
class RuleEngineServiceTest {

    @Autowired
    RuleEngineService ruleEngineService;

    @Test
    public void ruleEngineTest () {
        ruleEngineService.ruleA();
    }


}