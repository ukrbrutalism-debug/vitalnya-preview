(() => {
 'use strict';
 const $ = id => document.getElementById(id);
 const stages = [...document.querySelectorAll('[data-step]')];
 const form = $('jm-form');
 let path = 'help', step = 0;
 const text = {
  help: {nl:['Ik wil helpen','Wat past bij jou?','Vertel ons waar je blij van wordt. Een kleine bijdrage is ook welkom.'],uk:['Хочу допомогти','Що тобі підходить?','Розкажи, що тебе надихає. Навіть невелика допомога важлива.']},
  idea: {nl:['Ik wil iets delen','Wat is jouw idee?','Een workshop, een talent of iets heel anders: we horen het graag.'],uk:['Хочу поділитися','Яка твоя ідея?','Майстер-клас, талант чи щось зовсім інше — раді почути.']},
  support: {nl:['Ik wil steunen','Samen meer mogelijk maken.','Vertel hoe je wilt bijdragen. We beginnen met een gesprek.'],uk:['Хочу підтримати','Разом можемо більше.','Розкажи, як хочеш долучитися. Почнемо з розмови.']}
 };
 const lang = () => $('uk').checked ? 'uk' : 'nl';
 const choose = (n,u) => lang()==='uk' ? u : n;
 function renderText(){
  document.documentElement.lang=lang();
  $('jm-heading').textContent=text[path][lang()][1];
  $('jm-intro').textContent=text[path][lang()][2];
  if(step===2) compose();
 }
 function go(next){
  step=next;
  stages.forEach(el=>el.hidden=Number(el.dataset.step)!==next);
  document.querySelectorAll('.jm-progress li').forEach((el,i)=>{if(i===next)el.setAttribute('aria-current','step');else el.removeAttribute('aria-current');});
  renderText();
  const heading=stages[next].querySelector('h2');
  heading.focus({preventScroll:true});
  $('mogelijkheden').scrollIntoView({behavior:'instant',block:'start'});
 }
 function compose(){
  const values=[...form.querySelectorAll('input:checked')].filter(el=>!el.disabled).map(el=>lang()==='uk'?el.dataset.uk:el.value);
  const name=$('jm-name').value.trim(), message=$('jm-message').value.trim();
  const lines=[choose('Hallo Vital’nya,','Вітаю, Вітальне!'),'',''+text[path][lang()][0]+'.'];
  if(values.length)lines.push(choose('Mijn voorkeuren: ','Мої побажання: ')+values.join(', ')+'.');
  if(message)lines.push('',message);
  lines.push('',choose('Groeten,','З повагою,'),name);
  const body=lines.join('\n');
  $('jm-preview').value=body;
  $('jm-email').href='mailto:welkom@vitalnya.nl?subject='+encodeURIComponent('Vitalnya — '+text[path][lang()][0])+'&body='+encodeURIComponent(body);
  $('jm-status').textContent='';
 }
 document.querySelectorAll('[data-path]').forEach(button=>button.addEventListener('click',()=>{
  path=button.dataset.path;
  document.querySelectorAll('[data-for]').forEach(panel=>{panel.hidden=panel.dataset.for!==path;panel.querySelectorAll('input').forEach(input=>input.disabled=panel.hidden);});
  go(1);
 }));
 document.querySelectorAll('[data-back]').forEach(button=>button.addEventListener('click',()=>go(Number(button.dataset.back))));
 form.addEventListener('submit',event=>{
  event.preventDefault();
  $('jm-name').setCustomValidity($('jm-name').value.trim()?'':choose('Vul je naam in.','Вкажи своє ім’я.'));
  if(form.reportValidity())go(2);
 });
 $('jm-name').addEventListener('input',()=> $('jm-name').setCustomValidity(''));
 $('jm-copy').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText($('jm-preview').value);$('jm-status').textContent=choose('Gekopieerd. Plak het bericht in je e-mail.','Скопійовано. Встав повідомлення у свій лист.');}
  catch{ $('jm-preview').focus();$('jm-preview').select();$('jm-status').textContent=choose('Selecteer en kopieer de tekst hierboven.','Виділи та скопіюй текст вище.'); }
 });
 $('jm-email').addEventListener('click',()=>{$('jm-status').textContent=choose('Verzend het bericht vanuit je e-mailapp. Opent er niets? Gebruik “Kopieer bericht”.','Надішли лист зі своєї пошти. Нічого не відкрилося? Натисни «Скопіювати повідомлення».');});
 try{if(localStorage.getItem('vitalnya-language')==='uk')$('uk').checked=true;}catch{}
 ['nl','uk'].forEach(id=>$(id).addEventListener('change',()=>{try{localStorage.setItem('vitalnya-language',id);}catch{}renderText();}));
 document.querySelectorAll('label[for="nl"],label[for="uk"]').forEach(label=>label.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();$(label.htmlFor).checked=true;$(label.htmlFor).dispatchEvent(new Event('change'));}}));
 document.querySelectorAll('.current-year').forEach(el=>el.textContent=new Date().getFullYear());
 renderText();
})();
