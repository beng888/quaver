import { useRef } from "react";
import { getCategories, getCake, getAllCakes } from "@lib/data";
import { GetStaticProps, GetStaticPaths } from "next";
import Cake from "@pages/category/cake";

import { ICake } from "@lib/interfaces";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import Layout from "@layout/index";

export default function CAKE({ cake }: { cake: ICake }) {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
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
            <Cake data={cake} />
          </div>
        </Layout>
      </main>
    </LocomotiveScrollProvider>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;

  const data: { cake: ICake | null } = await getCake(slug);

  if (!data.cake) {
    return {
      notFound: true,
    };
  }

  return {
    props: { cake: { ...data.cake } },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories } = await getCategories();
  const { cakes } = await getAllCakes();

  return {
    paths: categories
      .map((category) =>
        cakes.map((cake) => ({
          params: { cakes: category.slug, slug: cake.slug },
        }))
      )
      .flat(),
    fallback: "blocking",
  };
};
