package site.doget.pay.pay.history.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Mapper
public interface HistoryMapper {
    List<HistoryDTO> getUserHistoryDefault(@Param("userid") String userId);

    List<HistoryDTO> getUserHistory(Map<String, Object> paramMap);
}
