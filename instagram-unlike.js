/**
 * Instagram Bulk Unlike Script
 * Beğenilerinizi toplu olarak kaldırır
 * 
 * Kullanım: Instagram Likes sayfasında konsola yapıştırın
 * Durdurmak için: Sayfayı yenileyin (F5)
 */

;(async () => {
  // ═══════════════════════════════════════════════════════════
  // YAPILANDIRMA
  // ═══════════════════════════════════════════════════════════
  
  const CONFIG = {
    batchSize: 50,
    delays: {
      action: 2000,
      checkbox: 100,
      afterSelect: 2000,
      betweenCycles: 3000,
      scroll: 2000
    },
    maxFails: 10
  }

  // ═══════════════════════════════════════════════════════════
  // YARDIMCI FONKSİYONLAR
  // ═══════════════════════════════════════════════════════════
  
  const sleep = (ms) => new Promise(r => setTimeout(r, ms))
  
  const log = (msg) => console.log(`[⚡ ${new Date().toLocaleTimeString('tr-TR')}] ${msg}`)

  const findByText = (selector, text) => {
    return [...document.querySelectorAll(selector)].find(el => el.textContent.trim() === text)
  }

  const click = async (el) => {
    if (!el) return false
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    await sleep(200)
    el.click()
    return true
  }

  // ═══════════════════════════════════════════════════════════
  // ELEMENT BULUCULAR
  // ═══════════════════════════════════════════════════════════
  
  const UI = {
    selectBtn: () => findByText('span', 'Select'),
    cancelBtn: () => findByText('span', 'Cancel'),
    unlikeBtn: () => findByText('span', 'Unlike'),
    confirmBtn: () => [...document.querySelectorAll('button')].find(b => b.textContent.includes('Unlike')),
    checkboxes: () => document.querySelectorAll('[role="checkbox"], [aria-label="Toggle checkbox"]')
  }

  // ═══════════════════════════════════════════════════════════
  // ANA İŞLEMLER
  // ═══════════════════════════════════════════════════════════
  
  const selectCheckboxes = async (checkboxes, count) => {
    let selected = 0
    
    for (let i = 0; i < count && i < checkboxes.length; i++) {
      try {
        await click(checkboxes[i])
        selected++
        await sleep(CONFIG.delays.checkbox)
      } catch { /* devam */ }
    }
    
    return selected
  }

  const processBatch = async () => {
    // Select moduna geç
    if (!await click(UI.selectBtn())) {
      return { ok: false, count: 0, error: 'select_not_found' }
    }
    await sleep(CONFIG.delays.afterSelect)

    // Checkboxları bul
    let checkboxes = UI.checkboxes()
    
    if (!checkboxes.length) {
      window.scrollTo(0, document.body.scrollHeight)
      await sleep(CONFIG.delays.scroll)
      checkboxes = UI.checkboxes()
    }

    if (!checkboxes.length) {
      await click(UI.cancelBtn())
      return { ok: false, count: 0, error: 'no_checkboxes' }
    }

    // Seç
    const count = await selectCheckboxes(checkboxes, CONFIG.batchSize)
    await sleep(1000)

    // Unlike'a tıkla
    if (!await click(UI.unlikeBtn())) {
      await click(UI.cancelBtn())
      return { ok: false, count: 0, error: 'unlike_not_found' }
    }
    await sleep(CONFIG.delays.action)

    // Onayla
    await click(UI.confirmBtn())
    await sleep(CONFIG.delays.action)

    return { ok: true, count }
  }

  // ═══════════════════════════════════════════════════════════
  // ANA DÖNGÜ
  // ═══════════════════════════════════════════════════════════
  
  const run = async () => {
    let total = 0
    let fails = 0

    console.clear()
    log('🚀 Instagram Unlike Bot başlatıldı')
    log('📍 Durdurmak için sayfayı yenileyin')
    console.log('─'.repeat(45))

    while (fails < CONFIG.maxFails) {
      const result = await processBatch()

      if (result.ok) {
        total += result.count
        fails = 0
        log(`✓ ${result.count} kaldırıldı → Toplam: ${total}`)
      } else {
        fails++
        log(`✗ Hata (${fails}/${CONFIG.maxFails}): ${result.error}`)
      }

      await sleep(CONFIG.delays.betweenCycles)
    }

    console.log('─'.repeat(45))
    log(`🏁 Bitti! Toplam ${total} beğeni kaldırıldı`)
    
    return total
  }

  await run()
})()
