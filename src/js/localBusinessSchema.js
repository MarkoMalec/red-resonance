import { SITE, BUSINESS } from "@data/client";

export function getLocalBusinessSchema(origin, site = {}, footer = {}) {
	const sameAs = [];
	const facebook = site.facebook ?? BUSINESS.socials?.facebook;
	const instagram = site.instagram ?? BUSINESS.socials?.instagram;
	if (facebook) sameAs.push(facebook);
	if (instagram) sameAs.push(instagram);

	const lineOne = footer.addressLineOne ?? BUSINESS.address.lineOne;
	const lineTwo = footer.addressLineTwo ?? BUSINESS.address.lineTwo;

	return {
		"@context": "https://schema.org",
		"@type": ["LocalBusiness", "WebSite"],
		"name": site.siteName ?? BUSINESS.name,
		"url": site.siteUrl ?? SITE.url,
		"logo": origin + (site.logo ?? BUSINESS.logo),
		"image": origin + (site.logo ?? BUSINESS.logo),
		"email": footer.email ?? BUSINESS.email,
		"telephone": footer.phoneForTel ?? BUSINESS.phoneForTel,
		"address": {
			"@type": "PostalAddress",
			"streetAddress": lineTwo ? `${lineOne}, ${lineTwo}` : lineOne,
			"addressLocality": footer.addressCity ?? BUSINESS.address.city,
			"addressRegion": footer.addressState ?? BUSINESS.address.state,
			"postalCode": footer.addressZip ?? BUSINESS.address.zip,
		},
		"sameAs": sameAs,
		"inLanguage": site.locale ?? SITE.locale,
	};
}
