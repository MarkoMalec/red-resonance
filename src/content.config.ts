import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

// Every collection must reflect Decap's config.yml collection schema
// In order to be able to optimize images with Astro built-in compoments, like <Image />, we first must use this image helper
// Doc: https://docs.astro.build/en/guides/images/#images-in-content-collections

const blogsCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			author: z.string(),
			date: z.date(),
			image: image(),
			imageAlt: z.string(),
			isFeatured: z.boolean().optional().default(false),
		}),
});

const navItemSchema: z.ZodType<{
	label: string;
	url: string;
	children?: { label: string; url: string }[];
}> = z.object({
	label: z.string(),
	url: z.string(),
	children: z.array(z.object({ label: z.string(), url: z.string() })).optional().default([]),
});

const globalCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/global" }),
	schema: z.union([
		z.object({
			siteName: z.string(),
			tagline: z.string(),
			defaultDescription: z.string(),
			siteUrl: z.string(),
			author: z.string(),
			locale: z.string(),
			ogLocale: z.string(),
			ogImage: z.string(),
			logo: z.string(),
			facebook: z.string().optional().default(""),
			instagram: z.string().optional().default(""),
		}),
		z.object({
			logoAriaLabel: z.string(),
			skipLinkText: z.string(),
			skipLinkAriaLabel: z.string(),
			navAriaLabel: z.string(),
			menuToggleAriaLabel: z.string(),
			darkModeToggleAriaLabel: z.string(),
			mobileContactText: z.string(),
			contactButtonText: z.string(),
			contactButtonHref: z.string(),
			navItems: z.array(navItemSchema),
		}),
		z.object({
			logoAriaLabel: z.string(),
			description: z.string(),
			informationHeading: z.string(),
			informationLinks: z.array(z.object({ label: z.string(), url: z.string() })),
			servicesHeading: z.string(),
			services: z.array(z.string()),
			contactHeading: z.string(),
			addressLineOne: z.string(),
			addressLineTwo: z.string().optional().default(""),
			addressCity: z.string(),
			addressState: z.string(),
			addressZip: z.string(),
			addressUrl: z.string(),
			phonePrefix: z.string(),
			phoneForTel: z.string(),
			phoneFormatted: z.string(),
			email: z.string(),
			emailLabel: z.string(),
			creditPrefix: z.string(),
			creditCompany: z.string(),
			creditCompanyUrl: z.string(),
			copyrightText: z.string(),
		}),
	]),
});

const pagesCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		hero: z.object({
			eyebrow: z.string(),
			titleLines: z.array(z.string()),
			text: z.string(),
			primaryButtonText: z.string(),
			primaryButtonHref: z.string(),
			secondaryButtonText: z.string(),
			secondaryButtonHref: z.string(),
			imageAlt: z.string(),
		}),
		services: z.array(
			z.object({
				title: z.string(),
				text: z.string(),
			}),
		),
		about: z.object({
			eyebrow: z.string(),
			title: z.string(),
			paragraphs: z.array(z.string()),
			quote: z.string(),
			quoteAuthor: z.string(),
			quoteRole: z.string(),
			buttonText: z.string(),
			buttonHref: z.string(),
			imageOneAlt: z.string(),
			imageTwoAlt: z.string(),
		}),
		feature: z.object({
			eyebrow: z.string(),
			title: z.string(),
			paragraphs: z.array(z.string()),
			imageOneAlt: z.string(),
			imageTwoAlt: z.string(),
		}),
		gallery: z.object({
			eyebrow: z.string(),
			title: z.string(),
			buttonText: z.string(),
			buttonHref: z.string(),
			imageAlts: z.array(z.string()),
		}),
		testimonials: z.object({
			eyebrow: z.string(),
			title: z.string(),
			text: z.string(),
			buttonText: z.string(),
			buttonHref: z.string(),
			buttonAriaLabel: z.string(),
			reviews: z.array(
				z.object({
					name: z.string(),
					role: z.string(),
					quote: z.string(),
					imageAlt: z.string(),
				}),
			),
		}),
		faq: z.object({
			eyebrow: z.string(),
			title: z.string(),
			items: z.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			),
		}),
		cta: z.object({
			titleLines: z.array(z.string()),
			text: z.string(),
			buttonText: z.string(),
			buttonHref: z.string(),
			imageAlt: z.string().optional().default(""),
		}),
	}),
});

export const collections = {
	blog: blogsCollection,
	global: globalCollection,
	pages: pagesCollection,
};
