// Campus Poll — fast vote demo (client-only)
(() => {
  const POLLS = [
    {
      id: 'p1',
      question: 'Should the college extend library hours till 12 AM?',
      options: ['👍 Yes, extend hours', '👎 No, keep as is', '🤔 Not sure yet'],
      votes: [512, 166, 76],
      expiresAt: Date.now() + 1000 * 60 * 60 * 3 // 3 hours
    },
    {
      id: 'p2',
      question: 'Should campus food stalls offer late-night options?',
      options: ['🍔 Yes', '🚫 No', '🤷 Maybe'],
      votes: [220, 140, 60],
      expiresAt: Date.now() + 1000 * 60 * 60 * 12
    }
  ]

  let current = POLLS[0]
  const liveCountEl = document.getElementById('liveCount')
  const pollQuestion = document.getElementById('pollQuestion')
  const pollTimer = document.getElementById('pollTimer')
  const optionsEl = document.getElementById('options')
  const postVote = document.getElementById('postVote')
  const resultsEl = document.getElementById('results')
  const recentList = document.getElementById('recentList')
  const recentCards = document.getElementById('recentList')
  const recentActivity = document.getElementById('recentActivity')

  // fake names for social proof
  const NAMES = ['Aditi', 'Rahul', 'Sneha', 'Carlos', 'Lina', 'Omar', 'Priya', 'James']

  function updateLiveCount(){
    // simulate a lively count between 300-900
    const n = 300 + Math.floor(Math.random() * 600)
    liveCountEl.textContent = n
  }

  function renderPoll(poll){
    current = poll
    pollQuestion.textContent = poll.question
    updateTimer()

    optionsEl.innerHTML = ''
    poll.options.forEach((opt, i) => {
      const btn = document.createElement('button')
      btn.className = 'opt-btn'
      btn.innerHTML = `<span class="emoji">${opt.split(' ')[0]}</span><span class="text">${opt.replace(/^\S+\s*/, '')}</span>`
      const voted = hasVoted(poll.id)
      btn.disabled = voted
      if (voted) btn.classList.add('locked')
      btn.addEventListener('click', () => castVote(poll.id, i, btn))
      optionsEl.appendChild(btn)
    })

    if (hasVoted(poll.id)) showResults(poll.id)
    else hideResults()
  }

  function updateTimer(){
    const remaining = Math.max(0, current.expiresAt - Date.now())
    pollTimer.textContent = remaining > 0 ? `⏳ Closes in ${formatRemaining(remaining)}` : 'Poll closed'
    // visual urgency when <1h
    if (remaining < 1000 * 60 * 60) pollTimer.style.color = '#d64545'
    else pollTimer.style.color = ''
  }

  function formatRemaining(ms){
    const h = Math.floor(ms / 3600000)
    const m = Math.floor((ms % 3600000) / 60000)
    return `${h}h ${m}m`
  }

  function castVote(pollId, optionIndex, btn){
    // lock UI immediately
    Array.from(optionsEl.children).forEach(b => { b.disabled = true; b.classList.add('locked') })
    // increment local data
    const p = POLLS.find(x => x.id === pollId)
    p.votes[optionIndex] = (p.votes[optionIndex] || 0) + 1
    // persist that this browser voted
    localStorage.setItem('voted_' + pollId, '1')

    // record social proof entry
    addActivity(randomName() + ' voted just now')

    // brief animation
    btn.animate([{ transform: 'scale(.98)' }, { transform: 'scale(1)' }], { duration: 140 })

    // show results and highlight leading option
    showResults(pollId)
  }

  function hasVoted(pollId){
    return localStorage.getItem('voted_' + pollId) === '1'
  }

  function hideResults(){ postVote.classList.add('hidden') }

  function showResults(pollId){
    postVote.classList.remove('hidden')
    resultsEl.innerHTML = ''
    const p = POLLS.find(x => x.id === pollId)
    const total = p.votes.reduce((a, b) => a + b, 0) || 1
    // compute leader
    let leaderIndex = 0
    p.votes.forEach((v, i) => { if (v > p.votes[leaderIndex]) leaderIndex = i })

    p.options.forEach((opt, i) => {
      const row = document.createElement('div'); row.className = 'result-row'
      if (i === leaderIndex) row.classList.add('leading')
      const label = document.createElement('div'); label.className = 'label'; label.textContent = opt.replace(/^\S+\s*/, '')
      const barWrap = document.createElement('div'); barWrap.className = 'bar'
      const fill = document.createElement('div'); fill.className = 'fill'
      const pct = Math.round((p.votes[i] / total) * 100)
      // animate width after insert
      fill.style.width = '0%'
      barWrap.appendChild(fill)
      const pctEl = document.createElement('div'); pctEl.className = 'pct'; pctEl.textContent = `${pct}% (${p.votes[i]})`
      row.appendChild(label); row.appendChild(barWrap); row.appendChild(pctEl)
      resultsEl.appendChild(row)
      requestAnimationFrame(() => { fill.style.width = pct + '%' })
    })
  }

  function renderRecent(){
    recentList.innerHTML = ''
    const container = document.getElementById('recentList')
    container.innerHTML = ''
    POLLS.forEach(p => {
      const card = document.createElement('div'); card.className = 'recent-card'
      const q = document.createElement('div'); q.className = 'q'; q.textContent = p.question
      const meta = document.createElement('div'); meta.className = 'meta'
      const totalVotes = p.votes.reduce((a, b) => a + b, 0)
      const remaining = Math.max(0, p.expiresAt - Date.now())
      meta.innerHTML = `<span class='status-dot status-active'></span> ${totalVotes} votes · ${formatRemaining(remaining)}`
      card.appendChild(q); card.appendChild(meta)
      card.addEventListener('click', () => { renderPoll(p); window.scrollTo({ top: 0, behavior: 'smooth' }) })
      container.appendChild(card)
    })
  }

  function addActivity(text){
    if (!recentActivity) return
    const li = document.createElement('li')
    li.textContent = text
    recentActivity.prepend(li)
    // keep list short
    while (recentActivity.children.length > 6) recentActivity.removeChild(recentActivity.lastChild)
  }

  function randomName(){ return NAMES[Math.floor(Math.random() * NAMES.length)] }

  // simulate realtime voting activity
  function startRealtimeSimulation(){
    setInterval(() => {
      const p = POLLS[Math.floor(Math.random() * POLLS.length)]
      const opt = Math.floor(Math.random() * p.options.length)
      p.votes[opt] = (p.votes[opt] || 0) + (1 + Math.floor(Math.random() * 3))
      // occasionally add social proof
      if (Math.random() > 0.6) addActivity(randomName() + ' voted just now')
      // update UI if relevant
      if (!postVote.classList.contains('hidden')) showResults(current.id)
      renderRecent(); updateLiveCount(); updateTimer()
    }, 1400 + Math.random() * 2400)
  }

  // init
  updateLiveCount(); renderRecent(); renderPoll(current); startRealtimeSimulation()
  // periodic updates
  setInterval(() => updateLiveCount(), 4000)
  setInterval(() => updateTimer(), 1000 * 20)
})()
