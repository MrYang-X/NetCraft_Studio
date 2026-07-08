import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 定义 blog 集合
const blog = defineCollection({
	// 从 src/content/blog/ 目录中加载 Markdown 和 MDX 文件。
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// 使用 schema 对 Frontmatter 进行类型检查(Type-check)
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// 转换 string 为 Date 对象
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

// 定义 member 集合
const member = defineCollection({

	loader: glob({ base: './src/content/member', pattern: '**/*.{md,mdx}' }),

	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
})

// 导出 collections 对象来注册集合
export const collections = { blog, member };