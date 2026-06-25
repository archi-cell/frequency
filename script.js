// Wait until HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    const moodSelect = document.getElementById("mood");
    const energySlider = document.getElementById("energy");
    const focusSlider = document.getElementById("focus");
    const languageSelect = document.getElementById("language");

    const energyValue = document.getElementById("energyValue");
    const focusValue = document.getElementById("focusValue");

    const generateBtn = document.getElementById("generateBtn");
    const visualizer = document.getElementById("visualizer");
    const resultText = document.getElementById("resultText");

    // Song Database
    const songs = {
        calm: {
            hindi: ["Kasoor - Prateek Kuhad", "Safarnama"],
            english: ["Sunset Lover - Petit Biscuit", "Paradise - Coldplay"],
            punjabi: ["Waalian - Harnoor", "Kina Chir - The PropheC"]
        },

        happy: {
            hindi: ["Ilahi", "Zinda"],
            english: ["Blinding Lights", "Levitating"],
            punjabi: ["Brown Munde", "Born To Shine"]
        },

        focused: {
            hindi: ["Lakshya Theme"],
            english: ["Deep Focus Playlist"],
            punjabi: ["Punjabi LoFi Mix"]
        },

        excited: {
            hindi: ["Apna Time Aayega", "Kar Har Maidaan Fateh"],
            english: ["Believer", "Can't Hold Us"],
            punjabi: ["Winning Speech", "Insane"]
        },

        sad: {
            hindi: ["Channa Mereya", "Kabira"],
            english: ["Someone You Loved", "Fix You"],
            punjabi: ["Qismat", "Faasle"]
        },

        stressed: {
            hindi: ["Kun Faya Kun", "Iktara"],
            english: ["Weightless", "River Flows In You"],
            punjabi: ["Waalian", "Kina Chir"]
        }
    };

    // Update slider text live
    energySlider.addEventListener("input", () => {
        energyValue.textContent = energySlider.value;
    });

    focusSlider.addEventListener("input", () => {
        focusValue.textContent = focusSlider.value;
    });

    generateBtn.addEventListener("click", () => {

        const mood = moodSelect.value;
        const energy = Number(energySlider.value);
        const focus = Number(focusSlider.value);
        const language = languageSelect.value;

        let state = "";
        let soundscape = "";
        let recommendation = "";
        let gradient = "";

        // State Engine
        if (mood === "calm") {
            state = energy > 7 && focus > 7
                ? "🚀 Creative Flow"
                : "🌊 Balanced Calm";

            soundscape = "Ambient synth and soft piano";
            recommendation = "Great time for creative work.";

            gradient = "linear-gradient(135deg,#3b82f6,#6366f1)";
        }

        else if (mood === "happy") {
            state = energy > 7
                ? "🔥 Momentum Mode"
                : "😊 Positive Vibes";

            soundscape = "Upbeat melodies and energetic beats";
            recommendation = "Use this energy to create something.";

            gradient = "linear-gradient(135deg,#f59e0b,#f97316)";
        }

        else if (mood === "focused") {
            state = "🧠 Deep Work Mode";
            soundscape = "Lo-Fi focus beats";
            recommendation = "Ideal for coding or studying.";

            gradient = "linear-gradient(135deg,#10b981,#06b6d4)";
        }

        else if (mood === "excited") {
            state = "⚡ Hyper Momentum";
            soundscape = "Synthwave and energetic bass";
            recommendation = "Capture your ideas now.";

            gradient = "linear-gradient(135deg,#ec4899,#ef4444)";
        }

        else if (mood === "sad") {
            state = "🌧 Reflection Mode";
            soundscape = "Rain ambience and piano";
            recommendation = "Take some time for yourself.";

            gradient = "linear-gradient(135deg,#475569,#1e293b)";
        }

        else if (mood === "stressed") {
            state = "🫂 Recovery Mode";
            soundscape = "Breathing tones and calming ambience";
            recommendation = "Slow down and recharge.";

            gradient = "linear-gradient(135deg,#ef4444,#7f1d1d)";
        }

        // Song Recommendation
        let recommendations = [];

        if (language === "mix") {
            recommendations = [
                songs[mood].hindi[0],
                songs[mood].english[0],
                songs[mood].punjabi[0]
            ];
        } else {
            recommendations = songs[mood][language];
        }

        // Display result
        resultText.innerHTML = `
            <h2>${state}</h2>

            <p><strong>🎵 Soundscape:</strong><br>${soundscape}</p>

            <p><strong>💡 Recommendation:</strong><br>${recommendation}</p>

            <p>
                Mood: ${mood}<br>
                Energy: ${energy}/10<br>
                Focus: ${focus}/10<br>
                Language: ${language}
            </p>

            <h3>🎧 Recommended Songs</h3>

            <ul>
                ${recommendations.map(song => `<li>${song}</li>`).join("")}
            </ul>
        `;

        visualizer.style.background = gradient;

        // Save History
        const history =
            JSON.parse(localStorage.getItem("frequencyHistory")) || [];

        history.push({
            mood,
            energy,
            focus,
            language,
            timestamp: new Date().toISOString()
        });

        localStorage.setItem(
            "frequencyHistory",
            JSON.stringify(history)
        );

        // Mobile vibration
        if ("vibrate" in navigator) {
            navigator.vibrate(100);
        }
    });

    // Register Service Worker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("./service-worker.js")
                .then(() => {
                    console.log("Service Worker Registered");
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
});