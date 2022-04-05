export const fragments = {
  collectionFields: `
    fragment collectionFields on Collection {
      id
      title
    }
  `,
  productFields () {
    return `fragment productFields on Product {
      id
      availableForSale
      title
      handle
      onlineStoreUrl
      options {
        name
        values
      }
      variants(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            ...variantFields
          }
        }
      }
      images(first: 100) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          cursor
          node {
            id
            transformedSrc(maxWidth: 450)
            altText
          }
        }
      }
    }
    ${this.variantFields}`
  },
  variantFields: `
    fragment variantFields on ProductVariant {
      id
      title
      availableForSale
      selectedOptions {
        name
        value
      }
      priceV2 {
        amount
      }
      image {
        id
        transformedSrc(maxWidth: 450)
        altText
      }
    }
  `
}

export const queries = {
  collectionByHandle: `
    query($handle: String!) {
      collection: collectionByHandle(handle: $handle) {
        ...collectionFields
        products(first: 20) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              ...productFields
            }
          }
        }
      }
    }
    ${fragments.collectionFields}
    ${fragments.productFields()}
  `,
  products: `
    query($query: String) {
      products(first: 20, query: $query) {
        edges {
          node {
            ...productFields
          }
        }
      }
    }
    ${fragments.productFields()}
  `,
  productModels: `
    query($handle: String!) {
      collection: collectionByHandle(handle: $handle) {
        products(first: 250) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    }
  `
}
