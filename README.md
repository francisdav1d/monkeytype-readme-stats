# Monkeytype Readme Stats

Show off your live typing speed right on your GitHub profile perfectly. It updates instantly every time someone looks at your profile!

## How to use it

To get your own, just paste this single line of code into your GitHub Profile `README.md`:

```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=YOUR_MONKEYTYPE_NAME&theme=dark)
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

You can easily change the aesthetic!

**Light Theme:**
```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=myname&theme=light)
```

**Custom Accent Color (use hex codes without the #):**
```md
![Monkeytype Stats](https://monkeytype-readme-stats.vercel.app/api/monkeytype?username=myname&theme=dark&accent=3fb950)
```
