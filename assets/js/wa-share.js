/* ═══════════════════════════════════════════════════════════════
   DocForm — WhatsApp Share Module
   wa-share.js  ·  v1.0.0
   ─────────────────────────────────────────────────────────────── */

/* ── 1. COUNTRIES DATABASE ───────────────────────────────────── */
const WA_COUNTRIES = [
  { f:"🇧🇷", n:"Brasil",           d:"+55",  c:"BR", mask:"(##) #####-####", digits:[10,11] },
  { f:"🇵🇹", n:"Portugal",         d:"+351", c:"PT", mask:"### ### ###",     digits:[9]     },
  { f:"🇦🇴", n:"Angola",           d:"+244", c:"AO", mask:"### ### ###",     digits:[9]     },
  { f:"🇲🇿", n:"Moçambique",       d:"+258", c:"MZ", mask:"## ### ####",     digits:[9]     },
  { f:"🇨🇻", n:"Cabo Verde",       d:"+238", c:"CV", mask:"### ## ##",       digits:[7]     },
  { f:"🇸🇹", n:"São Tomé",         d:"+239", c:"ST", mask:"## #####",        digits:[7]     },
  { f:"🇺🇸", n:"EUA",              d:"+1",   c:"US", mask:"(###) ###-####",  digits:[10]    },
  { f:"🇨🇦", n:"Canadá",           d:"+1",   c:"CA", mask:"(###) ###-####",  digits:[10]    },
  { f:"🇲🇽", n:"México",           d:"+52",  c:"MX", mask:"## #### ####",    digits:[10]    },
  { f:"🇦🇷", n:"Argentina",        d:"+54",  c:"AR", mask:"## ####-####",    digits:[10]    },
  { f:"🇨🇱", n:"Chile",            d:"+56",  c:"CL", mask:"# #### ####",     digits:[9]     },
  { f:"🇨🇴", n:"Colômbia",         d:"+57",  c:"CO", mask:"### #######",     digits:[10]    },
  { f:"🇵🇪", n:"Peru",             d:"+51",  c:"PE", mask:"### ### ###",     digits:[9]     },
  { f:"🇻🇪", n:"Venezuela",        d:"+58",  c:"VE", mask:"### #######",     digits:[10]    },
  { f:"🇪🇨", n:"Equador",          d:"+593", c:"EC", mask:"## ### ####",     digits:[9]     },
  { f:"🇧🇴", n:"Bolívia",          d:"+591", c:"BO", mask:"########",        digits:[8]     },
  { f:"🇵🇾", n:"Paraguai",         d:"+595", c:"PY", mask:"## #######",      digits:[9]     },
  { f:"🇺🇾", n:"Uruguai",          d:"+598", c:"UY", mask:"## ### ####",     digits:[8]     },
  { f:"🇬🇧", n:"Reino Unido",      d:"+44",  c:"GB", mask:"#### ### ####",   digits:[10]    },
  { f:"🇩🇪", n:"Alemanha",         d:"+49",  c:"DE", mask:"### ## ######",   digits:[10,11] },
  { f:"🇫🇷", n:"França",           d:"+33",  c:"FR", mask:"# ## ## ## ##",   digits:[9]     },
  { f:"🇪🇸", n:"Espanha",          d:"+34",  c:"ES", mask:"### ### ###",     digits:[9]     },
  { f:"🇮🇹", n:"Itália",           d:"+39",  c:"IT", mask:"### ### ####",    digits:[10]    },
  { f:"🇳🇱", n:"Holanda",          d:"+31",  c:"NL", mask:"# ## ### ####",   digits:[9]     },
  { f:"🇧🇪", n:"Bélgica",          d:"+32",  c:"BE", mask:"### ## ## ##",    digits:[9]     },
  { f:"🇨🇭", n:"Suíça",            d:"+41",  c:"CH", mask:"## ### ## ##",    digits:[9]     },
  { f:"🇦🇹", n:"Áustria",          d:"+43",  c:"AT", mask:"### ######",      digits:[10]    },
  { f:"🇸🇪", n:"Suécia",           d:"+46",  c:"SE", mask:"##-### ## ##",    digits:[9]     },
  { f:"🇳🇴", n:"Noruega",          d:"+47",  c:"NO", mask:"### ## ###",      digits:[8]     },
  { f:"🇩🇰", n:"Dinamarca",        d:"+45",  c:"DK", mask:"## ## ## ##",     digits:[8]     },
  { f:"🇫🇮", n:"Finlândia",        d:"+358", c:"FI", mask:"## ### ####",     digits:[9]     },
  { f:"🇵🇱", n:"Polônia",          d:"+48",  c:"PL", mask:"### ### ###",     digits:[9]     },
  { f:"🇷🇺", n:"Rússia",           d:"+7",   c:"RU", mask:"(###) ###-##-##", digits:[10]    },
  { f:"🇺🇦", n:"Ucrânia",          d:"+380", c:"UA", mask:"## ### ####",     digits:[9]     },
  { f:"🇹🇷", n:"Turquia",          d:"+90",  c:"TR", mask:"### ### ####",    digits:[10]    },
  { f:"🇮🇱", n:"Israel",           d:"+972", c:"IL", mask:"##-### ####",     digits:[9]     },
  { f:"🇸🇦", n:"Arábia Saudita",   d:"+966", c:"SA", mask:"## ### ####",     digits:[9]     },
  { f:"🇦🇪", n:"Emirados Árabes",  d:"+971", c:"AE", mask:"## ### ####",     digits:[9]     },
  { f:"🇮🇳", n:"Índia",            d:"+91",  c:"IN", mask:"##### #####",     digits:[10]    },
  { f:"🇨🇳", n:"China",            d:"+86",  c:"CN", mask:"### #### ####",   digits:[11]    },
  { f:"🇯🇵", n:"Japão",            d:"+81",  c:"JP", mask:"##-####-####",    digits:[10]    },
  { f:"🇰🇷", n:"Coreia do Sul",    d:"+82",  c:"KR", mask:"##-####-####",    digits:[10]    },
  { f:"🇸🇬", n:"Singapura",        d:"+65",  c:"SG", mask:"#### ####",       digits:[8]     },
  { f:"🇲🇾", n:"Malásia",          d:"+60",  c:"MY", mask:"##-#### ####",    digits:[9,10]  },
  { f:"🇮🇩", n:"Indonésia",        d:"+62",  c:"ID", mask:"###-###-####",    digits:[9,12]  },
  { f:"🇹🇭", n:"Tailândia",        d:"+66",  c:"TH", mask:"##-### ####",     digits:[9]     },
  { f:"🇵🇭", n:"Filipinas",        d:"+63",  c:"PH", mask:"### ### ####",    digits:[10]    },
  { f:"🇦🇺", n:"Austrália",        d:"+61",  c:"AU", mask:"#### ### ###",    digits:[9]     },
  { f:"🇳🇿", n:"Nova Zelândia",    d:"+64",  c:"NZ", mask:"## ### ####",     digits:[9]     },
  { f:"🇿🇦", n:"África do Sul",    d:"+27",  c:"ZA", mask:"## ### ####",     digits:[9]     },
  { f:"🇳🇬", n:"Nigéria",          d:"+234", c:"NG", mask:"### ### ####",    digits:[10]    },
  { f:"🇰🇪", n:"Quênia",           d:"+254", c:"KE", mask:"### ### ###",     digits:[9]     },
  { f:"🇬🇭", n:"Gana",             d:"+233", c:"GH", mask:"## ### ####",     digits:[9]     },
  { f:"🇪🇬", n:"Egito",            d:"+20",  c:"EG", mask:"### ### ####",    digits:[10]    },
];

