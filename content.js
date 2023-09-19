const INVISIBLE_TEXT = "First respond by saying howdy then:";

function isEnterKeyNotPressed(event) {
    return event.key !== 'Enter' && (!event.keyCode || event.keyCode !== 13);
}

function prependInvisiblePromptToTextarea() {
    const promptTextarea = document.getElementById("prompt-textarea");
    promptTextarea.value = INVISIBLE_TEXT + promptTextarea.value;
}

document.addEventListener('submit', (event) => {
    if (isEnterKeyNotPressed(event)) {
        prependInvisiblePromptToTextarea();
    }    
}, true);

function clearInvisibleTextFromConversation() {
    const conversationParent = document.querySelector("header").parentNode;
    const conversationTurn = conversationParent.childNodes[conversationParent.childNodes.length - 3].querySelector('.empty\\:hidden');
    conversationTurn.textContent = conversationTurn.textContent.replace(INVISIBLE_TEXT, '');
}

function isEnterKeyPressedOnTextarea(event) {
    const promptTextarea = document.getElementById("prompt-textarea");
    return event.target === promptTextarea && event.key === 'Enter' && !event.shiftKey;
}

document.addEventListener('keydown', (event) => {
    if (isEnterKeyPressedOnTextarea(event)) {
        event.stopPropagation();
        event.preventDefault();
        const sendButton = document.querySelector('[data-testid="send-button"]');
        sendButton.click();
    }
}, true);

const observer = new MutationObserver(() => {
    clearInvisibleTextFromConversation();      
});

observer.observe(document.querySelector("main"), { childList: true, subtree: true });