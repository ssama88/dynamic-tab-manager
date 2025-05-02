
const getAllTabs = (newTabUrl) => {
  const tabUrls = [];
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tabUrls?.findIndex((openTab) => tab?.url === openTab?.url) === -1) {
        tabUrls.push({ url: tab?.url, id: tab?.id });
      } else {
        chrome.tabs.remove(tab.id);
      }
    });
  });
};

chrome.tabs.onCreated.addListener(() => {
  getAllTabs();
});

