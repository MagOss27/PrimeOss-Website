import { Tokens } from "@wix/sdk";
import { WIX_SESSION_COOKIE } from "./constants";
import { getWixClient } from "./wix-client.base";
import Cookies from "js-cookie";

const tokens: Tokens = JSON.parse(Cookies.get(WIX_SESSION_COOKIE) || "{}");

export const wixBrowserClient = getWixClient(tokens);