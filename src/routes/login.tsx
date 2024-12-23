import type { RouteSectionProps } from "@solidjs/router";
import { action, redirect } from "@solidjs/router";
import { getRequestProtocol, setCookie } from "vinxi/http";

const login = action(async () => {
	"use server";

	setCookie("authenticated", "true", {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		httpOnly: true,
		sameSite: "lax",
		secure: getRequestProtocol() === "https",
	});

	return redirect("/");
});

export default function Login(props: RouteSectionProps) {
	return (
		<form action={login} method="post">
			<button type="submit">Login</button>
		</form>
	);
}
