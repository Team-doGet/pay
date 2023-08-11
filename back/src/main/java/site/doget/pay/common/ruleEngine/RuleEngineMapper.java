package site.doget.pay.common.ruleEngine;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RuleEngineMapper {
    List<Map<String, Object>> getRules();
    int ruleA(Map<String, Object> paramMap);
}
