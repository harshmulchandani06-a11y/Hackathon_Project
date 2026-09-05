// Browser Speech Synthesis for realistic viva defense examiner voiceover
class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isMuted = false;
    this.isSpeaking = false;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  speak(text, examinerPersona = {}) {
    if (!this.synth || this.isMuted || !text) return;

    // Cancel existing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const { pitch = 1.0, rate = 1.0 } = examinerPersona.voiceConfig || {};

    utterance.pitch = pitch;
    utterance.rate = rate;

    // Pick a fitting English voice if available
    const engVoices = this.voices.filter(v => v.lang.startsWith('en'));
    if (engVoices.length > 0) {
      if (examinerPersona.id === 'dr-rigor') {
        utterance.voice = engVoices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('George')) || engVoices[0];
      } else if (examinerPersona.id === 'prof-vance') {
        utterance.voice = engVoices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Susan')) || engVoices[0];
      } else {
        utterance.voice = engVoices[engVoices.length - 1] || engVoices[0];
      }
    }

    this.currentUtterance = utterance;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
    };

    try {
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      this.currentUtterance = null;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }
}

export const speechService = new SpeechService();
