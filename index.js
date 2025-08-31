async function fetchAPI(word) {
    try {
        // Show loading message
        infoTextEl.style.display = "block";
        meaningContainerEl.style.display = "none";
        infoTextEl.innerText = `Searching the meaning of "${word}"...`;

        // Fetch from API
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        // If not found
        if (result.title) {
            meaningContainerEl.style.display = "block";
            infoTextEl.style.display = "none";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A";
            audioEl.style.display = "none";
            return;
        }

        // Show word title
        infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "block";
        titleEl.innerText = result[0].word;

        // Collect ALL definitions
        const allDefinitions = result[0].meanings
            .map(meaning => 
                meaning.definitions.map(def => `• ${def.definition}`).join("\n")
            ).join("\n\n");

        meaningEl.innerText = allDefinitions;

        // Find first available audio
        const phoneticWithAudio = result[0].phonetics.find(p => p.audio);
        if (phoneticWithAudio) {
            audioEl.style.display = "inline-flex";
            audioEl.src = phoneticWithAudio.audio;
        } else {
            audioEl.style.display = "none";
        }

    } catch (error) {
        console.error(error);
        infoTextEl.innerText = 'An error occurred, try again later.';
    }
}
