export default class StorefrontClient {
  constructor ({ shop = '', accessToken = '' }) {
    this.accessToken = accessToken
    this.shop = shop
    this.endpoint = `https://${shop}.myshopify.com/api/graphql`
    this.method = 'POST'
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Shopify-Storefront-Access-Token': this.accessToken
    }
  }

  async fetch ({ query = '', variables = {} }) {
    const response = await fetch(this.endpoint, {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    })

    if (!response.ok) {
      throw response
    }

    return response.json()
  }
}
