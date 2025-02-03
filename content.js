(function () {
  // Verifica se o script já foi injetado
  if (window.__betDataExtractorInjected) {
    return;
  }
  window.__betDataExtractorInjected = true;

  /********************************************************
   * content.js - KTO (Kambi) - Filtra apenas "Simples" 
   *               Ganha (won) ou Perdida (lost)
   *               + Mapeamento stake -> tipster/sport
   *               + CSV com 20 colunas
   ********************************************************/

  // -------------------------------------------------------
  // 1) Objeto de mapeamento stake -> { tipster, sport }
  //    Ajuste conforme suas necessidades. 
  //    Exemplo mínimo (adicionar todas as suas stakes):
  // -------------------------------------------------------
  const stakeToTipster = {
    // Mapeamentos para 'Cabreloa' - Esporte: Futebol
    '12.26': { tipster: 'Cabreloa', sport: 'Futebol' },
    '9.26': { tipster: 'Cabreloa', sport: 'Futebol' },
    '6.01': { tipster: 'Cabreloa', sport: 'Futebol' },
    '4.01': { tipster: 'Cabreloa', sport: 'Futebol' },
    '3.01': { tipster: 'Cabreloa', sport: 'Futebol' },
    '2.01': { tipster: 'Cabreloa', sport: 'Futebol' },
    '1.01': { tipster: 'Cabreloa', sport: 'Futebol' },

    // Mapeamentos para 'Bluzera Tips (FREE)' - Esporte: Esports
    '12.7': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '9.7': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '6.35': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '4.35': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '3.35': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '2.35': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '1.35': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '1.15': { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },

    // Mapeamentos para 'Iago Garcia Props' - Esporte: Futebol
    '12.04': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '9.04': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '6.02': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '4.02': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '3.02': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '2.02': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '1.02': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '0.82': { tipster: 'Iago Garcia Props', sport: 'Futebol' },

    // Mapeamentos para 'Vip Rei Milionário' - Esporte: Futebol
    '12.06': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '9.06': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '6.03': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '4.03': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '3.03': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '2.03': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '1.03': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '0.83': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },

    // Mapeamentos para 'VIP ALAVANCAGEM TIPS (VIP)' - Esporte: Futebol
    '12.08': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '9.08': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '6.04': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '4.04': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '3.04': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '2.04': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '1.04': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '0.84': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },

    // Mapeamentos para 'Rei das Tips Odds Alta' - Esporte: Futebol
    '12.1': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '9.1': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '6.05': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '4.05': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '3.05': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '2.05': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '1.05': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '0.85': { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },

    // Mapeamentos para 'GreenTips Free' - Esporte: Futebol
    '12.12': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '9.12': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '6.06': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '4.06': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '3.06': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '2.06': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '1.06': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '0.86': { tipster: 'GreenTips Free', sport: 'Futebol' },

    // Mapeamentos para 'Otti Bets' - Esporte: Futebol
    '12.14': { tipster: 'Otti Bets', sport: 'Futebol' },
    '9.14': { tipster: 'Otti Bets', sport: 'Futebol' },
    '6.07': { tipster: 'Otti Bets', sport: 'Futebol' },
    '4.07': { tipster: 'Otti Bets', sport: 'Futebol' },
    '3.07': { tipster: 'Otti Bets', sport: 'Futebol' },
    '2.07': { tipster: 'Otti Bets', sport: 'Futebol' },
    '1.07': { tipster: 'Otti Bets', sport: 'Futebol' },
    '0.87': { tipster: 'Otti Bets', sport: 'Futebol' },

    // Mapeamentos para 'Bingos Stk' - Esporte: Futebol
    '12.16': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '9.16': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '6.08': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '4.08': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '3.08': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '2.08': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '1.08': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '0.88': { tipster: 'Bingos Stk', sport: 'Futebol' },

    // Mapeamentos para 'STK - VIP FUTEBOL' - Esporte: Futebol
    '12.68': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '9.68': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '6.34': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '4.34': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '3.34': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '2.34': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '1.34': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '1.14': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },

    // Mapeamentos para 'Leozin Tips Props' - Esporte: Futebol
    '12.36': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '9.36': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '6.18': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '4.18': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '3.18': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '2.18': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '1.18': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '0.98': { tipster: 'Leozin Tips Props', sport: 'Futebol' },

    // Mapeamentos para 'Cabreloa Europa' - Esporte: Futebol
    '12.26': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '9.26': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '6.13': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '4.13': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '3.13': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '2.13': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '1.13': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '0.93': { tipster: 'Cabreloa Europa', sport: 'Futebol' },

    // Mapeamentos para 'DiKa Tip's' - Esporte: Futebol
    '12.62': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '9.62': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '6.31': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '4.31': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '3.31': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '2.31': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '1.31': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '1.11': { tipster: "DiKa Tip's", sport: 'Futebol' },

    // Mapeamentos para 'sout0 TIPS' - Esporte: Futebol
    '12.76': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '9.76': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '6.38': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '4.38': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '3.38': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '2.38': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '1.38': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '1.18': { tipster: 'sout0 TIPS', sport: 'Futebol' },

    // Mapeamentos para 'VF Tips' - Esporte: Futebol
    '12.78': { tipster: 'VF Tips', sport: 'Futebol' },
    '9.78': { tipster: 'VF Tips', sport: 'Futebol' },
    '6.39': { tipster: 'VF Tips', sport: 'Futebol' },
    '4.39': { tipster: 'VF Tips', sport: 'Futebol' },
    '3.39': { tipster: 'VF Tips', sport: 'Futebol' },
    '2.39': { tipster: 'VF Tips', sport: 'Futebol' },
    '1.39': { tipster: 'VF Tips', sport: 'Futebol' },
    '1.19': { tipster: 'VF Tips', sport: 'Futebol' },

    // Mapeamentos para 'LeozinTipsBot' - Esporte: Futebol
    '12.74': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '9.74': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '6.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '4.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '3.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '2.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.17': { tipster: 'LeozinTipsBot', sport: 'Futebol' },

    // Mapeamentos para 'LirouTips' - Esporte: Futebol
    '12.28': { tipster: 'LirouTips', sport: 'Futebol' },
    '9.28': { tipster: 'LirouTips', sport: 'Futebol' },
    '6.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '4.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '3.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '2.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '1.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '0.94': { tipster: 'LirouTips', sport: 'Futebol' },

    // Mapeamentos para 'Kutter Tips NFL - Free' - Esporte: Futebol Americano
    '12.38': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '9.38': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '6.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '4.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '3.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '2.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '1.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '0.99': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },

    // Mapeamentos para 'PROPS [NFL] | Fábio Guilherme' - Esporte: Futebol Americano
    '12.64': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.64': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.12': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'NFL | Fábio Guilherme' - Esporte: Futebol Americano
    '12.66': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.66': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.13': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'Rei do college/NFL football' - Esporte: Futebol Americano
    '12.84': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '9.84': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '6.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '4.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '3.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '2.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '1.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },

    // Mapeamentos para 'Raphael Schon - NBA Vip' - Esporte: Basquetebol
    '12.18': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '9.18': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '6.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '4.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '3.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '2.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '1.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '0.89': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },

    // Mapeamentos para 'Leozin Tips Nba' - Esporte: Basquetebol
    '12.2': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '9.2': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '6.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '4.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '3.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '2.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '1.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '0.9': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },

    // Mapeamentos para 'CABRELOA - NBA' - Esporte: Basquetebol
    '12.6': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '9.6': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '6.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '4.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '3.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '2.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.1': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Pre Leozin Tips' - Esporte: Basquetebol
    '12.8': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '9.8': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '6.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '4.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '3.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '2.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '1.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Leozin Tips' - Esporte: Basquetebol
    '12.82': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '9.82': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '6.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '4.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '3.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '2.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '1.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },

    // Mapeamentos para 'LeozinTipsBot' - Esporte: Futebol
    '12.74': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '9.74': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '6.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '4.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '3.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '2.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.37': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.17': { tipster: 'LeozinTipsBot', sport: 'Futebol' },

    // Mapeamentos para 'LirouTips' - Esporte: Futebol
    '12.28': { tipster: 'LirouTips', sport: 'Futebol' },
    '9.28': { tipster: 'LirouTips', sport: 'Futebol' },
    '6.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '4.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '3.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '2.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '1.14': { tipster: 'LirouTips', sport: 'Futebol' },
    '0.94': { tipster: 'LirouTips', sport: 'Futebol' },

    // Mapeamentos para 'Kutter Tips NFL - Free' - Esporte: Futebol Americano
    '12.38': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '9.38': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '6.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '4.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '3.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '2.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '1.19': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '0.99': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },

    // Mapeamentos para 'PROPS [NFL] | Fábio Guilherme' - Esporte: Futebol Americano
    '12.64': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.64': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.32': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.12': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'NFL | Fábio Guilherme' - Esporte: Futebol Americano
    '12.66': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.66': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.33': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.13': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'Rei do college/NFL football' - Esporte: Futebol Americano
    '12.84': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '9.84': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '6.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '4.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '3.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '2.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '1.42': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },

    // Mapeamentos para 'Raphael Schon - NBA Vip' - Esporte: Basquetebol
    '12.18': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '9.18': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '6.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '4.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '3.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '2.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '1.09': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '0.89': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },

    // Mapeamentos para 'Leozin Tips Nba' - Esporte: Basquetebol
    '12.2': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '9.2': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '6.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '4.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '3.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '2.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '1.1': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '0.9': { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },

    // Mapeamentos para 'CABRELOA - NBA' - Esporte: Basquetebol
    '12.6': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '9.6': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '6.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '4.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '3.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '2.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.3': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.1': { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Pre Leozin Tips' - Esporte: Basquetebol
    '12.8': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '9.8': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '6.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '4.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '3.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '2.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '1.4': { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Leozin Tips' - Esporte: Basquetebol
    '12.82': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '9.82': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '6.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '4.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '3.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '2.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '1.41': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },

    // Outros mapeamentos podem ser adicionados aqui...
  };

  /********************************************************
   * content.js - KTO (Kambi) 
   * - Captura 'Simples (N)', independente de o contêiner 
   *   ter classe --won ou não.
   * - Expande detalhes se (2) ou mais.
   * - Extrai cada <li class="KambiBC-outcome-item--won/lost">
   * - Garante que todas as linhas (ganhas ou perdidas) 
   *   sejam capturadas.
   * - 20 colunas CSV, com stake->tipster e label <= 100 chars.
   ********************************************************/
 /********************************************************
   * 2) Variáveis e Funções Auxiliares
   ********************************************************/

  // Para apostas simples, não aplicamos sufixo no ID.
  let idCounters = {}; // (não será utilizado para simples)

  // 2.1) getTipsterInfo(stakeValue)
  function getTipsterInfo(stakeValue) {
    return stakeToTipster[stakeValue] || { tipster: 'Outros', sport: 'Outro esporte' };
  }

  // 2.2) parseDateTimeBB(dateStr)
  // Esta função converte a data exibida pelo site no formato:
  // "Hoje em HH:MM", "Ontem em HH:MM" ou "D de Mês em HH:MM [de AAAA]"
  // para o formato "dd/mm/AAAA HH:MM:00".
  function parseDateTimeBB(dateStr) {
    dateStr = dateStr.trim();
    const now = new Date();
    let day, month, year, timePart;
    // Caso "Hoje" ou "Ontem"
    if (/hoje/i.test(dateStr)) {
      day = now.getDate();
      month = now.getMonth() + 1;
      year = now.getFullYear();
      const match = dateStr.match(/hoje\s+em\s+(\d{1,2}:\d{2})/i);
      timePart = match ? match[1] : "00:00";
    } else if (/ontem/i.test(dateStr)) {
      const yesterday = new Date(now.getTime() - 86400000);
      day = yesterday.getDate();
      month = yesterday.getMonth() + 1;
      year = yesterday.getFullYear();
      const match = dateStr.match(/ontem\s+em\s+(\d{1,2}:\d{2})/i);
      timePart = match ? match[1] : "00:00";
    } else {
      // Espera formato: "1 de fevereiro em 15:14 de 2025" ou sem o ano
      const regex = /(\d{1,2})\s+de\s+([a-zç]+)(?:\s+de\s+(\d{4}))?\s+em\s+(\d{1,2}:\d{2})/i;
      const match = dateStr.match(regex);
      if (match) {
        day = match[1];
        const monthStr = match[2].toLowerCase();
        year = match[3] ? match[3] : now.getFullYear();
        timePart = match[4];
        const monthsPT = {
          "janeiro": 1, "fevereiro": 2, "março": 3, "abril": 4,
          "maio": 5, "junho": 6, "julho": 7, "agosto": 8,
          "setembro": 9, "outubro": 10, "novembro": 11, "dezembro": 12
        };
        month = monthsPT[monthStr] || 1;
      } else {
        // Se não casar, retorne a string original
        return dateStr;
      }
    }
    // Formata os valores com dois dígitos
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    const yyyy = year;
    // Acrescenta segundos ":00"
    return `${dd}/${mm}/${yyyy} ${timePart}:00`;
  }

  // 2.3) isBetResolved(betEl)
  function isBetResolved(betEl) {
    const stateEl = betEl.querySelector('.YxE_E-44489450');
    if (!stateEl) return false;
    const stateText = stateEl.textContent.trim().toLowerCase();
    return stateText === 'win' || stateText === 'loss';
  }

  // 2.4) removeQuebras(text)
  function removeQuebras(text) {
    return text.replace(/[\r\n]+/g, ' ').trim();
  }

  // 2.5) Variável para evitar extrações simultâneas.
  let isExtracting = false;

  /********************************************************
   * 3) getBetIdFromPopup(betEl)
   *    Para apostas simples: simula clique e extrai o ID do popup.
   ********************************************************/
  async function getBetIdFromPopup(betEl) {
    console.log("Extraindo ID para aposta simples.");
    const clickable = betEl.querySelector('.m7FPn-44489450') || betEl;
    clickable.click();
    let popup;
    const maxAttempts = 10;
    let attempts = 0;
    while (!popup && attempts < maxAttempts) {
      await new Promise(res => setTimeout(res, 500));
      popup = document.querySelector('div[role="dialog"].ftqRp-44489450');
      attempts++;
    }
    if (!popup) {
      console.error("Popup não apareceu para aposta simples; usando ID do elemento.");
      return betEl.getAttribute('id') || 'N/A';
    }
    const idEl = popup.querySelector('.x_Cef-44489450');
    const betId = idEl ? idEl.textContent.trim() : (betEl.getAttribute('id') || 'N/A');
    console.log("ID extraído para aposta simples:", betId);
    const closeBtn = popup.querySelector('button.zO_gN-44489450');
    if (closeBtn) {
      closeBtn.click();
    } else {
      popup.remove();
    }
    await new Promise(res => setTimeout(res, 500));
    return betId;
  }

  /********************************************************
   * 4) getMultiBetId(betEl)
   *    Para apostas múltiplas:
   *    1. Clica no botão "Assistir X eventos" (classe "wobei-44489450").
   *    2. Aguarda 1,5 segundos para que a área expandida seja carregada.
   *    3. Posiciona a rolagem na área expandida.
   *    4. Percorre vários elementos dentro da área expandida para simular cliques,
   *       registrando logs para identificar qual elemento dispara a abertura do popup.
   *    5. Ao clicar em um candidato que funcione, aguarda o popup e extrai o ID.
   ********************************************************/
  function simulateClick(element) {
    if (!element) return;
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(event);
  }
  
  async function tryCandidatesForPopup(container) {
    const candidates = container.querySelectorAll('*');
    console.log("Número de candidatos encontrados dentro do container:", candidates.length);
    for (let candidate of candidates) {
      console.log("Tentando candidato:", candidate.tagName, candidate.className);
      simulateClick(candidate);
      await new Promise(res => setTimeout(res, 700));
      let popup = document.querySelector('div[role="dialog"].ftqRp-44489450');
      if (popup) {
        console.log("Popup aberto com candidato:", candidate.tagName, candidate.className);
        return candidate;
      }
    }
    return null;
  }
  
  async function getMultiBetId(betEl) {
    console.log("Extraindo ID para aposta múltipla.");
    const assistBtn = betEl.querySelector('.wobei-44489450');
    if (assistBtn) {
      console.log("Clicando no botão 'Assistir X eventos'.");
      simulateClick(assistBtn);
      await new Promise(res => setTimeout(res, 1500));
      
      const containers = document.querySelectorAll('.vYgyh-44489450');
      if (!containers || containers.length === 0) {
        console.error("Nenhum container de eventos encontrado.");
        return betEl.getAttribute('id') || 'N/A';
      }
      const container = containers[containers.length - 1];
      console.log("Container de eventos encontrado:", container);
      
      container.scrollIntoView({ behavior: "smooth", block: "center" });
      
      const candidate = await tryCandidatesForPopup(container);
      if (!candidate) {
        console.error("Nenhum candidato disparou o popup.");
        return betEl.getAttribute('id') || 'N/A';
      }
      
      let popup;
      const maxAttempts2 = 10;
      let attempts2 = 0;
      while (!popup && attempts2 < maxAttempts2) {
        console.log("Aguardando popup aparecer... tentativa:", attempts2 + 1);
        await new Promise(res => setTimeout(res, 500));
        popup = document.querySelector('div[role="dialog"].ftqRp-44489450');
        attempts2++;
      }
      if (!popup) {
        console.error("Popup não apareceu para a aposta múltipla.");
        return betEl.getAttribute('id') || 'N/A';
      }
      console.log("Popup encontrado.");
      const idEl = popup.querySelector('.x_Cef-44489450');
      const betId = idEl ? idEl.textContent.trim() : (betEl.getAttribute('id') || 'N/A');
      console.log("ID extraído para aposta múltipla:", betId);
      const closeBtn = popup.querySelector('button.zO_gN-44489450');
      if (closeBtn) {
        console.log("Fechando popup.");
        simulateClick(closeBtn);
      } else {
        popup.remove();
      }
      await new Promise(res => setTimeout(res, 500));
      return betId;
    } else {
      return betEl.getAttribute('id') || 'N/A';
    }
  }
  
  /********************************************************
   * 5) Listener principal de comunicação (port)
   ********************************************************/
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name !== 'extractionChannelNew') return;
    port.onMessage.addListener(async (msg) => {
      if (msg.action === 'extractBets') {
        if (isExtracting) {
          console.warn('Extração em andamento. Ignorando...');
          return;
        }
        isExtracting = true;
        try {
          const dataLines = await extractBets();
          try {
            port.postMessage({ success: true, data: dataLines });
          } catch (e) {
            console.warn('Porta desconectada antes de enviar mensagem de sucesso.');
          }
          downloadCSV(dataLines);
        } catch (err) {
          try {
            port.postMessage({ success: false, error: err.message });
          } catch (e) {
            console.warn('Porta desconectada antes de enviar mensagem de erro.');
          }
        } finally {
          isExtracting = false;
          try { port.disconnect(); } catch (_) {}
        }
      }
    });
  });
  
  /********************************************************
   * 6) extractBets()
   *    Seleciona todos os elementos de aposta do Betboom e extrai os dados.
   ********************************************************/
  async function extractBets() {
    const betElements = document.querySelectorAll('.LJbWp-44489450');
    const allCsvLines = [];
    for (const betEl of betElements) {
      if (!isBetResolved(betEl)) continue;
      let betId;
      const typeEl = betEl.querySelector('.rZ2TS-44489450');
      let betType = "S";
      if (typeEl) {
        const typeText = typeEl.textContent.trim().toLowerCase();
        betType = (typeText.indexOf('simples') > -1) ? "S" : "M";
      }
      if (betType === "M") {
        betId = await getMultiBetId(betEl);
      } else {
        betId = await getBetIdFromPopup(betEl);
      }
      let dateTime = "";
      const dateContainer = betEl.querySelector('.yiE_j-44489450');
      if (dateContainer) {
        const spans = dateContainer.querySelectorAll('span');
        dateTime = Array.from(spans).map(span => span.textContent.trim()).join(" ");
        dateTime = parseDateTimeBB(dateTime);
      }
      let betState = "W";
      const stateEl = betEl.querySelector('.YxE_E-44489450');
      if (stateEl) {
        const stateText = stateEl.textContent.trim().toLowerCase();
        betState = (stateText === "win") ? "W" : "L";
      }
      if (betType === "S") {
        const csvLine = extractSingleBet(betEl, betId, dateTime, betState);
        if (csvLine) allCsvLines.push(csvLine);
      } else {
        const csvLine = extractMultiBet(betEl, betId, dateTime, betState);
        if (csvLine) allCsvLines.push(csvLine);
      }
    }
    return allCsvLines;
  }
  
  /********************************************************
   * 7) extractSingleBet(betEl, betId, dateTime, betState)
   *    Extrai os dados de uma aposta simples do Betboom.
   ********************************************************/
  function extractSingleBet(betEl, betId, dateTime, betState) {
    const eventNameEl = betEl.querySelector('.m7FPn-44489450');
    const eventName = eventNameEl ? eventNameEl.textContent.trim() : "";
    const fullDescription = removeQuebras(eventName);
    let stake = "0.00", totalValue = "0.00", odds = "0.00";
    // Utiliza o seletor no elemento atual (betEl) para extrair os valores.
    const summaryEl = betEl.querySelector('.ILbNS-44489450');
    if (summaryEl) {
      const cp4jEls = summaryEl.querySelectorAll('._CP4J-44489450');
      if (cp4jEls.length >= 2) {
        stake = cp4jEls[0].textContent.replace('R$', '').trim();
        totalValue = cp4jEls[1].textContent.replace('R$', '').trim();
      } else if (cp4jEls.length === 1) {
        stake = cp4jEls[0].textContent.replace('R$', '').trim();
        totalValue = "0.00";
      }
      const oddsEl = summaryEl.querySelector('.Go8Sz-44489450 span');
      if (oddsEl) {
        odds = oddsEl.textContent.trim();
      }
    }
    const tipsterInfo = getTipsterInfo(stake);
    let sport = tipsterInfo.sport;
    if (sport === "Outro esporte" && fullDescription.toLowerCase().includes("futebol")) {
      sport = "Futebol";
    }
    const betData = {
      id: betId,
      date: dateTime,
      type: "S",
      sport: sport,
      label: removeQuebras(fullDescription),
      odds: odds,
      stake: stake,
      totalValue: totalValue,
      state: betState,
      bookmaker: "Betboom",
      tipster: tipsterInfo.tipster,
      category: "ML",
      competition: "",
      betType: "",
      closing: "",
      comment: removeQuebras(fullDescription),
      live: "",
      freebet: "",
      cashout: "",
      eachWay: ""
    };
    return formatBetData(betData);
  }
  
  /********************************************************
   * 8) extractMultiBet(betEl, betId, dateTime, betState)
   *    Extrai os dados de uma aposta múltipla do Betboom.
   *    Após a expansão, utiliza a última div expandida ("vYgyh-44489450")
   *    para extrair os detalhes dos eventos.
   ********************************************************/
  function extractMultiBet(betEl, betId, dateTime, betState) {
    let sport = "Outro esporte";
    const sportEl = betEl.querySelector('.bet-event__name span');
    if (sportEl) {
      const txt = sportEl.textContent.trim();
      if (txt.toLowerCase().indexOf("futebol") > -1) {
        sport = "Futebol";
      }
    }
    let stake = "0.00", totalValue = "0.00", odds = "0.00";
    // Utiliza o seletor no elemento atual (betEl) para extrair os valores.
    const summaryEl = betEl.querySelector('.ILbNS-44489450');
    if (summaryEl) {
      const cp4jEls = summaryEl.querySelectorAll('._CP4J-44489450');
      if (cp4jEls.length >= 2) {
        stake = cp4jEls[0].textContent.replace('R$', '').trim();
        totalValue = cp4jEls[1].textContent.replace('R$', '').trim();
      } else if (cp4jEls.length === 1) {
        stake = cp4jEls[0].textContent.replace('R$', '').trim();
        totalValue = stake;
      }
      const oddsEl = summaryEl.querySelector('.Go8Sz-44489450 span');
      if (oddsEl) {
        odds = oddsEl.textContent.trim();
      }
    }
    const containers = document.querySelectorAll('.vYgyh-44489450');
    const container = containers[containers.length - 1];
    if (!container) {
      console.error("Container de eventos não encontrado para a aposta múltipla.");
      return "";
    }
    container.scrollIntoView({ behavior: "smooth", block: "center" });
    console.log("Container expandido localizado:", container);
    let fullDescription = "";
    const childNodes = container.children;
    for (let i = 0; i < childNodes.length; i++) {
      fullDescription += childNodes[i].textContent.trim() + " ";
    }
    fullDescription = removeQuebras(fullDescription);
    let label = fullDescription.replace(/@\s*[\d.,]+/g, '').trim();
    if (label.length > 100) {
      label = label.slice(0, 100) + '...';
    }
    const tipsterInfo = getTipsterInfo(stake);
    if (tipsterInfo.sport !== "Outro esporte") {
      sport = tipsterInfo.sport;
    }
    const betData = {
      id: betId,
      date: dateTime,
      type: "M",
      sport: sport,
      label: label,
      odds: odds,
      stake: stake,
      totalValue: totalValue,
      state: betState,
      bookmaker: "Betboom",
      tipster: tipsterInfo.tipster,
      category: "ML",
      competition: "",
      betType: "",
      closing: "",
      comment: removeQuebras(fullDescription),
      live: "",
      freebet: "",
      cashout: "",
      eachWay: ""
    };
    return formatBetData(betData);
  }
  
  /********************************************************
   * 9) formatBetData(bet)
   *    Formata os dados da aposta para uma linha CSV.
   *    Os campos label e comment são sanitizados para remover
   *    quebras de linha e, neste ajuste, um espaço em branco
   *    é adicionado no início para melhor leitura.
   ********************************************************/
  function formatBetData(bet) {
    const safeLabel = " " + removeQuebras(bet.label || '');
    const safeComment = " " + removeQuebras(bet.comment || '');
    return [
      bet.id || '',
      bet.date || '',
      bet.type || '',
      bet.sport || '',
      safeLabel,
      bet.odds || '0.00',
      bet.stake || '0.00',
      bet.totalValue || '0.00',
      bet.state || '',
      bet.bookmaker || '',
      bet.tipster || '',
      bet.category || '',
      bet.competition || '',
      bet.betType || '',
      bet.closing || '',
      safeComment,
      bet.live || '',
      bet.freebet || '',
      bet.cashout || '',
      bet.eachWay || ''
    ].join(';');
  }
  
  /********************************************************
   * 10) downloadCSV(csvLines)
   *     Gera e baixa o arquivo CSV com as apostas extraídas.
   ********************************************************/
  function downloadCSV(csvLines) {
    if (!csvLines || !csvLines.length) {
      console.log('Nenhuma aposta capturada.');
      return;
    }
    const header = "ID;Date;Type;Sport;Label;Odds;Stake;TotalValue;State;Bookmaker;Tipster;Category;Competition;BetType;Closing;Comment;Live;Freebet;Cashout;EachWay";
    const csvContent = [header, ...csvLines].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `betboom_bets_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log(`Baixado CSV com ${csvLines.length} linhas.`);
  }
  
})();