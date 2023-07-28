package site.doget.pay.pay.transfer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.pay.transfer.DTO.TransferReqDTO;
import site.doget.pay.pay.transfer.repository.TransferMapper;

import java.util.Optional;

@Transactional
@Service
public class TransferService {

    @Autowired
    TransferMapper transferMapper;

    public Optional<Integer> findUserByPhone(String receiver) {
        return transferMapper.findUserByPhone(receiver);
    }

    public Optional<Long> getPayAccount(String sender) {
        return transferMapper.getPayAccount(sender);
    }

    public Integer withDrawPayAccount(TransferReqDTO tReqDTO) {
        return transferMapper.withDrawPayAccount(tReqDTO);
    }

    public Integer chargePayAccount(TransferReqDTO tReqDTO) {
        tReqDTO.setReceiver(transferMapper.getPayAccount(tReqDTO.getSender()).toString());
        return transferMapper.chargePayAccount(tReqDTO);
    }
}
// ref

//    public List<MonthDataVO> getMonthData(@Param("userNo") int userNo, @Param("yesterday") Date yesterday) {
//        List<MonthDataVO> vo = mainMapper.getMonthData(userNo, yesterday);
//        return vo;
//    }