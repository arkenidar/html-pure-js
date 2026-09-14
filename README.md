# html-pure-js

A small static website built with **pure HTML, CSS, and JavaScript** — no frameworks, no build tools, no dependencies. Just open the pages in a browser.

The site demonstrates a simple "Buy Recap" shopping experience where you can add items to an order, remove them, and watch the running total update.

## Structure

```
docs/
├── index.html              # Landing page with navigation
├── js/
│   └── selectors.js        # Tiny DOM selector helpers ($$one, $$all, $$array)
└── buy-ui/
    ├── buy.html            # "Buy Recap" page
    ├── buy.js              # Page logic (rendering, add/remove, total)
    ├── css/
    │   └── button.css      # Button appearance (cursor, colors, hover)
    └── media/
        └── item-list.css   # Item list layout (margins)
```

## How to run

There is no build step or server required. Just open `docs/index.html` (or `docs/buy-ui/buy.html`) directly in a browser via `file://`.

For live reload while editing, use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension (right-click an HTML file and choose "Open with Live Server").

Alternatively, you can serve the `docs` folder with any static file server, for example Python's built-in server:

```sh
python -m http.server -d docs
```

Then visit <http://localhost:8000>.

The site is also published on GitHub Pages at <https://arkenidar.github.io/html-pure-js/>.

## Pages

- **Index** — entry point that links to the buy page.
- **Buy Recap** — shows your current order and a list of items you can add.

## How it works

- `selectors.js` defines global `$$one`, `$$all`, and `$$array` helpers that wrap `querySelector`, `querySelectorAll`, and `Array.from(...)`.
- `buy.js` defines the available items and a starting order, renders them into `<ul>` lists, and wires up click handlers to add/remove items and update the total.
- Styling is split between `css/button.css` (button appearance) and `media/item-list.css` (list layout).

## License

This project is released into the **public domain** under [The Unlicense](LICENSE.txt). You are free to copy, modify, publish, use, compile, sell, or distribute it for any purpose, without restriction.
