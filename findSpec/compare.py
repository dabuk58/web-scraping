import sys
import difflib
import re
import os

folder_path = f"result/compared/"

def compare_files(fileBefore, fileAfter, fileResult, kodowanie='utf-8'):
    with open(fileBefore, 'r', encoding=kodowanie) as file1, open(fileAfter, 'r', encoding=kodowanie) as file2:
        lines_file2 = list(file1.readlines())
        lines_file1 = list(file2.readlines())

        result = [item for item in lines_file1 if item not in lines_file2]

    with open(fileResult, 'w', encoding=kodowanie) as res_file:
        for line in result:
            res_file.write(line)

def remove_fragments(file_to_remove, source_file, output_file):
    with open(file_to_remove, 'r', encoding='utf-8') as remove_file:
        fragments_to_remove = set(remove_file.read().splitlines())

    with open(source_file, 'r', encoding='utf-8') as source, \
            open(output_file, 'w', encoding='utf-8') as output:
        for line in source:
            if line.strip() not in fragments_to_remove:
                output.write(line)

def compare_and_save(file1_path, file2_path, output_path):
    with open(file1_path, 'r', encoding='utf-8') as file1, \
         open(file2_path, 'r', encoding='utf-8') as file2:
        
        file1_content = file2.readlines()
        file2_content = file1.readlines()

        differ = difflib.Differ()
        diff = list(differ.compare(file1_content, file2_content))

    with open(output_path, 'w', encoding='utf-8') as output_file:
        output_file.writelines(diff)



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

        return output_file

    except FileNotFoundError:
        print(f"Plik '{input_file}' nie istnieje.")
    except Exception as e:
        print(f"Wystąpił błąd: {str(e)}")



if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Użycie: python skrypt.py plik1 plik2 wynikowy_plik")
    else:
        
        fileBefore = remove_text_in_brackets(sys.argv[1], f"b.txt")
        fileAfter = remove_text_in_brackets(sys.argv[2], f"a.txt")
        fileResult = folder_path + sys.argv[3]
        compare_files(fileBefore, fileAfter, fileResult, 'utf-8')

        # Przykładowe użycie
        #remove_fragments(fileBefore, fileAfter, fileResult)
        #compare_and_save(fileBefore, fileAfter, fileResult)
