# Rovic Sports USA

Shopify theme development, site review, and launch planning for Rovic Sports USA.

## Project files

- `theme-dev/`: downloaded Shopify theme with initial local homepage edits.
- `theme-original-154863993006-20260907.zip`: original theme archive before edits.
- `LOCAL_DEVELOPMENT.md`: development setup, completed work, and pending validation.
- `rovic_information_architecture_clear.md`: proposed information architecture.
- `rovic_global_launch_prd.md`: global launch requirements.
- Other `rovic_*.md` files: supporting reviews and implementation plans.
- `screenshots/`: historical storefront screenshots, not current QA evidence.
- `products.json`, `verify_products.json`, `verify_umbrella.js`: historical product snapshots.
- `capture_rovic.mjs`: storefront screenshot utility; requires Node.js and Microsoft Edge.

The screenshot utility reads the storefront password from the
`SHOPIFY_STOREFRONT_PASSWORD` environment variable.

## Status

Theme source is available locally. Initial homepage edits have passed a JSON
structure check but still require browser verification. No publication has been
performed. See `LOCAL_DEVELOPMENT.md` for preview instructions.

This repository is not a complete Shopify store backup. Products, inventory,
orders, navigation, pages, and hosted media remain Shopify-managed resources.

Authentication files, browser profiles, raw HTML captures, cart session responses,
and local logs are intentionally excluded from version control. They remain local.
