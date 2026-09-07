# Rovic local development

Source theme: 154863993006
Store: rkpg7q-dn.myshopify.com
Downloaded: 2026-09-07
Working directory: theme-dev
Original archive: theme-original-154863993006-20260907.zip

The archive contains the original downloaded theme before local edits.
Theme files do not include a complete backup of products, inventory, navigation,
pages, orders, or Shopify-hosted media. Those remain store resources.

## Local changes

- Disabled the empty image-only section before the homepage slideshow.
- Named the lead slideshow product explicitly: Rovic QFC Golf Push Cart.
- Moved category selection and product listings before the longer brand content.
- Connected the existing Explore QFC button to the QFC product.

These changes are local only. No theme push or publication has been performed.
The homepage JSON parses and its section order has no missing or duplicate IDs.
Browser rendering and link destination validation are still pending.

## Preview

Run from this workspace:

```powershell
npm exec --yes --package @shopify/cli@latest -- shopify theme dev --store rkpg7q-dn.myshopify.com --theme 154863993006 --path theme-dev --port 9292 --nodelete
```

This command synchronizes local changes to the specified authorized development
theme. It does not publish the theme. Preview normally uses http://127.0.0.1:9292.
The server has NOT been started: automatic approval review rejected the launch
because the account usage limit was reached.

## Remaining work

- Start preview and inspect desktop/mobile rendering before further redesign.
- Verify navigation targets against current Shopify collections and pages.
- Review homepage length, support links, and remaining empty CTA destinations.
- Confirm shipping, returns, warranty, testimonial, pricing, and stock content
  with the business owner before launch.
- Verify product selection, cart, and checkout using real Shopify data.

Do not commit browser profiles, cookie files, authentication data, or server logs.
