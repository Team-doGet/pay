package site.doget.pay.pay.transfer.controller;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import site.doget.pay.pay.transfer.repository.TransferMapper;
import site.doget.pay.pay.transfer.service.TransferService;
import site.doget.pay.pay.transfer.DTO.TransferReqDTO;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@ActiveProfiles(value = "dev")
@SpringBootTest
class TransferControllerTest {

    @Autowired
    TransferMapper transferMapper;

    @Autowired
    TransferController tc;
    @Autowired
    TransferService ts;

    @Test
    @Transactional
    @DisplayName("Get 방식 계좌 조회 테스트")
    public void getAccountAmount () {
        // given
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("userId1", "1"); // 실제 있는 Id
        paramMap.put("userId2", "999"); // 없는 Id

        // when
        Optional<Long> senderAccountAmount1 = ts.getPayAccount((String) paramMap.get("userId1"));
        Optional<Long> senderAccountAmount2 = ts.getPayAccount((String) paramMap.get("userId2"));

        // then
        // 존재여부
        Assertions.assertThat(senderAccountAmount1.isEmpty()).isEqualTo(false);
        Assertions.assertThat(senderAccountAmount2.isEmpty()).isEqualTo(true);
        // 금액일치여부
        Assertions.assertThat(senderAccountAmount1.get()).isEqualTo(100000);

    }

    @Test
    @DisplayName("이메일 값으로 부터 받는 사람 정보 유무 확인")
    public void SendMoney() {

        // given
        TransferReqDTO tReqDTO1 = new TransferReqDTO("2", "1011111111", 10000, "msg");
        TransferReqDTO tReqDTO2 = new TransferReqDTO("2", "1044444444", 10000, "msg");

        // when
        Optional<Integer> test1 = ts.findUserByPhone(tReqDTO1.getReceiver());
        Optional<Integer> test2 = ts.findUserByPhone(tReqDTO2.getReceiver());

        // then
        Assertions.assertThat(test1.get()).isEqualTo(1);
        Assertions.assertThat(test2.isPresent()).isEqualTo(false);
    }

    @Test
    @DisplayName("페이 계좌 잔액 조회")
    public void getPayAccout() {
        // given
        TransferReqDTO tReqDTO1 = new TransferReqDTO("2", "1011111111", 10000, "msg");

        // when
        Optional<Long> test = ts.getPayAccount(tReqDTO1.getSender());

        // then
        Assertions.assertThat(test.get()).isEqualTo(122000L);
    }

    @Test
    @Transactional
    @DisplayName("송금 적용 여부")
    public void transferStart() {
        // given
        TransferReqDTO tReqDTO = new TransferReqDTO("2", "1033333333", 10000L, "msg");

        // when
        Integer withDraw = ts.withDrawPayAccount(tReqDTO);


        Integer chargePay = ts.chargePayAccount(tReqDTO);

        // then
        System.out.println(withDraw);
        System.out.println(chargePay);
        Assertions.assertThat(withDraw).isEqualTo(1);
        Assertions.assertThat(chargePay).isEqualTo(0);
    }
}