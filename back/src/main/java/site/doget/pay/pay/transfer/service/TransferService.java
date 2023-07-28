package site.doget.pay.pay.transfer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.pay.transfer.repository.TransferRepository;

@Transactional
@Service
public class TransferService {

    @Autowired
    TransferRepository mainMapper;

    public int findUser(String receiver) {
        return mainMapper.findUser(receiver);
    }

    public boolean isNomoney(String sender) {
        mainMapper.isNoMoney(sender);
        return true;
    }

    public int getMoney() {
        return 1000;
    }

    public void addMoney() {
    }
}
// ref

//    public List<MonthDataVO> getMonthData(@Param("userNo") int userNo, @Param("yesterday") Date yesterday) {
//        List<MonthDataVO> vo = mainMapper.getMonthData(userNo, yesterday);
//        return vo;
//    }