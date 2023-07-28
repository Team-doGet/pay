package site.doget.pay.security.jwt;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

// 클라이언트 요청 시 JWT 인증하는 커스텀 필터
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // Request Header 에서 JWT 정보 추출 (resolveToken)
        String token = resolveToken((HttpServletRequest) request);

        // validateToken 으로 JWT 유효성 검사
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 유효한 JWT 인 경우 Authentication 객체 가져와 SecurityContext 에 저장
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }

    // Request Header 에서 JWT 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Auth");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
