// script.js — interações: hamburger, form validation, toasts, modal
document.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-list');
  if(hamburger){
    hamburger.addEventListener('click', ()=>{
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? 'none' : 'flex';
    })
  }

  const form = document.querySelector('.form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input=>{
        const err = input.parentElement.querySelector('.form-error');
        if(!input.value.trim()){
          err.textContent = 'Campo obrigatório';
          input.setAttribute('aria-invalid','true');
          valid = false;
        } else {
          err.textContent = '';
          input.removeAttribute('aria-invalid');
        }
      });
      if(valid){
        showToast('Mensagem enviada com sucesso', 'success');
        form.reset();
      } else {
        showToast('Corrija os campos destacados', 'warning');
      }
    })
  }

  function showToast(text, type='info', timeout=3500){
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role','status');
    el.innerHTML = `<div class="toast-body">${text}</div>`;
    container.appendChild(el);
    setTimeout(()=>{ try{ el.remove(); }catch(e){} }, timeout);
  }

  window.openModal = function(contentHtml){
    const root = document.getElementById('modal-root');
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true">${contentHtml}<div style="text-align:right;margin-top:16px;"><button onclick="closeModal()" class="btn">Fechar</button></div></div>`;
    root.appendChild(backdrop);
    window.closeModal = ()=>{ backdrop.remove(); }
  }
});
