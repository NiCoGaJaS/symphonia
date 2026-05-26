package de.nicogajas.backend.sample;

import de.nicogajas.backend.product.Category;
import de.nicogajas.backend.product.Product;
import de.nicogajas.backend.product.ProductImage;
import de.nicogajas.backend.product.Products;
import de.nicogajas.backend.security.authentication.Account;
import de.nicogajas.backend.security.authentication.Accounts;
import de.nicogajas.backend.security.authentication.Role;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Profile("sample-data")
public class SampleDataConfiguration {
    
    private static final Logger logger = LoggerFactory.getLogger(SampleDataConfiguration.class);
    
    
    @Bean
    public ApplicationRunner fillProducts(Products products) {
        return _ -> {
            List<Product> sampleProducts = List.of(
                    // ============================
                    // Bestseller
                    // ============================
                    new Product(
                            "Fender Player II Strat RW BCG",
                            new BigDecimal("772.00"),
                            "Vielseitige Stratocaster mit modernem Halsprofil und klassischem Fender-Sound.",
                            """
                            Die Fender Player II Strat RW BCG bietet den vertrauten Strat-Ton mit klaren Höhen, \
                            direkter Ansprache und hohem Spielkomfort. Das moderne C-Halsprofil, das \
                            Palisandergriffbrett und die drei Single-Coils machen sie zur flexiblen \
                            Wahl für Clean, Blues, Pop und druckvolle Rock-Sounds.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_59/595247/19267848_800.jpg",
                                    "Fender Player II Strat RW BCG - Front")),
                    new Product(
                            "Martin Guitar 00028",
                            new BigDecimal("4499.00"),
                            "Premium-Akustikgitarre mit ausgewogenem Klangbild und edler Verarbeitung.",
                            """
                            Die Martin Guitar 00028 steht fuer einen warmen, detailreichen Akustikklang mit \
                            ausgezeichneter Dynamik. Ihre kompakte 000-Bauform liefert ein \
                            ausbalanciertes Ansprechverhalten fuer Fingerstyle und Strumming, \
                            waehrend hochwertige Tonhoelzer und die klassische Martin-Verarbeitung \
                            den professionellen Anspruch unterstreichen.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://fast-images.static-thomann.de/pics/bdb/_60/605644/20167029_800.jpg",
                                    "Martin Guitar 00028 - Front")),
                    new Product(
                            "Vox AC30 Handwired",
                            new BigDecimal("2299.00"),
                            "Handverdrahteter Roehrencombo mit offenem Top-Boost-Sound und viel Charakter.",
                            """
                            Der Vox AC30 Handwired liefert den legendaeren britischen Chime mit reichlich \
                            Headroom, harmonischer Saettigung und dynamischer Reaktion auf das \
                            Spielgefuehl. Ideal fuer Gitarristinnen und Gitarristen, die \
                            charakterstarke Clean-Sounds, offene Crunch-Texturen und klassische \
                            Vintage-Voicings suchen.\
                            """,
                            Category.EXTRA,
                            new ProductImage(
                                    "https://bdbo2.thomann.de/thumb/bdb3000/pics/bdbo/20718091.jpg",
                                    "Vox AC30 Handwired - Front")),
                    new Product(
                            "Seymour Duncan SSL-5 Custom Staggered",
                            new BigDecimal("89.00"),
                            "Leistungsstarker Single-Coil fuer mehr Output, Praesenz und sustainreiche Leads.",
                            """
                            Der Seymour Duncan SSL-5 Custom Staggered ist ein beliebter Strat-Ersatzpickup \
                            mit kraeftigem Mittenbild, fokussierten Hoehen und deutlich mehr Druck \
                            als ein klassischer Vintage-Single-Coil. Er eignet sich besonders fuer \
                            singende Leads, durchsetzungsfaehige Rhythmusparts und moderne \
                            Rock-Setups.\
                            """,
                            Category.EXTRA,
                            new ProductImage(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_17/172711/14519744_800.jpg",
                                    "Seymour Duncan SSL-5 Custom Staggered - Front")),
                    // ============================
                    // Guitar
                    // ============================
                    new Product(
                            "Fender American Ultra Telecaster RW Arctic Pearl",
                            new BigDecimal("1999.00"),
                            "Moderne Telecaster mit noiseless Pickups und Premium-Spielkomfort.",
                            """
                            Die Fender American Ultra Telecaster RW Arctic Pearl kombiniert klassische Tele-DNA \
                            mit modernen Features wie Ultra Noiseless Pickups, einem schnellen Halsprofil \
                            und ergonomisch gestalteten Konturen. Die brummfreien Pickups liefern klare \
                            Höhen, definierte Mitten und straffe Bässe, sodass sie sich mühelos im Mix \
                            durchsetzt. Dank hochwertiger Verarbeitung und vielseitiger Schaltoptionen \
                            eignet sie sich ideal für Studio, Bühne und genreübergreifende Sounds.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://static.sonovente.com/img/library/zoom/69/optim/69367_3.jpg",
                                    "Fender American Ultra Telecaster - Front")),
                    new Product(
                            "Gibson Les Paul Standard 60s Bourbon Burst",
                            new BigDecimal("2699.00"),
                            "Klassische Les Paul mit kräftigen Humbuckern und ikonischem Look.",
                            """
                            Die Gibson Les Paul Standard 60s Bourbon Burst liefert den legendaeren Rock-Sound \
                            mit warmen Mitten, sattem Sustain und druckvollen Humbuckern. Die schlanke \
                            60s-Halsform sorgt fuer ein geschmeidiges Spielgefuehl, das sich besonders \
                            fuer schnelle Läufe und ausdrucksstarke Bendings anbietet. Hochwertige \
                            Tonhoelzer, die klassische Single-Cut-Form und das edle Finish machen sie \
                            zur ersten Wahl fuer Blues, Rock und Hardrock auf professionellem Niveau.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://sc1.musik-produktiv.com/pic-010129199xxl/gibson-les-paul-standard-60s-bourbon-burst-lefthand.jpg",
                                    "Gibson Les Paul Standard 60s - Front")),
                    new Product(
                            "Harley Benton Kahuna-C Turtle",
                            new BigDecimal("33.00"),
                            "Einsteigerfreundliche Ukulele und ein wunderbares Geschenk für musikalisch Interessierte",
                            """
                            Die Harley Benton Kahuna-C Turtle ist eine kompakte Konzert-Ukulele, die sich \
                            perfekt fuer Einsteigerinnen und Einsteiger sowie als Geschenk eignet. Ihr \
                            warmer, freundlicher Klang und die kurze Mensur laden zum spontanen \
                            Musizieren auf dem Sofa, unterwegs oder am Strand ein. Das verspielte \
                            Turtle-Design macht sie zu einem echten Hingucker und weckt die Lust, \
                            erste Akkorde, Melodien und Songs zu entdecken.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_50/500636/15541690_800.jpg",
                                    "Harley Benton Kahuna-C Turtle - Front")),
                    new Product(
                            "Ibanez AZ2204N Black",
                            new BigDecimal("1899.00"),
                            "Moderne S-Style Gitarre mit Premium-Hardware und vielseitigen Sounds.",
                            """
                            Die Ibanez AZ2204N Black wurde fuer moderne Gitarristinnen und Gitarristen \
                            entwickelt, die Praezision, Komfort und Flexibilitaet suchen. Das \
                            ergonomische Halsprofil, die abgerundeten Griffbrettkanten und die \
                            hochwertige Gotoh-Hardware sorgen fuer ein extrem direktes und \
                            zuverlaessiges Spielgefuehl. Die Seymour-Duncan-Pickups liefern \
                            alles von transparenten Clean-Sounds bis hin zu druckvollen Rock- und \
                            Fusion-Sounds.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://www.musimaster.com/43983-product_size/ibanez-az2204n-bk-prestige.jpg",
                                    "Ibanez AZ2204N - Front")),
                    new Product(
                            "Taylor GS Mini Mahogany",
                            new BigDecimal("599.00"),
                            "Kompakte Akustikgitarre mit warmem, ausgewogenem Klang.",
                            """
                            Die Taylor GS Mini Mahogany ist eine der beliebtesten Reisegitarren weltweit \
                            und bietet trotz ihrer kompakten Bauform einen erstaunlich vollen, \
                            warmen Klang. Die kleinere Korpusgroesse sorgt fuer hohen Spielkomfort \
                            auf dem Sofa, unterwegs oder auf der Buehne. Dank der Mahagoni-Decke \
                            entsteht ein direkter, mittiger Ton, der sich ideal fuer Songwriting, \
                            Strumming und Fingerstyle eignet. Eine perfekte Begleiterin fuer alle, \
                            die eine portable, aber ernstzunehmende Akustikgitarre suchen.\
                            """,
                            Category.GUITAR,
                            new ProductImage(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_39/396725/17561721_800.jpg",
                                    "Taylor GS Mini Mahogany - Front")),
                    // ============================
                    // Piano
                    // ============================
                    new Product(
                            "Casio PX-S7000 Harmonious Mustard",
                            new BigDecimal("2499.00"),
                            "Stylishes Digitalpiano mit Premium-Klang und modernem Design.",
                            """
                            Das Casio PX-S7000 Harmonious Mustard verbindet ein elegantes, modernes Design mit \
                            hochwertigen Pianoklängen und einer besonders intuitiven Bedienoberfläche. Die \
                            detailreichen Samples und die ausdrucksstarke Dynamik sorgen für ein realistisches \
                            Spielgefühl, das sowohl Anfängerinnen und Anfänger als auch erfahrene Pianistinnen \
                            und Pianisten begeistert. Dank seiner kompakten Bauweise fügt es sich harmonisch in \
                            jedes Wohnambiente ein und wird schnell zum stilvollen Mittelpunkt des Raums.\
                            """,
                            Category.PIANO,
                            new ProductImage(
                                    "https://r2.gear4music.com/media/116/1160017/1200/preview.jpg",
                                    "Casio PX-S7000 - Front")),
                    new Product(
                            "Kawai CA59 Digital Piano",
                            new BigDecimal("2399.00"),
                            "Digitalpiano mit Holztastatur und realistischem Klang.",
                            """
                            Das Kawai CA59 bietet eine hochwertige Holztastatur, die ein besonders natürliches \
                            Spielgefühl vermittelt und feinste Nuancen präzise überträgt. Die detailreichen \
                            Pianoklänge basieren auf aufwendig gesampelten Konzertflügeln und sorgen für eine \
                            beeindruckend authentische Klangwiedergabe. Mit seinen vielseitigen Funktionen und \
                            der eleganten Optik eignet es sich ideal für ambitionierte Spielerinnen und Spieler, \
                            die ein Digitalpiano mit professionellem Anspruch suchen.\
                            """,
                            Category.PIANO,
                            new ProductImage(
                                    "https://app.robertspianos.com/private/images/kawai-ca48-digital-piano-premium-rosewood-.jpg",
                                    "Kawai CA59 - Front")),
                    new Product(
                            "Roland FP-60X",
                            new BigDecimal("899.00"),
                            "Flexibles Stage-Piano mit starken Sounds und Bluetooth.",
                            """
                            Das Roland FP-60X überzeugt mit ausdrucksstarken Pianoklängen, einer hochwertigen \
                            Tastatur und einer beeindruckenden Dynamik, die sowohl Live-Performances als auch \
                            das tägliche Üben bereichert. Dank Bluetooth-Audio, vielseitigen Effekten und \
                            umfangreichen Anschlussmöglichkeiten eignet es sich für Bühne, Studio und \
                            Wohnzimmer gleichermaßen. Die kompakte Bauweise macht es zudem zu einem \
                            transportfreundlichen Begleiter für mobile Musikerinnen und Musiker.\
                            """,
                            Category.PIANO,
                            new ProductImage(
                                    "https://theeramusic.com/wp-content/uploads/2021/10/fp-60x-bk_angle_x-stand_gal.jpg",
                                    "Roland FP-60X - Front")),
                    new Product(
                            "Yamaha U1 SH3 Silent Piano",
                            new BigDecimal("8999.00"),
                            "Akustisches Klavier mit Silent-System für lautloses Üben.",
                            """
                            Das Yamaha U1 SH3 kombiniert traditionelles Klavierhandwerk mit modernster \
                            Silent-Technologie, die ein lautloses Spielen über Kopfhörer ermöglicht. Der \
                            charakteristische, klare Yamaha-Klang bleibt dabei vollständig erhalten und \
                            bietet sowohl akustisch als auch digital ein inspirierendes Spielerlebnis. \
                            Die präzise Mechanik sorgt für ein exaktes Anschlagsgefühl, das besonders \
                            anspruchsvolle Pianistinnen und Pianisten zu schätzen wissen.\
                            """,
                            Category.PIANO,
                            new ProductImage(
                                    "https://pianometropool.nl/wp-content/uploads/2019/04/Yamaha-akoestische-piano-U1SH-zwart-hoogglans-.jpg",
                                    "Yamaha U1 SH3 - Front")),
                    // ============================
                    // Drums
                    // ============================
                    new Product(
                            "Gretsch Catalina Club Jazz 18\"",
                            new BigDecimal("799.00"),
                            "Kompaktes Jazz-Drumset mit warmem Vintage-Sound.",
                            """
                            Das Gretsch Catalina Club Jazz 18" liefert den charakteristischen warmen Vintage-Sound, \
                            der besonders im Jazz und Blues zu Hause ist. Die kompakte Größe macht es ideal für \
                            kleine Bühnen, Proberäume und mobile Einsätze. Die Mahagoni-Kessel sorgen für \
                            weiche Mitten und eine angenehme Ansprache, während die klassische Optik \
                            den zeitlosen Gretsch-Charme unterstreicht. Ein Set für Musikerinnen und Musiker, \
                            die Tradition und Portabilität gleichermaßen schätzen.\
                            """,
                            Category.DRUMS,
                            new ProductImage(
                                    "https://www.terredemusique.com/31272-thickbox_default/batterie-gretsch-catalina-club-jazz-18-piano-black.jpg",
                                    "Gretsch Catalina Club Jazz - Front")),
                    new Product(
                            "Pearl Masters Maple Complete 22\" Shell Set",
                            new BigDecimal("1699.00"),
                            "Druckvolles Drumset mit warmem Maple-Sound.",
                            """
                            Das Pearl Masters Maple Complete 22" Shell Set bietet einen warmen, ausgewogenen \
                            Klang mit kräftigem Punch, der sich mühelos im Bandgefüge durchsetzt. Die \
                            hochwertigen Maple-Kessel liefern eine schnelle Ansprache und ein breites \
                            dynamisches Spektrum. Dank der robusten Hardware und der professionellen \
                            Verarbeitung eignet sich das Set perfekt für Studio, Bühne und anspruchsvolle \
                            Drummerinnen und Drummer.\
                            """,
                            Category.DRUMS,
                            new ProductImage(
                                    "https://r2.gear4music.com/media/19/193188/1200/preview.jpg",
                                    "Pearl Masters Maple Complete - Front")),
                    new Product(
                            "Roland TD-27KV2 E-Drum Set",
                            new BigDecimal("2899.00"),
                            "Professionelles E-Drum mit digitalem Snare-Modul.",
                            """
                            Das Roland TD-27KV2 bietet eine äußerst realistische Spielbarkeit dank \
                            hochwertiger Mesh-Heads und präziser Sensorik. Das leistungsstarke Soundmodul \
                            liefert detailreiche Drum-Sounds, die sich flexibel an verschiedene Musikstile \
                            anpassen lassen. Mit seinen leisen Pads eignet sich das Set ideal für \
                            Recording, Übungssessions zu Hause und professionelle Bühnenanwendungen. \
                            Ein E-Drum, das moderne Technik mit natürlichem Spielgefühl verbindet.\
                            """,
                            Category.DRUMS,
                            new ProductImage(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_55/551838/17954587_800.jpg",
                                    "Roland TD-27KV2 - Front")),
                    new Product(
                            "Tama Starclassic Walnut/Birch 20\"",
                            new BigDecimal("1999.00"),
                            "Modernes Drumset mit präzisem Attack und warmem Ton.",
                            """
                            Die Tama Starclassic Walnut/Birch Serie kombiniert die schnelle Ansprache von \
                            Birke mit der warmen Tiefe von Walnuss und erzeugt so einen modernen, \
                            durchsetzungsfähigen Sound. Die präzise Verarbeitung und die hochwertige \
                            Hardware sorgen für maximale Stabilität und Langlebigkeit. Dank des \
                            ausgewogenen Klangcharakters eignet sich das Set für Studio, Bühne und \
                            anspruchsvolle Musikerinnen und Musiker verschiedenster Genres.\
                            """,
                            Category.DRUMS,
                            new ProductImage(
                                    "https://drumcenternh.com/cdn/shop/products/tama_wbs30rs_mbr.jpg",
                                    "Tama Starclassic - Front")),
                    // ============================
                    // Vinyl
                    // ============================
                    new Product(
                            "Daft Punk – Random Access Memories (Deluxe)",
                            new BigDecimal("39.00"),
                            "Elektronisches Meisterwerk mit warmem Vinyl-Sound.",
                            """
                            „Random Access Memories“ von Daft Punk gilt als eines der bedeutendsten elektronischen \
                            Alben der letzten Jahrzehnte und entfaltet auf Vinyl eine besonders warme, \
                            dynamische Klangtiefe. Die detailreiche Produktion mit Live-Instrumenten, \
                            analogen Synthesizern und ikonischen Vocoder-Passagen kommt auf dieser \
                            Deluxe-Pressung eindrucksvoll zur Geltung. Ein Highlight für Sammlerinnen, \
                            Sammler und Fans hochwertiger Vinylproduktionen.\
                            """,
                            Category.VINYL,
                            new ProductImage(
                                    "https://ir.ozone.ru/s3/multimedia-1-q/c1000/7615022030.jpg",
                                    "Daft Punk - RAM")),
                    new Product(
                            "Miles Davis – Kind of Blue (180g Edition)",
                            new BigDecimal("25.00"),
                            "Jazz-Klassiker in hochwertiger 180g-Pressung.",
                            """
                            „Kind of Blue“ von Miles Davis zählt zu den einflussreichsten Jazz-Alben aller Zeiten \
                            und begeistert auch Jahrzehnte später mit seiner zeitlosen Eleganz. Die 180g-Pressung \
                            bietet eine besonders stabile, rauscharme Wiedergabe und bringt die warmen \
                            Trompetenlinien sowie die subtilen Harmonien des Sextetts eindrucksvoll zur Geltung. \
                            Ein unverzichtbares Album für Jazz-Liebhaberinnen und -Liebhaber sowie für jede \
                            ernsthafte Vinylsammlung.\
                            """,
                            Category.VINYL,
                            new ProductImage(
                                    "https://static.musictoday.com/store/bands/4612/product_large/Y4LPMD03.jpg",
                                    "Miles Davis - Kind of Blue")),
                    new Product(
                            "Nirvana – Nevermind (30th Anniversary)",
                            new BigDecimal("32.00"),
                            "Grunge-Klassiker im modernen Remaster.",
                            """
                            Nirvanas „Nevermind“ prägte eine ganze Generation und gilt bis heute als Meilenstein \
                            der Rockgeschichte. Die 30th Anniversary Edition bietet ein modernes Remaster, das \
                            die rohe Energie, die markanten Gitarrenriffs und Kurt Cobains unverwechselbare \
                            Stimme noch klarer hervorhebt. Diese Jubiläumsausgabe richtet sich an Fans, \
                            Sammlerinnen und Sammler, die den ikonischen Grunge-Sound in bestmöglicher \
                            Qualität erleben möchten.\
                            """,
                            Category.VINYL,
                            new ProductImage(
                                    "https://merchbar.imgix.net/product/vinylized/upc/98/602435979861.jpg",
                                    "Nirvana - Nevermind")),
                    new Product(
                            "Pink Floyd – The Dark Side of the Moon (Remastered)",
                            new BigDecimal("29.00"),
                            "Legendäres Album in audiophiler Pressung.",
                            """
                            „The Dark Side of the Moon“ zählt zu den bedeutendsten Konzeptalben der Musikgeschichte \
                            und entfaltet in dieser Remaster-Edition eine beeindruckend klare, räumliche \
                            Klangkulisse. Die sorgfältige Neuabmischung bringt sowohl die ikonischen Synthesizer \
                            als auch die atmosphärischen Gitarrenlinien und Vocals besonders detailreich zur \
                            Geltung. Ein absolutes Pflichtalbum für Vinyl-Enthusiastinnen und -Enthusiasten, \
                            das in keiner Sammlung fehlen darf.\
                            """,
                            Category.VINYL,
                            new ProductImage(
                                    "https://lamerch.pe/cdn/shop/products/PinkFloyd-TheDarkSideOfTheMoon_Vinilo_452ad2c5-5693-4aae-bbe2-4b94d465ecbf.jpg",
                                    "Pink Floyd - Dark Side of the Moon")),
                    // ============================
                    // Extra
                    // ============================
                    new Product(
                            "Boss RC-5 Loop Station",
                            new BigDecimal("229.00"),
                            "Kompakter Looper mit 32-Bit Audio.",
                            """
                            Die Boss RC-5 Loop Station bietet 32-Bit-Soundqualität, eine extrem präzise Aufnahme \
                            und 99 Speicherplätze für umfangreiche Loop-Arrangements. Das farbige Display sorgt \
                            für eine klare Übersicht, während die intuitive Bedienung schnelle Workflows \
                            ermöglicht. Mit integrierten Rhythmen, MIDI-Funktionalität und robustem Gehäuse \
                            eignet sich der Looper perfekt für Bühne, Studio und kreative Jam-Sessions.\
                            """,
                            Category.EXTRA,
                            new ProductImage(
                                    "https://www.worldofmusic.com.au/wp-content/uploads/2020/10/Boss-RC5-Loop-Station.jpg",
                                    "Boss RC-5 - Front")),
                    new Product(
                            "Focusrite Scarlett 4i4 4th Gen",
                            new BigDecimal("249.00"),
                            "Audio-Interface mit klaren Preamps und USB-C.",
                            """
                            Die Focusrite Scarlett 4i4 4th Gen überzeugt mit hochwertigen Preamps, \
                            modernen Wandlern und einem besonders rauscharmen Signalweg. Dank USB‑C, \
                            flexiblen Ein- und Ausgängen sowie verbesserter Dynamik eignet sich das \
                            Interface ideal für Home‑Recording, Podcasting und mobile Produktionen. \
                            Die robuste Bauweise und die intuitive Software‑Integration machen es zu \
                            einem zuverlässigen Werkzeug für Kreative aller Erfahrungsstufen.\
                            """,
                            Category.EXTRA,
                            new ProductImage(
                                    "https://d1aeri3ty3izns.cloudfront.net/media/97/979108/1200/preview.jpg",
                                    "Focusrite Scarlett 4i4 - Front")),
                    new Product(
                            "Shure SM7B",
                            new BigDecimal("399.00"),
                            "Broadcast-Mikrofon für Vocals, Podcast und Streaming.",
                            """
                            Das Shure SM7B zählt zu den beliebtesten Broadcast‑ und Studio‑Mikrofonen \
                            weltweit und überzeugt mit warmem, detailreichem Klang. Die hervorragende \
                            Abschirmung gegen Störgeräusche und der weite Frequenzbereich machen es \
                            ideal für Gesang, Podcasting, Streaming und Voice‑Over. Dank seiner \
                            robusten Bauweise und der legendären Shure‑Zuverlässigkeit ist es ein \
                            professioneller Standard in Studios und Content‑Produktionen.\
                            """,
                            Category.EXTRA,
                            new ProductImage(
                                    "https://img.audiofanzine.com/images/u/product/normal/shure-sm7b-13140.jpg",
                                    "Shure SM7B - Front")),
                    new Product(
                            "Strymon BigSky Reverb",
                            new BigDecimal("479.00"),
                            "Premium-Reverb-Pedal mit 12 Algorithmen.",
                            """
                            Das Strymon BigSky bietet zwölf hochwertige Reverb‑Algorithmen, die von \
                            subtilen Raumklängen bis zu weitläufigen Ambient‑Flächen reichen. Die \
                            detailreiche Klanggestaltung, die intuitive Bedienung und die enorme \
                            Klangtiefe machen es zu einem der beliebtesten Reverb‑Pedale weltweit. \
                            Mit Speicherplätzen, MIDI‑Support und Studioqualität eignet es sich für \
                            Gitarristinnen und Gitarristen, die maximale Kreativität und Flexibilität \
                            suchen.\
                            """,
                            Category.EXTRA,
                            new ProductImage(
                                    "https://toughaudio.com.au/wp-content/uploads/2024/11/Strymon-Bigsky-reverb-toughaudio-2.jpg",
                                    "Strymon BigSky - Front")),
                    // ============================
                    // Other
                    // ============================
                    new Product(
                            "Gator GL-Electric Lightweight Case",
                            new BigDecimal("129.00"),
                            "Leichtes, gut gepolstertes Case für E-Gitarren.",
                            """
                            Das Gator GL‑Electric Case kombiniert geringes Gewicht mit zuverlässiger \
                            Polsterung und bietet so optimalen Schutz für E‑Gitarren. Die robuste \
                            Außenschale und das weiche Innenfutter verhindern Kratzer und Stöße, \
                            während die praktischen Fächer Platz für Zubehör schaffen. Ideal für \
                            Musikerinnen und Musiker, die viel unterwegs sind und ein leichtes, \
                            aber sicheres Case benötigen.\
                            """,
                            Category.OTHER,
                            new ProductImage(
                                    "https://sadekmusicshop.com/image/cache/catalog/data/gator/GL-ELECTRIC/GL-ELECTRIC_OPEN_02-1400x1200.jpg",
                                    "Gator GL-Electric - Front")),
                    new Product(
                            "K&M 210/9 Mikrofonständer",
                            new BigDecimal("59.00"),
                            "Stabiler Mikrofonständer für Bühne und Studio.",
                            """
                            Der K&M 210/9 ist ein langlebiger Mikrofonständer, der seit Jahrzehnten \
                            als Standard in Studios und auf Bühnen gilt. Die stabile Konstruktion, \
                            der ausziehbare Galgen und die zuverlässigen Verschlüsse sorgen für \
                            maximale Flexibilität im Einsatz. Dank seiner robusten Verarbeitung \
                            eignet er sich für professionelle Anwendungen ebenso wie für Proberäume \
                            und Live‑Auftritte.\
                            """,
                            Category.OTHER,
                            new ProductImage(
                                    "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_10/104942/3564780_800.jpg",
                                    "K&M 210/9 - Front")),
                    new Product(
                            "Planet Waves Humidipak Restore Kit",
                            new BigDecimal("24.00"),
                            "Feuchtigkeits-Regulierung für Akustikgitarren.",
                            """
                            Das Planet Waves Humidipak Restore Kit schützt Akustikgitarren zuverlässig \
                            vor zu trockener oder zu feuchter Luft und sorgt für ein stabiles Klima \
                            im Instrument. Das Zwei‑Wege‑System reguliert die Feuchtigkeit automatisch \
                            und verhindert so Risse, Verzug oder Klangverluste. Besonders für hochwertige \
                            Akustikinstrumente ist es eine einfache und effektive Lösung zur Pflege \
                            und Werterhaltung.\
                            """,
                            Category.OTHER,
                            new ProductImage(
                                    "https://www.mooloolabamusic.com.au/assets/full/PW-HPK-01.jpg",
                                    "Planet Waves Humidipak - Front")));
            if (products.count() == 0) {
                logger.info("No products found. Inserting {} sample products.", sampleProducts.size());
                List<Product> saved = products.saveAll(sampleProducts);
                logger.info("Successfully inserted {} sample products.", saved.size());
            } else {
                logger.info("Skipping sample products insertion because products already exist.");
            }
        };
    }
    
    
    @Bean
    public ApplicationRunner fillAccounts(Accounts accounts, PasswordEncoder encoder) {
        return _ -> {
            List<Account> demoAccounts = List.of(
                    new Account("admin@symphonia.com", encoder.encode("1234"), Role.ADMIN),
                    new Account("customer@symphonia.com", encoder.encode("1234"), Role.CUSTOMER));
            
            if (accounts.count() == 0) {
                logger.info("No accounts found. Inserting {} demo accounts.", demoAccounts.size());
                List<Account> saved = accounts.saveAll(demoAccounts);
                logger.info("Successfully inserted {} demo accounts.", saved.size());
            } else {
                logger.info("Skipping demo accounts insertion because accounts already exist.");
            }
        };
    }
    
}
