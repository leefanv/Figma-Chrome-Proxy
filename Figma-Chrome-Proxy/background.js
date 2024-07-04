chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.get(['proxyEnabled', 'proxyServer'], function(data) {
    let pac = `var FindProxyForURL = function(url, host){
      if(shExpMatch(url, '*figma\\.com*')){
        return 'PROXY ${data.proxyServer || '10.12.194.16:7890'}'; 
      }
      return 'DIRECT'
    }`;
    let config = {
      mode: "pac_script",
      pacScript: {
        data: pac
      }
    }
    chrome.proxy.settings.set({ value: config, scope: 'regular' }, function() {});
    chrome.storage.sync.set({ proxyEnabled: data.proxyEnabled || true }, function() {});
  });
});