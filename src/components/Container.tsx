import Head from "next/head";
import { useRouter } from "next/router";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Your Site",
    description: `Your site description`,
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://your-site.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <main className={props.className}>{children}</main>
    </>
  );
}
