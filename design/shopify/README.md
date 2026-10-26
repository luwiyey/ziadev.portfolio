# Forma - editable Shopify theme concept

This is original Shopify Liquid theme source, separate from the React frontend
demo at /?concept=forma. It has not been installed or tested in a Shopify store
and is not a commissioned client project or a Theme Store-approved theme.

The theme includes editable home-page settings, a featured collection,
product/variant forms, quantity selection, sold-out handling, native cart
updates and removal, collection pagination, policy links, page and 404 views.
It uses Shopify's server-rendered forms and secure hosted checkout rather
than collecting payment details itself.

To test with a development store, use Shopify CLI in the forma directory:

    shopify theme check
    shopify theme dev --store YOUR-DEVELOPMENT-STORE.myshopify.com

Before any publication, configure a real catalogue, navigation, policies,
taxes/shipping, inventory, and product photography. Test product variants,
discounts, cart updates, keyboard navigation, checkout, and mobile layouts in
that store. Never upload directly over a client's published theme.

The portfolio demo uses fictional products and an in-memory cart. No products,
orders, payments, personal information, or store credentials are transmitted.
