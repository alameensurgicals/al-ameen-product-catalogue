(function () {
  const NUMBER = '919995028202';

  function addButton() {
    const info = document.querySelector('.product-modal-info');
    if (!info || document.getElementById('alAmeenWhatsAppBtn')) return;

    const style = document.createElement('style');
    style.textContent = `
      #alAmeenWhatsAppBtn,#alAmeenShareBtn{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:8px;padding:13px 18px;border-radius:10px;color:#fff;text-decoration:none;font-weight:700;font-size:15px;transition:.15s;border:0;cursor:pointer}
      #alAmeenWhatsAppBtn{background:#25D366}
      #alAmeenWhatsAppBtn:hover{filter:brightness(.94);transform:translateY(-1px)}
      #alAmeenCallBtn{display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:9px;padding:13px 18px;border-radius:10px;background:#087f91;color:#fff;text-decoration:none;font-weight:700;font-size:15px}
      #alAmeenShareBtn{background:#073f49;width:100%;box-sizing:border-box}
      #alAmeenShareBtn:hover{filter:brightness(1.08);transform:translateY(-1px)}
      #alAmeenShareStatus{display:block;margin-top:8px;color:#61767b;font-size:12px;text-align:center;min-height:16px}
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

    const share = document.createElement('button');
    share.id = 'alAmeenShareBtn';
    share.type = 'button';
    share.innerHTML = '🔗 Share Product';

    const status = document.createElement('span');
    status.id = 'alAmeenShareStatus';
    status.setAttribute('aria-live', 'polite');

    info.appendChild(wa);
    info.appendChild(call);
    info.appendChild(share);
    info.appendChild(status);

    function getProductName() {
      const title = info.querySelector('h2');
      if (!title) return '';
      const selected = document.body.classList.contains('lang-ml')
        ? title.querySelector('.ml')
        : title.querySelector('.en');
      return (selected ? selected.textContent : title.textContent).trim();
    }

    function getShareUrl() {
      const title = info.querySelector('h2');
      const en = title && title.querySelector('.en');
      const product = (en ? en.textContent : (title ? title.textContent : '')).trim();
      const url = new URL(window.location.href);
      url.search = '';
      url.hash = '';
      url.searchParams.set('product', product);
      return url.toString();
    }

    function updateMessage() {
      const product = getProductName();
      if (!product) return;
      const message = 'Hello AL AMEEN SURGICALS, I am interested in the ' + product + '. Please provide more details.';
      wa.href = 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(message);
    }

    share.addEventListener('click', async function () {
      const title = info.querySelector('h2');
      const en = title && title.querySelector('.en');
      const product = (en ? en.textContent : (title ? title.textContent : '')).trim();
      if (!product) return;
      const url = getShareUrl();
      const shareData = {
        title: product + ' | AL AMEEN SURGICALS',
        text: 'View ' + product + ' from AL AMEEN SURGICALS.',
        url: url
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          status.textContent = '';
        } else if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
          status.textContent = 'Product link copied. You can share it anywhere.';
        } else {
          window.prompt('Copy this product link:', url);
        }
      } catch (err) {
        if (err && err.name !== 'AbortError') {
          try {
            await navigator.clipboard.writeText(url);
            status.textContent = 'Product link copied. You can share it anywhere.';
          } catch (_) {}
        }
      }
    });

    updateMessage();
    new MutationObserver(updateMessage).observe(info, {subtree:true, childList:true, characterData:true});
    new MutationObserver(updateMessage).observe(document.body, {attributes:true, attributeFilter:['class']});

    // Open a shared product automatically when the URL contains ?product=...
    const requested = new URLSearchParams(window.location.search).get('product');
    if (requested) {
      const match = [...document.querySelectorAll('.card')].find(card =>
        (card.dataset.name || '').trim().toLowerCase() === requested.trim().toLowerCase()
      );
      if (match) setTimeout(() => match.click(), 250);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
  } else {
    addButton();
  }
})();
