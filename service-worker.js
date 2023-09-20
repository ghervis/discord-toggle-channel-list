chrome.action.onClicked.addListener((tab) => {
  function toggleChannelList() {
    if (
      document.querySelector(`div[class^="sidebar-"]`) &&
      "https://discord.com" === window.location.origin
    ) {
      sidebarStyle = document.querySelector(`div[class^="sidebar-"]`).style;

      const isSidebarHidden = "none" === sidebarStyle.display;

      sidebarStyle.display = isSidebarHidden ? "block" : "none";

      return `${isSidebarHidden ? "Hide" : "Show"} Discord Channel List`;
    }

    return "Hide Discord Channel List";
  }

  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: toggleChannelList
    })
    .then((injectionResults) => {
      for (const { frameId, result } of injectionResults) {
        chrome.action.setTitle({
          title: result,
        });
      }
    });
});
