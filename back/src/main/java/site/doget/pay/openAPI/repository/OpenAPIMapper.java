package site.doget.pay.openAPI.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OpenAPIMapper {

    void saveAuth(@Param("authId") String authId, @Param("authCode") String authCode);

    Integer findByAuthId(@Param("authId") String authId);

    void deleteByAuthId(@Param("authId") String authId);

    Integer checkAuth(@Param("authId") String authId, @Param("authCode") String authCode);

}
