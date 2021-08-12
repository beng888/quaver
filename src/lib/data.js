import { GraphQLClient, gql } from "graphql-request";

const endpoint =
  "https://api-ap-northeast-1.graphcms.com/v2/ckr074wpl39fs01xi6oqa8ka2/master";

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
        }
        cakes {
          title
          slug
          description
          id
          price
          images {
            url
            fileName
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
        price
        description
        id
        title
        images {
          fileName
          url
        }
        category {
          cakes {
            slug
            title
            price
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
