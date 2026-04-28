INSERT INTO products (name, price, shortDescription, description)
VALUES
    ('Fender Player II Strat RW BCG', 772.00,
     'Klassische Strat mit modernem Spielgefühl und vielseitigem Sound.',
     'Die Fender Player II Stratocaster vereint den legendären Klang und Look einer klassischen Strat mit modernen Features für heutige Gitarristen. Die drei Player Series Single-Coil-Pickups liefern klare Höhen, definierte Mitten und einen druckvollen, aber transparenten Bassbereich. Der komfortable Ahornhals mit modernem C-Profil sorgt für ein angenehmes Spielgefühl, während das 2-Punkt-Tremolo präzises Vibrato ermöglicht. Ob für Bühne, Studio oder Proberaum – diese Gitarre überzeugt durch Vielseitigkeit, Zuverlässigkeit und authentischen Fender-Sound.'),
    ('Martin Guitar 00028', 4499.00,
     'Premium-Akustikgitarre mit warmem, ausgewogenem Klang.',
     'Die Martin 000-28 ist ein echtes Meisterstück traditioneller Gitarrenbaukunst und gehört zu den bekanntesten Modellen der Marke. Ihre Decke aus massiver Sitka-Fichte kombiniert mit Boden und Zargen aus ostindischem Palisander erzeugt einen außergewöhnlich ausgewogenen Klang mit klaren Höhen, warmen Mitten und tiefen, resonanten Bässen. Das kompakte 000-Korpusformat bietet hohen Spielkomfort und eignet sich hervorragend für Fingerstyle, Singer-Songwriter und Studioaufnahmen. Hochwertige Verarbeitung und edle Details machen dieses Instrument zu einer Investition fürs Leben.'),
    ('Vox AC30 Handwired', 2299.00,
     'Legendärer Röhrenamp mit britischem Vintage-Sound.',
     'Der Vox AC30 Handwired ist eine moderne Neuauflage eines der ikonischsten Verstärker der Musikgeschichte. Bekannt für seinen brillanten Clean-Sound und den charakteristischen, cremigen Overdrive, hat dieser Amp Generationen von Gitarristen geprägt. Die handverdrahtete Konstruktion sorgt für maximale Signalreinheit und Dynamik, während hochwertige Komponenten und klassische Celestion-Lautsprecher den authentischen Vox-Sound liefern. Perfekt geeignet für Rock, Indie, Blues und alles dazwischen – ein Verstärker mit Charakter und Geschichte.'),
    ('Seymour Duncan SSL-5 Custom Staggered', 89.00,
     'Single-Coil mit hohem Output und starkem Durchsetzungsvermögen.',
     'Der Seymour Duncan SSL-5 Custom Staggered ist ein leistungsstarker Single-Coil-Pickup, der speziell für Gitarristen entwickelt wurde, die mehr Output und Präsenz aus ihrer Strat herausholen möchten. Im Vergleich zu klassischen Vintage-Pickups bietet er einen deutlich höheren Output, ohne dabei an Klarheit zu verlieren. Die abgestuften Polepieces sorgen für eine ausgewogene Lautstärke über alle Saiten hinweg. Ideal für Rock, Blues und Leadsounds, die sich im Bandmix durchsetzen sollen. Perfekt geeignet für die Stegposition.');

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg',
       'Fender Player II Strat RW BCG - Front'
FROM products
WHERE name = 'Fender Player II Strat RW BCG';

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://fast-images.static-thomann.de/pics/bdb/_60/605644/20167029_800.jpg',
       'Martin Guitar 00028 - Front'
FROM products
WHERE name = 'Martin Guitar 00028';

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://bdbo2.thomann.de/thumb/bdb3000/pics/bdbo/20718091.jpg',
       'Vox AC30 Handwired - Front'
FROM products
WHERE name = 'Vox AC30 Handwired';

INSERT INTO product_images (product_id, url, alternative_text)
SELECT id,
       'https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_17/172711/14519744_800.jpg',
       'Seymour Duncan SSL-5 Custom Staggered - Front'
FROM products
WHERE name = 'Seymour Duncan SSL-5 Custom Staggered';
