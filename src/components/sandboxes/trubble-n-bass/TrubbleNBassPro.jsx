import { useState, useEffect, useRef, useCallback } from "react";

const STEPS = 16;
const NN = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
const AN = [1,2,3,4,5].flatMap(o => NN.map(n => ({ name:`${n}${o}`, freq: 440*Math.pow(2,(NN.indexOf(n)+(o-4)*12-9)/12) })));
const KN = [
  {n:"C3",w:true,k:"a"},{n:"C#3",w:false,k:"w"},{n:"D3",w:true,k:"s"},{n:"D#3",w:false,k:"e"},
  {n:"E3",w:true,k:"d"},{n:"F3",w:true,k:"f"},{n:"F#3",w:false,k:"t"},{n:"G3",w:true,k:"g"},
  {n:"G#3",w:false,k:"y"},{n:"A3",w:true,k:"h"},{n:"A#3",w:false,k:"u"},{n:"B3",w:true,k:"j"},
  {n:"C4",w:true,k:"k"},{n:"C#4",w:false,k:"o"},{n:"D4",w:true,k:"l"},{n:"D#4",w:false,k:"p"},
  {n:"E4",w:true,k:";"},{n:"F4",w:true,k:"'"},
];
const SC = { major:[0,2,4,5,7,9,11], minor:[0,2,3,5,7,8,10], pentatonic:[0,2,4,7,9], blues:[0,3,5,6,7,10], dorian:[0,2,3,5,7,9,10], mixolydian:[0,2,4,5,7,9,10] };
const DK = {
  "808":{ name:"808 Kit", sounds:{ kick:{t:"k8",f:45,d:0.8},snare:{t:"s8",f:180,d:0.3},hihat:{t:"hh",f:8000,d:0.05},openhat:{t:"oh",f:7000,d:0.25},clap:{t:"cl",f:1200,d:0.15},tom:{t:"tm",f:100,d:0.4},rim:{t:"rm",f:800,d:0.05},perc:{t:"pc",f:2000,d:0.08}}},
  acoustic:{ name:"Acoustic", sounds:{ kick:{t:"ka",f:65,d:0.5},snare:{t:"sa",f:220,d:0.2},hihat:{t:"hh",f:9000,d:0.04},openhat:{t:"oh",f:8000,d:0.3},clap:{t:"cl",f:1000,d:0.12},tom:{t:"tm",f:120,d:0.35},rim:{t:"rm",f:900,d:0.04},perc:{t:"pc",f:1500,d:0.06}}},
  caribbean:{ name:"Caribbean", sounds:{ kick:{t:"k8",f:55,d:0.6},snare:{t:"sa",f:200,d:0.25},hihat:{t:"hh",f:10000,d:0.03},openhat:{t:"oh",f:9000,d:0.2},clap:{t:"cl",f:1100,d:0.1},tom:{t:"cg",f:180,d:0.3},rim:{t:"cb",f:680,d:0.08},perc:{t:"sh",f:6000,d:0.04}}},
  grime:{ name:"Grime/Drill", sounds:{ kick:{t:"k8",f:38,d:1.0},snare:{t:"s8",f:160,d:0.35},hihat:{t:"hh",f:11000,d:0.03},openhat:{t:"oh",f:10000,d:0.15},clap:{t:"cl",f:1400,d:0.18},tom:{t:"tm",f:80,d:0.5},rim:{t:"rm",f:1000,d:0.03},perc:{t:"pc",f:3000,d:0.05}}},
};
const SR = [
  {id:"afrobeats",nm:"Afrobeats",art:"Fela → Burna Boy",bpm:108,key:"C",sc:"pentatonic",kit:"caribbean",
    p:{kick:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hihat:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],openhat:[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],clap:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],tom:[0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0],rim:[0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,1],perc:[1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0]},
    bn:["C2","C2","E2","E2","G2","G2","E2","E2","C2","C2","A1","A1","G1","G1","E2","E2"],
    ls:"LAYERING \u2014 each part simple alone, complexity from interlocking."},
  {id:"grime",nm:"Grime",art:"Wiley \u2192 Skepta",bpm:140,key:"D#",sc:"minor",kit:"grime",
    p:{kick:[1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hihat:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],openhat:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],clap:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],tom:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],rim:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],perc:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    bn:["D#2","D#2","D#2","D#2","F2","F2","D#2","D#2","D#2","D#2","C2","C2","D#2","D#2","D#2","D#2"],
    ls:"SPACE \u2014 only 3 kick hits. Stop filling every gap. Let beats breathe."},
  {id:"loversrock",nm:"Lovers Rock",art:"Janet Kay \u2192 Carroll Thompson",bpm:80,key:"F",sc:"major",kit:"caribbean",
    p:{kick:[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],snare:[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],hihat:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],openhat:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],clap:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],tom:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],rim:[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],perc:[0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0]},
    bn:["F2","F2","A2","A2","C3","C3","A2","A2","F2","F2","D2","D2","C2","C2","D2","D2"],
    ls:"FEEL \u2014 kick+snare TOGETHER on beat 3. Everything serves the groove."},
  {id:"soca",nm:"Soca",art:"Machel Montano",bpm:135,key:"G",sc:"major",kit:"caribbean",
    p:{kick:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hihat:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],openhat:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],clap:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],tom:[0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0],rim:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],perc:[0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1]},
    bn:["G2","G2","B2","B2","D3","D3","B2","B2","G2","G2","E2","E2","D2","D2","E2","E2"],
    ls:"DRIVE \u2014 four-on-the-floor + constant hats = unstoppable motion."},
  {id:"jazz",nm:"Jazz",art:"Art Blakey \u2192 Max Roach",bpm:120,key:"C",sc:"dorian",kit:"acoustic",
    p:{kick:[1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hihat:[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],openhat:[1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],clap:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],tom:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],rim:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],perc:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    bn:["C2","D2","E2","F2","G2","A2","B2","C3","D3","C3","B2","A2","G2","F2","E2","D2"],
    ls:"CONVERSATION \u2014 instruments that converse make music, not walls of sound."},
  {id:"drill",nm:"UK Drill",art:"Central Cee \u2192 Headie One",bpm:142,key:"G#",sc:"minor",kit:"grime",
    p:{kick:[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0],snare:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],hihat:[1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],openhat:[0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0],clap:[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],tom:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],rim:[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],perc:[0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0]},
    bn:["G#1","G#1","G#1","G#1","B1","B1","G#1","G#1","F#1","F#1","F#1","F#1","G#1","G#1","G#1","G#1"],
    ls:"DYNAMICS \u2014 hi-hat gaps create tension. Make the 808 bass SLIDE."},
];

