export type SCALE = "MAJOR" | "MINOR" | "MAJOR PENTATONIC" | "MINOR PENTATONIC";

export const NOTES = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
] as const;

export type KEY = typeof NOTES[number];

export const STANDARD_TUNING : KEY[] = ["E", "A", "D", "G", "B", "E"];

const MAJOR_SCALE_INTERVALS = [2, 2, 1, 2, 2, 2, 1];

export const generateScaleNotes = (key: KEY, scale: SCALE): Set<KEY> => {
    if (scale === "MAJOR") {
        // add the key
        const notes = new Set<KEY>([]);

        const startIndex = NOTES.indexOf(key);
        let currentIndex = startIndex;

        MAJOR_SCALE_INTERVALS.forEach(interval => {
            notes.add(NOTES[currentIndex]);
            currentIndex = (currentIndex + interval) % NOTES.length;
        });
        return notes;
    }
    throw new Error("Unsupported scale");
}

export const generateFretboard = (tuning: KEY[], numberOfFrets = 24) =>
    tuning
        .map((stringNote: KEY) => {
            const startIndex = NOTES.indexOf(stringNote);
            return Array.from({ length: numberOfFrets }).map(
                (_, i) => NOTES[(startIndex + i + 1) % NOTES.length],
            );
        })
        .reverse();