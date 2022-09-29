import { useState } from "react";

import Turnstile from "@/components/turnstile";

export default function Home() {
    const [sitekey, setSitekey] = useState("1x00000000000000000000AA");
    const [action, setAction] = useState("demo");
    const [cdata, setCData] = useState("customer data");
    const [theme, setTheme] = useState("auto");
    const [token, setToken] = useState("(loading)");
    return (
        <div className="my-20 space-y-20 --container">
            <p>
                Sitekey:
                <input
                    value={sitekey}
                    onChange={(event) => setSitekey(event.target.value)}
                    className="ml-8 bg-gray-800 w-80"
                />
            </p>
            <p>
                Action:
                <input
                    value={action}
                    onChange={(event) => setAction(event.target.value)}
                    className="ml-8 bg-gray-800 w-80"
                />
            </p>
            <p>
                cData:
                <input
                    value={cdata}
                    onChange={(event) => setCData(event.target.value)}
                    className="ml-8 bg-gray-800 w-80"
                />
            </p>
            <p>
                Theme:
                <input
                    value={theme}
                    onChange={(event) => setTheme(event.target.value)}
                    className="ml-8 bg-gray-800 w-80"
                />
            </p>
            <Turnstile
                sitekey={sitekey}
                action={action}
                cData={cdata}
                /* @ts-ignore */
                theme={theme}
                onLoad={() => setToken("(loading)")}
                onError={() => setToken("an error occured")}
                onExpire={() => setToken("token expired")}
                onVerify={(token) => setToken(token)}
            />
            <p>Token: {token}</p>
        </div>
    );
}
