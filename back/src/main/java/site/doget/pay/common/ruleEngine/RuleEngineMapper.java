package site.doget.pay.common.ruleEngine;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface RuleEngineMapper {
    List<Map<String, Object>> getRules();

    int notSameReceiver(Map<String, Object> paramMap);

    Map<String, Object> sameReceiver(Map<String, Object> paramMap);

    void insertIntoHistory(Map<String, Object> paramMap);

    void deleteFromHistory(Map<String, Object> paramMap);
}
