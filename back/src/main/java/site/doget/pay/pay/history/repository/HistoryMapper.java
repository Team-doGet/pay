package site.doget.pay.pay.history.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface HistoryMapper {
    List<Map<String, Object>> getUserHistoryDefault(@Param("userid") String userId);

    List<Map<String, Object>> getUserHistory(Map<String, Object> paramMap);
}
