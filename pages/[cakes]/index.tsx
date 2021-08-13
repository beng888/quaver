import { useRef } from "react";
import Category from "@pages/category";
import { getCategories, getCakes } from "@lib/data";
import { GetStaticProps, GetStaticPaths } from "next";
import { ICategory } from "@lib/interfaces";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";

export default function Cakes({ category }: { category: ICategory }) {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        direction: "horizontal",
        tablet: {
          smooth: true,
          breakpoint: 768,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <main data-scroll-container ref={containerRef}>
        <Layout>
          <div data-scroll-section>
            <Category data={category} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.cakes as string;

  const data: { category: ICategory | null } = await getCakes(slug);

  if (!data.category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category: { ...data.category } },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCategories();

  return {
    paths: data.categories.map((c) => ({ params: { cakes: c.slug } })),
    fallback: "blocking",
  };
};