// ── Audio Engine ────────────────────────────────────
class Eng {
  constructor(){this.ctx=null;this.mg=null;this.comp=null;this.ok=false;}
  async init(){
    if(this.ok)return;
    this.ctx=new(window.AudioContext||window.webkitAudioContext)({sampleRate:44100});
    this.comp=this.ctx.createDynamicsCompressor();this.comp.threshold.value=-20;this.comp.ratio.value=4;
    this.mg=this.ctx.createGain();this.mg.gain.value=0.8;
    const rl=this.ctx.sampleRate*1.5,rb=this.ctx.createBuffer(2,rl,this.ctx.sampleRate);
    for(let c=0;c<2;c++){const d=rb.getChannelData(c);for(let i=0;i<rl;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/rl,2.5);}
    this.rev=this.ctx.createConvolver();this.rev.buffer=rb;
    const rg=this.ctx.createGain();rg.gain.value=0.12;
    this.rev.connect(rg);rg.connect(this.comp);this.comp.connect(this.mg);this.mg.connect(this.ctx.destination);
    this.ok=true;
  }
  t(){return this.ctx?.currentTime||0}
  _n(c,dur){const b=c.createBuffer(1,Math.max(1,c.sampleRate*dur|0),c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;return s;}
  drum(c,dst,s,t,v=0.7){
    const g=c.createGain();
    if(s.t==="k8"||s.t==="ka"){
      const o=c.createOscillator();o.type="sine";const m=s.t==="k8"?4:2.5;
      o.frequency.setValueAtTime(s.f*m,t);o.frequency.exponentialRampToValueAtTime(s.f,t+(s.t==="k8"?0.06:0.04));
      o.frequency.exponentialRampToValueAtTime(20,t+s.d);
      g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+s.d);
      o.connect(g);g.connect(dst);o.start(t);o.stop(t+s.d+.05);
    }else if(s.t==="s8"||s.t==="sa"){
      const n=this._n(c,s.d),hp=c.createBiquadFilter();hp.type="highpass";hp.frequency.value=s.t==="s8"?2000:3000;
      const ng=c.createGain();ng.gain.setValueAtTime(v*.6,t);ng.gain.exponentialRampToValueAtTime(.001,t+s.d);
      n.connect(hp);hp.connect(ng);ng.connect(dst);n.start(t);n.stop(t+s.d+.05);
      const o=c.createOscillator();o.type="triangle";o.frequency.value=s.f;
      const tg=c.createGain();tg.gain.setValueAtTime(v*.5,t);tg.gain.exponentialRampToValueAtTime(.001,t+s.d*.5);
      o.connect(tg);tg.connect(dst);o.start(t);o.stop(t+s.d*.5+.05);
    }else if(s.t==="cl"){
      for(let i=0;i<3;i++){const off=t+i*.01,n=this._n(c,.04),bp=c.createBiquadFilter();bp.type="bandpass";bp.frequency.value=s.f;bp.Q.value=2;
      const cg=c.createGain();cg.gain.setValueAtTime(v*.3,off);cg.gain.exponentialRampToValueAtTime(.001,off+s.d);
      n.connect(bp);bp.connect(cg);cg.connect(dst);n.start(off);n.stop(off+s.d+.05);}
    }else if(s.t==="hh"||s.t==="oh"){
      const n=this._n(c,s.d),bp=c.createBiquadFilter();bp.type="bandpass";bp.frequency.value=s.f;bp.Q.value=s.t==="hh"?3:1;
      g.gain.setValueAtTime(v*.4,t);g.gain.exponentialRampToValueAtTime(.001,t+s.d);
      n.connect(bp);bp.connect(g);g.connect(dst);n.start(t);n.stop(t+s.d+.05);
    }else if(s.t==="cb"){
      const o1=c.createOscillator(),o2=c.createOscillator();o1.type=o2.type="square";o1.frequency.value=s.f;o2.frequency.value=s.f*1.5;
      const mx=c.createGain();mx.gain.value=.5;g.gain.setValueAtTime(v*.35,t);g.gain.exponentialRampToValueAtTime(.001,t+s.d);
      o1.connect(mx);o2.connect(mx);mx.connect(g);g.connect(dst);o1.start(t);o2.start(t);o1.stop(t+s.d+.05);o2.stop(t+s.d+.05);
    }else if(s.t==="cg"||s.t==="tm"){
      const o=c.createOscillator();o.type="sine";o.frequency.setValueAtTime(s.f*1.5,t);o.frequency.exponentialRampToValueAtTime(s.f,t+.05);
      g.gain.setValueAtTime(v*.6,t);g.gain.exponentialRampToValueAtTime(.001,t+s.d);
      o.connect(g);g.connect(dst);o.start(t);o.stop(t+s.d+.05);
    }else{
      const n=this._n(c,s.d),fl=c.createBiquadFilter();fl.type=s.t==="rm"?"bandpass":"highpass";fl.frequency.value=s.f;
      g.gain.setValueAtTime(v*.4,t);g.gain.exponentialRampToValueAtTime(.001,t+s.d);
      n.connect(fl);fl.connect(g);g.connect(dst);n.start(t);n.stop(t+s.d+.05);
    }
  }
  playDrum(s,time,v=0.7){if(!this.ctx)return;this.drum(this.ctx,this.comp,s,time||this.ctx.currentTime,v);}
  note(c,dst,nm,dur,wf,t,v){
    const no=AN.find(x=>x.name===nm);if(!no)return;
    const o=c.createOscillator();o.type=wf;o.frequency.value=no.freq;
    const fl=c.createBiquadFilter();fl.type="lowpass";fl.frequency.setValueAtTime(no.freq*6,t);fl.frequency.exponentialRampToValueAtTime(no.freq*1.5,t+dur*.7);
    const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.005);g.gain.setValueAtTime(v*.8,t+dur*.3);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(fl);fl.connect(g);g.connect(dst);o.start(t);o.stop(t+dur+.05);
  }
  playNote(nm,dur=.3,wf="sawtooth",time,v=.5){if(!this.ctx)return;this.note(this.ctx,this.comp,nm,dur,wf,time||this.ctx.currentTime,v);}
  wav(buf){
    const nc=buf.numberOfChannels,sr=buf.sampleRate,ds=buf.length*nc*2,ab=new ArrayBuffer(44+ds),v=new DataView(ab);
    const w=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i));};
    w(0,"RIFF");v.setUint32(4,36+ds,true);w(8,"WAVE");w(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,1,true);
    v.setUint16(22,nc,true);v.setUint32(24,sr,true);v.setUint32(28,sr*nc*2,true);v.setUint16(32,nc*2,true);v.setUint16(34,16,true);
    w(36,"data");v.setUint32(40,ds,true);const chs=[];for(let c=0;c<nc;c++)chs.push(buf.getChannelData(c));
    let off=44;for(let i=0;i<buf.length;i++)for(let c=0;c<nc;c++){v.setInt16(off,Math.max(-1,Math.min(1,chs[c][i]))*0x7fff,true);off+=2;}
    return new Blob([ab],{type:"audio/wav"});
  }
}
const eng=new Eng();
const X={bg:"#0a0a0f",s1:"#12121a",s2:"#1a1a28",s3:"#222236",br:"#2a2a44",tx:"#e8e8f0",td:"#8888aa",tm:"#555570",ac:"#ff6b35",ag:"rgba(255,107,53,0.3)",bs:"#00d4aa",ml:"#7b68ee",dn:"#ff4455",sl:"#ffd700",rc:"#ff2222",wh:"#fff"};

