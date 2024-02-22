import tensorflow as tf
import re
import numpy as np
import sys

def split_words(line):
    if ">" in line and "<" in line:
        pattern = r'>(.*?)<'
        words = re.findall(pattern, line)
    else:
        words_quot = re.findall(r'"(.*?)"', line)
        if words_quot:
            return words_quot
        words = re.split(r'\s+', line)
    words = [word.strip() for word in words if word.strip()]

    return words

# Tokenizacja
def ngram_tokenizer(text, n, max_ngram_length):
    ngrams = [text[i:i+n] for i in range(len(text) - n + 1)]
    padded_ngrams = [ord(char) / 255 for ngram in ngrams for char in ngram]
    padded_ngrams += [0] * (max_ngram_length - len(padded_ngrams))
    return padded_ngrams

# Funkcja do tokenizacji 
def tokenize_text(text):
    max_word_length = 200
    max_ngram_length = 4 * max_word_length  

    test_xs_tensor = [ngram_tokenizer(word, n=3, max_ngram_length=max_ngram_length)[:max_word_length] for word in text]
    test_stacked_tensor = np.array(test_xs_tensor)
    return test_stacked_tensor

def count_specializations(data, model):
    # tokens = tokenize_text(data)

    max_word_length = 200
    max_ngram_length = 4 * max_word_length

    test_xs_tensor = [ngram_tokenizer(word, n=3, max_ngram_length=max_ngram_length)[:max_word_length] for word in data]
    test_stacked_tensor = np.array(test_xs_tensor)

    predictions = model.predict(test_stacked_tensor)

    count_specializations = sum(1 for prediction in predictions if prediction >= 0.4)

    # Zapisz słowa do pliku
    filename = sys.argv[1].split("/")[-1]
    words_above_threshold = [word for word, prediction in zip(data, predictions) if prediction >= 0.4]
    with open(f'wykryte_spec_{filename}', 'w', encoding='utf-8') as file:
        file.write('\n'.join(words_above_threshold))


    return count_specializations

if __name__ == "__main__":
    model = tf.keras.models.load_model('mlModels/model')
    
    with open(sys.argv[1], 'r', encoding='utf-8') as file:
        data = [word.strip() for line in file for word in split_words(line) if word.strip()]

    count_specializations_result = count_specializations(data, model)

    with open('wynik.txt', 'w') as result_file:
        result_file.write(str(count_specializations_result))