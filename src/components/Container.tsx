import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";

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
    title: "made by fluxon",
    description: `Creative development studio`,
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
          content={`https://madebyfluxon.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="made by fluxon" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="made by fluxon" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
      </Head>
      <main className={props.className}>{children}</main>
      <Footer />
    </>
  );
}
