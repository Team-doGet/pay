package site.doget.pay.myInfo.service;

import java.util.Random;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.doget.pay.myInfo.repository.MyInfoMapper;
import site.doget.pay.security.jwt.User;

@Service
@RequiredArgsConstructor
public class MyInfoService {

	private final MyInfoMapper myInfoMapper;
	private final PasswordEncoder passwordEncoder;

	public Integer reConfigPassword(String userId, String passwordNo) {
		// 1. 사용자 정보 조회
		User userInfo = myInfoMapper.getUserInfoById(userId);

		if (userInfo == null) {
			// 사용자 정보가 없을 경우
			return 0;
		}

		// 2. 새로운 비밀번호
		String newPasswordNo = passwordEncoder.encode(passwordNo);

		// 3. 새로운 비밀번호 업데이트
		Integer updateSuccess = myInfoMapper.updatePassword(userId, newPasswordNo);
		return updateSuccess;
	}

	public boolean reConfigSimplePassword(String userId, String newSimplePassword) {
		// 1. 사용자 정보 조회
		User userInfo = myInfoMapper.getUserInfoById(userId);

		if (userInfo == null) {
			// 사용자 정보가 없을 경우
			return false;
		}

		// 2. 새로운 간편비밀번호 암호화
		String encodedSimplePassword = passwordEncoder.encode(newSimplePassword);

		// 3. 새로운 간편비밀번호 업데이트
		Integer updateSuccess = myInfoMapper.updateSimplePassword(userId, encodedSimplePassword);

		return updateSuccess >= 1;
	}

	public String generateSimplePassword(int length) {
		StringBuilder sb = new StringBuilder(length);
		Random random = new Random();
		for (int i = 0; i < length; i++) {
			sb.append(random.nextInt(10)); // 0부터 9까지의 숫자 중 랜덤 선택
		}
		return sb.toString();
	}

	public boolean checkOldPassword(String userId, String oldPassword) {
		User userInfo = myInfoMapper.getUserInfoById(userId);
		if (userInfo == null) {
			// 사용자 정보가 없을 경우
			return false;
		}

		// 기존 비밀번호와 데이터베이스에 저장된 비밀번호를 비교
		return passwordEncoder.matches(oldPassword, userInfo.getPassword());
	}

	public boolean checkOldSimplePassword(String userId, String oldSimplePassword) {
		User userInfo = myInfoMapper.getUserInfoById(userId);
		if (userInfo == null) {
			// 사용자 정보가 없을 경우
			return false;
		}

		String simplePass = myInfoMapper.getSimplePassword(userId);
		// 기존 간편 비밀번호와 데이터베이스에 저장된 간편 비밀번호를 비교
		boolean checkOldSimplePassword = passwordEncoder.matches(oldSimplePassword, simplePass);
		if (checkOldSimplePassword == true) {
			// 비밀번호 일치
			return true;
		} else {
			// 불일치
			return false;
		}
	}

}