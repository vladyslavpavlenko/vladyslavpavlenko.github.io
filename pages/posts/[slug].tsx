import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { PiPaperPlaneFill } from "react-icons/pi";
import { CSSTransitionGroup } from "react-transition-group";
import { Main } from "../../components/Layouts/Layouts";
import { baseUrl, SEO } from "../../components/SEO/SEO";
import Badge from "../../components/Badge/Badge";
import { LinkShare } from "../../components/Links/Links";
import { mdxComponents } from "../../components/Prose/Prose";
import formatDate from "../../lib/formatDate";
import contentfulLoader from "../../lib/contentfulLoader";
import { getPostBySlug, getPostSlugs } from "../../lib/markdownLoader";
import { siteSettings } from "../../constants";
import { useDarkMode } from "../../lib/useDarkMode";

export default function Post(props) {
  const router = useRouter();
  const slug = router.query.slug as string;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const avatarPath = `${basePath}/pic.png`;
  const [showScrollUp, setShowScrollUp] = useState(false);
  const { isDark, mounted } = useDarkMode();

  const post = props.post;

  useEffect(() => {
    let rafId: number | null = null;
    
    const updateScrollState = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollUp(scrollTop > 300); // Show button after scrolling 300px
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!post) {
    return (
      <>
        <SEO
          seo={{
            title: "Not found",
          }}
        />
        <Main>
          <h1>Not found</h1>
        </Main>
      </>
    );
  }

  const { title, metaDescription, publishedDate, coverUrl, coverLight, coverDark, coverAlt } = post;
  
  // Compute current cover based on theme
  const currentCover = mounted
    ? (isDark 
        ? (coverDark || coverLight || coverUrl)
        : (coverLight || coverDark || coverUrl))
    : (coverLight || coverDark || coverUrl);
  
  const relativeUrl = `/posts/${slug}`;
  const url = `${baseUrl}${relativeUrl}`;

  return (
    <>
      <SEO
        seo={{
          title,
          description: metaDescription,
          path: relativeUrl,
          image: (coverLight || coverDark || coverUrl)
            ? (((coverLight || coverDark || coverUrl).startsWith('http://') || (coverLight || coverDark || coverUrl).startsWith('https://'))
                ? (coverLight || coverDark || coverUrl)
                : `${baseUrl}${(coverLight || coverDark || coverUrl).startsWith('/') ? (coverLight || coverDark || coverUrl) : `/${coverLight || coverDark || coverUrl}`}`)
            : `${baseUrl}/social.png`,
        }}
      />
      <Main>
        <header className="mb-6 rounded-lg sm:mb-6">
          {post.draft && (
            <div className="mb-4 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 p-3">
              <div className="flex items-center">
                <span className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                  📝 Draft Post - This post is not published and only visible in development mode
                </span>
              </div>
            </div>
          )}
          <h1 className="pb-2 text-2xl text-neutral-800 [font-variation-settings:'opsz'_32,_'wght'_600] dark:text-white sm:pb-3 sm:text-3xl font-bold">
            <Link href={relativeUrl}>{title}</Link>
          </h1>
          {currentCover ? (
            <div className="mt-4 sm:mt-4 mb-6 sm:mb-6 -mx-4 sm:-mx-8 overflow-hidden rounded-lg h-full">
              <Image
                key={currentCover}
                height={400}
                width={700}
                alt={coverAlt || `Cover image for post: ${title}`}
                src={currentCover}
                {...(currentCover.startsWith('http://') || currentCover.startsWith('https://')
                  ? {
                      loader: (props) =>
                        contentfulLoader({
                          ...props,
                          custom: ["fit=crop", "f=center"],
                        }),
                    }
                  : {})}
                className="bg-gray-200 dark:bg-zinc-900 dark:opacity-100 object-cover w-full h-full"
              />
            </div>
          ) : null}
          <div className="flex w-full flex-row justify-between">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="flex flex-row items-center gap-2 [font-variation-settings:'wght'_450]"
              >
                <div className="relative w-5 h-5">
                  <Image
                    alt={props.siteSettings?.siteTitle || "Site avatar"}
                    title={props.siteSettings?.siteTitle || "Site avatar"}
                    className="rounded-full bg-gray-200 dark:bg-neutral-600 object-cover"
                    src={avatarPath}
                    fill
                    unoptimized
                  />
                </div>
                <span className="text-neutral-800 dark:text-silver">Vladyslav Pavlenko</span>
              </Link>
              <time dateTime={publishedDate} className="ml-0 text-sm text-neutral-500 dark:text-silver-dark">
                {formatDate(publishedDate)}
                {post.readingTime && ` · ${post.readingTime} min read`}
              </time>
            </div>
            <LinkShare title={title} url={url}>
              Share
            </LinkShare>
          </div>
        </header>

        <div className="rounded-lg p-0 pt-2">
          <div className="prose-custom prose-quotefix">
            <MDXRemote {...props.post.body} components={mdxComponents} />
          </div>
        </div>
      </Main>
      <div className="fixed bottom-6 right-6 z-10">
        <CSSTransitionGroup
          transitionName="island"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {showScrollUp && (
            <div
              key="scroll-up"
              className="rounded-full"
            >
              <button
                onClick={scrollToTop}
                className="island"
                aria-label="Scroll to top"
              >
                <span className="sr-only">Scroll to top</span>
                <PiPaperPlaneFill size={20} />
              </button>
            </div>
          )}
        </CSSTransitionGroup>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  // In production, hide draft posts unless in development mode
  if (post.draft && process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    };
  }

  const remarkTypograf = require("@mavrin/remark-typograf");
  const { default: rehypePrettyCode } = await import("rehype-pretty-code");

  const body = await serialize(post.body, {
    mdxOptions: {
      remarkPlugins: [[remarkTypograf, { locale: ["en-US"] }]],
      rehypePlugins: [
        [
          rehypePrettyCode as any,
          {
            theme: {
              dark: "github-dark",
              light: "github-light",
            },
          },
        ],
      ],
    },
  });

  return {
    props: {
      siteSettings,
      post: { ...post, body },
    },
  };
}
