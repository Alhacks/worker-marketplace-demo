export const services = [
{id:'tap',category:'plumbing',title:'Заменить смеситель без лишних хлопот',detail:'Демонтаж старого и установка нового смесителя. Материалы отдельно.',price:1500,unit:'за установку',label:'Для кухни и ванной',icon:'tap',color:'peach'},
{id:'light',category:'electric',title:'Повесить люстру и подключить свет',detail:'Монтаж одного светильника на подготовленное крепление.',price:1200,unit:'за светильник',label:'Свет в доме',icon:'lamp',color:'sage'},
{id:'shelf',category:'repair',title:'Повесить полки, карнизы или зеркало',detail:'Разметка и крепление одного предмета. Условия зависят от стены.',price:800,unit:'за предмет',label:'Маленькие перемены',icon:'shelf',color:'blue'},
{id:'wardrobe',category:'furniture',title:'Собрать шкаф или комод по инструкции',detail:'Сборка корпусной мебели из готового комплекта.',price:2500,unit:'за сборку',label:'Каждой вещи своё место',icon:'cabinet',color:'lilac'},
{id:'wall',category:'finish',title:'Обновить стены: покраска комнаты',detail:'Нанесение краски на подготовленную поверхность. Краска отдельно.',price:350,unit:'за м²',label:'Новый цвет дома',icon:'roller',color:'peach'},
{id:'washer',category:'appliances',title:'Найти причину поломки стиральной машины',detail:'Диагностика неисправности. Ремонт согласуется после осмотра.',price:900,unit:'за диагностику',label:'Техника снова в деле',icon:'washer',color:'blue'},
{id:'clean',category:'cleaning',title:'Навести порядок после ремонта',detail:'Уборка поверхностей и строительной пыли. Объём уточняется.',price:180,unit:'за м²',label:'Пора выдохнуть',icon:'clean',color:'sage'},
{id:'move',category:'moving',title:'Помочь с переездом и тяжёлыми вещами',detail:'Помощь грузчика. Транспорт, этаж и время согласуются отдельно.',price:700,unit:'за час',label:'На новом месте',icon:'box',color:'lilac'},
{id:'socket',category:'electric',title:'Заменить розетку или выключатель',detail:'Замена механизма в существующем месте установки.',price:600,unit:'за точку',label:'Полезные мелочи',icon:'socket',color:'peach'},
{id:'sink',category:'plumbing',title:'Установить мойку и подключить сифон',detail:'Установка в готовый вырез, подключение и проверка соединений.',price:2200,unit:'за установку',label:'Удобная кухня',icon:'tap',color:'sage'},
{id:'desk',category:'furniture',title:'Собрать удобное рабочее место',detail:'Сборка письменного стола из готового комплекта деталей.',price:1600,unit:'за стол',label:'Место для ваших идей',icon:'shelf',color:'lilac'},
{id:'windows',category:'cleaning',title:'Вымыть окна и впустить больше света',detail:'Мытьё доступных окон изнутри. Высотные работы не включены.',price:500,unit:'за створку',label:'Прозрачный результат',icon:'window',color:'blue'}
];
const categoryTerms={plumbing:'сантехника сантехник водопровод трубы',electric:'электрика электрик свет розетки',repair:'мелкий ремонт мастер на час',finish:'отделка отделочник ремонт стен',furniture:'мебель сборка сборщик',appliances:'бытовая техника ремонт техники',cleaning:'уборка клининг уборщик',moving:'переезд переезды грузчик перевозка'};
export function filterServices(query='',category='all',sort='default') {
 const q=query.toLocaleLowerCase('ru').trim();
 const result=services.filter(s=>(category==='all'||s.category===category)&&(!q||(s.title+' '+s.detail+' '+s.label+' '+categoryTerms[s.category]).toLocaleLowerCase('ru').includes(q)));
 if(sort==='price-up')result.sort((a,b)=>a.price-b.price);
 if(sort==='price-down')result.sort((a,b)=>b.price-a.price);
 return result;
}
export function illustration(type){
 const drawings={
 tap:'<path d="M125 140V92q0-28 28-28h22v18h-22q-10 0-10 10v48"/><path d="M116 140h35m-27-48h-22m0-12v24"/><path d="M90 148h105l-12 24H103z"/><path d="M175 92v14m0 9v4"/>',
 lamp:'<path d="M150 35v40m-42 62 20-62h44l20 62z"/><path d="M135 137q0 26 30 0m-40 26-8 12m58-12 8 12m-33-8v16"/>',
 shelf:'<path d="M70 115h160v12H70zm15 12v28m130-28v28"/><path d="M103 113V77h24v36m7 0V67h17v46m15 0V87h28v26m5-27q25 0 16-27-25 0-16 27z"/>',
 cabinet:'<rect x="91" y="47" width="118" height="124" rx="5"/><path d="M150 47v124m-59-41h118m-87-42v20m56-20v20m-39 41h22m-62 22v12m102-12v12"/>',
 roller:'<rect x="86" y="53" width="106" height="41" rx="9"/><path d="M192 73h19v40h-65v27m-12 0h24v40h-24z"/>',
 washer:'<rect x="94" y="40" width="112" height="142" rx="9"/><path d="M94 72h112m-94-16h22m48 0h7"/><circle cx="150" cy="121" r="34"/><path d="M121 120q15-15 29 0t29 0"/>',
 clean:'<path d="M114 105h65l-8 68h-48zM130 105V81h34v24m-21-24V66h33m-17 0v-9"/><path d="m197 83 5 13 13 5-13 5-5 13-5-13-13-5 13-5zM94 55v24m-12-12h24"/>',
 box:'<path d="m80 88 70-33 70 33v75l-70 33-70-33zm0 0 70 33 70-33m-70 33v75m-34-124 70 33v28"/>',
 socket:'<rect x="94" y="47" width="112" height="126" rx="15"/><circle cx="150" cy="110" r="34"/><path d="M138 101v12m24-12v12m-12-31v7m0 42v7"/>',
 window:'<path d="M92 45h116v133H92zm58 0v133m-58-66h116m-101-49 23-17m-23 36 35-26m27 70 23-17"/>'
 };
 return `<svg viewBox="0 0 300 220" aria-hidden="true"><ellipse cx="150" cy="190" rx="82" ry="9" fill="currentColor" opacity=".08"/><circle cx="150" cy="106" r="84" fill="white" opacity=".38"/><g fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${drawings[type]||drawings.box}</g></svg>`;
}
