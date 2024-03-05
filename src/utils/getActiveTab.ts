const getActiveTab = async (): Promise<chrome.tabs.Tab> => {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
    return tabs[0];
};

export default getActiveTab;
