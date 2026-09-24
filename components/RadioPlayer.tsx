"use client";

import { useEffect, useRef, useState } from "react";
import { T } from "@/context/LangContext";
import { useTheme } from "@/context/ThemeContext";
import { PODCASTS_BY_THEME, RADIO_STATIONS } from "@/data/radioStations";

// Minimal typing for the Spotify embed IFrame API, loaded from an external script.
interface SpotifyController {
  loadUri: (uri: string) => void;
}
interface SpotifyIframeApi {
  createController: (
    element: HTMLElement,
    options: { uri: string; width: string; height: string },
    cb: (controller: SpotifyController) => void
  ) => void;
}
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

export default function RadioPlayer() {
  const { emoji } = useTheme();
  const [minimized, setMinimized] = useState(true); // starts minimized, like the source site
  const [podcastsOpen, setPodcastsOpen] = useState(false);
  const [channelIndex, setChannelIndex] = useState(0);

  const embedRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const readyRef = useRef(false);
  const pendingUriRef = useRef<string | null>(null);

  const station = RADIO_STATIONS[emoji];
  const podcasts = PODCASTS_BY_THEME[emoji] || [];

  // load the Spotify iframe API once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = embedRef.current;
      if (!element) return;
      const initialUri = pendingUriRef.current || RADIO_STATIONS["💻"].channels[0].uri;
      IFrameAPI.createController(element, { uri: initialUri, width: "100%", height: "80" }, (controller) => {
        controllerRef.current = controller;
        readyRef.current = true;
        pendingUriRef.current = null;
      });
    };

    return () => {
      document.body.removeChild(script);
      delete window.onSpotifyIframeApiReady;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reset to channel 0 whenever the theme changes, and play it
  useEffect(() => {
    setChannelIndex(0);
    const uri = station.channels[0]?.uri;
    if (!uri) return;
    if (readyRef.current && controllerRef.current) controllerRef.current.loadUri(uri);
    else pendingUriRef.current = uri;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emoji]);

  function selectChannel(i: number) {
    setChannelIndex(i);
    const uri = station.channels[i]?.uri;
    if (!uri) return;
    if (readyRef.current && controllerRef.current) controllerRef.current.loadUri(uri);
    else pendingUriRef.current = uri;
  }

  // keep the page's bottom padding in sync with the fixed player's real height
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    function sync() {
      const h = player!.offsetHeight;
      document.body.style.paddingBottom = h ? `${h + 16}px` : "0px";
    }
    sync();
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(sync);
      ro.observe(player);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [minimized, podcastsOpen, station.channels.length]);

  return (
    <>
      <div className={`radio-player${minimized ? " minimized" : ""}`} id="radioPlayer" ref={playerRef}>
        <div className="radio-glass-orbs" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="radio-player-inner">
          <div className="radio-brand">
            <span className="radio-live-dot" aria-hidden="true" />
            <span className="radio-emoji-chip">
              <span className="radio-emoji">{emoji}</span>
            </span>
            <div className="radio-brand-text">
              <span className="radio-live-label note">
                <T es="EN DIRECTO" en="LIVE" />
              </span>
              <span className="radio-station-name">{station.station}</span>
            </div>
            <span className="radio-eq" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>
          <div className="radio-embed-wrap">
            <div id="spotifyEmbed" ref={embedRef} />
          </div>
          <div className="radio-actions">
            <button
              type="button"
              className={`icon-btn${podcastsOpen ? " is-active" : ""}`}
              title="Podcasts recomendados"
              onClick={() => setPodcastsOpen((o) => !o)}
            >
              🎧
            </button>
            <button
              type="button"
              className="icon-btn"
              title="Minimizar reproductor"
              onClick={() => setMinimized((m) => !m)}
            >
              ⌄
            </button>
          </div>
        </div>
        {station.channels.length >= 2 && (
          <div className="radio-channels">
            {station.channels.map((c, i) => (
              <button
                key={c.uri}
                type="button"
                className={`radio-channel-btn${i === channelIndex ? " active" : ""}`}
                onClick={() => selectChannel(i)}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        <div className={`radio-podcasts${podcastsOpen ? " open" : ""}`}>
          <span className="radio-podcasts-label note">
            <T es="Podcasts recomendados de esta temática" en="Recommended podcasts for this theme" />
          </span>
          <span className="radio-podcasts-count">
            {podcasts.length} podcast{podcasts.length === 1 ? "" : "s"}
          </span>
          {podcasts.map((p) => (
            <a className="radio-podcast-link" key={p.url} href={p.url} target="_blank" rel="noopener">
              <span className="radio-podcast-ico">🎙️</span>
              <span className="radio-podcast-title">{p.title}</span>
            </a>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={`radio-reopen${minimized ? " show" : ""}`}
        title="Abrir reproductor"
        aria-label="Abrir reproductor"
        onClick={() => setMinimized(false)}
      >
        🎧
      </button>
    </>
  );
}
