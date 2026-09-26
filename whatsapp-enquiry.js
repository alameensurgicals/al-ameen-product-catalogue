(function () {
  const NUMBER = '919995028202';

  function addButton() {
    const info = document.querySelector('.product-modal-info');
    if (!info || document.getElementById('alAmeenWhatsAppBtn')) return;

    const style = document.createElement('style');
    style.textContent = `
      #alAmeenWhatsAppBtn{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:6px;padding:13px 18px;border-radius:10px;background:#25D366;color:#fff;text-decoration:none;font-weight:700;font-size:15px;transition:.15s}
      #alAmeenWhatsAppBtn:hover{filter:brightness(.94);transform:translateY(-1px)}
      #alAmeenCallBtn{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:9px;padding:13px 18px;border-radius:10px;background:#087f91;color:#fff;text-decoration:none;font-weight:700;font-size:15px}
    `;
    document.head.appendChild(style);

    const wa = document.createElement('a');
    wa.id = 'alAmeenWhatsAppBtn';
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.href = 'https://wa.me/' + NUMBER;
    wa.innerHTML = '💬 Enquire on WhatsApp';

    const call = document.createElement('a');
    call.id = 'alAmeenCallBtn';
    call.href = 'tel:+919995028202';
    call.innerHTML = '📞 Call Us';

    info.appendChild(wa);
    info.appendChild(call);

    function updateMessage() {
      const title = info.querySelector('h2');
      if (!title) return;
      const product = title.textContent.trim();
      if (!product) return;
      const message = 'Hello AL AMEEN SURGICALS, I am interested in the ' + product + '. Please provide more details.';
      wa.href = 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(message);
    }

    updateMessage();
    new MutationObserver(updateMessage).observe(info, {subtree:true, childList:true, characterData:true});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }
})();
