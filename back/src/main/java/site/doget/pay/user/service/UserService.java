package site.doget.pay.user.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.security.jwt.JwtTokenProvider;
import site.doget.pay.security.jwt.TokenInfo;
import site.doget.pay.security.jwt.User;
import site.doget.pay.user.DTO.JoinReqDTO;
import site.doget.pay.user.DTO.LoginResultDTO;
import site.doget.pay.user.repository.UserMapper;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserMapper userMapper;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public TokenInfo login(String emailNo, String passwordNo) throws AuthenticationException {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                emailNo, passwordNo);

        Authentication authentication = authenticationManagerBuilder.getObject()
                .authenticate(authenticationToken);

        TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

        return tokenInfo;
    }

    public LoginResultDTO getUserInfo(String emailNo) {
        return userMapper.getUserInfo(emailNo);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userMapper.findByEmail(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("존재하지 않는 사용자입니다."));
    }

    private UserDetails createUserDetails(User user) {
        return User.builder()
                .emailNo(user.getUsername())
                .passwordNo(user.getPassword())
                //.roles(user.getRoles())
                .roles(List.of(user.getRoles().toArray(new String[0])))
                .build();
    }

    @Transactional
    public boolean join(JoinReqDTO joinReq) {
        Optional<User> findUser = userMapper.findByEmail(joinReq.getEmailNo());
        if (findUser.isEmpty()) {
            joinReq.setPasswordNo(passwordEncoder.encode(joinReq.getPasswordNo()));
            Integer result = userMapper.saveUser(joinReq);
            if (result >= 1) {
                return true;
            }
        }
        return false;
    }

    public boolean checkSimplePw(String userId, String simplePw) {
        String userSimplePw = userMapper.getSimplePw(userId);
        return passwordEncoder.matches(simplePw, userSimplePw);
    }

    public boolean regSimplePw(String userId, String simplePw) {
        return userMapper.regSimplePw(userId, simplePw) >= 1;
    }
}
