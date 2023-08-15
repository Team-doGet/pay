package site.doget.pay.common.googleTOTP.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface TOTPMapper {

    String getSecretKey(String userId);

    void secretKeyToNull(String userId);

    void updateSecretKey(Map<String, Object> paramMap);
}
