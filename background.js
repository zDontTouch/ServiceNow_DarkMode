chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "Off",
    });
  });

const SNow_URL = 'https://itsm.services.sap/now/workspace/agent';

chrome.action.onClicked.addListener(async (tab) => {

    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'On' ? 'Off' : 'On';

    if (nextState === "On") {
        // Insert the CSS file when the user turns the extension on
        chrome.scripting.insertCSS({
          files: ["DarkMode.css"],
          target: { tabId: tab.id },
        });
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: nextState,
        });
        console.log("ENABLED");
      } else if (nextState === "Off") {
        // Remove the CSS file when the user turns the extension off
        chrome.scripting.removeCSS({
          files: ["DarkMode.css"],
          target: { tabId: tab.id },
        });
        chrome.action.setBadgeText({
          tabId: tab.id,
          text: nextState,
        });
      }
    }
);