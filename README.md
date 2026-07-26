# Spec.drive database

These two files ARE the database. Claude will not touch them unless you ask —
edit them by hand (or ask Claude to add a specific car) whenever you want to
grow the library.

## brands.json

A flat list of brand names. This drives the grid on the "Library" page.
Add a brand by adding a new string to the array (keep alphabetical, not required
but tidy):

```json
"Lotus",
```

## cars.json

An array of car objects. Add a new car by copying this block and filling it in:

```json
{
  "id": "brand-model-slug",          // unique, lowercase, hyphenated — used in the URL/search, never change once cars link to it
  "brand": "Nissan",                 // must exactly match a name in brands.json
  "name": "GT-R R35",                // model name shown after the brand
  "year": "2025",
  "country": "Japan",                // country of origin, shown as the flag stat
  "countryFlag": "jp",               // 2-letter flagcdn.com country code (lowercase)
  "price": "$130,000 - $230,000",
  "topSpeed": "196 - 205 mph (315 - 330 km/h)",
  "zeroToHundred": "2.5s - 2.9s (0-60 mph)",
  "image": "assets/cars/brand-model-slug.png",   // put the photo in assets/cars/ first
  "summary": "One or two punchy sentences introducing the car.",
  "specs": [
    { "label": "Engine", "value": "..." },
    { "label": "Performance", "value": "..." },
    { "label": "Drivetrain", "value": "..." }
  ]
}
```

`specs` can have as many or as few rows as you want — the page just loops
over the array and prints each label/value pair, so "Exterior", "Interior",
"0-2025 Changes", etc. are all fine as extra rows.

### Adding the photo
Drop the car's image into `assets/cars/` using the same filename as the `id`
(e.g. `assets/cars/nissan-gtr-r35.png`), crop out any text/watermarks first,
and point `image` at that path.

### Why two files instead of one
`brands.json` controls what shows up in the Library grid even before you have
a single car for that brand (so "Ferrari" can sit there as a placeholder).
`cars.json` is only the cars you've actually written up.