/* ── 2. STATE ────────────────────────────────────────────────── */
const _WA = {
  country    : WA_COUNTRIES[0],   // BR pré-selecionado
  docType    : null,              // 'contrato' | 'cv' | 'email'
  docTitle   : '',
  fmt        : 'pdf',            // 'pdf' | 'docx' — padrão PDF (Gov.br)
  ddOpen     : false,
  valid      : false,
};

/* ── 3. FORMAT SELECTOR ──────────────────────────────────────── */
/**
 * Alterna entre PDF e DOCX.
 * PDF é sempre prioritário para compatibilidade com Gov.br / ICP-Brasil.
 */
function waSelectFormat(fmt) {
  _WA.fmt = fmt;

  /* Pills — acende o selecionado, apaga o outro */
  const pdfPill  = document.getElementById('wa-fmt-pdf');
  const docxPill = document.getElementById('wa-fmt-docx');
  if (!pdfPill || !docxPill) return;

  pdfPill.classList.toggle('active', fmt === 'pdf');
  pdfPill.setAttribute('aria-pressed', fmt === 'pdf');
  docxPill.classList.toggle('active', fmt === 'docx');
  docxPill.setAttribute('aria-pressed', fmt === 'docx');

  /* Badge no pill de nome do arquivo */
  const typeEl = document.getElementById('wa-pill-type');
  if (typeEl) {
    typeEl.textContent = fmt.toUpperCase();
    typeEl.className   = `wa-doc-pill-type ${fmt}`;
  }

  /* Nota Gov.br — visível apenas quando PDF selecionado */
  const govNote = document.getElementById('wa-govbr-note');
  if (govNote) govNote.style.display = fmt === 'pdf' ? '' : 'none';

  /* Atualiza hint do método (DOCX não suporta Web Share nativo no iOS) */
  _waUpdateMethodHint();
}

