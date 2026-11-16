"""
Generate high-fidelity Edge-TTS audio for project-dmp business phrases and dialogues.
Outputs: public/audio/dmp/
"""

import asyncio
import os
import re
import sys
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "dmp")
DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "src",
    "features",
    "it-english",
    "data",
    "project-dmp.data.ts",
)

VOICE_EN = "en-US-GuyNeural"
VOICE_JA = "ja-JP-NanamiNeural"
VOICE_ZH = "zh-CN-YunxiNeural"


def clean_for_speech(text: str, lang: str) -> str:
    if lang == "ja":
        text = re.sub(r"（[^）]+）", "", text)
        text = re.sub(r"\([^)]+\)", "", text)
    return re.sub(r"\s+", " ", text).strip()


async def generate(text: str, voice: str, path: str, sem: asyncio.Semaphore):
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return
    async with sem:
        try:
            comm = edge_tts.Communicate(text, voice)
            await comm.save(path)
            print(f"✓ Generated: {os.path.basename(path)}")
        except Exception as e:
            print(f"✗ Failed {path}: {e}")


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # match each item block
    blocks = re.split(r"\{\s*id:\s*['\"]", content)
    tasks = []
    sem = asyncio.Semaphore(5)

    for b in blocks[1:]:
        id_m = re.match(r"([^'\"]+)['\"]", b)
        if not id_m:
            continue
        item_id = id_m.group(1)

        ja_m = re.search(r"ja:\s*['\"]([^'\"]+)['\"]", b)
        en_m = re.search(r"en:\s*['\"]([^'\"]+)['\"]", b)
        zh_m = re.search(r"zh:\s*['\"]([^'\"]+)['\"]", b)

        d_ja_m = re.search(r"dialogueJa:\s*['\"]([^'\"]+)['\"]", b)
        d_en_m = re.search(r"dialogueEn:\s*['\"]([^'\"]+)['\"]", b)
        d_zh_m = re.search(r"dialogueZh:\s*['\"]([^'\"]+)['\"]", b)

        ja_word = ja_m.group(1) if ja_m else ""
        d_ja = d_ja_m.group(1) if d_ja_m else ""
        d_en = d_en_m.group(1) if d_en_m else ""
        d_zh = d_zh_m.group(1) if d_zh_m else ""

        # Term pronunciation (Japanese)
        if ja_word:
            tasks.append(
                generate(
                    clean_for_speech(ja_word, "ja"),
                    VOICE_JA,
                    os.path.join(OUTPUT_DIR, f"{item_id}_term_ja.mp3"),
                    sem,
                )
            )

        # Dialogue pronunciation (English, Japanese, Chinese)
        if d_ja:
            tasks.append(
                generate(
                    clean_for_speech(d_ja, "ja"),
                    VOICE_JA,
                    os.path.join(OUTPUT_DIR, f"{item_id}_dialogue_ja.mp3"),
                    sem,
                )
            )
        if d_en:
            tasks.append(
                generate(
                    clean_for_speech(d_en, "en"),
                    VOICE_EN,
                    os.path.join(OUTPUT_DIR, f"{item_id}_dialogue_en.mp3"),
                    sem,
                )
            )
        if d_zh:
            tasks.append(
                generate(
                    clean_for_speech(d_zh, "zh"),
                    VOICE_ZH,
                    os.path.join(OUTPUT_DIR, f"{item_id}_dialogue_zh.mp3"),
                    sem,
                )
            )

    print(f"Total DMP audio files to generate: {len(tasks)}")
    await asyncio.gather(*tasks)
    print(f"🎉 DMP audio assets generated into: {os.path.abspath(OUTPUT_DIR)}")


if __name__ == "__main__":
    asyncio.run(main())
