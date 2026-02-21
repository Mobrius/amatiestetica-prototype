import { initImages } from "./animations.js";
import { initAnimations } from "./animations.js";

initImages();
initAnimations();

// Smooth anchor scrolling (senza librerie)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const el = document.querySelector(href);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const form = document.getElementById("bookingForm");
const msg = document.getElementById("formMsg");
const btn = document.getElementById("formSubmitBtn");

function setMsg(text, kind){
  if(!msg) return;
  msg.textContent = text || "";
  msg.classList.remove("ok","err");
  if(kind) msg.classList.add(kind);
}

function getFormData(formEl){
  const data = Object.fromEntries(new FormData(formEl).entries());
  // checkbox -> boolean
  data.privacy = !!formEl.querySelector('input[name="privacy"]').checked;
  // timestamp
  data.createdAt = new Date().toISOString();
  return data;
}

// Placeholder: simula invio (in futuro qui metti Firebase)
async function fakeSubmit(payload){
  await new Promise(r => setTimeout(r, 650));
  // qui potresti fare console.log(payload) per debug
  return { ok: true };
}

if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setMsg("");

    // Validazione HTML5
    if(!form.checkValidity()){
      form.reportValidity();
      setMsg("Controlla i campi obbligatori e riprova.", "err");
      return;
    }

    const payload = getFormData(form);

    try{
      btn.disabled = true;
      btn.textContent = "Invio…";

      const res = await fakeSubmit(payload);

      if(res && res.ok){
        form.reset();
        setMsg("Richiesta inviata! Ti ricontatteremo a breve.", "ok");
      }else{
        setMsg("Invio non riuscito. Riprova tra poco.", "err");
      }
    }catch(err){
      console.error(err);
      setMsg("Errore di rete. Riprova tra poco.", "err");
    }finally{
      btn.disabled = false;
      btn.textContent = "Invia richiesta";
    }
  });
}