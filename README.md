# Monkeytype Readme Stats

Show off your live typing speed right on your GitHub profile perfectly. It updates instantly every time someone looks at your profile!

## How to use it

To get your own, just paste this code into your GitHub Profile `README.md` (this also makes the card clickable, leading straight back here!):

```md
[![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=YOUR_MONKEYTYPE_NAME&theme=dark)](https://github.com/francisdav1d/monkeytype-readme-stats)
```
*(Just replace `YOUR_MONKEYTYPE_NAME` with your actual username)*

---

### Customizing your Stats

You can fully customize exactly what shows up on your card by adding `&show=` or `&hide=` strictly to the end of the URL. 

**Show ONLY specific stats you want people to see (like just 15s WPM and your Rank):**
```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=myname&show=wpm15,rank15)
```

**Hide specific things you don't like:**
```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=myname&hide=tests,wpm30)
```

**Here are all the stat tags you can use:**
- `wpm15`
- `wpm30`
- `wpm60`
- `wpm120`
- `rank15`
- `rank60`
- `tests`

*(Note: The right-side circular ring automatically calculates your precise World Percentile by looking at your 60s Global rank).*

---

### Themes and Colors

**Light Theme:**
```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=myname&theme=light)
```

**Advanced Customization:**
You can build your own theme entirely from scratch using hex codes (without the `#`) and your own web-safe fonts:
- `bg_color` (background color)
- `title_color` (title and default accent color)
- `text_color` (labels and numbers color)
- `icon_color` (svg icons color)
- `ring_color` (percentile slider color)
- `font` (e.g. `Inter`, `Roboto`, `monospace`, etc.)

**Example (A highly custom card):**
```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=myname&bg_color=000000&title_color=ff0000&text_color=ffffff&font=monospace)
```
