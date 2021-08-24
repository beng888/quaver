export interface ICategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: {
    url: string;
    fileName: string;
  };
  cakes: [
    {
      images: {
        fileName: string;
        url: string;
      };
      title: string;
      slug: string;
      description: string;
      id: string;
      pricing: string[];
      gallery?: {
        slug: string;
      };
    }
  ];
}

export interface ICake {
  id: string;
  price: string;
  title: string;
  description: string;
  images: [{ url: string; fileName: string }];
  category: {
    slug: string;
    cakes: [
      {
        slug: string;
        title: string;
        pricing: string[];
        images: [
          {
            fileName: string;
            url: string;
          }
        ];
      }
    ];
  };
}

export interface IGallery {
  title: string;
  slug: string;
  pricing: string[];
  images: [
    {
      url: string;
      fileName: string;
    }
  ];
}
