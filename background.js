chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startExtraction') {
      const { tabId } = request.data;
  
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content.js']
      }, () => {
        if (chrome.runtime.lastError) {
          console.error('Erro ao injetar o script de conteúdo:', chrome.runtime.lastError.message);
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
  
        // Use o mesmo nome de porta definido no content.js: 'extractionChannelNew'
        const port = chrome.tabs.connect(tabId, { name: 'extractionChannelNew' });
  
        port.onDisconnect.addListener(() => {
          console.log('Port desconectado.');
        });
  
        port.postMessage({
          action: 'extractBets'
        });
  
        port.onMessage.addListener((response) => {
          if (response.success) {
            sendResponse({ success: true, data: response.data });
          } else {
            sendResponse({ success: false, error: response.error });
          }
          port.disconnect();
        });
      });
  
      return true; // Mantém a porta aberta para resposta assíncrona
    }
  });
  