import re
import sys
import re

output_folder_path = f"result/foundSpec/"

def filter_words(cleaned_content, output_file):
    words_to_save = []

    for line in cleaned_content.split('\n'):
        words = re.findall(r'(\S+|".+?")', line)
        for i, word in enumerate(words):
            for fragment in ['olog', 'iatra', 'terapeuta', 'urg']:
                if word.endswith(fragment):
                        words_to_save.append(line)
                        break

    with open(output_file, 'w', encoding='utf-8') as output:
        output.write('\n'.join(words_to_save))

    return len(words_to_save)


def remove_text_in_brackets(input_file, output_file):
    try:
        with open(input_file, 'r', encoding='utf-8') as file:
            content = file.read()

        cleaned_content = re.sub(r'<.*?>', '\n', content)

        lines = '\n'.join(line for line in cleaned_content.split('\n') if line.strip())

        return lines

    except FileNotFoundError:
        print(f"Plik '{input_file}' nie istnieje.")
    except Exception as e:
        print(f"Wystąpił błąd: {str(e)}")

#clear html and filter words by suffix
input_file_name = sys.argv[1]
input_id = sys.argv[2]
cleaned_content = remove_text_in_brackets(input_file_name, f'clearedCompared{input_id}.txt')
num_lines_saved = filter_words(cleaned_content, output_folder_path + f'{input_id}.txt')

with open('wynik.txt', 'w') as result_file:
        result_file.write(str(num_lines_saved))
