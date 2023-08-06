import React, { useEffect } from 'react';
import Collect_ from './CollectPage.module.css';
import { useState } from 'react';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../states/userState';
import useAxios from '../../hooks/useAxios';
import { CopyToClipboard } from 'react-copy-to-clipboard/src';
import useAuth from '../../hooks/useAuth';

const CollectPage = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const userInfo = useRecoilState(userState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });

    const [linkData, setLinkData] = useState('생성 버튼을 누르면 링크가 생성됩니다.');
    const [QRCodeImage, setQRCodeImage] = useState();
    const [collectData, setCollectData] = useState({
        receiver: '0',
        amount: 0,
    });

    useEffect(() => {
        setCollectData({ ...collectData, receiver: userInfo[0].phoneNo });
    }, []);

    const getLink = async () => {
        if (collectData.amount === 0) {
            alert('정확한 금액을 입력해주세요!');
        } else {
            const res = await api.post(`/collect/`, collectData);
            //console.log(res);
            if (res.data.status === 200) {
                setLinkData(res.data.data.link);
                setQRCodeImage(res.data.data.qrCode);
            } else {
                console.log('error');
            }
        }
    };

    useEffect(() => {
        //console.log(collectData);
    }, [collectData]);

    return (
        <>
            {user.accessToken && (
                <>
                    <div className={Collect_.container}>
                        <div className={Collect_.amountContainer}>
                            <h4 className={Collect_.title}>받을 금액</h4>
                            <div>
                                <input
                                    id="money"
                                    type="number"
                                    placeholder="금액을 입력해주세요."
                                    onChange={e => {
                                        setCollectData({ ...collectData, amount: e.target.value });
                                    }}
                                />
                            </div>
                        </div>
                        <div className={Collect_.linkContainer}>
                            <h4 className={Collect_.title}>링크</h4>
                            <div>
                                <div>
                                    <CopyToClipboard
                                        text={linkData}
                                        onCopy={() => alert('복사되었습니다! 편하게 돈을 받아요!')}
                                    >
                                        <button className={Collect_.copyButton}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="19"
                                                height="21"
                                                viewBox="0 0 19 21"
                                                fill="none"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M14.7083 2.29109V3.55973H16.7089H16.7105V3.56301C17.3424 3.56465 17.9152 3.82068 18.3288 4.2359C18.7391 4.64784 18.9951 5.21733 18.9967 5.84754H19V5.85083V17.8758V17.8774H18.9967C18.9951 18.5076 18.7391 19.0804 18.3238 19.4956C17.9119 19.9059 17.3424 20.162 16.7122 20.1636V20.1669H16.7089H6.58279H6.58115V20.1636C5.95094 20.162 5.37652 19.9059 4.96294 19.4907C4.55265 19.0788 4.29662 18.5093 4.29498 17.8791H4.2917V17.8758V15.1826H2.29109H2.28945V15.1793C1.65924 15.1777 1.08482 14.9217 0.671245 14.5064C0.260948 14.0945 0.00492356 13.525 0.00328237 12.8948H0V12.8915V2.29109V2.28945H0.00328237C0.00492356 1.6576 0.26259 1.08482 0.676168 0.671245C1.08811 0.260948 1.6576 0.00492356 2.28781 0.00328237V0H2.29109H12.4172H12.4188V0.00328237C13.0507 0.00492356 13.6235 0.260948 14.0371 0.676168C14.4474 1.08811 14.7034 1.6576 14.705 2.28781H14.7083V2.29109ZM12.9719 3.55973V2.29109V2.28781H12.9752C12.9752 2.13846 12.9112 2.0006 12.8095 1.89885C12.7093 1.79874 12.5698 1.73473 12.4205 1.73473V1.73802H12.4188H2.29274H2.28945V1.73473C2.14011 1.73473 2.00225 1.79874 1.90049 1.90049C1.80038 2.0006 1.73637 2.14011 1.73637 2.28945H1.73966V2.29109V12.8915V12.8948H1.73637C1.73637 13.0441 1.80038 13.182 1.90213 13.2838C2.00225 13.3839 2.14175 13.4479 2.29109 13.4479V13.4446H2.29274H4.29334V5.85083V5.84918H4.29662C4.29826 5.21733 4.55593 4.64455 4.96951 4.23098C5.38145 3.82068 5.95094 3.56465 6.58115 3.56301V3.55973H6.58443H12.9719ZM17.262 17.8758V5.85083V5.84754H17.2653C17.2653 5.6982 17.2013 5.56034 17.0995 5.45858C16.9994 5.35847 16.8599 5.29446 16.7105 5.29446V5.29775H16.7089H6.58279H6.57951V5.29446C6.43016 5.29446 6.2923 5.35847 6.19055 5.46022C6.09044 5.56034 6.02643 5.69984 6.02643 5.84918H6.02971V5.85083V17.8758V17.8791H6.02643C6.02643 18.0284 6.09044 18.1663 6.19219 18.268C6.2923 18.3681 6.4318 18.4322 6.58115 18.4322V18.4289H6.58279H16.7089H16.7122V18.4322C16.8615 18.4322 16.9994 18.3681 17.1011 18.2664C17.2013 18.1663 17.2653 18.0268 17.2653 17.8774H17.262V17.8758Z"
                                                    fill="#8990A0"
                                                />
                                            </svg>
                                        </button>
                                    </CopyToClipboard>
                                    <div className={Collect_.link}>
                                        <p>{linkData}</p>
                                    </div>
                                </div>
                                <button onClick={() => getLink()}>생성</button>
                            </div>
                        </div>
                        {QRCodeImage && (
                            <div className={Collect_.QRCodeImage}>
                                <img src={'data:image/png;base64,' + QRCodeImage} />
                            </div>
                        )}
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                </>
            )}
        </>
    );
};

export default CollectPage;
