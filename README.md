# Monkeytype Readme Stats

A production-ready serverless API that generates a dynamic SVG image displaying Monkeytype typing stats for a given user. Perfect for embedding in your GitHub profile README.

## Features
- **Dynamic SVG generation**: Uses your live Monkeytype stats.
- **Vercel deployable**: Built as a Vercel Serverless Function (Node.js).
- **Edge Caching**: 5-minute caching and 2-minute stale-while-revalidate.
- **Secure**: You provide your API key via an environment variable, not exposed in the frontend.
- **Themes**: Support for both `dark` and `light` themes, plus custom `accent` colors.
- **Granular Controls**: Hide specific stats if desired.

## Quick Setup & Deployment to Vercel

1. Fork or clone this repository.
2. Go to [Vercel](https://vercel.com) and create a new project.
3. Import your repository.
4. Set the Environment Variable:
   - Name: `MONKEYTYPE_API_KEY`
   - Value: Your Monkeytype ApeKey token. (Find it in Monkeytype Settings -> Danger Zone -> API keys)
5. Hit Deploy!

## API Usage

Include the image in your markdown file (e.g. `README.md`):

```md
![Monkeytype Stats](https://your-vercel-app-url.vercel.app/api/monkeytype?username=your_monkeytype_username)
```

### URL Parameters

- `username` (required): Your Monkeytype username.
- `theme`: The theme of the card (`dark` or `light`). Default: `dark`.
- `accent`: A hex color code (e.g., `ff0000`, `3fb950`) to override the gradient and username colors.
- `hide`: A comma-separated list of items to hide (`username`, `wpm`, `accuracy`, `tests`).

### Examples

**Default (Dark Theme):**
```md
![Monkeytype Stats](https://your-app.vercel.app/api/monkeytype?username=myname)
```

**Light Theme with Red Accent:**
```md
![Monkeytype Stats](https://your-app.vercel.app/api/monkeytype?username=myname&theme=light&accent=ff5555)
```

**Hide Username and Total Tests:**
```md
![Monkeytype Stats](https://your-app.vercel.app/api/monkeytype?username=myname&hide=username,tests)
```

## Local Development

If you want to run or test the code locally:

1. Copy `.env.example` to `.env` and fill in your ApeKey.
   ```bash
   cp .env.example .env
   ```
2. Run the Vercel dev server:
   ```bash
   npm i -g vercel
   vercel dev
   ```
3. Visit `http://localhost:3000/api/monkeytype?username=yourusername` in your browser.
