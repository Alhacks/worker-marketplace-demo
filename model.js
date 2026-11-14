export const categories = [
  ['plumbing','Сантехника','Вода, трубы и смесители','◉'],
  ['electric','Электрика','Розетки, свет и проводка','ϟ'],
  ['repair','Мелкий ремонт','Починить, повесить, собрать','⌁'],
  ['finish','Отделка','Стены, полы и потолки','▧'],
  ['furniture','Сборка мебели','Шкафы, столы и кухни','▤'],
  ['appliances','Бытовая техника','Диагностика и ремонт','▣'],
  ['cleaning','Уборка','Квартиры и окна','✧'],
  ['moving','Переезды','Перевезти и поднять','▱'],
];
export const statuses = {draft:'Черновик',open:'Поиск мастера',accepted:'Мастер выбран',working:'В работе',completed:'Завершена'};
export function validateRequest(data) {
  const errors={};
  if (!categories.some(c=>c[0]===data.category)) errors.category='Выберите категорию';
  if (!data.title || data.title.trim().length<5) errors.title='Опишите задачу хотя бы в 5 символах';
  if (!data.city || data.city.trim().length<2) errors.city='Укажите город';
  if (!data.description || data.description.trim().length<15) errors.description='Добавьте немного подробностей: минимум 15 символов';
  if (data.budget && (!Number.isFinite(Number(data.budget)) || Number(data.budget)<=0)) errors.budget='Бюджет должен быть больше нуля';
  return errors;
}
export function advance(task) {
  if(task.status==='working'&&task.paymentStatus!=='paid') throw new Error('Сначала нужна подтверждённая оплата через сайт');
  const next={draft:'open',open:'accepted',accepted:'working',working:'completed'}[task.status];
  if(!next) return task;
  return {...task,status:next};
}
export function addReview(task,rating,text) {
  if(task.status!=='completed'||task.paymentStatus!=='paid') throw new Error('Отзыв доступен только после завершения');
  if(task.review) throw new Error('Отзыв уже оставлен');
  if(!Number.isInteger(rating)||rating<1||rating>5||text.trim().length<10) throw new Error('Нужны оценка 1–5 и минимум 10 символов');
  return {...task,review:{rating,text:text.trim()}};
}
export const demoMasters=[{id:'demo-a',name:'Тестовый мастер А',specialty:'Сантехника и мелкий ремонт'},{id:'demo-b',name:'Тестовый мастер Б',specialty:'Электрика и отделка'}];
export function invite(task,masterId){
  if(task.status!=='open') throw new Error('Приглашения доступны только во время поиска мастера');
  if(!demoMasters.some(m=>m.id===masterId)) throw new Error('Мастер не найден');
  if((task.invitations||[]).some(i=>i.masterId===masterId)) return task;
  return {...task,invitations:[...(task.invitations||[]),{masterId,status:'pending'}]};
}
export function respond(task,masterId,response,verification){
  if(response==='interested' && verification!=='verified') throw new Error('Сначала подтвердите статус самозанятого или ИП');
  if(task.status!=='open') throw new Error('Поиск мастера уже закрыт');
  if(!['interested','declined'].includes(response)) throw new Error('Неизвестный ответ');
  return {...task,invitations:(task.invitations||[]).map(i=>i.masterId===masterId&&i.status==='pending'?{...i,status:response}:i)};
}
export function selectMaster(task,masterId,verification){
  if(task.status!=='open'||verification!=='verified'||!(task.invitations||[]).some(i=>i.masterId===masterId&&i.status==='interested')) throw new Error('Нужны подтверждённый статус и отклик выбранного мастера');
  return {...task,status:'accepted',selectedMasterId:masterId};
}

export function confirmDemoPayment(task){
  if(task.status!=='working') throw new Error('Оплата доступна в тестовом заказе в работе');
  return {...task,paymentStatus:'paid',paymentMethod:'demo-site',paymentConfirmedAt:new Date().toISOString()};
}
