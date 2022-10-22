import { useEffect, useState } from "react";

import Turnstile from "react-turnstile";

export default function Home() {
    const [sitekey, setSitekey] = useState("1x00000000000000000000AA");
    const [action, setAction] = useState("demo");
    const [cdata, setCData] = useState("customerdata");
    const [theme, setTheme] = useState("auto");
    const [size, setSize] = useState("normal");
    const [token, setToken] = useState("(loading)");
    const [widgetId, setWidgetId] = useState("");
    return (
        <div className="my-20 space-y-10 --container">
            <div>
                <p>
                    Sitekey:
                    <input
                        value={sitekey}
                        onChange={(event) => setSitekey(event.target.value)}
                        className="ml-8 bg-gray-800 w-80"
                    />
                </p>
                {!/^[0-9A-Za-z_-]{3,100}$/i.test(sitekey) && (
                    <p className="text-red-300">
                        Sitekey should match the regex:
                        <code>{" /^[0-9A-Za-z_-]{3,100}$/i "}</code>
                        If the widget fails to load, it&apos;s probably because
                        of this.
                    </p>
                )}
                <div className="flex gap-2 mt-2">
                    <span>Test sitekeys:</span>
                    <button
                        className="--btn --btn-0 --btn-primary"
                        onClick={() => setSitekey("1x00000000000000000000AA")}
                    >
                        Always passes
                    </button>
                    <button
                        className="--btn --btn-0 --btn-primary"
                        onClick={() => setSitekey("2x00000000000000000000AB")}
                    >
                        Always blocks
                    </button>
                    <button
                        className="--btn --btn-0 --btn-primary"
                        onClick={() => setSitekey("3x00000000000000000000FF")}
                    >
                        Forces an interactive challenge
                    </button>
                </div>
            </div>
            <p>
                Action:
                <input
                    value={action}
                    onChange={(event) => setAction(event.target.value)}
                    className="ml-8 bg-gray-800 w-80"
                />
                {!/^[a-z0-9_-]{0,32}$/i.test(action) && (
                    <p className="text-red-300">
                        Action should match the regex:
                        <code>{" /^[a-z0-9_-]{0,32}$/i "}</code>
                        If the widget fails to load, it&apos;s probably because
                        of this.
                    </p>
                )}
            </p>
            <p>
                cData:
                <input
                    value={cdata}
                    onChange={(event) => setCData(event.target.value)}
                    className="ml-8 bg-gray-800 w-80"
                />
                {!/^[a-z0-9_-]{0,255}$/i.test(cdata) && (
                    <p className="text-red-300">
                        cData should match the regex:
                        <code>{" /^[a-z0-9_-]{0,255}$/i "}</code>
                        If the widget fails to load, it&apos;s probably because
                        of this.
                    </p>
                )}
            </p>
            <div>
                <p>
                    Theme:
                    <input
                        value={theme}
                        onChange={(event) => setTheme(event.target.value)}
                        className="ml-8 bg-gray-800 w-80"
                    />
                </p>
                {!["auto", "light", "dark"].includes(theme) && (
                    <p className="text-red-300">
                        Theme should be one of &apos;auto&apos;,
                        &apos;light&apos; or &apos;dark&apos;. If the widget
                        fails to load, it&apos;s probably because of this.
                    </p>
                )}
            </div>
            <div>
                <p>
                    Size:
                    <input
                        value={size}
                        onChange={(event) => setSize(event.target.value)}
                        className="ml-8 bg-gray-800 w-80"
                    />
                </p>
                {!["normal", "compact", "invisible"].includes(size) && (
                    <p className="text-red-300">
                        Size should be one of &apos;normal&apos;,
                        &apos;compact&apos; or &apos;invisible&apos;. If the
                        widget fails to load, it&apos;s probably because of
                        this.
                    </p>
                )}
            </div>
            <Turnstile
                sitekey={sitekey}
                action={action}
                cData={cdata}
                /* @ts-ignore */
                theme={theme}
                /* @ts-ignore */
                size={size}
                onLoad={(widgetId) => {
                    setToken("(loading)");
                    setWidgetId(widgetId);
                }}
                onError={() => setToken("an error occured")}
                onExpire={() => setToken("token expired")}
                onVerify={(token) => setToken(token)}
            />
            <div>
                <p>Token: {token}</p>
                <p>WidgetId: {widgetId}</p>
                <button
                    className="--btn --btn-3 --btn-primary"
                    onClick={() => window.turnstile.reset(widgetId)}
                    disabled={!widgetId}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
