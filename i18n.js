// Translations and the categories list. All UI text routes through t(key).

const I18N = {
  en: {
    // Tabs
    'tab.here': 'Today',
    'tab.breathe': 'Breathe',
    'tab.letters': 'Letters',

    // Headers
    'title.here': "Today's phrase",
    'sub.here': 'A kind word from you, to you.',
    'title.breathe': 'Breathe',
    'sub.breathe': 'Pick a rhythm. Follow it gently.',
    'title.letters': 'Letters',
    'sub.letters': 'Write to a future you.',

    // Here — entry
    'here.entryTitle': 'What kind of phrase, today?',
    'here.entryHint': 'Pick the spirit you want to write in. Your words become today\'s phrase — something to carry with you.',
    'here.orKeepPast': 'Or keep one from before',
    'here.keepYesterday': "Keep yesterday's",
    'here.shuffle': 'Shuffle past phrases',
    'here.useThis': 'Use this for today',
    'here.another': 'Another',

    // Here — write
    'here.writePlaceholder': 'A few words for yourself…',
    'here.keep': 'Keep this for today',
    'here.reset': 'Choose another category',
    'here.tooShort': 'Write at least one word.',

    // Here — locked
    'here.savedFor': 'Held for today',
    'here.savedSub': 'Come back tomorrow to write again, or keep this one.',
    'here.viewBox': 'See past phrases',

    // Categories
    'cat.gratitude.label': 'Gratitude',
    'cat.gratitude.helper': 'What am I grateful for, right now, in this moment?',
    'cat.guru.label': 'I am my own guide',
    'cat.guru.helper': 'What wisdom do I already carry inside me today?',
    'cat.kindness.label': 'Self-kindness',
    'cat.kindness.helper': 'What gentle, compassionate thing can I say to myself?',
    'cat.intention.label': 'Intention',
    'cat.intention.helper': 'What quality or feeling do I want to embody today?',
    'cat.savor.label': 'A moment to savor',
    'cat.savor.helper': "Something small and beautiful from today I don't want to forget.",
    'cat.word.label': 'Just a word',
    'cat.word.helper': 'One word that describes how I want to feel or who I want to be today.',

    // Breathe
    'breathe.tap': 'Tap to begin',
    'breathe.begin': 'Begin',
    'breathe.stop': 'Stop',
    'breathe.in': 'Breathe in',
    'breathe.hold': 'Hold',
    'breathe.out': 'Breathe out',
    'breathe.calm.label': 'Calm',
    'breathe.calm.desc': 'Inhale 4s · Hold 7s · Exhale 8s. The long exhale activates the parasympathetic nervous system, slowing the heart and signalling the body to rest. Known as the 4-7-8 technique — a natural nervous-system tranquilizer.',
    'breathe.balance.label': 'Balance',
    'breathe.balance.desc': 'Inhale 4s · Hold 4s · Exhale 4s · Hold 4s. Also called box breathing. Creates a balanced physiological state — used by military and elite performers to regain clarity and composure under pressure.',
    'breathe.release.label': 'Release',
    'breathe.release.desc': 'Slow, deep inhales followed by longer exhales. Stimulates the vagus nerve and shifts the body from tension to calm. Best as a wind-down before sleep or after stress.',
    'breathe.energy.label': 'Energy',
    'breathe.energy.desc': 'Short, rhythmic breath cycles that increase oxygen and alertness. Use when you feel sluggish or need to sharpen focus before a task.',

    // Letters
    'letters.subjectPlaceholder': 'A title for this letter…',
    'letters.bodyPlaceholder': 'Dear future me,\n\n',
    'letters.send': 'Send',
    'letters.openBox': 'Open the letterbox',

    // Letters — send modal
    'send.title': 'Send this letter?',
    'send.body': "It will be saved in your letterbox. By default, you can open it whenever you want.",
    'send.changeWhen': 'Change when I can open it',
    'send.cancel': 'Not yet',
    'send.confirm': 'Send',
    'send.openWhen': 'Open',
    'send.opt.anytime': 'Anytime',
    'send.opt.week': 'In 1 week',
    'send.opt.month': 'In 1 month',
    'send.opt.three': 'In 3 months',
    'send.opt.year': 'In 1 year',
    'send.opt.custom': 'Pick a date…',

    // Sealed-letter explainer
    'explainer.title': 'About sealed letters',
    'explainer.body': "When you choose a date, the letter will be sealed until that moment. You won't see its content before then — only the subject and the unlock date will be visible. It's a way to send a real message to your future self.",
    'explainer.dismiss': 'Crystal clear',

    // Toast
    'toast.sent': 'Letter sent. It is in your letterbox.',

    // Letterbox
    'box.title': 'Letterbox',
    'box.empty': 'No letters yet.',
    'box.close': 'Close',
    'box.sealedUntil': 'Sealed until',
    'box.unread': 'New',
    'box.markUnread': 'Mark as unread',
    'box.markRead': 'Mark as read',
    'box.favorite': 'Favourite',
    'box.unfavorite': 'Remove favourite',
    'box.burn': 'Burn',
    'box.burn1Title': 'Burn this letter?',
    'box.burn1Body': 'You are about to burn this letter.',
    'box.burn1Yes': 'Yes, continue',
    'box.burn2Title': 'Are you absolutely sure?',
    'box.burn2Body': 'Once burned, this letter is gone forever. It cannot be recovered.',
    'box.burn2Yes': 'Burn it forever',
    'box.cancel': 'Cancel',

    // About bubble (contextual help)
    'about.here.title': 'About — Today',
    'about.here.body': 'Each day, choose a category and write a short phrase to yourself. It locks for the day so you can carry it with you. Tomorrow, you can write a new one or keep this one.',
    'about.breathe.title': 'About — Breathe',
    'about.breathe.body': 'Pick a breathing rhythm. The orb expands as you inhale and shrinks as you exhale. Each pattern does something different — read its description to choose.',
    'about.letters.title': 'About — Letters',
    'about.letters.body': "Write a letter to your future self. By default it can be opened anytime, or you can seal it until a specific date. All letters live in the letterbox, opened from the button below.",

    // Tutorial
    'tut.skip': 'Skip',
    'tut.next': 'Next',
    'tut.done': 'Begin',
    'tut.0.title': 'Welcome.',
    'tut.0.body': 'A small, quiet place. You are here, and that is good.',
    'tut.1.title': 'Today',
    'tut.1.body': "Choose a category, write a kind phrase to yourself. It becomes today's phrase.",
    'tut.2.title': 'Breathe',
    'tut.2.body': "Four rhythms to slow down. Pick the one your body needs.",
    'tut.3.title': 'Letters',
    'tut.3.body': "Write to your future self. Open whenever you like, or seal until a date.",
    'tut.4.title': 'Anytime help',
    'tut.4.body': "The bubble at the top right tells you what each section does, when you need a reminder.",
  },

  it: {
    'tab.here': 'Oggi',
    'tab.breathe': 'Respira',
    'tab.letters': 'Lettere',

    'title.here': 'La frase di oggi',
    'sub.here': 'Una parola gentile, da te a te.',
    'title.breathe': 'Respira',
    'sub.breathe': 'Scegli un ritmo. Seguilo con calma.',
    'title.letters': 'Lettere',
    'sub.letters': 'Scrivi al te del futuro.',

    'here.entryTitle': 'Che frase, oggi?',
    'here.entryHint': "Scegli con quale spirito vuoi scrivere. Le tue parole diventeranno la frase di oggi — qualcosa da portare con te.",
    'here.orKeepPast': 'O tienine una di prima',
    'here.keepYesterday': 'Tieni quella di ieri',
    'here.shuffle': 'Sfoglia le frasi precedenti',
    'here.useThis': 'Usa questa per oggi',
    'here.another': "Un'altra",

    'here.writePlaceholder': 'Poche parole per te…',
    'here.keep': 'Tieni questa per oggi',
    'here.reset': 'Scegli un\'altra categoria',
    'here.tooShort': 'Scrivi almeno una parola.',

    'here.savedFor': 'Custodita per oggi',
    'here.savedSub': "Torna domani per scriverne un'altra, o tieni questa.",
    'here.viewBox': 'Vedi le frasi precedenti',

    'cat.gratitude.label': 'Gratitudine',
    'cat.gratitude.helper': 'Per cosa sono grato/a, proprio ora, in questo momento?',
    'cat.guru.label': 'Sono la mia guida',
    'cat.guru.helper': 'Quale saggezza porto già dentro di me, oggi?',
    'cat.kindness.label': 'Gentilezza con me',
    'cat.kindness.helper': 'Cosa di gentile e compassionevole posso dirmi?',
    'cat.intention.label': 'Intenzione',
    'cat.intention.helper': 'Quale qualità o sensazione voglio incarnare oggi?',
    'cat.savor.label': 'Un momento da assaporare',
    'cat.savor.helper': 'Qualcosa di piccolo e bello di oggi che non voglio dimenticare.',
    'cat.word.label': 'Solo una parola',
    'cat.word.helper': 'Una parola che descrive come voglio sentirmi o chi voglio essere oggi.',

    'breathe.tap': 'Tocca per iniziare',
    'breathe.begin': 'Inizia',
    'breathe.stop': 'Ferma',
    'breathe.in': 'Inspira',
    'breathe.hold': 'Trattieni',
    'breathe.out': 'Espira',
    'breathe.calm.label': 'Calma',
    'breathe.calm.desc': "Inspira 4s · Trattieni 7s · Espira 8s. L'espirazione lunga attiva il sistema nervoso parasimpatico, rallenta il cuore e segnala al corpo di riposare. Conosciuta come tecnica 4-7-8 — un tranquillante naturale per il sistema nervoso.",
    'breathe.balance.label': 'Equilibrio',
    'breathe.balance.desc': "Inspira 4s · Trattieni 4s · Espira 4s · Trattieni 4s. Detta anche 'box breathing'. Crea uno stato fisiologico equilibrato — usata da militari e atleti d'élite per ritrovare lucidità e compostezza sotto pressione.",
    'breathe.release.label': 'Rilascio',
    'breathe.release.desc': 'Inspirazioni lente e profonde, espirazioni più lunghe. Stimola il nervo vago e accompagna il corpo dalla tensione alla calma. Ideale prima di dormire o dopo lo stress.',
    'breathe.energy.label': 'Energia',
    'breathe.energy.desc': "Cicli di respiro brevi e ritmici che aumentano l'ossigenazione e la prontezza. Usala quando ti senti pigro/a o devi affilare la concentrazione.",

    'letters.subjectPlaceholder': 'Un titolo per questa lettera…',
    'letters.bodyPlaceholder': 'Caro me del futuro,\n\n',
    'letters.send': 'Invia',
    'letters.openBox': 'Apri la cassetta delle lettere',

    'send.title': 'Inviare questa lettera?',
    'send.body': 'Verrà conservata nella cassetta. Per impostazione predefinita, puoi aprirla quando vuoi.',
    'send.changeWhen': 'Cambia quando posso aprirla',
    'send.cancel': 'Non ancora',
    'send.confirm': 'Invia',
    'send.openWhen': 'Apri',
    'send.opt.anytime': 'Quando voglio',
    'send.opt.week': 'Tra 1 settimana',
    'send.opt.month': 'Tra 1 mese',
    'send.opt.three': 'Tra 3 mesi',
    'send.opt.year': 'Tra 1 anno',
    'send.opt.custom': 'Scegli una data…',

    'explainer.title': 'Le lettere sigillate',
    'explainer.body': "Quando scegli una data, la lettera resterà sigillata fino a quel momento. Non potrai vederne il contenuto prima — solo l'oggetto e la data di apertura saranno visibili. È un modo per inviare un vero messaggio al te del futuro.",
    'explainer.dismiss': 'Chiarissimo',

    'toast.sent': 'Lettera inviata. È nella cassetta.',

    'box.title': 'Cassetta delle lettere',
    'box.empty': 'Ancora nessuna lettera.',
    'box.close': 'Chiudi',
    'box.sealedUntil': 'Sigillata fino al',
    'box.unread': 'Nuova',
    'box.markUnread': 'Segna come non letta',
    'box.markRead': 'Segna come letta',
    'box.favorite': 'Preferita',
    'box.unfavorite': 'Rimuovi preferita',
    'box.burn': 'Brucia',
    'box.burn1Title': 'Bruciare questa lettera?',
    'box.burn1Body': 'Stai per bruciare questa lettera.',
    'box.burn1Yes': 'Sì, continua',
    'box.burn2Title': 'Sei davvero sicuro/a?',
    'box.burn2Body': 'Una volta bruciata, la lettera sarà persa per sempre. Non potrà essere recuperata.',
    'box.burn2Yes': 'Bruciala per sempre',
    'box.cancel': 'Annulla',

    'about.here.title': 'Info — Oggi',
    'about.here.body': "Ogni giorno scegli una categoria e scrivi una breve frase per te. Si blocca per la giornata, così la porti con te. Domani potrai scriverne una nuova o tenere questa.",
    'about.breathe.title': 'Info — Respira',
    'about.breathe.body': "Scegli un ritmo di respiro. La sfera si espande quando inspiri e si restringe quando espiri. Ogni tecnica fa qualcosa di diverso — leggi la descrizione per scegliere.",
    'about.letters.title': 'Info — Lettere',
    'about.letters.body': 'Scrivi una lettera al te del futuro. Per impostazione predefinita può essere aperta in qualsiasi momento, oppure puoi sigillarla fino a una certa data. Tutte le lettere vivono nella cassetta, raggiungibile dal pulsante in basso.',

    'tut.skip': 'Salta',
    'tut.next': 'Avanti',
    'tut.done': 'Iniziamo',
    'tut.0.title': 'Benvenuto/a.',
    'tut.0.body': 'Un piccolo posto silenzioso. Sei qui, ed è una buona cosa.',
    'tut.1.title': 'Oggi',
    'tut.1.body': 'Scegli una categoria, scrivi una frase gentile per te. Diventerà la frase di oggi.',
    'tut.2.title': 'Respira',
    'tut.2.body': 'Quattro ritmi per rallentare. Scegli quello di cui ha bisogno il tuo corpo.',
    'tut.3.title': 'Lettere',
    'tut.3.body': "Scrivi al te del futuro. Apri quando vuoi, o sigilla fino a una data.",
    'tut.4.title': 'Aiuto in qualsiasi momento',
    'tut.4.body': 'La bolla in alto a destra ti ricorda cosa fa ogni sezione, quando ne hai bisogno.',
  }
};

const CATEGORIES = ['gratitude','guru','kindness','intention','savor','word'];
const CATEGORY_TINTS = {
  gratitude: '#fde2c7',
  guru:      '#e2d4f0',
  kindness:  '#f7d7e0',
  intention: '#d8e8d0',
  savor:     '#fbecbf',
  word:      '#d6e6f0',
};

const PATTERNS = {
  calm:    { in: 4, hold1: 7, out: 8, hold2: 0 },
  balance: { in: 4, hold1: 4, out: 4, hold2: 4 },
  release: { in: 5, hold1: 0, out: 8, hold2: 0 },
  energy:  { in: 2, hold1: 0, out: 2, hold2: 0 },
};
