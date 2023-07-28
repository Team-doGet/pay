package site.doget.pay.pay.transfer.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.doget.pay.pay.transfer.DTO.TransferDTO;
import site.doget.pay.pay.transfer.DTO.TransferReqDTO;

import java.util.Optional;

@Mapper
public interface TransferMapper {
    Optional<Integer> findUserByPhone(@Param("receiver") String receiver);

    Optional<Long> getPayAccount(String sender);

    Integer withDrawPayAccount(TransferReqDTO dto);

    Integer chargePayAccount(TransferReqDTO dto);
}
