package site.doget.pay.common.ruleEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import site.doget.pay.common.responseUtil.CommonResponse;

import java.util.Map;

@RestController
public class RuleEngineController {

    private final RuleEngineService ruleEngineService;

    @Autowired
    public RuleEngineController(RuleEngineService ruleEngineService) {
        this.ruleEngineService = ruleEngineService;
    }

    @PostMapping("/checkFDS")
    public CommonResponse checkFDS(@RequestBody Map<String, Object> paramMap) {
        return ruleEngineService.checkFDS(paramMap);
    }

//    @GetMapping("/check2FA/Code")
//    public CommonResponse check2FACode(String code) {
//        return ruleEngineService.checkCode();
//    }



}
