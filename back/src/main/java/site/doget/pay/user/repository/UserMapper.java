package site.doget.pay.user.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.doget.pay.security.jwt.User;
import site.doget.pay.user.DTO.JoinReqDTO;
import site.doget.pay.user.DTO.LoginResultDTO;

@Mapper
public interface UserMapper {

    Optional<User> findByEmail(String emailNo);

    LoginResultDTO getUserInfoAndAccountInfo(String emailNo);

    LoginResultDTO getUserInfo(String emailNo);

    Integer saveUser(JoinReqDTO joinReq);

    String getSimplePw(@Param("userId") String userId);

    Integer regSimplePw(@Param("userId") String userId, @Param("simplePw") String simplePw);

    Map<String, Object> getUserInfoForPay(@Param("emailNo") String emailNo);

    Integer updateRegInfo(@Param("userId") String userId);

    Integer saveUserToPayDescription(@Param("userId") String userId, @Param("regDate") String regDate);
}
