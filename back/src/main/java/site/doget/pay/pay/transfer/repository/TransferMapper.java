package site.doget.pay.pay.transfer.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface TransferRepository {
    int findUser(@Param("user_name") String receiver);
    boolean isNoMoney(String sender);
}
