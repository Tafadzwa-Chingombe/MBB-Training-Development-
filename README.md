# MBB Training & Development — Website

A static website (HTML, CSS, JavaScript, no build step) built from the Figma file
**MBB Training & Development – Website Design**.

## Pages

| Page | File | Figma frame |
|---|---|---|
| Home | `index.html` | Home + Sections 2–7 |
| About Us | `about.html` | About Us Page + Section 8 |
| Services | `services.html` | Services Page + Section 9 |
| Portfolio | `portfolio.html` | Portfolio Page + Section 10 |
| Blog | `blog.html` | Blog Page + Section 11 |
| Contact | `contact.html` | Contact Page + Section 12 |

## Structure

```
assets/
  css/styles.css   all styles (design tokens at the top)
  js/main.js       mobile menu, search, portfolio filters, form handling
  img/             images and icons exported from Figma
```

## Preview

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

To deploy, upload the folder as-is to any static host (GitHub Pages, Netlify, Vercel, cPanel).

## Responsive behaviour

- **Desktop:** matches the 1728px artboard. Sizes are written as `calc(N * var(--u))`, where N is the Figma pixel value, so the layout scales evenly down to about 1100px.
- **Tablet (≤1099px)** and **mobile (≤600px):** follow the "Responsive — Home" and "Responsive — Inner pages" artboards (768px and 390px), with a hamburger menu.

## Interactive features

- **Search:** the header search sends the query to `blog.html?q=…`, which filters the posts.
- **Portfolio filters:** All, Development, Recruitment and Training. The category assigned to each project is a placeholder; change it with the `data-category` attribute in the HTML.
- **Forms:** the contact form and newsletter sign-up are validated in the browser. Submissions are **mocked** (logged to the console). To connect a backend (Formspree, Netlify Forms or your own API), set the form's `action` and remove `data-mock` from the `<form>`.
- **Video buttons:** add `data-video="https://…"` to a `.play-btn` to make it open a video.

## Content to replace before launch

- The design uses Lorem ipsum in places (team intro, blog excerpts, footer "About Our Company").
- The contact page uses placeholder details from the design (`company@domain.com`, `(+977)-1234-567-55`). The footer has the real ones.
- The social media links point to `#`.
- Images were exported from Figma at 1× resolution. For sharper images on high-DPI screens, replace the files in `assets/img/` with 2× exports under the same file names.
