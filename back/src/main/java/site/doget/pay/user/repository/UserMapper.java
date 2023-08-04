package site.doget.pay.user.repository;

import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.doget.pay.security.jwt.User;
import site.doget.pay.user.DTO.JoinReqDTO;
import site.doget.pay.user.DTO.LoginResultDTO;

@Mapper
public interface UserMapper {

    Optional<User> findByEmail(String emailNo);

    LoginResultDTO getUserInfo(String emailNo);

    Integer saveUser(JoinReqDTO joinReq);
}
