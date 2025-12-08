import Head from "next/head";
import { DefaultSeo } from "next-seo";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://pvlnk.xyz";

export const defaultSEO = {
  title: "Vladyslav Pavlenko",
  description: "Go Engineer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    site_name: "Vladyslav Pavlenko",
    images: [
      {
        url: `${baseUrl}/social.png`,
        alt: "Vladyslav Pavlenko",
      },
    ],
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
}

export function SEO({ seo }: { seo?: SEOProps }) {
  return (
    <>
      <DefaultSeo
        {...{
          ...defaultSEO,
          openGraph: {
            ...defaultSEO.openGraph,
            images: [{ url: seo.image, alt: seo.title }],
          },
          ...seo,
        }}
      />
      <Head>
        <meta name="googlebot" content="index,follow" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {seo.path ? (
          <link
            rel="canonical"
            href={`${baseUrl}${seo.path === "/" ? "" : seo.path}`}
          />
        ) : null}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "WebSite",
              name: defaultSEO.title,
              url: baseUrl,
              image: defaultSEO.openGraph.images[0].url,
              author: {
                "@context": "http://schema.org",
                "@type": "Person",
                name: defaultSEO.title,
                url: baseUrl,
                jobTitle: "Go Engineer",
                alumniOf: "Kyiv National University",
                gender: "male",
                image: defaultSEO.openGraph.images[0].url,
                sameAs: [
                  "https://www.linkedin.com/in/vladyslavpavlenko",
                ],
              },
            }),
          }}
        />

        <meta name="author" content="Vladyslav Pavlenko" />
        <meta
          name="theme-color"
          content="#DFDFDE"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="google-site-verification"
          content="Oh4RDwXU307Z8ZofFyLQcqmin4Zuv309dats9oWWeHU"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS feed"
          href={`${baseUrl}/posts/rss`}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="ae25f867-3128-4b41-a23c-3871380e0c26"
        ></script>
      </Head>
    </>
  );
}
