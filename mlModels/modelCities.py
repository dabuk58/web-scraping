import tensorflow as tf
import re
import numpy as np
import sys
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

result_folder_path = f"result"
found_folder_path = f"{result_folder_path}/found"
accuracy = 0.99

def split_words(line):
    if ">" in line and "<" in line:
        pattern = r'>(.*?)<'
        words = re.findall(pattern, line)
    else:
        words_quot = re.findall(r'"(.*?)"', line)
        if words_quot:
            return words_quot
        words = re.split(r'\s+', line)

    if words and words[0].startswith('.'):
        return []
    words = [word[:100].strip() for word in words if not (word.startswith(('.', '@')) or word.endswith((';', ':'))) and word.strip()]

    return words

def count_cities(data, model, input_file):
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(data)
    sequences = tokenizer.texts_to_sequences(data)
    max_length = 100#max(map(len, sequences))

    #sequences_test = tokenizer.texts_to_sequences(data)
    xs_test_tensor = pad_sequences(sequences, maxlen=max_length, padding='post', truncating='post')

    predictions = model.predict(xs_test_tensor)

    count_specializations = sum(1 for prediction in predictions if prediction >= accuracy)

    # Zapisz słowa do pliku
    filename = input_file.split("/")[-1]
    words_above_threshold = [word for word, prediction in zip(data, predictions) if prediction >= accuracy]
    with open(f'{found_folder_path}\{filename}', 'w', encoding='utf-8') as file:
        file.write('\n'.join(words_above_threshold))


    return count_specializations

if __name__ == "__main__":
    model = tf.keras.models.load_model('mlModels/modelCities')
    input_file= sys.argv[1]
    with open(input_file, 'r', encoding='utf-8') as file:
        data = [word.strip() for line in file for word in split_words(line) if word.strip()]

    count_cities_result = count_cities(data, model, input_file)
    print(f"Ilość predykcji powyżej 0.4: {count_cities_result}")

    with open('wynikCities.txt', 'w') as result_file:
        result_file.write(str(count_cities_result))