package site.doget.pay.pay.history.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.pay.history.repository.HistoryDTO;
import site.doget.pay.pay.history.repository.HistoryMapper;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HistoryService {

    @Autowired
    HistoryMapper historyMapper;

    public List<HistoryDTO> getUserHistoryDefault(Map<String, Object> paramMap) {
        return historyMapper.getUserHistoryDefault((String) paramMap.get("userId"));
    }

    public List<HistoryDTO> getUserHistory(Map<String, Object> paramMap) {
        return historyMapper.getUserHistory(paramMap);
    }
}