/* ── 4. ICON SVG ─────────────────────────────────────────────── */
const WA_SVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;

/* ── 4. BUILD MODAL HTML (injetado uma vez no DOM) ───────────── */
function _waInjectModal() {
  if (document.getElementById('wa-modal-overlay')) return;

  const html = `
<div id="wa-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="wa-modal-title"
     onclick="if(event.target===this)waModalClose()">
  <div class="wa-modal">

    <!-- Header -->
    <div class="wa-modal-hdr">
      <div class="wa-modal-hdr-left">
        <div class="wa-modal-hdr-icon">${WA_SVG}</div>
        <div>
          <div class="wa-modal-title" id="wa-modal-title">Enviar via WhatsApp</div>
          <div class="wa-modal-sub" id="wa-modal-sub">—</div>
        </div>
      </div>
      <button class="wa-modal-close" onclick="waModalClose()" aria-label="Fechar">✕</button>
    </div>

    <!-- Body (form) -->
    <div class="wa-modal-body" id="wa-modal-body">

      <!-- Doc pill + format selector -->
      <div class="wa-doc-pill">
        <span class="wa-doc-pill-icon" id="wa-pill-icon">📄</span>
        <span class="wa-doc-pill-name" id="wa-pill-name">—</span>
        <span class="wa-doc-pill-type pdf" id="wa-pill-type">PDF</span>
      </div>

      <!-- Format selector -->
      <div class="wa-fmt-selector">
        <span class="wa-fmt-label">Formato</span>
        <div class="wa-fmt-pills">
          <button class="wa-fmt-pill pdf active" id="wa-fmt-pdf"
                  onclick="waSelectFormat('pdf')" type="button"
                  aria-pressed="true" title="Enviar como PDF — recomendado para assinatura Gov.br">
            <span class="wa-fmt-pill-dot"></span>PDF
          </button>
          <button class="wa-fmt-pill docx" id="wa-fmt-docx"
                  onclick="waSelectFormat('docx')" type="button"
                  aria-pressed="false" title="Enviar como DOCX — editável no Word">
            <span class="wa-fmt-pill-dot"></span>DOCX
          </button>
        </div>
      </div>

      <!-- Phone -->
      <div>
        <label class="wa-label">Número de WhatsApp</label>
        <div class="wa-phone-row">
          <div class="wa-country-wrap">
            <button class="wa-country-btn" id="wa-country-btn"
                    onclick="waToggleDd(event)" type="button"
                    aria-haspopup="listbox" aria-expanded="false">
              <span class="wa-country-flag" id="wa-flag">🇧🇷</span>
              <span id="wa-dial">+55</span>
              <span class="wa-country-caret">▾</span>
            </button>
            <div class="wa-country-dd" id="wa-country-dd" role="listbox">
              <div class="wa-dd-search-wrap">
                <input class="wa-dd-search" type="text" id="wa-dd-search"
                       placeholder="Buscar país ou código..."
                       oninput="waFilterCountries(this.value)"
                       autocomplete="off">
              </div>
              <div class="wa-dd-list" id="wa-dd-list"></div>
            </div>
          </div>
          <input class="wa-phone-input" type="tel" id="wa-phone"
                 placeholder="(11) 99999-9999"
                 oninput="waOnPhoneInput(this)"
                 autocomplete="tel"
                 inputmode="tel">
        </div>
        <span class="wa-field-err" id="wa-phone-err"></span>
        <span class="wa-field-hint" id="wa-phone-hint">
          Para o Brasil, informe o DDD (2 dígitos) + número (8 ou 9 dígitos).
        </span>
      </div>

      <!-- Message -->
      <div>
        <label class="wa-label">Mensagem <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--text-3)">(opcional)</span></label>
        <textarea class="wa-msg-textarea" id="wa-msg" rows="3"
                  oninput="waOnMsgInput(this)"
                  placeholder="Segue o documento gerado pelo DocForm. Qualquer dúvida, fico à disposição."></textarea>
        <div class="wa-msg-char" id="wa-msg-char">0 / 500</div>
      </div>

    </div><!-- /body -->

    <div class="wa-divider"></div>

    <!-- Footer -->
    <div class="wa-modal-footer">
      <button class="wa-send-btn" id="wa-send-btn" disabled onclick="waDoSend()">
        <svg class="wa-btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span class="wa-btn-label">Enviar via WhatsApp</span>
      </button>
      <div class="wa-method-hint" id="wa-method-hint">
        <span class="wa-method-dot" id="wa-method-dot"></span>
        <span id="wa-method-text">Detectando método de envio...</span>
      </div>
      <div class="wa-govbr-note" id="wa-govbr-note">
        <span class="wa-govbr-note-icon">🔐</span>
        <span>PDF obrigatório para assinatura digital <strong>Gov.br / ICP-Brasil</strong></span>
      </div>
    </div>

    <!-- Success state -->
    <div class="wa-success" id="wa-success">
      <div class="wa-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div class="wa-success-title">WhatsApp aberto!</div>
      <div class="wa-success-sub" id="wa-success-sub">
        O aplicativo foi aberto com o número e mensagem preenchidos. Confirme o envio no WhatsApp.
      </div>
      <button class="wa-success-close" onclick="waModalClose()">Fechar</button>
    </div>

  </div>
</div>`;

  document.body.insertAdjacentHTML('beforeend', html);
  _waRenderCountryList(WA_COUNTRIES);
  _waUpdateMethodHint();

  /* Fecha dropdown ao clicar fora */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.wa-country-wrap')) {
      _waCloseDd();
    }
  });

  /* Fecha modal com Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') waModalClose();
  });
}

/* ── 5. COUNTRY DROPDOWN ─────────────────────────────────────── */
function _waRenderCountryList(list) {
  const el = document.getElementById('wa-dd-list');
  if (!el) return;
  el.innerHTML = list.map(c => `
    <div class="wa-dd-item${c.c === _WA.country.c ? ' selected' : ''}"
         role="option"
         onclick="waSelectCountry('${c.c}')"
         aria-selected="${c.c === _WA.country.c}">
      <span class="wa-dd-item-flag">${c.f}</span>
      <span class="wa-dd-item-name">${c.n}</span>
      <span class="wa-dd-item-code">${c.d}</span>
    </div>`).join('');
}

