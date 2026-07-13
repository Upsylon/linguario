/* ===== audio.js — TTS robuste via Web Speech API ===== */
const TTS = (() => {
  let _on     = localStorage.getItem('langapp:tts') !== 'off';
  let _voices = null; // { fr: Voice|null, es: Voice|null }

  /* ── Sélection de voix avec chaîne de fallback ──────────────────── */
  const FR_PREF = ['fr-FR', 'fr-CA', 'fr-BE', 'fr'];
  const ES_PREF = ['es-AR', 'es-MX', 'es-419', 'es-US', 'es-ES', 'es'];

  function _pickVoice(list, prefixes) {
    for (const p of prefixes) {
      const v = list.find(v => v.lang.startsWith(p));
      if (v) return v;
    }
    return null;
  }

  function _loadVoices() {
    const all = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    if (!all.length) return false;
    _voices = {
      fr: _pickVoice(all, FR_PREF),
      es: _pickVoice(all, ES_PREF),
    };
    return true;
  }

  if (window.speechSynthesis) {
    // Chrome/Android charge les voix de façon asynchrone via onvoiceschanged
    // iOS les retourne immédiatement dans getVoices()
    if (!_loadVoices()) {
      window.speechSynthesis.onvoiceschanged = _loadVoices;
    }
  }

  /* ── Speak ───────────────────────────────────────────────────────── */
  function speak(text, lang) { // lang : 'fr' | 'es'
    if (!_on || !window.speechSynthesis) return;

    // iOS : speechSynthesis se bloque en état 'paused' après changement de focus
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    const clean = String(text || '')
      .replace(/\(.*?\)/g, '')   // retire les parenthèses
      .replace(/[¿¡]/g, '')      // retire la ponctuation espagnole spéciale
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean) return;

    const utt  = new SpeechSynthesisUtterance(clean);
    utt.lang   = lang === 'es' ? 'es-AR' : 'fr-FR';
    utt.rate   = 0.82;
    utt.pitch  = 1.0;

    // Assigne la voix mise en cache (évite le fallback robotique sur iOS/Android)
    if (_voices) {
      const v = lang === 'es' ? _voices.es : _voices.fr;
      if (v) utt.voice = v;
    }

    window.speechSynthesis.speak(utt);
  }

  /* ── Toggle ──────────────────────────────────────────────────────── */
  function toggle() {
    _on = !_on;
    if (!_on && window.speechSynthesis) window.speechSynthesis.cancel();
    localStorage.setItem('langapp:tts', _on ? 'on' : 'off');
    return _on;
  }

  function isOn()      { return _on && !!window.speechSynthesis; }
  function supported() { return !!window.speechSynthesis; }

  return { speak, toggle, isOn, supported };
})();

window.TTS = TTS;
