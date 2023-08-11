package site.doget.pay.pay.history.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.pay.history.repository.HistoryMapper;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HistoryService {

    @Autowired
    HistoryMapper historyMapper;

    public List<Map<String, Object>> getUserHistoryDefault(Map<String, Object> paramMap) {
        return historyMapper.getUserHistoryDefault((String) paramMap.get("userId"));
    }

    public List<Map<String, Object>> getUserHistory(Map<String, Object> paramMap) {
        return historyMapper.getUserHistory(paramMap);
    }
}
