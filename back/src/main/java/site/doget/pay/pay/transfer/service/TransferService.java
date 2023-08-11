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

    public void payTransferService(TransferReqDTO dto) throws Exception {
        Integer withDraw = withDrawPayAccount(dto);
        Integer chargePay = chargePayAccount(dto);

        if(withDraw == 0 || chargePay == 0) {
            throw new Exception();
        }
    }

    public Optional<Integer> findUserByPhone(String receiver) {

        return transferMapper.findUserByPhone(receiver);
    }

    @Transactional
    public Optional<Long> getPayAccount(String sender) {

        return transferMapper.getPayAccount(sender);
    }

    public Integer withDrawPayAccount(TransferReqDTO dto) {

        return transferMapper.withDrawPayAccount(dto);
    }

    public Integer chargePayAccount(TransferReqDTO dto) {

        dto.setReceiver(transferMapper.findUserByPhone(dto.getReceiver()).get().toString());
        return transferMapper.chargePayAccount(dto);
    }
}