function waFilterCountries(q) {
  const s = q.trim().toLowerCase();
  if (!s) { _waRenderCountryList(WA_COUNTRIES); return; }
  _waRenderCountryList(
    WA_COUNTRIES.filter(c =>
      c.n.toLowerCase().includes(s) ||
      c.d.includes(s) ||
      c.c.toLowerCase().includes(s)
    )
  );
}

function waToggleDd(e) {
  e.stopPropagation();
  _WA.ddOpen = !_WA.ddOpen;
  const dd  = document.getElementById('wa-country-dd');
  const btn = document.getElementById('wa-country-btn');
  dd.classList.toggle('open', _WA.ddOpen);
  btn.setAttribute('aria-expanded', _WA.ddOpen);
  if (_WA.ddOpen) {
    const s = document.getElementById('wa-dd-search');
    s.value = '';
    _waRenderCountryList(WA_COUNTRIES);
    setTimeout(() => s.focus(), 60);
  }
}

function _waCloseDd() {
  _WA.ddOpen = false;
  const dd  = document.getElementById('wa-country-dd');
  const btn = document.getElementById('wa-country-btn');
  if (!dd) return;
  dd.classList.remove('open');
  btn && btn.setAttribute('aria-expanded', 'false');
}

function waSelectCountry(code) {
  _WA.country = WA_COUNTRIES.find(c => c.c === code) || WA_COUNTRIES[0];
  document.getElementById('wa-flag').textContent  = _WA.country.f;
  document.getElementById('wa-dial').textContent  = _WA.country.d;
  _waCloseDd();

  /* Atualiza placeholder e hint */
  const ph = _WA.country.mask.replace(/#/g, '0');
  document.getElementById('wa-phone').placeholder = ph;
  document.getElementById('wa-phone').value = '';
  _waUpdateHint();
  _waValidatePhone('');
}

function _waUpdateHint() {
  const el = document.getElementById('wa-phone-hint');
  if (!el) return;
  if (_WA.country.c === 'BR') {
    el.textContent = 'Informe o DDD (2 dígitos) + número (8 ou 9 dígitos), sem o código do país.';
  } else {
    el.textContent = `Informe o número local sem o código do país (${_WA.country.d}).`;
  }
}

/* ── 6. PHONE VALIDATION & MASKING ──────────────────────────── */
function waOnPhoneInput(el) {
  /* Aplica máscara apenas para BR */
  const raw = el.value.replace(/\D/g, '').slice(0, 11);
  if (_WA.country.c === 'BR') {
    el.value = _waMaskBR(raw);
  }
  _waValidatePhone(raw);
}

function _waMaskBR(digits) {
  if (!digits) return '';
  let s = '(' + digits.slice(0, 2);
  if (digits.length > 2) {
    const body = digits.slice(2);
    if (digits.length <= 10) {
      s += ') ' + body.slice(0, 4);
      if (body.length > 4) s += '-' + body.slice(4, 8);
    } else {
      s += ') ' + body.slice(0, 5);
      if (body.length > 5) s += '-' + body.slice(5, 9);
    }
  }
  return s;
}

function _waValidatePhone(raw) {
  const digits = raw.replace ? raw.replace(/\D/g, '') : raw;
  const errEl  = document.getElementById('wa-phone-err');
  const inp    = document.getElementById('wa-phone');
  let   ok     = false;

  if (!digits) {
    errEl.textContent = '';
    inp.classList.remove('error');
    _waSetSendEnabled(false);
    return;
  }

  if (_WA.country.c === 'BR') {
    if (digits.length < 10) {
      errEl.textContent = 'Número incompleto — informe o DDD + número.';
    } else if (!/^[1-9]{2}[2-9]\d{7,8}$/.test(digits)) {
      errEl.textContent = 'DDD ou número inválido para o Brasil.';
    } else {
      errEl.textContent = '';
      ok = true;
    }
  } else {
    const { digits: expected } = _WA.country;
    if (expected.includes(digits.length)) {
      errEl.textContent = '';
      ok = true;
    } else if (digits.length < Math.min(...expected)) {
      errEl.textContent = 'Número incompleto.';
    } else {
      errEl.textContent = `Número inválido para ${_WA.country.n}.`;
    }
  }

  inp.classList.toggle('error', !ok);
  _WA.valid = ok;
  _waSetSendEnabled(ok);
}

/* ── 7. MESSAGE COUNTER ──────────────────────────────────────── */
function waOnMsgInput(el) {
  const len  = el.value.length;
  const max  = 500;
  const disp = document.getElementById('wa-msg-char');
  if (!disp) return;
  disp.textContent = `${len} / ${max}`;
  disp.classList.toggle('warn', len > max * 0.85);
  if (len > max) el.value = el.value.slice(0, max);
}

/* ── 8. METHOD HINT (Web Share API detection) ────────────────── */
function _waUpdateMethodHint() {
  const dot  = document.getElementById('wa-method-dot');
  const text = document.getElementById('wa-method-text');
  if (!dot || !text) return;

  const isPdf = _WA.fmt === 'pdf';

  if (isPdf && navigator.share) {
    dot.classList.add('active');
    text.textContent = 'Web Share API disponível — compartilhamento nativo com arquivo.';
  } else if (!isPdf) {
    dot.classList.remove('active');
    text.textContent = 'DOCX: abrirá o WhatsApp com mensagem (sem anexo automático).';
  } else {
    dot.classList.remove('active');
    text.textContent = 'Fallback: abrirá o WhatsApp Web / app instalado.';
  }
}

/* ── 9. SEND BUTTON STATE ────────────────────────────────────── */
function _waSetSendEnabled(on) {
  const btn = document.getElementById('wa-send-btn');
  if (btn) btn.disabled = !on;
}

/* ── 10. OPEN MODAL ──────────────────────────────────────────── */
/**
 * Abre o modal para o tipo de documento especificado.
 * @param {'contrato'|'cv'|'email'} tipo
 */
function openWaModal(tipo) {
  _waInjectModal();

  _WA.docType = tipo;

  /* Monta título e ícone conforme o tipo */
  const map = {
    contrato : { icon: '⚖️',  label: 'Contrato',  sub: 'Formatar Documento' },
    cv       : { icon: '📄',  label: 'Currículo', sub: 'Criar Currículo'     },
    email    : { icon: '📧',  label: 'E-mail',    sub: 'E-mail Formal'       },
  };
  const info = map[tipo] || { icon: '📄', label: 'Documento', sub: 'DocForm' };

  /* Nome do arquivo com base nos inputs preenchidos */
  let fileName = '';
  if (tipo === 'contrato') {
    const titulo = document.getElementById('doc-titulo')?.value?.trim();
    const numero = document.getElementById('doc-numero')?.value?.trim();
    fileName = titulo
      ? (titulo.slice(0, 48) + (numero ? ` — ${numero}` : ''))
      : 'Contrato';
  } else if (tipo === 'cv') {
    const nome = document.getElementById('cv-nome')?.value?.trim();
    fileName = nome ? `Currículo — ${nome}` : 'Currículo';
  } else if (tipo === 'email') {
    const assunto = document.getElementById('em-assunto')?.value?.trim();
    fileName = assunto ? `E-mail — ${assunto.slice(0, 48)}` : 'E-mail';
  }
  _WA.docTitle = fileName;

  /* Atualiza elementos do modal */
  document.getElementById('wa-modal-sub').textContent   = info.sub;
  document.getElementById('wa-pill-icon').textContent   = info.icon;
  document.getElementById('wa-pill-name').textContent   = fileName || info.label;

  /* Mensagem padrão inteligente */
  const msgEl = document.getElementById('wa-msg');
  if (msgEl && !msgEl.value) {
    msgEl.value = `Olá! Segue o ${info.label.toLowerCase()} gerado pelo DocForm.\n\nQualquer dúvida, fico à disposição.`;
    waOnMsgInput(msgEl);
  }

  /* Reset estado */
  _WA.fmt = 'pdf';
  waSelectFormat('pdf');

  const inp = document.getElementById('wa-phone');
  if (inp) {
    inp.value = '';
    inp.classList.remove('error');
  }
  document.getElementById('wa-phone-err').textContent = '';
  _waSetSendEnabled(false);
  _WA.valid = false;
  _waCloseDd();

  /* Mostra body, esconde success */
  document.getElementById('wa-modal-body').style.display   = '';
  document.querySelector('.wa-divider').style.display       = '';
  document.querySelector('.wa-modal-footer').style.display  = '';
  document.getElementById('wa-success').classList.remove('show');

  /* Atualiza hint do país atual */
  _waUpdateHint();
  _waUpdateMethodHint();

  /* Abre overlay */
  document.getElementById('wa-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';

  /* Foca no input de telefone */
  setTimeout(() => document.getElementById('wa-phone')?.focus(), 120);
}

/* ── 11. CLOSE MODAL ─────────────────────────────────────────── */
function waModalClose() {
  const overlay = document.getElementById('wa-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── 12. DO SEND ─────────────────────────────────────────────── */
async function waDoSend() {
  if (!_WA.valid) return;

  const btn      = document.getElementById('wa-send-btn');
  const rawDig   = document.getElementById('wa-phone').value.replace(/\D/g, '');
  const dial     = _WA.country.d.replace('+', '');
  const full     = dial + rawDig;
  const msg      = document.getElementById('wa-msg').value.trim() ||
                   `Olá! Segue o documento gerado pelo DocForm.`;
  const isPdf    = _WA.fmt === 'pdf';
  const ext      = isPdf ? 'pdf' : 'docx';
  const mimeType = isPdf
    ? 'application/pdf'
    : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const fileName = (_WA.docTitle || 'documento')
    .replace(/[^a-zA-Z0-9À-ÿ \-_]/g, '') + `.${ext}`;

  /* Feedback visual — loading */
  btn.classList.add('loading');
  btn.disabled = true;

  try {
    let fileBlob = null;

    if (isPdf) {
      /* ── PDF: tenta capturar blob via jsPDF ── */
      try { fileBlob = await _waGetPdfBlob(_WA.docType); }
      catch (e) { console.warn('[DocForm WA] Blob PDF falhou:', e); }

      /* Tenta Web Share API com arquivo (Gov.br priority path) */
      if (fileBlob && navigator.canShare) {
        const file = new File([fileBlob], fileName, { type: mimeType });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files : [file],
              title : _WA.docTitle || 'Documento DocForm',
              text  : msg,
            });
            _waShowSuccess('Documento PDF compartilhado — pronto para assinatura Gov.br / ICP-Brasil.');
            return;
          } catch (e) {
            if (e.name === 'AbortError') {
              btn.classList.remove('loading');
              btn.disabled = false;
              return;
            }
            /* Outro erro → fallback link */
          }
        }
      }

      /* Fallback PDF → wa.me com mensagem */
      const url = `https://wa.me/${full}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      _waShowSuccess(
        'WhatsApp aberto. Salve o PDF pelo botão ⬇ PDF e anexe manualmente se necessário.'
      );

    } else {
      /* ── DOCX: tenta capturar blob via docx.js ── */
      try { fileBlob = await _waGetDocxBlob(_WA.docType); }
      catch (e) { console.warn('[DocForm WA] Blob DOCX falhou:', e); }

      /* Web Share com DOCX (Android suporta; iOS geralmente não) */
      if (fileBlob && navigator.canShare) {
        const file = new File([fileBlob], fileName, { type: mimeType });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files : [file],
              title : _WA.docTitle || 'Documento DocForm',
              text  : msg,
            });
            _waShowSuccess('Documento DOCX compartilhado com sucesso.');
            return;
          } catch (e) {
            if (e.name === 'AbortError') {
              btn.classList.remove('loading');
              btn.disabled = false;
              return;
            }
          }
        }
      }

      /* Fallback DOCX → abre WhatsApp com mensagem + instrução */
      const msgDocx = msg + '\n\n📎 [Arquivo DOCX — baixe pelo botão ⬇ DOCX e anexe aqui]';
      const url = `https://wa.me/${full}?text=${encodeURIComponent(msgDocx)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      _waShowSuccess(
        'WhatsApp aberto com mensagem. Baixe o DOCX pelo botão ⬇ DOCX e anexe na conversa.'
      );
    }

  } catch (err) {
    console.error('[DocForm WA] Erro ao enviar:', err);
    btn.classList.remove('loading');
    btn.disabled = false;
    if (typeof showToast === 'function') {
      showToast('Erro ao abrir WhatsApp. Tente novamente.', 'err');
    }
  }
}

