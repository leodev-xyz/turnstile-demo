import { useState } from "react";

import Turnstile from "react-turnstile";
import { SupportedLanguages } from "turnstile-types";

const sitekeys = [
	["1x00000000000000000000AA", "Always passes"],
	["1x00000000000000000000BB", "Always passes [Invisible]"],
	["2x00000000000000000000AB", "Always blocks"],
	["2x00000000000000000000BB", "Always blocks [Invisible]"],
	["3x00000000000000000000FF", "Forces an interactive challenge"],
	["0x4AAAAAAAGhYbwMOGHiaL4f", "Non-interactive sitekey"],
	["0x4AAAAAAAA6ulk8fhx8AjD-", "Managed sitekey"],
	["0x4AAAAAAAF-CtF4tL09kwFZ", "Invisible sitekey"],
	["0x4AAAAAAABiooHVKGrVwYGO", "Managed sitekey (Off-label)"],
];

const previews: Array<{
	name: string;
	render: (data: {
		sitekey: string;
		action: string;
		cdata: string;
		theme: "auto" | "dark" | "light";
		language: SupportedLanguages | "auto";
		responseField: boolean;
		responseFieldName: string;
		size: "normal" | "compact" | "invisible";
		retry: "auto" | "never";
		retryInterval: number;
		refreshExpired: "auto" | "manual" | "never";
		appearance: "always" | "execute" | "interaction-only";
		execution: "render" | "execute";
	}) => Array<string | false | null | undefined>;
}> = [
	{
		name: "native (explicit)",
		render: ({
			sitekey,
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"turnstile.render(container, {",
				`  sitekey: "${sitekey}",` +
					(sitekeys.some(([skey]) => skey === sitekey)
						? ` /* ${
								sitekeys.find(([skey]) => skey === sitekey)[1]
						  } */`
						: ""),
				action && `  action: "${action}",`,
				cdata && `  cData: "${cdata}",`,
				theme !== "auto" && `  theme: "${theme}",`,
				language !== "auto" && `  language: "${language}",`,
				!responseField && `  "response-field": ${responseField}`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`  "response-field-name": "${responseFieldName}"`,
				size !== "normal" && `  size: "${size}",`,
				retry !== "auto" && `  retry: "${retry}",`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`  "retry-interval": ${retryInterval},`,
				refreshExpired !== "auto" &&
					`  "refresh-expired": "${refreshExpired}",`,
				appearance !== "always" && `  appearance: "${appearance}",`,
				execution !== "render" && `  execution: "${execution}",`,
				"});",
				(appearance === "execute" || execution === "execute") &&
					"turnstile.execute(container);",
			];
		},
	},
	{
		name: "native (implicit)",
		render: ({
			sitekey,
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"<div",
				`  class="cf-turnstile"`,
				`  data-sitekey="${sitekey}"`,
				action && `  data-action="${action}"`,
				cdata && `  data-cdata="${cdata}"`,
				theme !== "auto" && `  data-theme="${theme}"`,
				language !== "auto" && `  data-language="${language}"`,
				!responseField && `  data-response-field="${responseField}"`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`  data-response-field-name="${responseFieldName}"`,
				size !== "normal" && `  data-size="${size}"`,
				retry !== "auto" && `  data-retry="${retry}"`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`  data-retry-interval="${retryInterval}"`,
				refreshExpired !== "auto" &&
					`  data-refresh-expired="${refreshExpired}"`,
				appearance !== "always" && `  data-appearance="${appearance}"`,
				execution !== "render" && `  data-execution="${execution}"`,
				">",
				"</div>",
			];
		},
	},
	{
		name: "react-turnstile",
		render: ({
			sitekey,
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"<Turnstile",
				`  sitekey="${sitekey}"` +
					(sitekeys.some(([skey]) => skey === sitekey)
						? ` /* ${
								sitekeys.find(([skey]) => skey === sitekey)[1]
						  } */`
						: ""),
				action && `  action="${action}"`,
				cdata && `  cData="${cdata}"`,
				theme !== "auto" && `  theme="${theme}"`,
				language !== "auto" && `  language="${language}"`,
				!responseField && `  responseField={${responseField}}`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`  responseFieldName="${responseFieldName}"`,
				size !== "normal" && `  size="${size}"`,
				retry !== "auto" && `  retry="${retry}"`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`  retryInterval={${retryInterval}}`,
				refreshExpired !== "auto" &&
					`  refreshExpired="${refreshExpired}"`,
				appearance !== "always" && `  appearance="${appearance}"`,
				execution !== "render" && `  execution="${execution}"`,
				(appearance === "execute" || execution === "execute") &&
					"  onLoad={(_, bound) => bound.execute()}",
				"/>",
			];
		},
	},
	{
		name: "@marsidev/react-turnstile",
		render: ({
			sitekey,
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"<Turnstile",
				`  siteKey="${sitekey}"` +
					(sitekeys.some(([skey]) => skey === sitekey)
						? ` /* ${
								sitekeys.find(([skey]) => skey === sitekey)[1]
						  } */`
						: ""),
				"  options={{",
				action && `    action: "${action}",`,
				cdata && `    cData: "${cdata}",`,
				theme !== "auto" && `    theme: "${theme}",`,
				language !== "auto" && `    language: "${language}",`,
				!responseField && `    "response-field": ${responseField}`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`    "response-field-name": "${responseFieldName}"`,
				size !== "normal" && `    size: "${size}",`,
				retry !== "auto" && `    retry: "${retry}",`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`    "retry-interval": ${retryInterval},`,
				refreshExpired !== "auto" &&
					`    "refresh-expired": "${refreshExpired}",`,
				appearance !== "always" && `    appearance: "${appearance}",`,
				execution !== "render" && `    execution: "${execution}",`,
				"  }}",
				"/>",
			];
		},
	},
	{
		name: "svelte-turnstile",
		render: ({
			sitekey,
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"<Turnstile",
				`  siteKey="${sitekey}"` +
					(sitekeys.some(([skey]) => skey === sitekey)
						? ` /* ${
								sitekeys.find(([skey]) => skey === sitekey)[1]
						  } */`
						: ""),
				action && `  action="${action}"`,
				cdata && `  cData="${cdata}"`,
				theme !== "auto" && `  theme="${theme}"`,
				language !== "auto" && `  language="${language}"`,
				size !== "normal" && `  size="${size}"`,
				retry !== "auto" && `  retry="${retry}"`,
				!responseField && `  forms={${responseField}}`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`  formsField="${responseFieldName}"`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`  retryInterval={${retryInterval}}`,
				refreshExpired !== "auto" &&
					`  refreshExpired="${refreshExpired}"`,
				appearance !== "always" && `  appearance="${appearance}"`,
				execution !== "render" && `  execution="${execution}"`,
				"/>",
			];
		},
	},
	{
		name: "phoenix-turnstile",
		render: ({
			sitekey,
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"<Turnstile.widget",
				`  sitekey="${sitekey}"` +
					(sitekeys.some(([skey]) => skey === sitekey)
						? ` # ${sitekeys.find(([skey]) => skey === sitekey)[1]}`
						: ""),
				action && `  action="${action}"`,
				cdata && `  cData="${cdata}"`,
				theme !== "auto" && `  theme="${theme}"`,
				language !== "auto" && `  language="${language}"`,
				!responseField && `  "response-field"=${responseField}`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`  "response-field-name"="${responseFieldName}"`,
				size !== "normal" && `  size="${size}"`,
				retry !== "auto" && `  retry="${retry}"`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`  "retry-interval"=${retryInterval}`,
				refreshExpired !== "auto" &&
					`  "refresh-expired"="${refreshExpired}",`,
				appearance !== "always" && `  appearance="${appearance}"`,
				execution !== "render" && `  execution="${execution}"`,
				"/>",
			];
		},
	},
	{
		name: "silverstripe-turnstile",
		render: ({
			action,
			cdata,
			theme,
			language,
			responseField,
			responseFieldName,
			size,
			retry,
			retryInterval,
			refreshExpired,
			appearance,
			execution,
		}) => {
			return [
				"$form->enableSpamProtection()",
				"    ->Fields()",
				"      ->fieldByName('Captcha')",
				action &&
					`          ->setAttribute('data-action', '${action}')`,
				cdata && `          ->setAttribute('data-cData', '${cdata}')`,
				theme !== "auto" &&
					`          ->setAttribute('data-theme', '${theme}')`,
				language !== "auto" &&
					`          ->setAttribute('data-language', '${language}')`,
				!responseField &&
					`          ->setAttribute('data-response-field', '${responseField}')`,
				responseField &&
					responseFieldName !== "cf-turnstile-response" &&
					`          ->setAttribute('data-response-field-name', '${responseFieldName}')`,
				size !== "normal" &&
					`          ->setAttribute('data-size', '${size}')`,
				retry !== "auto" &&
					`          ->setAttribute('data-retry', '${retry}')`,
				retry === "auto" &&
					retryInterval !== 8000 &&
					`          ->setAttribute('data-retry-interval', '${retryInterval}')`,
				refreshExpired !== "auto" &&
					`          ->setAttribute('data-refresh-expired', '${refreshExpired}')`,
				appearance !== "always" &&
					`          ->setAttribute('data-appearance', '${appearance}')`,
				execution !== "render" &&
					`          ->setAttribute('data-execution', '${execution}')`,
			];
		},
	},
];

