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

const pagesCollection = defineCollection({
	loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/pages" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		skipLinkText: z.string(),
		header: z.object({
			logoAriaLabel: z.string(),
			navAriaLabel: z.string(),
			menuToggleAriaLabel: z.string(),
			mobileContactText: z.string(),
			contactButtonText: z.string(),
		}),
		footer: z.object({
			logoAriaLabel: z.string(),
			description: z.string(),
			informationHeading: z.string(),
			servicesHeading: z.string(),
			services: z.array(z.string()),
			contactHeading: z.string(),
			phonePrefix: z.string(),
			emailLabel: z.string(),
			creditPrefix: z.string(),
			creditCompany: z.string(),
			creditCompanyUrl: z.string(),
			copyrightText: z.string(),
		}),
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
			imageAlt: z.string(),
		}),
	}),
});

export const collections = {
	blog: blogsCollection,
	pages: pagesCollection,
};
