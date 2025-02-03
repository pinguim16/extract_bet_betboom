document.getElementById('start-extraction').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0].id;
        chrome.runtime.sendMessage({
            action: 'startExtraction',
            data: {
                tabId: activeTab
            }
        }, (response) => {
            if (response && response.success) {
                document.getElementById('status').innerText = 'Extração concluída!';
            } else {
                document.getElementById('status').innerText = 'Erro na extração. Verifique o console.';
            }
        });
    });
});