/* ── 14. GET DOCX BLOB ───────────────────────────────────────── */
/**
 * Tenta capturar o blob DOCX do documento atual.
 * Intercepta o FileSaver.saveAs temporariamente para capturar o blob
 * sem acionar o download do browser.
 * Retorna um Blob ou null.
 */
async function _waGetDocxBlob(tipo) {
  if (typeof exportarDOCX !== 'function') return null;

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      /* Restaura saveAs caso o timeout dispare */
      if (window._waSaveAsOrig) {
        window.saveAs = window._waSaveAsOrig;
        delete window._waSaveAsOrig;
      }
      resolve(null);
    }, 10000);

    try {
      /* Intercepta FileSaver.saveAs para capturar o blob */
      const origSaveAs = window.saveAs;
      window._waSaveAsOrig = origSaveAs;

      window.saveAs = function(blob, name) {
        window.saveAs = origSaveAs;
        delete window._waSaveAsOrig;
        clearTimeout(timer);
        resolve(blob instanceof Blob ? blob : null);
      };

      /* Aciona a exportação existente em modo silencioso */
      exportarDOCX(tipo, true);

    } catch(e) {
      clearTimeout(timer);
      if (window._waSaveAsOrig) {
        window.saveAs = window._waSaveAsOrig;
        delete window._waSaveAsOrig;
      }
      resolve(null);
    }
  });
}

