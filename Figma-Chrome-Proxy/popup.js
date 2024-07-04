document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['proxyEnabled', 'proxyServer'], function(data) {
      document.getElementById('proxyServer').value = data.proxyServer || '10.12.194.16:7890';
      updateProxyButton(data.proxyEnabled);
    });
  
    document.getElementById('toggleProxy').addEventListener('click', function() {
      chrome.storage.sync.get(['proxyEnabled', 'proxyServer'], function(data) {
        let newProxyEnabled = !data.proxyEnabled;
        updateProxyButton(newProxyEnabled);
        chrome.storage.sync.set({ proxyEnabled: newProxyEnabled, proxyServer: data.proxyServer }, function() {
          chrome.proxy.settings.set({
            value: {
              mode: newProxyEnabled ? 'pac_script' : 'direct',
              pacScript: {
                data: newProxyEnabled ? `var FindProxyForURL = function(url, host){
                  if(shExpMatch(url, '*figma\\.com*')){
                    return 'PROXY ${data.proxyServer || '10.12.194.16:7890'}'; 
                  }
                  return 'DIRECT'
                }` : ''
              }
            },
            scope: 'regular'
          }, function() {});
        });
      });
    });
  
    let accordion = document.getElementsByClassName("accordion");
    for (let i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  
    document.getElementById('saveProxy').addEventListener('click', function() {
      let proxyServer = document.getElementById('proxyServer').value;
      chrome.storage.sync.get(['proxyEnabled'], function(data) {
        chrome.storage.sync.set({ proxyServer: proxyServer, proxyEnabled: data.proxyEnabled }, function() {
          chrome.proxy.settings.set({
            value: {
              mode: data.proxyEnabled ? 'pac_script' : 'direct',
              pacScript: {
                data: data.proxyEnabled ? `var FindProxyForURL = function(url, host){
                  if(shExpMatch(url, '*figma\\.com*')){
                    return 'PROXY ${proxyServer || '10.12.194.16:7890'}'; 
                  }
                  return 'DIRECT'
                }` : ''
              }
            },
            scope: 'regular'
          }, function() {
            showSaveStatus('Proxy saved successfully!', 'success');
          });
        });
      });
    });
  
    function updateProxyButton(proxyEnabled) {
      let proxyButton = document.getElementById('toggleProxy');
      proxyButton.textContent = proxyEnabled ? 'Is Open' : 'Disabled';
      proxyButton.classList.remove(proxyEnabled ? 'disabled' : 'enabled');
      proxyButton.classList.add(proxyEnabled ? 'enabled' : 'disabled');
    }
  
    function showSaveStatus(message, type) {
      let saveStatus = document.getElementById('saveStatus');
      saveStatus.textContent = message;
      saveStatus.style.display = 'block';
      saveStatus.classList.remove('success', 'error');
      saveStatus.classList.add(type);
  
      setTimeout(function() {
        saveStatus.style.display = 'none';
      }, 3000);
    }
  });