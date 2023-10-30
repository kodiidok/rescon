export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "RESCON23",
	description: "The Premier Postgraduate Research Congress of Sri Lanka.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
			label: "Scan QR",
			href: "/scan-qr",
		},
		{
			label: "Lineup",
			href: "/session-lineup",
		},
		{
			label: "Program",
			href: "/time-table",
		},
		{
			label: "Program Search",
			href: "/program-search",
		},
		{
			label: "Agenda",
			href: "/agenda",
		},
		{
			label: "Livestream",
			href: "/livestream",
		},
		{
			label: "Talks & Discussions",
			href: "/talks",
		},
		{
			label: "Map",
			href: "/map",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	navMenuItems: [
		{
			label: "Scan QR",
			href: "/scan-qr",
		},
		{
			label: "Session Lineup",
			href: "/session-lineup",
		},
		{
			label: "Technical Program",
			href: "/technical-program",
		},
		{
			label: "Program Search",
			href: "/program-search",
		},
		{
			label: "Inaugration Agenda",
			href: "/agenda",
		},
		{
			label: "Inaugaration Livestream",
			href: "/livestream",
		},
		{
			label: "Talks & Discussions",
			href: "/talks",
		},
		{
			label: "Venue Map",
			href: "/map",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
