package site.doget.pay.common.ruleEngine;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RuleEngineMapper {
    List<Map<String, Object>> getRules();
    int ruleA(Map<String, Object> paramMap);
    List<Map<String, Object>> checkFDS(Map<String, Object> paramMap);

    Map<String ,Object> notSameReceiver(Map<String, Object> paramMap);

    Map<String ,Object> sameReceiver(Map<String, Object> paramMap);

    void insertIntoHistory(Map<String, Object> paramMap);
}
