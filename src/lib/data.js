import { GraphQLClient, gql } from "graphql-request";

const endpoint =
  "https://api-ap-northeast-1.graphcms.com/v2/cksn3mof013gv01yu50g2d1mm/master";

const graphQLClient = new GraphQLClient(endpoint);

export const getCategories = async () => {
  const query = gql`
    {
      categories {
        id
        title
        description
        slug
        image {
          url
          fileName
        }
      }
    }
  `;

  return await graphQLClient.request(query);
};

export const getCakes = async (slug) => {
  const query = gql`
    query getCakes($slug: String!) {
      category(where: { slug: $slug }) {
        id
        slug
        title
        description
        image {
          url
          fileName
        }
        cakes {
          title
          slug
          description
          id
          pricing
          images {
            url
            fileName
          }
          gallery {
            slug
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query, { slug });
};

export const getAllCakes = async (slug) => {
  const query = gql`
    {
      cakes {
        slug
      }
    }
  `;

  return await graphQLClient.request(query, { slug });
};

export const getCake = async (slug) => {
  const query = gql`
    query getCake($slug: String!) {
      cake(where: { slug: $slug }) {
        pricing
        description
        id
        title
        gallery {
          slug
        }
        images {
          fileName
          url
        }
        category {
          slug
          cakes {
            slug
            title
            pricing
            images {
              fileName
              url
            }
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query, { slug });
};

export const getGalleries = async (slug) => {
  const query = gql`
    {
      galleries {
        slug
        title
        images {
          fileName
          url
        }
        cake {
          ... on Cake {
            title
            images {
              fileName
              url
            }
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query, { slug });
};

export const getGallery = async (slug) => {
  const query = gql`
    query getGallery($slug: String!) {
      gallery(where: { slug: $slug }) {
        title
        slug
        pricing
        images {
          url
          fileName
        }
        cake {
          ... on Cake {
            slug
            category {
              image {
                url
                fileName
              }
              slug
            }
          }
        }
      }
    }
  `;

  return await graphQLClient.request(query, { slug });
};
