import Link from "next/link";
import { useState } from "react";

export default function BSOD({ error }: { error: Error }) {
	const [showTechnical, setShowTechnical] = useState(false);
	return (
		<div className="absolute flex flex-col items-center justify-center w-screen h-screen px-4 py-8 bg-blue-400 inset gap-y-32">
			<div>
				<p className="text-9xl">{":("}</p>
				<p className="mt-6 mb-12 text-2xl font-medium">
					This website ran into a problem and needs to be reloaded.
				</p>
				<div className="grid gap-x-4 gap-y-2 sm:grid-cols-2">
					<Link href="/discord">
						<a className="--btn --btn-3 --btn-neutral">Support</a>
					</Link>
					{error && (
						<button
							className="--btn --btn-3 --btn-neutral"
							onClick={() => setShowTechnical(!showTechnical)}
						>
							{showTechnical
								? "Hide technical information"
								: "Show technical information"}
						</button>
					)}
				</div>
			</div>

			{showTechnical && (
				<>
					<div>
						<p className="text-4xl font-bold">
							{error.message || error.toString()}
						</p>
						<pre>
							<code className="break-all">{error.stack}</code>
						</pre>
					</div>
					{navigator.clipboard && (
						<button
							className="--btn --btn-3 --btn-neutral"
							onClick={() => {
								const header =
									error.message || error.toString();
								navigator.clipboard.writeText(
									`${header}\n${error.stack}`,
								);
							}}
						>
							Copy information
						</button>
					)}
				</>
			)}
		</div>
	);
}
