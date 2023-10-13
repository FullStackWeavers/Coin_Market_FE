import { useState } from "react";
// import { useDarkMode } from "../../context/Dark-mode";
import axios from "axios";

export default function Key() {
    const [connectKey, setConnectKey] = useState("")
    const [secretKey, setSecretKey] = useState("")
    const [inLogin, _setInLogin] = useState(false)

    const inConnectKey = (e: any) => {
        setConnectKey(e.target.value)
    }

    const inSecretKey = (e: any) => {
        setSecretKey(e.target.value)
    }

    const onKeyBtn = () => {
        axios.post('/api/bithumb/userkey', { connectKey, secretKey })
            .then((response) => {
                console.log('API 키가 성공적으로 전송되었습니다.', response.data);
            })
            .catch((error) => {
                console.error('API 키 전송 중 오류 발생', error);
            });
    };

    return inLogin ? (
        <div className="flex justify-center items-center rounded border-2 h-[120px] px-3">
            <div className="pr-2">
                <p>connect key</p>
                <input className="bg-gray-200" onChange={inConnectKey} type="text" />
                <p>secret key</p>
                <input className="bg-gray-200" onChange={inSecretKey} type="text" />
            </div>
            <button className="rounded bg-blue-500 hover:bg-blue-700 text-white h-[60%] mt-[20px] px-1" onClick={onKeyBtn}>전송</button>
        </div>
    ): null;
}
