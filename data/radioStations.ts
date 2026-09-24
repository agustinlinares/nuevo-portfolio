import type { ThemeEmoji } from "@/context/ThemeContext";

export interface RadioChannel {
  label: string;
  uri: string;
}

export interface RadioStation {
  station: string;
  channels: RadioChannel[];
}

// Playlists reales elegidas junto a Agustín (2026-09-18). Para cambiar cualquier
// playlist, sustituye el "uri": el ID es la parte final de la URL de Spotify.
export const RADIO_STATIONS: Record<ThemeEmoji, RadioStation> = {
  "💻": { station: "Radio Backend", channels: [{ label: "Lo-Fi Code", uri: "spotify:playlist:0c4AtmavG5YdfEsFEI2fUE" }] },
  "🫒": { station: "Radio Jaén Sur", channels: [{ label: "Flamenco Fusión", uri: "spotify:playlist:4Einuc4YSVyKxX8tiXXnDM" }] },
  "⚽": { station: "Radio Verdiblanca", channels: [{ label: "Cánticos Betis", uri: "spotify:playlist:7l2X9CQIUK6DI5mh39apjc" }] },
  "🚗": { station: "Radio Paddock", channels: [{ label: "F1 Tracks: Ministry of Sound", uri: "spotify:playlist:4lb9kSKMQzQWIUZ7SDimhh" }] },
  "🎸": {
    station: "Radio Riff",
    channels: [
      { label: "Metal", uri: "spotify:playlist:37i9dQZF1DWTcqUzwhNmKv" },
      { label: "Rock y Punk Español", uri: "spotify:playlist:2TdbFKi0iE7fSChdjWLDgJ" },
      { label: "Hip Hop Español", uri: "spotify:playlist:37i9dQZF1DXcd2Vmhfon1w" },
      { label: "Indie español", uri: "spotify:playlist:4bOVU2AT1VJyZviE6PDUWY" },
    ],
  },
  "🎮": { station: "Radio Respawn", channels: [{ label: "Boss Rush", uri: "spotify:playlist:1f8eRzKk4195Oo4JqfSkze" }] },
  "🕹️": { station: "Radio Pixel", channels: [{ label: "Chipped Bits", uri: "spotify:playlist:5dNxtLnS44AlhggKQGrRhr" }] },
  "🎱": { station: "Radio Tablero", channels: [{ label: "Jazz in the Background", uri: "spotify:playlist:37i9dQZF1DWV7EzJMK2FUI" }] },
  "🀄": { station: "Radio Sakura", channels: [{ label: "Anime Now", uri: "spotify:playlist:37i9dQZF1DWT8aqnwgRt92" }] },
  "🎥": { station: "Radio Fundido", channels: [{ label: "Epic Movie Soundtracks", uri: "spotify:playlist:7rb5bQCUKp8t6pzrp1T2z5" }] },
};

export interface Podcast {
  title: string;
  url: string;
}