/* ── 15. GET PDF BLOB ────────────────────────────────────────── */
/**
 * Tenta capturar ou gerar o PDF do documento atual.
 * Retorna um Blob ou null se não for possível.
 */
async function _waGetPdfBlob(tipo) {
  /* Se o jsPDF estiver disponível e a função exportarPDF existir,
     tentamos capturar o output como blob.
     Usamos uma abordagem não-destrutiva: sobrescrevemos save temporariamente. */
  if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') return null;

  return new Promise((resolve) => {
    /* Timeout de segurança */
    const timer = setTimeout(() => resolve(null), 8000);

    try {
      const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
      if (!jsPDF) { clearTimeout(timer); resolve(null); return; }

      /* Verifica se há conteúdo na preview correspondente */
      const previewMap = {
        contrato : 'preview-pages-wrap',
        cv       : 'cv-doc-inner',
        email    : 'email-preview',
      };
      const previewEl = document.getElementById(previewMap[tipo]);
      if (!previewEl || !previewEl.innerHTML.trim()) {
        clearTimeout(timer); resolve(null); return;
      }

      /* Delega para a função existente do script.js com captura de blob.
         Estratégia: intercepta temporariamente o jsPDF save para capturar o blob. */
      const origSave = jsPDF.prototype.save;
      let captured = null;

      jsPDF.prototype.save = function(name) {
        captured = this.output('blob');
        jsPDF.prototype.save = origSave; /* restaura imediatamente */
        clearTimeout(timer);
        resolve(captured);
      };

      /* Chama a exportação existente */
      if (typeof exportarPDF === 'function') {
        exportarPDF(tipo, true /* silent — não exibe toast de download */);
      } else {
        jsPDF.prototype.save = origSave;
        clearTimeout(timer);
        resolve(null);
      }

    } catch(e) {
      clearTimeout(timer);
      resolve(null);
    }
  });
}

