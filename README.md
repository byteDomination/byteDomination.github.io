# Byte Domination

A responsive static studio website for [bytedomination.com](https://bytedomination.com).

## Preview locally

Open `index.html` directly, or run a local static server from this folder:

```powershell
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Publish with GitHub Pages

1. Create a new GitHub repository and upload this folder's contents to its root.
2. Push to the `main` branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions**.
5. The included workflow publishes the site automatically.

## Connect bytedomination.com

The included `CNAME` file tells GitHub Pages to use `bytedomination.com`. At your
domain registrar, add the four GitHub Pages `A` records for the root domain and a
`CNAME` record for `www` pointing to your GitHub Pages hostname. Confirm the
current DNS values in GitHub's documentation before changing your records.

After DNS resolves, enable **Enforce HTTPS** in **Settings → Pages**.

## Customize

- Edit site copy and links in `index.html`.
- Change colors and layout in `styles.css`.
- Replace `assets/signal-field.png` to update the hero artwork.
- Confirm that `hello@bytedomination.com` is configured before launch.
