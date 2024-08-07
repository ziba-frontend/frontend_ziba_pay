import createMDX from "fumadocs-mdx/config";
import { rehypeCode, rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
};

const withMDX = createMDX({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeCode,
        {
          ...rehypeCodeDefaultOptions,
        },
      ],
    ],
  },
});

export default withMDX(config);
