package site.doget.pay.myInfo.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import site.doget.pay.security.jwt.User;

@Mapper
public interface MyInfoMapper {

	// 사용자 정보 조회
	User getUserInfoById(@Param("userId") String userId);

	// 비밀번호 업데이트
	Integer updatePassword(@Param("userId") String userId, @Param("newPasswordNo") String newPasswordNo);

	// 간편 비밀번호 업데이트
	Integer updateSimplePassword(@Param("userId") String userId, @Param("newSimplePassword") String newSimplePassword);

	// 간편비밀번호 조회
	String getSimplePassword(@Param("userId") String userId);
}