// ═══════ COMPONENT ═══════
export default function TrubbleNBassPro(){
  const[tab,setTab]=useState("studio");
  const[playing,setPlaying]=useState(false);
  const[step,setStep]=useState(-1);
  const[bpm,setBpm]=useState(120);
  const[vol,setVol]=useState(80);
  const[kit,setKit]=useState("808");
  const[swing,setSwing]=useState(0);
  const[tracks,setTracks]=useState(()=>{
    const dr=Object.keys(DK["808"].sounds).map(id=>({id,name:id[0].toUpperCase()+id.slice(1),type:"drum",pat:Array(STEPS).fill(false),vol:0.7,mute:false,solo:false}));
    return[...dr,{id:"bass",name:"Bass",type:"bass",pat:Array(STEPS).fill(false),notes:Array(STEPS).fill("C2"),vol:0.6,mute:false,solo:false,wf:"sawtooth"},{id:"melody",name:"Melody",type:"melody",pat:Array(STEPS).fill(false),notes:Array(STEPS).fill("C4"),vol:0.5,mute:false,solo:false,wf:"triangle"}];
  });
  const[aKeys,setAKeys]=useState(new Set());
  const[scale,setScale]=useState("pentatonic");
  const[root,setRoot]=useState("C");
  const[rec,setRec]=useState(false);
  const[recN,setRecN]=useState([]);
  const rRef=useRef([]),rSt=useRef(null);
  const[lyIn,setLyIn]=useState("");const[lyOut,setLyOut]=useState("");const[lyLd,setLyLd]=useState(false);const[lyM,setLyM]=useState("verse");
  const[selSt,setSelSt]=useState(null);
  const[stFile,setStFile]=useState(null);const[stSt,setStSt]=useState("idle");
  const[exSt,setExSt]=useState("idle");
  const schR=useRef(null),nxR=useRef(0),cuR=useRef(-1);

  const initA=useCallback(async()=>{await eng.init();if(eng.ctx?.state==="suspended")await eng.ctx.resume();},[]);
  const scN=useCallback(()=>{const ri=NN.indexOf(root);return(SC[scale]||SC.pentatonic).map(i=>NN[(ri+i)%12]);},[root,scale]);
  const inSc=useCallback(nm=>scN().includes(nm.replace(/[0-9]/g,"")),[scN]);
  const playK=useCallback(async nm=>{
    await initA();eng.playNote(nm,0.4,"triangle");
    setAKeys(p=>{const s=new Set(p);s.add(nm);return s;});
    setTimeout(()=>setAKeys(p=>{const s=new Set(p);s.delete(nm);return s;}),200);
    if(rec){const now=performance.now();if(!rSt.current)rSt.current=now;rRef.current.push({note:nm,time:now-rSt.current});}
  },[initA,rec]);

  useEffect(()=>{
    const km={};KN.forEach(k=>{km[k.k]=k.n;});
    const fn=e=>{if(e.repeat||["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName))return;const n=km[e.key.toLowerCase()];if(n){e.preventDefault();playK(n);}};
    window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn);
  },[playK]);

  const sd=useCallback(()=>60/bpm/4,[bpm]);
  const schSt=useCallback((si,time)=>{
    const k=DK[kit],hs=tracks.some(t=>t.solo);
    tracks.forEach(tr=>{if(tr.mute||(hs&&!tr.solo)||!tr.pat[si])return;
      if(tr.type==="drum"){const s=k.sounds[tr.id];if(s)eng.playDrum(s,time,tr.vol);}
      else eng.playNote(tr.notes?.[si]||"C3",sd()*.9,tr.wf||"sawtooth",time,tr.vol);
    });
  },[tracks,kit,sd]);

  const togPlay=useCallback(async()=>{
    await initA();
    if(playing){clearInterval(schR.current);setPlaying(false);setStep(-1);cuR.current=-1;return;}
    setPlaying(true);cuR.current=-1;nxR.current=eng.t()+.05;
    schR.current=setInterval(()=>{while(nxR.current<eng.t()+.1){
      cuR.current=(cuR.current+1)%STEPS;const sw=cuR.current%2===1?(swing/100)*sd()*.5:0;
      schSt(cuR.current,nxR.current+sw);setStep(cuR.current);nxR.current+=sd();
    }},25);
  },[playing,initA,schSt,sd,swing]);

  useEffect(()=>()=>clearInterval(schR.current),[]);
  const tS=useCallback((id,s)=>setTracks(p=>p.map(t=>t.id===id?{...t,pat:t.pat.map((v,i)=>i===s?!v:v)}:t)),[]);
  const sN=useCallback((id,s,n)=>setTracks(p=>p.map(t=>t.id===id?{...t,notes:t.notes.map((v,i)=>i===s?n:v),pat:t.pat.map((v,i)=>i===s?true:v)}:t)),[]);
  const sV=useCallback((id,v)=>setTracks(p=>p.map(t=>t.id===id?{...t,vol:v}:t)),[]);
  const tM=useCallback(id=>setTracks(p=>p.map(t=>t.id===id?{...t,mute:!t.mute}:t)),[]);
  const tSo=useCallback(id=>setTracks(p=>p.map(t=>t.id===id?{...t,solo:!t.solo}:t)),[]);

  const ldSt=useCallback(async st=>{
    await initA();setSelSt(st);setBpm(st.bpm);setKit(st.kit);setRoot(st.key);setScale(st.sc);
    setTracks(p=>p.map(t=>{
      if(t.type==="drum"&&st.p[t.id])return{...t,pat:st.p[t.id].map(v=>!!v)};
      if(t.id==="bass"&&st.bn)return{...t,pat:st.bn.map(()=>true),notes:[...st.bn]};return t;
    }));
  },[initA]);

  const startR=useCallback(()=>{rRef.current=[];rSt.current=null;setRec(true);setRecN([]);},[]);
  const stopR=useCallback(()=>{
    setRec(false);const ns=rRef.current;if(!ns.length)return;
    const tot=ns[ns.length-1].time,sdu=tot/STEPS,q=Array(STEPS).fill(null);
    ns.forEach(n=>{const s=Math.min(Math.floor(n.time/sdu),STEPS-1);if(!q[s])q[s]=n.note;});
    setRecN(ns);
    setTracks(p=>p.map(t=>t.id==="melody"?{...t,pat:q.map(n=>n!==null),notes:q.map((n,i)=>n||t.notes[i])}:t));
  },[]);

  const expW=useCallback(async()=>{
    setExSt("rendering");try{
      await initA();const sdu=60/bpm/4,dur=sdu*STEPS*4+.5;
      const oc=new OfflineAudioContext(2,44100*dur,44100);
      const comp=oc.createDynamicsCompressor();comp.threshold.value=-20;comp.ratio.value=4;
      const mg=oc.createGain();mg.gain.value=vol/100;comp.connect(mg);mg.connect(oc.destination);
      const k=DK[kit],hs=tracks.some(t=>t.solo);
      for(let lp=0;lp<4;lp++)for(let si=0;si<STEPS;si++){const time=(lp*STEPS+si)*sdu;
        tracks.forEach(tr=>{if(tr.mute||(hs&&!tr.solo)||!tr.pat[si])return;
          if(tr.type==="drum"){const s=k.sounds[tr.id];if(s)eng.drum(oc,comp,s,time,tr.vol);}
          else eng.note(oc,comp,tr.notes?.[si]||"C3",sdu*.9,tr.wf||"sawtooth",time,tr.vol);
        });
      }
      const buf=await oc.startRendering(),blob=eng.wav(buf),url=URL.createObjectURL(blob);
      const a=document.createElement("a");a.href=url;a.download=`trubblenbass-${Date.now()}.wav`;a.click();
      URL.revokeObjectURL(url);setExSt("done");setTimeout(()=>setExSt("idle"),3000);
    }catch(e){console.error(e);setExSt("error");setTimeout(()=>setExSt("idle"),3000);}
  },[bpm,tracks,kit,vol,initA]);

  const clrAll=useCallback(()=>{
    setTracks(p=>p.map(t=>({...t,pat:Array(STEPS).fill(false),...(t.notes?{notes:Array(STEPS).fill(t.id==="bass"?"C2":"C4")}:{})})));
    setStep(-1);setSelSt(null);
  },[]);
  useEffect(()=>{if(eng.mg)eng.mg.gain.value=vol/100;},[vol]);

  const genLy=useCallback(async()=>{
    if(!lyIn.trim())return;setLyLd(true);await new Promise(r=>setTimeout(r,1200));
    const st=selSt,bi=st?`\nAt ${st.bpm} BPM, each bar = ${(60/st.bpm*4).toFixed(1)}s`:"";
    const o={
      verse:`[Verse \u2014 ${st?.nm||"your style"}]\nTheme: "${lyIn}"\n\n\u2501 Structure \u2501\nLine 1: Set the scene\nLine 2: The feeling\nLine 3: The turn\nLine 4: Hook setup${bi}\n\n\u2501 Uncle Winston \u2501\n"Write what you know. The best lyrics come from your own street."`,
      chorus:`[Chorus \u2014 ${st?.nm||"your style"}]\nTheme: "${lyIn}"\n\n\u2501 Structure \u2501\nLine 1: THE HOOK\nLine 2: Expand\nLine 3: Contrast\nLine 4: Return to hook${bi}\n\n\u2501 Uncle Winston \u2501\n"If you can't remember your own chorus, neither will anyone else."`,
      bridge:`[Bridge]\nTheme: "${lyIn}"\n\nBreak the pattern. 2-4 lines that change perspective.\n\n\u2501 Uncle Winston \u2501\n"The bridge is where you say what you've been afraid to say."`,
    };setLyOut(o[lyM]||o.verse);setLyLd(false);
  },[lyIn,lyM,selSt]);

  const sno=scN();const dk=DK[kit];
  const tb=(a)=>({background:a?X.s2:"transparent",border:`1px solid ${a?X.ac:X.br}`,color:a?X.tx:X.td,padding:"6px 10px",borderRadius:"5px",cursor:"pointer",fontSize:"11px",boxShadow:a?`0 0 10px ${X.ag}`:"none"});
  const sl={width:"80px",accentColor:X.ac,height:"4px"};
  const se={background:X.s3,color:X.tx,border:`1px solid ${X.br}`,borderRadius:"4px",padding:"4px 8px",fontSize:"11px"};

  return(
    <div style={{fontFamily:"'JetBrains Mono',monospace",background:`linear-gradient(180deg,${X.bg},#0d0d18)`,color:X.tx,minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderBottom:`1px solid ${X.br}`,background:X.s1,flexWrap:"wrap",gap:"10px"}}>
        <div>
          <h1 style={{margin:0,fontSize:"22px",letterSpacing:"2px"}}><span style={{color:X.ac,fontWeight:800}}>Trubble</span><span style={{color:X.tm,fontSize:"14px",fontStyle:"italic"}}> n </span><span style={{color:X.bs,fontWeight:800}}>Bass</span><span style={{color:X.sl,fontSize:"10px",border:`1px solid ${X.sl}`,padding:"1px 5px",borderRadius:"3px",marginLeft:"8px",letterSpacing:"2px"}}>PRO</span></h1>
          <p style={{margin:0,fontSize:"10px",color:X.tm}}>Production Suite — Wembley Wonders CIC</p>
        </div>
        <nav style={{display:"flex",gap:"3px"}}>
          {[["studio","\ud83c\udfda\ufe0f Studio"],["keys","\ud83c\udfb9 Keys"],["styles","\ud83d\udcda Styles"],["lyrics","\u270d\ufe0f Lyrics"],["stems","\ud83d\udd2c Stems"]].map(([id,lb])=>
            <button key={id} onClick={()=>setTab(id)} style={tb(tab===id)}>{lb}</button>
          )}
        </nav>
      </header>
      {/* Transport */}
      <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 20px",background:X.s2,borderBottom:`1px solid ${X.br}`,flexWrap:"wrap"}}>
        <button onClick={togPlay} style={{width:"40px",height:"40px",borderRadius:"50%",border:`2px solid ${playing?X.dn:X.ac}`,background:playing?X.dn:"transparent",color:playing?X.wh:X.ac,fontSize:"16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{playing?"\u23f9":"\u25b6"}</button>
        <button onClick={clrAll} style={{...se,cursor:"pointer"}}>Clear</button>
        <div style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"10px",color:X.td}}><span>BPM</span><input type="range" min={60} max={180} value={bpm} onChange={e=>setBpm(+e.target.value)} style={sl}/><span style={{color:X.tx,minWidth:"28px"}}>{bpm}</span></div>
        <div style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"10px",color:X.td}}><span>Swing</span><input type="range" min={0} max={80} value={swing} onChange={e=>setSwing(+e.target.value)} style={sl}/><span style={{color:X.tx}}>{swing}%</span></div>
        <div style={{display:"flex",alignItems:"center",gap:"4px",fontSize:"10px",color:X.td}}><span>Vol</span><input type="range" min={0} max={100} value={vol} onChange={e=>setVol(+e.target.value)} style={sl}/><span style={{color:X.tx}}>{vol}%</span></div>
        <select value={kit} onChange={e=>setKit(e.target.value)} style={se}>{Object.entries(DK).map(([id,k])=><option key={id} value={id}>{k.name}</option>)}</select>
        <button onClick={expW} disabled={exSt==="rendering"} style={{padding:"6px 14px",borderRadius:"5px",border:`1px solid ${exSt==="rendering"?"#333":X.bs}`,background:"transparent",color:exSt==="rendering"?X.td:X.bs,fontSize:"11px",cursor:exSt==="rendering"?"wait":"pointer"}}>{exSt==="rendering"?"\u23f3 Rendering...":exSt==="done"?"\u2705 Saved!":"\ud83d\udcbe Export WAV"}</button>
      </div>
      {/* Step dots */}
      <div style={{display:"flex",gap:"2px",padding:"4px 20px",background:X.s1}}>{Array.from({length:STEPS},(_,i)=><div key={i} style={{flex:1,height:"6px",borderRadius:"3px",background:i===step?X.ac:i%4===0?X.s3:X.s2,transition:"background 0.05s",fontSize:"8px",textAlign:"center",color:X.td,lineHeight:"6px"}}>{i%4===0?i/4+1:""}</div>)}</div>

      {/* STUDIO TAB */}
      {tab==="studio"&&<div style={{flex:1,overflow:"auto",padding:"8px 20px"}}>
        {tracks.map(tr=><div key={tr.id} style={{display:"flex",alignItems:"center",gap:"6px",padding:"3px 0",opacity:tr.mute?0.4:1}}>
          <div style={{width:"90px",flexShrink:0}}>
            <div style={{fontSize:"11px",fontWeight:600,color:tr.type==="drum"?X.ac:tr.type==="bass"?X.bs:X.ml}}>{tr.name}</div>
            <div style={{display:"flex",gap:"2px",marginTop:"2px"}}>
              <button onClick={()=>tM(tr.id)} style={{width:"18px",height:"16px",fontSize:"8px",border:`1px solid ${tr.mute?X.dn:X.br}`,background:tr.mute?X.dn:"transparent",color:tr.mute?X.wh:X.td,borderRadius:"2px",cursor:"pointer"}}>M</button>
              <button onClick={()=>tSo(tr.id)} style={{width:"18px",height:"16px",fontSize:"8px",border:`1px solid ${tr.solo?X.sl:X.br}`,background:tr.solo?X.sl:"transparent",color:tr.solo?"#000":X.td,borderRadius:"2px",cursor:"pointer"}}>S</button>
              <input type="range" min={0} max={1} step={0.05} value={tr.vol} onChange={e=>sV(tr.id,+e.target.value)} style={{width:"50px",accentColor:X.td,height:"3px"}}/>
            </div>
          </div>
          <div style={{display:"flex",gap:"2px",flex:1}}>
            {tr.pat.map((on,si)=>{const col=tr.type==="drum"?X.ac:tr.type==="bass"?X.bs:X.ml;
              return<button key={si} onClick={async()=>{await initA();tS(tr.id,si);if(!on){if(tr.type==="drum"){const s=dk.sounds[tr.id];if(s)eng.playDrum(s,undefined,tr.vol);}else eng.playNote(tr.notes?.[si]||"C3",.2,tr.wf||"sawtooth",undefined,tr.vol);}}}
                style={{flex:1,height:"28px",border:"none",borderRadius:"3px",cursor:"pointer",background:on?col:si%4===0?X.s3:X.s2,opacity:on?1:0.6,boxShadow:si===step?`inset 0 0 0 2px ${X.wh}`:on?`0 0 6px ${col}40`:"none",fontSize:"8px",color:on?X.wh:X.tm,display:"flex",alignItems:"center",justifyContent:"center"}}>{on&&tr.type!=="drum"?tr.notes?.[si]?.replace(/[0-9]/g,""):""}</button>;})}
          </div>
        </div>)}
        <div style={{marginTop:"12px",padding:"10px",background:X.s1,borderRadius:"6px",border:`1px solid ${X.br}`}}>
          <div style={{fontSize:"11px",color:X.td,marginBottom:"6px"}}>Note Editor — Bass & Melody</div>
          {tracks.filter(t=>t.type!=="drum").map(tr=><div key={tr.id} style={{display:"flex",alignItems:"center",gap:"4px",marginBottom:"4px"}}>
            <span style={{width:"56px",fontSize:"10px",color:tr.id==="bass"?X.bs:X.ml,fontWeight:600}}>{tr.name}</span>
            <div style={{display:"flex",gap:"1px",flex:1,overflow:"auto"}}>
              {tr.notes?.map((n,si)=><select key={si} value={n} onChange={e=>sN(tr.id,si,e.target.value)}
                style={{width:"42px",padding:"2px",fontSize:"9px",background:tr.pat[si]?(tr.id==="bass"?`${X.bs}22`:`${X.ml}22`):X.s2,color:X.tx,border:`1px solid ${si===step?X.wh:X.br}`,borderRadius:"2px"}}>
                {AN.filter(x=>{const o=+x.name.slice(-1);return tr.id==="bass"?o>=1&&o<=3:o>=3&&o<=5;}).map(x=><option key={x.name} value={x.name}>{x.name}{inSc(x.name)?" \u25cf":""}</option>)}
              </select>)}
            </div>
          </div>)}
        </div>
      </div>}

      {/* KEYS TAB */}
      {tab==="keys"&&<div style={{flex:1,padding:"16px 20px",display:"flex",flexDirection:"column",gap:"12px"}}>
        <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          <div style={{display:"flex",gap:"6px",alignItems:"center",fontSize:"11px",color:X.td}}>
            <span>Root:</span><select value={root} onChange={e=>setRoot(e.target.value)} style={se}>{NN.map(n=><option key={n}>{n}</option>)}</select>
            <span>Scale:</span><select value={scale} onChange={e=>setScale(e.target.value)} style={se}>{Object.keys(SC).map(s=><option key={s} value={s}>{s[0].toUpperCase()+s.slice(1)}</option>)}</select>
          </div>
          <div style={{display:"flex",gap:"6px"}}>
            {!rec?<button onClick={startR} style={{padding:"6px 14px",borderRadius:"5px",border:`1px solid ${X.rc}`,background:"transparent",color:X.rc,fontSize:"11px",cursor:"pointer"}}>{"\u23fa"} Record</button>
            :<button onClick={stopR} style={{padding:"6px 14px",borderRadius:"5px",border:`1px solid ${X.rc}`,background:X.rc,color:X.wh,fontSize:"11px",cursor:"pointer"}}>{"\u23f9"} Stop \u2192 Melody</button>}
            {recN.length>0&&<span style={{fontSize:"10px",color:X.bs}}>{"\u2705"} {recN.length} notes applied</span>}
          </div>
        </div>
        <div style={{padding:"8px 12px",background:X.s1,borderRadius:"5px",fontSize:"11px"}}>
          <span style={{color:X.ml,fontWeight:600}}>{root} {scale}:</span> <span>{sno.join(" \u2014 ")}</span>
          <span style={{color:X.tm,marginLeft:"12px"}}>Keys: A\u2013' \u2022 Space=play</span>
        </div>
        <div style={{display:"flex",position:"relative",height:"180px",justifyContent:"center",gap:"1px"}}>
          {KN.filter(k=>k.w).map((kn,wi)=>{
            const ins=sno.includes(kn.n.replace(/[0-9]/g,""));const act=aKeys.has(kn.n);
            return<button key={kn.n} onMouseDown={()=>playK(kn.n)} style={{width:"48px",height:"180px",border:`1px solid ${X.br}`,borderRadius:"0 0 6px 6px",cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",paddingBottom:"8px",gap:"4px",background:act?X.ml:ins?`linear-gradient(180deg,#1a1a2e,${X.ml}15)`:X.s2,color:act?X.wh:ins?X.ml:X.td,boxShadow:act?`0 0 16px ${X.ml}55`:"none",transition:"all 0.1s",zIndex:1}}>
              <span style={{fontSize:"10px",fontWeight:600}}>{kn.n}</span>
              <span style={{fontSize:"8px",opacity:0.5}}>{kn.k.toUpperCase()}</span>
            </button>;
          })}
          {KN.filter(k=>!k.w).map(kn=>{
            const ins=sno.includes(kn.n.replace(/[0-9]/g,""));const act=aKeys.has(kn.n);
            const wIdx=KN.filter(x=>x.w).findIndex(x=>{const xi=KN.indexOf(x);const bi=KN.indexOf(kn);return xi===bi-1;});
            return<button key={kn.n} onMouseDown={()=>playK(kn.n)} style={{width:"30px",height:"110px",position:"absolute",zIndex:2,border:"none",borderRadius:"0 0 4px 4px",cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",paddingBottom:"6px",left:`${wIdx*49+34}px`,background:act?"#9966ff":ins?`linear-gradient(180deg,#0a0a18,${X.ml}30)`:"#0a0a18",color:act?X.wh:ins?X.ml:X.tm,transition:"all 0.1s"}}>
              <span style={{fontSize:"8px"}}>{kn.n}</span>
              <span style={{fontSize:"7px",opacity:0.5}}>{kn.k.toUpperCase()}</span>
            </button>;
          })}
        </div>
        <div style={{padding:"10px",background:X.s1,borderRadius:"5px",fontSize:"11px",color:X.td}}>
          <strong style={{color:X.ac}}>Uncle Winston:</strong> "Pick a scale, find the root ({root}). The fifth ({sno[4]||sno[3]||"?"}) is your best friend. Start there."
        </div>
      </div>}

      {/* STYLES TAB */}
      {tab==="styles"&&<div style={{flex:1,overflow:"auto",padding:"16px 20px"}}>
        <div style={{marginBottom:"16px"}}>
          <h2 style={{margin:0,fontSize:"18px"}}>Style Reference Library</h2>
          <p style={{margin:"4px 0 0",fontSize:"12px",color:X.td,fontStyle:"italic"}}>"Any producer can copy a beat. A MUSICIAN understands WHY it works."</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:"12px"}}>
          {SR.map(st=><div key={st.id} style={{padding:"14px",background:selSt?.id===st.id?X.s3:X.s1,borderRadius:"8px",border:`1px solid ${selSt?.id===st.id?X.ac:X.br}`,boxShadow:selSt?.id===st.id?`0 0 15px ${X.ag}`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h3 style={{margin:0,fontSize:"16px",color:X.ac}}>{st.nm}</h3>
              <span style={{fontSize:"11px",color:X.bs,fontWeight:600}}>{st.bpm} BPM</span>
            </div>
            <div style={{fontSize:"10px",color:X.td,margin:"4px 0"}}>{st.art}</div>
            <p style={{fontSize:"11px",margin:"6px 0",lineHeight:"1.5"}}>{st.desc}</p>
            <div style={{display:"flex",gap:"10px",fontSize:"10px",color:X.tm,margin:"6px 0"}}>
              <span>Key: {st.key}</span><span>Scale: {st.sc}</span><span>Kit: {DK[st.kit]?.name}</span>
            </div>
            <button onClick={()=>ldSt(st)} style={{width:"100%",padding:"8px",borderRadius:"5px",border:`1px solid ${selSt?.id===st.id?X.bs:X.ac}`,background:selSt?.id===st.id?`${X.bs}20`:"transparent",color:selSt?.id===st.id?X.bs:X.ac,fontSize:"12px",cursor:"pointer",fontWeight:600,marginBottom:"8px"}}>
              {selSt?.id===st.id?"\u2705 Loaded \u2014 go to Studio":"Load Pattern"}
            </button>
            <div style={{padding:"10px",background:`${X.bg}80`,borderRadius:"5px",border:`1px solid ${X.br}`}}>
              <div style={{fontSize:"10px",color:X.sl,fontWeight:600,marginBottom:"4px"}}>THE LESSON</div>
              <p style={{fontSize:"11px",margin:0,lineHeight:"1.5"}}>{st.ls}</p>
            </div>
          </div>)}
        </div>
      </div>}

      {/* LYRICS TAB */}
      {tab==="lyrics"&&<div style={{flex:1,padding:"16px 20px",maxWidth:"700px",margin:"0 auto",width:"100%"}}>
        <h2 style={{margin:0,fontSize:"18px"}}>Maya Lyrics Assistant</h2>
        <p style={{fontSize:"12px",color:X.td,margin:"4px 0 16px"}}>Tell Maya your theme. She helps you structure it \u2014 grounded in your story.</p>
        <div style={{display:"flex",gap:"4px",marginBottom:"10px"}}>
          {["verse","chorus","bridge"].map(m=><button key={m} onClick={()=>setLyM(m)} style={{padding:"6px 16px",borderRadius:"5px",border:`1px solid ${lyM===m?X.ml:X.br}`,background:lyM===m?`${X.ml}20`:"transparent",color:lyM===m?X.ml:X.td,fontSize:"12px",cursor:"pointer"}}>{m[0].toUpperCase()+m.slice(1)}</button>)}
        </div>
        <textarea value={lyIn} onChange={e=>setLyIn(e.target.value)} rows={4} placeholder="What do you want to write about? Your neighbourhood, a feeling, a memory..." style={{width:"100%",padding:"12px",background:X.s1,border:`1px solid ${X.br}`,borderRadius:"6px",color:X.tx,fontSize:"13px",fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}}/>
        <button onClick={genLy} disabled={lyLd||!lyIn.trim()} style={{marginTop:"8px",width:"100%",padding:"10px",borderRadius:"5px",border:`1px solid ${lyLd?X.br:X.ml}`,background:lyLd?X.s2:`${X.ml}15`,color:lyLd?X.td:X.ml,fontSize:"13px",cursor:lyLd?"wait":"pointer",fontWeight:600}}>
          {lyLd?"Maya is thinking...":`Structure my ${lyM}`}
        </button>
        {selSt&&<div style={{marginTop:"8px",padding:"6px 10px",background:X.s1,borderRadius:"4px",fontSize:"10px",color:X.td}}>Writing for: <strong style={{color:X.ac}}>{selSt.nm}</strong> at {selSt.bpm} BPM in {selSt.key} {selSt.sc}</div>}
        {lyOut&&<div style={{marginTop:"12px",padding:"14px",background:X.s1,borderRadius:"6px",border:`1px solid ${X.br}`}}>
          <pre style={{margin:0,whiteSpace:"pre-wrap",fontSize:"12px",lineHeight:"1.6",color:X.tx,fontFamily:"inherit"}}>{lyOut}</pre>
          <button onClick={()=>navigator.clipboard?.writeText(lyOut)} style={{marginTop:"8px",padding:"4px 12px",borderRadius:"4px",border:`1px solid ${X.br}`,background:"transparent",color:X.td,fontSize:"10px",cursor:"pointer"}}>Copy</button>
        </div>}
        <div style={{marginTop:"16px",padding:"10px",background:X.s1,borderRadius:"5px",fontSize:"11px",color:X.tm}}>
          <strong>Note:</strong> This is structured guidance for YOUR lyrics. When Maya connects to the full API, she'll offer real-time rhyme suggestions and syllable counting matched to your BPM.
        </div>
      </div>}

      {/* STEMS TAB */}
      {tab==="stems"&&<div style={{flex:1,padding:"16px 20px"}}>
        <h2 style={{margin:0,fontSize:"18px"}}>Stem Separation</h2>
        <p style={{fontSize:"12px",color:X.td,margin:"4px 0 16px"}}>Upload any track, pull it apart into drums / bass / vocals / other. Understand how pro tracks are assembled.</p>
        <div style={{padding:"24px",background:X.s1,borderRadius:"8px",border:`2px dashed ${X.br}`,textAlign:"center"}}>
          <input type="file" accept="audio/*" onChange={e=>{const f=e.target.files?.[0];if(f){setStFile(f);setStSt("ready");}}} style={{display:"none"}} id="stem-up"/>
          <label htmlFor="stem-up" style={{cursor:"pointer",display:"block"}}>
            {stFile?<><div style={{fontSize:"14px"}}>{stFile.name}</div><div style={{fontSize:"11px",color:X.td}}>{(stFile.size/1024/1024).toFixed(1)} MB</div></>
            :<><div style={{fontSize:"32px",marginBottom:"8px"}}>🎵</div><div style={{fontSize:"13px"}}>Drop audio here or click to browse</div><div style={{fontSize:"10px",color:X.tm,marginTop:"4px"}}>MP3, WAV, M4A — Max 25MB</div></>}
          </label>
        </div>
        {stFile&&<button onClick={()=>{setStSt("processing");setTimeout(()=>setStSt("demo"),3000);}} disabled={stSt==="processing"} style={{marginTop:"12px",width:"100%",padding:"10px",borderRadius:"5px",border:`1px solid ${stSt==="processing"?X.br:X.ac}`,background:"transparent",color:stSt==="processing"?X.td:X.ac,fontSize:"13px",cursor:stSt==="processing"?"wait":"pointer",fontWeight:600}}>
          {stSt==="processing"?"Separating...":"Separate Stems"}
        </button>}
        {stSt==="demo"&&<div style={{marginTop:"16px"}}>
          <p style={{fontSize:"11px",color:X.sl,marginBottom:"12px"}}>Demo mode — full separation requires Demucs backend. Contact admin@wembleywonders.org</p>
          {["\ud83e\udd41 Drums","\ud83c\udfb8 Bass","\ud83c\udfa4 Vocals","\ud83c\udfb9 Other"].map(s=><div key={s} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px",background:X.s1,borderRadius:"5px",marginBottom:"4px",border:`1px solid ${X.br}`}}>
            <span style={{width:"80px",fontSize:"12px"}}>{s}</span>
            <div style={{flex:1,display:"flex",gap:"1px",alignItems:"end",height:"40px"}}>
              {Array.from({length:50},(_,i)=><div key={i} style={{flex:1,background:X.ac,borderRadius:"1px",height:`${15+Math.random()*70}%`,opacity:0.6}}/>)}
            </div>
            <button style={{padding:"4px 8px",borderRadius:"3px",border:`1px solid ${X.br}`,background:"transparent",color:X.td,fontSize:"10px",cursor:"pointer"}}>{"\ud83d\udcbe"}</button>
          </div>)}
          <div style={{marginTop:"12px",padding:"10px",background:X.s1,borderRadius:"5px",fontSize:"11px",color:X.td}}>
            <strong style={{color:X.sl}}>What to listen for:</strong> Solo each stem. Drums carry energy, bass carries weight, vocals carry emotion. When your beats sound muddy, these layers are fighting for the same frequency space.
          </div>
        </div>}
        {stSt==="idle"&&<div style={{marginTop:"16px",display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"10px"}}>
          {[["For Elders","You spent years training your ears. Now show youth exactly what you hear \u2014 isolated drums, solo bass, naked vocals."],
            ["For Youth","Take your favourite track apart. Study the hi-hat patterns. Go from 'it sounds good' to 'I know WHY.'"],
            ["For Rayd-yo","Need an instrumental for a jingle? Separate the vocals. Want drums for a podcast bed? Extract them."]
          ].map(([t,d])=><div key={t} style={{padding:"12px",background:X.s1,borderRadius:"6px",border:`1px solid ${X.br}`}}>
            <h4 style={{margin:"0 0 6px",fontSize:"12px",color:X.ac}}>{t}</h4>
            <p style={{margin:0,fontSize:"11px",lineHeight:"1.5",color:X.td}}>{d}</p>
          </div>)}
        </div>}
      </div>}

      {/* Footer */}
      <footer style={{padding:"10px 20px",borderTop:`1px solid ${X.br}`,background:X.s1,display:"flex",justifyContent:"space-between",fontSize:"10px",color:X.tm,flexWrap:"wrap"}}>
        <span>Trubble n Bass PRO — Wembley Wonders CIC</span>
        <span>Rayd-yo Ready \u2022 Maya Powered \u2022 Learn \u2192 Create \u2192 Share</span>
      </footer>
    </div>
  );
}