// Bicep - "Glue" (2017), rebuilt from scratch in Strudel.
// No recordings and no samples: every sound, drums included, is synthesised from this text.
// It's a homage from memory of the track's feel, not a note-for-note transcription:
// shuffled 2-step garage drums, F minor pads washed in reverb, a plucked arp,
// a breathy "vocal" lead and a sub bass. Runs as a 32-bar arrangement, then loops.
// Press play (Ctrl+Enter). Comment out a name in the stack() at the bottom to mute it.

setcpm(130/4)

const prog = "<Fm9 Db^7 Ab^7 Eb^7>"   // one chord per bar

// arrangement, one digit per bar over 32 bars (1 = playing)
const fromBar5  = "<0!4 1!28>"
const groove    = "<0!8 1!16 0!4 1!4>"   // drums + bass, with a breakdown at bar 25
const leadIn    = "<0!16 1!16>"

const pads = chord(prog).voicing()
  .s("sawtooth").lpf(sine.range(500, 1600).slow(16)).lpq(3)
  .attack(.6).release(2).gain(.16).room(.9).roomsize(8)
  .color("#8b6cff")

const stabs = chord(prog).voicing().struct("[~ x]*4")
  .s("square").lpf(1400).decay(.12).sustain(0).gain(.12)
  .room(.6).delay(.3).delaytime(.346).delayfeedback(.4)
  .mask(fromBar5).color("#3fa7ff")

const arp = n("0 2 4 6 7 6 4 2 3 5 7 9 8 7 5 3").chord(prog).voicing().anchor("C5")
  .s("triangle").decay(.15).sustain(0).gain(.22).pan(sine.slow(8))
  .delay(.45).delaytime(.346).delayfeedback(.55).room(.5)
  .mask(fromBar5).color("#2ee6c8")

const lead = n("<[~ 7 ~ 6] [~ 4 ~ [2 4]] [~ 4 ~ 6] [7 ~ 6 4]>").scale("F4:minor")
  .s("sawtooth").vowel("<o a o e>").lpf(2200).attack(.03).release(.6)
  .gain(.18).room(.8).roomsize(6).delay(.4).delaytime(.346).delayfeedback(.5)
  .mask(leadIn).color("#ff5fa2")

const bass = note("<f1 db1 ab0 eb1>").struct("x ~ ~ x ~ ~ x ~")
  .s("sine").decay(.35).sustain(.4).gain(.9)
  .mask(groove).color("#ffb347")

// drums: no samples, just oscillators and noise shaped by envelopes and filters
const kick = note("c2 ~ ~ ~ ~ ~ ~ c2 ~ ~ c2 ~ ~ ~ ~ ~")
  .s("sine").penv(24).pdecay(.06).decay(.35).sustain(0).gain(1.3)
const clap = s("~ ~ ~ ~ pink ~ ~ ~ ~ ~ ~ ~ pink ~ ~ ~")
  .bpf(1400).decay(.14).sustain(0).gain(.7).room(.3)
const rim  = note("~ ~ g5 ~ ~ ~ ~ ~ ~ g5 ~ ~ ~ ~ ~ g5")
  .s("square").hpf(1500).decay(.03).sustain(0).gain(.18)
const hats = s("white*16").hpf(8000).decay(.03).sustain(0).gain("[.12 .26]*8")
const openhat = s("[~ white]*4").hpf(6500).decay(.18).sustain(0).gain(.14)

const drums = stack(kick, clap, rim, hats, openhat)
  .swingBy(1/6, 8).mask(groove).color("#f2f2f2")

stack(pads, stabs, arp, lead, bass, drums)
