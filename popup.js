var incognito;

document.addEventListener('DOMContentLoaded', function() {
    var silent = localStorage.getItem('isSilent') || false;
    silent = silent === 'true' ? true : false;
    var icon = silent ? 'silent' : 'sound';
    document.getElementById('isEnabled').innerHTML = silent ? '/ignore' : 'hey!';
    if (silent) {
        chrome.contentSettings.notifications.set({
            'primaryPattern': '<all_urls>',
            'setting': 'block',
            'scope': (incognito ? 'incognito_session_only' : 'regular')
        });
    } else {
        chrome.contentSettings.notifications.clear({
            'scope': (incognito ? 'incognito_session_only' : 'regular')
        }, function() {});
    }
    chrome.browserAction.setIcon({
        path: 'icons/' + icon + '.png'
    });
    localStorage.setItem('isSilent', !silent);
});
