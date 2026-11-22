# VIPCIRCLE homepage

A responsive Next.js App Router homepage built from the supplied Figma PDF. The supplied photography and VIPCIRCLE logo are stored locally in `public/media`.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To run a production build, use `npm run build` followed by `npm start`.

## Content and forms

Update navigation, gallery content, and FAQ copy in `app/content.js`. The three interest forms demonstrate the frontend flow and save submissions in the visitor's browser storage. Connect `saveInterest` in `app/interactions.js` to your signup or partnership endpoint before accepting live submissions. Confirm the commission and cancellation FAQ copy against your partnership terms before publishing.
