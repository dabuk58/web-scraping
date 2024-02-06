import re
import sys

import re

def filter_words(cleaned_content, output_file):
    words_to_save = []

    for line in cleaned_content.split('\n'):
        #words = line.split()
        words = re.findall(r'(\S+|".+?")', line)
        for i, word in enumerate(words):
            for fragment in ['olog', 'iatra', 'terapeuta', 'urg']:
                # if word.endswith(fragment):
                #         start_index = max(0, i - 1)
                #         end_index = min(i + 2, len(words))
                #         filtered_words = ' '.join(words[start_index:end_index]).strip('"')
                #         words_to_save.append(filtered_words)
                #         break
                if word.endswith(fragment):
                        words_to_save.append(line)
                        break

    with open(output_file, 'w', encoding='utf-8') as output:
        output.write('\n'.join(words_to_save))

    return len(words_to_save)



def filter_words3(cleaned_content, output_file):
    words_to_save = []

    for line in cleaned_content.split('\n'):
        words = line.split()
        for i, word in enumerate(words):
            if any(fragment in word for fragment in ['olog', 'iatra', 'terapeuta', 'urg']):
                start_index = max(0, i - 1)
                end_index = min(i + 2, len(words))
                filtered_words = ' '.join(words[start_index:end_index])
                words_to_save.append(filtered_words)
                break

    with open(output_file, 'w', encoding='utf-8') as output:
        output.write('\n'.join(words_to_save))

    return len(words_to_save)


def filter_words2(cleaned_content, output_file):
    words_to_save = []

    # for line in cleaned_content.split('\n'):
    #     words = line.split()
    #     words_to_save.extend([word for word in words if word.endswith('olog') or word.endswith('atra') or word.endswith('terapeuta') or word.endswith('urg')])

    for line in cleaned_content.split('\n'):
        if any(fragment in line for fragment in ['olog', 'atra', 'terapeuta', 'urg']):
            words_to_save.append(line)

    with open(output_file, 'w', encoding='utf-8') as output:
        output.write('\n'.join(words_to_save))

    return len(words_to_save)

def remove_text_in_brackets(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            content = file.read()

        # Usuń tekst w nawiasach <>
        cleaned_content = re.sub(r'<.*?>', '\n', content)

        lines = '\n'.join(line for line in cleaned_content.split('\n') if line.strip())

        
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(lines)

        print("Tekst <> usunięty:", output_file)

        return lines

    except FileNotFoundError:
        print(f"Plik '{input_file}' nie istnieje.")
    except Exception as e:
        print(f"Wystąpił błąd: {str(e)}")

#clear html and filter words by suffix
input_file_name = sys.argv[1]
input_id = sys.argv[2]
cleaned_content = remove_text_in_brackets(input_file_name, f'clearedCompared{input_id}.txt')
num_lines_saved = filter_words(cleaned_content, f'specFromInput{input_id}.txt')
#print(f"Liczba wierszy zapisanych do pliku: {num_lines_saved}")

with open('wynik.txt', 'w') as result_file:
        result_file.write(str(num_lines_saved))