export default function Home() {
	const [sitekey, setSitekey] = useState("0x4AAAAAAAA6ulk8fhx8AjD-");
	const [action, setAction] = useState("demo");
	const [cdata, setCData] = useState("customerdata");
	const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");
	const [language, setLanguage] = useState<SupportedLanguages | "auto">(
		"auto",
	);
	const [responseField, setResponseField] = useState(true);
	const [responseFieldName, setResponseFieldName] = useState(
		"cf-turnstile-response",
	);
	const [size, setSize] = useState<"normal" | "compact" | "invisible">(
		"normal",
	);
	const [retry, setRetry] = useState<"auto" | "never">("auto");
	const [retryInterval, setRetryInterval] = useState(8000);
	const [refreshExpired, setRefreshExpired] = useState<
		"auto" | "manual" | "never"
	>("auto");
	const [appearance, setAppearance] = useState<
		"always" | "execute" | "interaction-only"
	>("always");
	const [execution, setExecution] = useState<"render" | "execute">("render");

	const [token, setToken] = useState("(loading)");
	const [widgetId, setWidgetId] = useState("");
	const [tab, setTab] = useState(0);

	const componentClass = "mx-8 bg-gray-800 w-80 px-2 py-0.5 rounded";
	return (
		<div className="my-20 space-y-10 --container">
			<div>
				<p>
					Sitekey:
					<input
						value={sitekey}
						onChange={(event) => setSitekey(event.target.value)}
						className={componentClass}
					/>
					{!sitekeys.some(([skey]) => skey === sitekey) && (
						<p className="text-red-300">
							Unknown sitekey. If it fails to load, make sure{" "}
							{location.hostname} is added the Domain list.
						</p>
					)}
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
					Select sitekey:
					<select
						onChange={(event) => {
							setSitekey(event.target.value);
						}}
						className={componentClass}
						value={sitekey}
					>
						{sitekeys.map(([templateSitekey, name]) => (
							<option
								key={templateSitekey}
								value={templateSitekey}
							>
								{name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="space-y-2">
				<p>
					Action:
					<input
						value={action}
						onChange={(event) => setAction(event.target.value)}
						className={componentClass}
					/>
					{!/^[a-z0-9_-]{0,32}$/i.test(action) && (
						<p className="text-red-300">
							Action should match the regex:
							<code>{" /^[a-z0-9_-]{0,32}$/i "}</code>
							If the widget fails to load, it&apos;s probably
							because of this.
						</p>
					)}
				</p>
				<p>
					cData:
					<input
						value={cdata}
						onChange={(event) => setCData(event.target.value)}
						className={componentClass}
					/>
					{!/^[a-z0-9_-]{0,255}$/i.test(cdata) && (
						<p className="text-red-300">
							cData should match the regex:
							<code>{" /^[a-z0-9_-]{0,255}$/i "}</code>
							If the widget fails to load, it&apos;s probably
							because of this.
						</p>
					)}
				</p>
				<div>
					Theme:
					<select
						onChange={(event) => {
							setTheme(
								event.target.value as "light" | "dark" | "auto",
							);
						}}
						className={componentClass}
					>
						<option value="auto">Auto</option>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
					</select>
				</div>
				<div>
					Language:
					<select
						onChange={(event) => {
							setLanguage(
								event.target.value as
									| "auto"
									| SupportedLanguages,
							);
						}}
						className={componentClass}
					>
						<option value="auto">Auto</option>
						{[
							"ar-eg",
							"de",
							"en",
							"es",
							"fa",
							"fr",
							"id",
							"it",
							"ja",
							"ko",
							"nl",
							"pl",
							"pt-br",
							"ru",
							"tr",
							"zh-cn",
							"zh-tw",
						].map((x) => (
							<option key={x} value={x}>
								{x}
							</option>
						))}
					</select>
				</div>
				<div>
					Response field (Form):
					<input
						type="checkbox"
						checked={responseField}
						onChange={() => {
							setResponseField(!responseField);
						}}
						className="ml-8 scale-150"
					/>
				</div>
				{responseField && (
					<div>
						Response field name:
						<input
							value={responseFieldName}
							onChange={(event) =>
								setResponseFieldName(event.target.value)
							}
							className={componentClass}
						/>
					</div>
				)}
				<div>
					Size:
					<select
						onChange={(event) => {
							setSize(
								event.target.value as
									| "normal"
									| "compact"
									| "invisible",
							);
						}}
						className={componentClass}
					>
						<option value="normal">Normal</option>
						<option value="compact">Compact</option>
						<option value="invisible">
							Invisible (recaptcha compat)
						</option>
					</select>
				</div>
				<div>
					Retry:
					<select
						onChange={(event) => {
							setRetry(event.target.value as "auto" | "never");
						}}
						className={componentClass}
					>
						<option value="auto">Auto</option>
						<option value="never">Never</option>
					</select>
				</div>
				{retry === "auto" && (
					<div className="align-bottom">
						Retry Interval:
						<input
							type="range"
							min="8000"
							max="900000"
							value={retryInterval}
							className={componentClass + " align-text-bottom"}
							onChange={(event) => {
								setRetryInterval(+event.target.value);
							}}
						/>
						<span className="font-mono">{retryInterval}ms</span>
					</div>
				)}
				<div>
					Refresh Expired:
					<select
						onChange={(event) => {
							setRefreshExpired(
								event.target.value as
									| "auto"
									| "manual"
									| "never",
							);
						}}
						className={componentClass}
					>
						<option value="auto">Auto</option>
						<option value="manual">Manual</option>
						<option value="never">Never</option>
					</select>
				</div>
				<div>
					Appearance:
					<select
						onChange={(event) => {
							setAppearance(
								event.target.value as
									| "always"
									| "execute"
									| "interaction-only",
							);
						}}
						className={componentClass}
					>
						<option value="always">Always</option>
						<option value="execute">Execute</option>
						<option value="interaction-only">
							Interaction Only
						</option>
					</select>
				</div>
				<div>
					Execution:
					<select
						onChange={(event) => {
							setExecution(
								event.target.value as "render" | "execute",
							);
						}}
						className={componentClass}
					>
						<option value="render">Render</option>
						<option value="execute">Execute</option>
					</select>
				</div>
			</div>
			<Turnstile
				sitekey={sitekey}
				action={action}
				cData={cdata}
				theme={theme}
				language={language}
				responseField={responseField}
				responseFieldName={responseFieldName}
				size={size}
				retry={retry}
				retryInterval={retryInterval}
				refreshExpired={refreshExpired}
				appearance={appearance}
				execution={execution}
				onLoad={(widgetId) => {
					setToken("(loading)");
					setWidgetId(widgetId);
				}}
				onError={(e) => {
					setToken(`error: ${e}`);
				}}
				onExpire={() => {
					setToken("token expired");
				}}
				onVerify={(token) => setToken(token)}
				fixedSize={true}
				className="bg-gray-800"
			/>
			<div>
				<p>Token:</p>
				<p className="h-20 px-4 py-2 overflow-auto bg-gray-800 rounded">
					{token}
				</p>
				<p>WidgetId: {widgetId}</p>
				<p className="flex gap-4 mt-4">
					Actions:
					<button
						className="--btn --btn-0 --btn-primary"
						onClick={() => {
							window.turnstile.execute(widgetId);
						}}
						disabled={
							!widgetId ||
							(execution !== "execute" &&
								appearance !== "execute")
						}
					>
						Execute
					</button>
					<button
						className="--btn --btn-0 --btn-primary"
						onClick={() => {
							window.turnstile.reset(widgetId);
							setToken("(loading)");
						}}
						disabled={!widgetId}
					>
						Reset
					</button>
				</p>
			</div>
			<pre className="px-4 py-2 bg-gray-800 rounded">
				<div className="flex flex-wrap gap-2 mb-8 border-b border-black">
					{previews.map((name, idx) => (
						<button
							className={`px-2 hover:bg-gray-500${
								tab === idx ? " bg-black" : ""
							}`}
							onClick={() => setTab(idx)}
							key={name.name}
						>
							{name.name}
						</button>
					))}
				</div>
				<code>
					{previews[tab]
						.render({
							sitekey,
							action,
							cdata,
							theme,
							language,
							responseField,
							responseFieldName,
							size,
							retry,
							retryInterval,
							refreshExpired,
							appearance,
							execution,
						})
						.filter((x) => x)
						.join("\n")}
				</code>
			</pre>
		</div>
	);
}
