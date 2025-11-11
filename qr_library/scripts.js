(function(){
  const grid = document.getElementById('calendarGrid');
  if(!grid) return;
  let viewDate = new Date(2025, 10, 4);
  const title = document.getElementById('calTitle');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const todayBtn = document.getElementById('todayBtn');

  function render(){
    Array.from(grid.querySelectorAll('.day')).forEach(el => el.remove());
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    title.textContent = `${y}년 ${m+1}월`;
    const first = new Date(y, m, 1);
    const start = first.getDay();
    const last = new Date(y, m+1, 0).getDate();
    const prevLast = new Date(y, m, 0).getDate();

    for(let i=start-1;i>=0;i--) addCell(prevLast-i, true);
    for(let d=1; d<=last; d++){
      const el = addCell(d, false);
      const t = new Date();
      if(t.getFullYear()===y && t.getMonth()===m && t.getDate()===d) el.classList.add('today');
    }
    while(grid.querySelectorAll('.day').length < 42) addCell(grid.querySelectorAll('.day').length, true);

    addDot(16,'blue'); addDot(17,'blue'); addDot(24,'blue');
    addDot(34,'orange'); addDot(35,'orange'); addDot(36,'orange'); addDot(37,'orange'); addDot(38,'orange');
  }

  function addCell(n, other){
    const d = document.createElement('div');
    d.className = 'day' + (other ? ' other' : '');
    d.textContent = typeof n==='number'? n : '';
    grid.appendChild(d);
    return d;
  }
  function addDot(index,color){
    const cell = grid.querySelectorAll('.day')[index];
    if(!cell) return;
    const dot = document.createElement('span');
    dot.className = 'dot ' + color;
    cell.appendChild(dot);
  }
  prevBtn.addEventListener('click', ()=>{viewDate.setMonth(viewDate.getMonth()-1); render();});
  nextBtn.addEventListener('click', ()=>{viewDate.setMonth(viewDate.getMonth()+1); render();});
  todayBtn.addEventListener('click', ()=>{viewDate = new Date(); render();});
  render();
})();