// Podcasts reales de referencia por temática (investigados, no inventados).
export const PODCASTS_BY_THEME: Record<ThemeEmoji, Podcast[]> = {
  "💻": [
    { title: "Loop Infinito (by Xataka)", url: "https://open.spotify.com/show/5C0UAinubsuw6JWLCMvpCJ" },
    { title: "Hablamos de SAP", url: "https://open.spotify.com/show/3L2TuR7QYxv33ukzOXwFLM" },
    { title: "DevTalles (Fernando Herrera)", url: "https://open.spotify.com/show/0jrfxcnCrD7N9tlA0BGJp5" },
    { title: "Syntax — Tasty Web Development Treats", url: "https://open.spotify.com/show/4kYCRYJ3yK5DQbP5tbfZby" },
    { title: "Web Reactiva", url: "https://open.spotify.com/show/59878neWF4cPVmpPmvIZTF" },
    { title: "Territorio Android PODCAST", url: "https://open.spotify.com/show/6aRxZ64rdzZpTt1jX6Z7hm" },
    { title: "Atareao con Linux", url: "https://open.spotify.com/show/2v0fC8PyeeUTQDD67I0mKW" },
    { title: "Topes de Gama Unplugged", url: "https://open.spotify.com/show/0in7qVBs67UlDujkliYAFV" },
  ],
  "🫒": [
    { title: "Radio Jaén", url: "https://open.spotify.com/show/696uFdeDHdjFDVpzVdOdMx" },
    { title: "EXTRA JAÉN | JAÉN NI PODCAST", url: "https://open.spotify.com/show/3i6qCRlTSO9G4W9kLkiVTW" },
    { title: "Radio Granada (Cadena SER)", url: "https://open.spotify.com/show/2JYKtq4yp6jZCv8xAOcufj" },
    { title: "SER Málaga (Cadena SER)", url: "https://open.spotify.com/show/5tOSNePpVeLKP6J2UGBJgf" },
    { title: "Radio Sevilla (Cadena SER)", url: "https://open.spotify.com/show/3fxCs5gqPevoAh80NYH0ym" },
    { title: "Andalucía Informa (Europa Press)", url: "https://open.spotify.com/show/0qsKJrmrRHZyjJiiN3WEoZ" },
    { title: "Andalucía Capital — Economía y empresas", url: "https://open.spotify.com/show/0esZ6ok2ROeuSnseMYkJwn" },
    { title: "Hoy en EL PAÍS", url: "https://open.spotify.com/show/4n2SYRzAXUKDFccZ993ZEh" },
    { title: "Un tema al día (elDiario.es)", url: "https://open.spotify.com/show/54Vnd9qwrTaINwzCkTTIWO" },
    { title: "La Primera de Expansión", url: "https://open.spotify.com/show/0FTwiCMKTwCTmySy4u2X3j" },
    { title: "Cuéntame de economía", url: "https://open.spotify.com/show/2G44OhAzSlNludsv2XPKJd" },
  ],
  "⚽": [
    { title: "Estilo Betis", url: "https://www.ivoox.com/en/podcast-estilo-betis_sq_f1449996_1.html" },
    { title: "Directo MARCA Sevilla", url: "https://open.spotify.com/show/1PW2j6JbXtW2kqehlClLdj" },
    { title: "El Larguero (Cadena SER)", url: "https://open.spotify.com/show/0Bhyr7HDEijAinRGEyTVmm" },
    { title: "Carrusel Deportivo (Cadena Ser)", url: "https://open.spotify.com/show/7ijMsHiLxGBjfpw67Y4lBw" },
    { title: "Official UEFA Champions League Podcast", url: "https://open.spotify.com/show/1BrJcffOuBomXVTcXy3M2v" },
    { title: "CONMEBOL Libertadores", url: "https://open.spotify.com/show/29oS7CEOiF2OmQ2y6BOfGS" },
    { title: "Nos Gusta el Basket (Radio MARCA)", url: "https://open.spotify.com/show/0G7rSbVvwBZyO1l4EhRXXZ" },
    { title: "MassiveBall (Tu Podcast NBA en Español)", url: "https://open.spotify.com/show/5cFpt8nd2fI5T2EQX97AmS" },
  ],
  "🚗": [
    { title: "Técnica Fórmula 1", url: "https://www.ivoox.com/en/podcast-tecnica-formula-1-podcast-f1_sq_f1361567_1.html" },
    { title: "MotoRaceNation (MotoGP)", url: "https://open.spotify.com/show/3s29XBueKOe6CbLpBrexQ3" },
    { title: "MARCA Motor", url: "https://open.spotify.com/show/7wvueRfLukZCUK9x9x4w7A" },
    { title: "AutoFM — Programa del Motor y Coches", url: "https://open.spotify.com/show/0W1FLlGo9VV8LT4jgQBBKT" },
    { title: "El Rally Podcast", url: "https://open.spotify.com/show/74EH42SA5mA4ZgW7J3Eh9G" },
    { title: "COPE GP", url: "https://www.ivoox.com/en/podcast-cope-gp_sq_f18638_1.html" },
    { title: "El PODCAST de la POSVENTA", url: "https://open.spotify.com/show/1Ux2UViXoyOsmfDMvCoGPG" },
    { title: "El Podcast de coches.net", url: "https://open.spotify.com/show/7w6dpGCZzK1JwPDSWNIXe3" },
  ],
  "🎸": [
    { title: "Metal Hammer España Podcasts", url: "https://open.spotify.com/show/7oifQpkTm84P5V4BwUFGUK" },
    { title: "Frank T presenta (RNE Radio 3)", url: "https://www.ivoox.com/en/podcast-frank-t-presenta_sq_f12848660_1.html" },
    { title: "Barras Urbanas (Real Betis Radio)", url: "https://www.ivoox.com/en/podcast-barras-urbanas_sq_f11671275_1.html" },
    { title: "Revelación o Timo (JENESAISPOP)", url: "https://open.spotify.com/show/59ebAGQeNDIg58TJDLAxaL" },
    { title: "El Pirata y su banda (Rock FM)", url: "https://www.ivoox.com/en/podcast-pirata-su-banda_sq_f156855_1.html" },
    { title: "La Alternativa (Radio MARCA)", url: "https://open.spotify.com/show/3b4Low7dAr4kljYHuP1gFS" },
  ],
  "🎮": [
    { title: "Vandal Radio", url: "https://open.spotify.com/show/0cy0i7NWc3htyVUisMoJ7J" },
    { title: "GG by 3DJuegos", url: "https://open.spotify.com/show/1NS2aGhE4m7cvoAgeWj3GX" },
    { title: "Comunidad Xbox Podcast", url: "https://open.spotify.com/show/7aLlwdgWabUEgI0c9v8yDo" },
    { title: "IGN Game Reviews", url: "https://open.spotify.com/show/44YL4GTVsrOFTZJHepUDC2" },
    { title: "MeriPodcast (MeriStation)", url: "https://open.spotify.com/show/2FB9wJhjXzRJMeKG8arcLu" },
    { title: "RELOAD (AnaitGames)", url: "https://open.spotify.com/show/0CVxf4TzWMqqjdrDrCHq51" },
    { title: "Nitro Podcast (Eurogamer.es)", url: "https://www.ivoox.com/en/podcast-nitro-podcast_sq_f13221573_1.html" },
    { title: "Estación Nintendo", url: "https://open.spotify.com/show/7pGajzL4n5HMpKyWQ1YQpE" },
    { title: "El Búnker S.A.", url: "https://open.spotify.com/show/3nEriHHUvgnT4a5ACUlnsX" },
    { title: "The Wild Project (Jordi Wild)", url: "https://open.spotify.com/show/5iKz9gAsyuQ1xLG6MFLtQg" },
  ],
  "🕹️": [
    { title: "Rejugando — Videojuegos Clásicos", url: "https://open.spotify.com/show/4kEcd83Hxf6Q7QM1x2038a" },
    { title: "RetroManiac Podcast", url: "https://open.spotify.com/show/1bFh4115QUdlTz7XoZ0lsn" },
    { title: "Podcast Retro Entre AMIGOS", url: "https://open.spotify.com/show/3m0CXi4gHNtVhKJrkhcLKv" },
    { title: "El Mundo del Spectrum Podcast", url: "https://open.spotify.com/show/50kpHUKnwusHrGlQW6RwFJ" },
    { title: "Conexión MSX", url: "https://www.ivoox.com/en/podcast-conexion-msx_sq_f1502368_1.html" },
    { title: "Retro Handhelds Podcast (EN)", url: "https://open.spotify.com/show/2tmx0PFdkyRqkjRkB7GtgD" },
  ],
  "🎱": [
    { title: "Más Madera (eurogames)", url: "https://open.spotify.com/show/3mql3NXdjMzyb89fYNzJDC" },
    { title: "Modo Juego", url: "https://open.spotify.com/show/30fhsK2UXzVwkAZHfWAkNy" },
    { title: "La Pila de Descartes — Juegos de Mesa", url: "https://open.spotify.com/show/2VbXmMUt8adX5oTtNIs1eJ" },
    { title: "Ciudadano Meeple", url: "https://open.spotify.com/show/7J5KMTUAy4cptzbyh2icCl" },
    { title: "El Semanal De El Rincón Legacy", url: "https://open.spotify.com/show/1FnJ4Pr8E2SdS7qWQlq0lS" },
    { title: "El Dado Único", url: "https://open.spotify.com/show/7bOjaVn43ueIqGN7maJHqI" },
  ],
  "🀄": [
    { title: "YaMétete Kudasai! Anime Podcast", url: "https://open.spotify.com/show/5wJjjyZ9SxiY1mw8ubLiHw" },
    { title: "Japón a Fondo (Japonismo)", url: "https://open.spotify.com/show/7ipdkW91tBPdTOomdmZSHO" },
    { title: "Tanukis de Kyoto", url: "https://open.spotify.com/show/5KgwYG2FefFBJirCE4TMWV" },
    { title: "Otapod", url: "https://open.spotify.com/show/27msDE4G4ROU3Dw183X2Aj" },
    { title: "Dimensión Manga", url: "https://open.spotify.com/show/3JXRamjvnrd6qARnrCGqNt" },
    { title: "Jiburi Podcast (Studio Ghibli)", url: "https://open.spotify.com/show/3vy0Et6epzN4L0ccyWMsZg" },
  ],
  "🎥": [
    { title: "TDC — Tiempo de Culto", url: "https://open.spotify.com/show/43qIJmZQUPiXf5eHUf9DQR" },
    { title: "Cine En Serie", url: "https://www.ivoox.com/podcast-cine-en-serie_sq_f1317588_amp_1.html" },
    { title: "Nippon.com en español (cine japonés)", url: "https://open.spotify.com/show/2tTrj1ETfNABtqSJQC5hJK" },
    { title: "Todopoderosos (cine de Hollywood)", url: "https://open.spotify.com/show/6SArrjVIOp56HVhQqoDdlU" },
    { title: "Fuera de Series (series USA)", url: "https://open.spotify.com/show/3RTDss6AAGjSNozVOhDNzX" },
    { title: "Cultura Seriéfila (series internacionales)", url: "https://open.spotify.com/show/2Z02dVRtoccypnHF7oq4CM" },
    { title: "Kinótico (cine español y europeo)", url: "https://open.spotify.com/show/3fU1lbDWsArymfvKo6QahK" },
  ],
};
