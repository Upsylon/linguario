/* ===== audio.js — TTS via Web Speech API ===== */
const TTS = (() => {
  let _on = localStorage.getItem('langapp:tts') !== 'off';

  function speak(text, langCode) {
    if (!_on || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      String(text || '').replace(/\(.*?\)/g, '').replace(/[¿¡]/g, '').replace(/\s+/g, ' ').trim()
    );
    utterance.lang  = langCode === 'es' ? 'es-AR' : 'fr-FR';
    utterance.rate  = 0.82;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  function toggle() {
    _on = !_on;
    localStorage.setItem('langapp:tts', _on ? 'on' : 'off');
    return _on;
  }

  function isOn()      { return _on && !!window.speechSynthesis; }
  function supported() { return !!window.speechSynthesis; }

  return { speak, toggle, isOn, supported };
})();
window.TTS = TTS;
