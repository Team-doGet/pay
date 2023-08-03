package site.doget.pay.user.repository;

import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import site.doget.pay.security.jwt.User;
import site.doget.pay.user.DTO.LoginResultDTO;

@Mapper
public interface UserMapper {

    Optional<User> findByEmail(String emailNo);

    LoginResultDTO getUserInfo(String emailNo);

    void saveAuth(@Param("authId") String authId, @Param("authCode") String authCode);

    Integer checkAuth(@Param("authId") String authId, @Param("authCode") String authCode);

    //void save(UserForm user);
}