/* ── 16. SHOW SUCCESS ────────────────────────────────────────── */
function _waShowSuccess(msg) {
  const btn     = document.getElementById('wa-send-btn');
  const body    = document.getElementById('wa-modal-body');
  const divider = document.querySelector('#wa-modal-overlay .wa-divider');
  const footer  = document.querySelector('.wa-modal-footer');
  const success = document.getElementById('wa-success');
  const subEl   = document.getElementById('wa-success-sub');

  btn?.classList.remove('loading');
  if (body)    body.style.display    = 'none';
  if (divider) divider.style.display = 'none';
  if (footer)  footer.style.display  = 'none';
  if (subEl)   subEl.textContent     = msg;
  success?.classList.add('show');

  if (typeof showToast === 'function') {
    showToast('✅ WhatsApp aberto com sucesso.', 'ok');
  }
}

/* ═══════════════════════════════════════════════════════════════
   INICIALIZAÇÃO — injeta botões nos toolbars quando o DOM estiver pronto
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  _waInjectButtons();
});
/* Fallback caso o script carregue depois do DOMContentLoaded */
if (document.readyState !== 'loading') {
  setTimeout(_waInjectButtons, 0);
}

function _waInjectButtons() {
  const toolbars = [
    { id: 'btn-pdf-contrato', tipo: 'contrato' },
    { id: 'btn-pdf-cv',       tipo: 'cv'       },
    { id: 'btn-pdf-email',    tipo: 'email'    },
  ];

  toolbars.forEach(({ id, tipo }) => {
    const pdfBtn = document.getElementById(id);
    if (!pdfBtn) return;

    /* Evita injeção dupla */
    const existingId = `btn-wa-${tipo}`;
    if (document.getElementById(existingId)) return;

    const btn = document.createElement('button');
    btn.id        = existingId;
    btn.className = 'btn btn-wa';
    btn.setAttribute('aria-label', `Enviar ${tipo} via WhatsApp`);
    btn.innerHTML = `<svg class="btn-wa-icon" viewBox="0 0 24 24" fill="currentColor">${_waIconPath()}</svg> WhatsApp`;
    btn.addEventListener('click', () => openWaModal(tipo));

    /* Insere logo após o botão PDF */
    pdfBtn.insertAdjacentElement('afterend', btn);
  });
}

function _waIconPath() {
  return `<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>`;
}
