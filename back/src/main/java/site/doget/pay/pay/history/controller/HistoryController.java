package site.doget.pay.pay.history.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import site.doget.pay.pay.common.CommonFailResponse;
import site.doget.pay.pay.common.CommonResponse;
import site.doget.pay.pay.common.CommonSuccessResponse;
import site.doget.pay.pay.history.repository.HistoryDTO;
import site.doget.pay.pay.history.service.HistoryService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    HistoryService historyService;

    /**
     * Get 방식으로 가장 최근의 사용자 거래내역을 반환하는 API
     *
     * @param paramMap userid : 유저 ID
     * @return status, msg, 거래내역 Data List 반환
     */
    @GetMapping("/*")
    @ResponseBody
    public CommonResponse getUserHistoryGet(@RequestParam Map<String, Object> paramMap) {

        List<HistoryDTO> historyDTOList = historyService.getUserHistoryDefault(paramMap);

        if(historyDTOList.size() == 0) {
            return new CommonFailResponse("조회된 거래 내역이 없습니다.");
        }
        else {
            return new CommonSuccessResponse(historyDTOList);
        }
    }

    /**
     * POST 방식으로 조건에 따른 사용자 거래내역을 반환하는 API
     *
     * @param paramMap period (1 : 한 달 2: 3개월 3: 6개월)
     *                 type(1: 전체 2: 입금 3: 출금)
     *                 orderby (1: 최신순 2 : 과거순)
     * @return status, msg, 거래내역 Data list 반환
     */
    @PostMapping ("/*")
    @ResponseBody
    public CommonResponse getUserHistoryPost(@RequestBody Map<String, Object> paramMap) {
        List<HistoryDTO> historyDTOList = historyService.getUserHistory(paramMap);

        return new CommonSuccessResponse(historyDTOList);
    }
}
