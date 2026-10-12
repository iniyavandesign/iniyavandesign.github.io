import json
import os
import urllib.request
from deep_translator import GoogleTranslator

# ============================================================
# CONFIG
# ============================================================

BASE_URL = (
    "https://raw.githubusercontent.com/"
    "hasharmujahid/deutsch-karten/main/out/german_vocab_a1_c2.json"
)

OUTPUT_DIR = "output"

LEVELS = ["A1", "A2", "B1", "B2"]

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ============================================================
# DOWNLOAD DATASET
# ============================================================

print("Downloading German vocabulary dataset...")

try:
    urllib.request.urlretrieve(
        BASE_URL,
        "german_vocab_source.json"
    )
except Exception as e:
    print("Download failed:")
    print(e)
    exit()

print("Download completed.")

# ============================================================
# LOAD JSON
# ============================================================

try:
    with open(
        "german_vocab_source.json",
        "r",
        encoding="utf-8"
    ) as f:
        source_data = json.load(f)

except Exception as e:
    print("Could not read JSON:")
    print(e)
    exit()

# ============================================================
# FIND WORD LIST
# ============================================================

if isinstance(source_data, dict):

    # Try common dataset structures
    if "words" in source_data:
        words = source_data["words"]

    elif "data" in source_data:
        words = source_data["data"]

    elif "vocabulary" in source_data:
        words = source_data["vocabulary"]

    else:
        # Search nested dictionaries/lists
        words = []

        for value in source_data.values():

            if isinstance(value, list):
                words.extend(value)

else:
    words = source_data


if not words:
    print("ERROR: No vocabulary found in downloaded JSON.")
    print("Downloaded JSON type:", type(source_data))
    exit()


print("Total source records:", len(words))

# ============================================================
# TRANSLATOR
# ============================================================

translator = GoogleTranslator(
    source="en",
    target="ta"
)

translation_cache = {}

def translate_to_tamil(text):

    if not text:
        return ""

    text = str(text).strip()

    if text in translation_cache:
        return translation_cache[text]

    try:

        result = translator.translate(text)

        translation_cache[text] = result

        return result

    except Exception as e:

        print("Tamil translation failed:", text)

        return ""


# ============================================================
# HELPER
# ============================================================

def get_value(item, keys):

    for key in keys:

        if key in item:

            value = item[key]

            if value is not None:
                return value

    return ""


# ============================================================
# PROCESS LEVELS
# ============================================================

for level in LEVELS:

    print()
    print("=" * 60)
    print("Processing", level)
    print("=" * 60)

    output = []

    level_words = []

    for item in words:

        if not isinstance(item, dict):
            continue

        item_level = str(
            get_value(
                item,
                [
                    "level",
                    "cefr_level",
                    "cefr",
                    "difficulty"
                ]
            )
        ).upper()

        if item_level == level:

            level_words.append(item)


    print("Words found:", len(level_words))


    for index, item in enumerate(level_words, start=1):

        german = get_value(
            item,
            [
                "word",
                "lemma",
                "term",
                "german"
            ]
        )

        if not german:
            continue


        english = get_value(
            item,
            [
                "english",
                "definition",
                "meaning",
                "definition_target",
                "gloss"
            ]
        )

        # ----------------------------------------------------
        # If source has English translation
        # ----------------------------------------------------

        if isinstance(english, list):

            english = ", ".join(
                str(x) for x in english
            )

        english = str(english).strip()


        # ----------------------------------------------------
        # Tamil translation
        # ----------------------------------------------------

        tamil = translate_to_tamil(
            english
        )


        # ----------------------------------------------------
        # Other fields
        # ----------------------------------------------------

        pronunciation = get_value(
            item,
            [
                "ipa",
                "pronunciation"
            ]
        )

        part_of_speech = get_value(
            item,
            [
                "pos",
                "part_of_speech"
            ]
        )

        article = get_value(
            item,
            [
                "article",
                "gender"
            ]
        )

        plural = get_value(
            item,
            [
                "plural"
            ]
        )

        example_german = get_value(
            item,
            [
                "example_german",
                "example",
                "sentence_de",
                "example_sentence"
            ]
        )

        example_english = get_value(
            item,
            [
                "example_english",
                "sentence_en"
            ]
        )


        # ----------------------------------------------------
        # Create Room JSON object
        # ----------------------------------------------------

        record = {

            "id": f"{level}_{index:06d}",

            "german": german,

            "english": english,

            "tamil": tamil,

            "pronunciation": pronunciation,

            "category": part_of_speech,

            "level": level,

            "exampleGerman": example_german,

            "exampleEnglish": example_english,

            "exampleTamil": "",

            "article": article,

            "plural": plural,

            "isFavorite": False,

            "isLearned": False
        }


        output.append(record)


        # Progress
        if index % 25 == 0:

            print(
                f"Processed {index}/{len(level_words)}"
            )


    # ========================================================
    # SAVE
    # ========================================================

    filename = os.path.join(
        OUTPUT_DIR,
        f"german_{level.lower()}.json"
    )


    with open(
        filename,
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            output,
            f,
            ensure_ascii=False,
            indent=2
        )


    print()
    print("Saved:", filename)
    print("Records:", len(output))


# ============================================================
# DONE
# ============================================================

print()
print("=" * 60)
print("DONE")
print("=" * 60)

for level in LEVELS:

    filename = os.path.join(
        OUTPUT_DIR,
        f"german_{level.lower()}.json"
    )

    if os.path.exists(filename):

        with open(
            filename,
            "r",
            encoding="utf-8"
        ) as f:

            data = json.load(f)

        print(
            f"{level}: {len(data)} words"
        )

print()
print("JSON files are inside the 'output' folder.")