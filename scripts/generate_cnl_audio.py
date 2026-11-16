"""
Batch offline TTS generator for EnglishForIT CNL Defense Formulas.
Generates crystal-clear native audio using Microsoft Edge-TTS for:
- English (en-US-GuyNeural: natural, authentic US tech professional)
- Japanese (ja-JP-NanamiNeural: natural, authentic Japanese workplace)
- Chinese (zh-CN-YunxiNeural: clean, articulate Mandarin)

Outputs to: public/audio/cnl/
"""

import asyncio
import os
import re
import sys
import edge_tts

# Configuration
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "cnl")
DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "src",
    "features",
    "it-english",
    "data",
    "cnl-defense.data.ts",
)

VOICE_EN = "en-US-GuyNeural"
VOICE_JA = "ja-JP-NanamiNeural"
VOICE_ZH = "zh-CN-YunxiNeural"

# Clean speech text helper
def clean_for_speech(text: str, lang: str) -> str:
    # Remove slot bracket placeholders {X}, {Y} if they exist bare
    text = re.sub(r"\{[XY]\}", "", text)
    # Remove Japanese reading hints in parentheses like （保留） or （リスケ）
    if lang == "ja":
        text = re.sub(r"（[^）]+）", "", text)
        text = re.sub(r"\([^)]+\)", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_data(file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    items = []
    blocks = re.split(r"\{\s*id:\s*['\"]", text)
    for b in blocks[1:]:
        id_match = re.match(r"([^'\"]+)['\"]", b)
        if not id_match:
            continue
        item_id = id_match.group(1)

        en_m = re.search(r"templateEn:\s*['\"]([^'\"]+)['\"]", b)
        ja_m = re.search(r"templateJa:\s*['\"]([^'\"]+)['\"]", b)
        zh_m = re.search(r"templateZh:\s*['\"]([^'\"]+)['\"]", b)

        template_en = en_m.group(1) if en_m else ""
        template_ja = ja_m.group(1) if ja_m else ""
        template_zh = zh_m.group(1) if zh_m else ""

        # Parse slots
        slots = []
        slots_match = re.search(r"slots:\s*\[([\s\S]*?)\]\s*,", b)
        if slots_match:
            slots_str = slots_match.group(1)
            slot_matches = re.finditer(
                r"label:\s*['\"]([^'\"]+)['\"].*?en:\s*['\"]([^'\"]+)['\"].*?ja:\s*['\"]([^'\"]+)['\"].*?zh:\s*['\"]([^'\"]+)['\"]",
                slots_str,
                re.DOTALL,
            )
            for sm in slot_matches:
                slots.append(
                    {
                        "label": sm.group(1),
                        "en": sm.group(2),
                        "ja": sm.group(3),
                        "zh": sm.group(4),
                    }
                )

        items.append(
            {
                "id": item_id,
                "templateEn": template_en,
                "templateJa": template_ja,
                "templateZh": template_zh,
                "slots": slots,
            }
        )
    return items


async def generate_audio(text: str, voice: str, out_path: str, sem: asyncio.Semaphore):
    if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
        return
    async with sem:
        try:
            comm = edge_tts.Communicate(text, voice)
            await comm.save(out_path)
            print(f"✓ Generated: {os.path.basename(out_path)}")
        except Exception as e:
            print(f"✗ Failed ({out_path}): {e}")


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    items = parse_data(DATA_FILE)
    print(f"Found {len(items)} CNL formulas/items to synthesize.")

    tasks = []
    # Concurrency control
    sem = asyncio.Semaphore(5)

    for item in items:
        item_id = item["id"]
        # Default slot is index 0 if available
        first_slot = item["slots"][0] if item["slots"] else None

        # Build full representative sentence
        if first_slot:
            en_text = item["templateEn"].replace("{X}", first_slot["en"])
            ja_text = item["templateJa"].replace("{X}", first_slot["ja"])
            zh_text = item["templateZh"].replace("{X}", first_slot["zh"])
        else:
            en_text = item["templateEn"]
            ja_text = item["templateJa"]
            zh_text = item["templateZh"]

        en_clean = clean_for_speech(en_text, "en")
        ja_clean = clean_for_speech(ja_text, "ja")
        zh_clean = clean_for_speech(zh_text, "zh")

        # 1. English
        if en_clean:
            en_out = os.path.join(OUTPUT_DIR, f"{item_id}_en.mp3")
            tasks.append(generate_audio(en_clean, VOICE_EN, en_out, sem))

        # 2. Japanese
        if ja_clean:
            ja_out = os.path.join(OUTPUT_DIR, f"{item_id}_ja.mp3")
            tasks.append(generate_audio(ja_clean, VOICE_JA, ja_out, sem))

        # 3. Chinese
        if zh_clean:
            zh_out = os.path.join(OUTPUT_DIR, f"{item_id}_zh.mp3")
            tasks.append(generate_audio(zh_clean, VOICE_ZH, zh_out, sem))

    print(f"Total audio files to verify/generate: {len(tasks)}")
    await asyncio.gather(*tasks)
    print(f"\n🎉 All audio assets generated into: {os.path.abspath(OUTPUT_DIR)}")


if __name__ == "__main__":
    asyncio.run(main())
