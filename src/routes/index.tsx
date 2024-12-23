import { action, query, redirect, type RouteDefinition } from "@solidjs/router";
import { getCookie, getRequestProtocol, setCookie } from "vinxi/http";

const checkAuth = query(async () => {
	"use server";

	const nextPath = getCookie("authenticated") === "true" ? "/" : "/login";
	return redirect(nextPath);
}, "auth");

const logout = action(async () => {
	"use server";

	setCookie("authenticated", "false", {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
		httpOnly: true,
		sameSite: "lax",
		secure: getRequestProtocol() === "https",
	});

	return redirect("/login");
});

export const route = {
	preload() {
		checkAuth();
	},
} satisfies RouteDefinition;

export default function Shell() {
	return (
		<form action={logout} method="post">
			<button type="submit">Logout</button>
		</form>
	);
}
