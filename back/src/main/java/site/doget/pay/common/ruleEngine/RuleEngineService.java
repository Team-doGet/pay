package site.doget.pay.common.ruleEngine;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class RuleEngineService {

    @Autowired
    RuleEngineMapper ruleEngineMapper;

    public List<Map<String, Object>> getRules() {
        return ruleEngineMapper.getRules();
    }

    public int ruleA() {
        System.out.println(getRules());
        for(Map<String, Object> c : getRules()) {
//            System.out.println(c.get("index"));
//            System.out.println(c.get("duration"));
//            System.out.println(c.get("durationFactor"));
//            System.out.println(c.get("bound"));
//            System.out.println(c.get("boundFactor"));
//            System.out.println(c.get("amount"));
//            System.out.println(c.get("amountFactor"));
//            System.out.println(c.get("count"));
//            System.out.println(c.get("countFactor"));
//            System.out.println(c.get("is_same_receiver"));
            System.out.println("ruleEngineMapper.ruleA(c) = " + ruleEngineMapper.ruleA(c));
//            if(ruleEngineMapper.ruleA(c) > 0)
//                return 1;
        }
        return 0;
    }

}
