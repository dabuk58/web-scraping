import sys

def compare_files(fileBefore, fileAfter, fileResult, kodowanie='utf-8'):
    with open(fileBefore, 'r', encoding=kodowanie) as file1, open(fileAfter, 'r', encoding=kodowanie) as file2:
        lines_file1 = set(file1.readlines())
        lines_file2 = set(file2.readlines())

        new_lines = lines_file2 - lines_file1

    with open(fileResult, 'w', encoding=kodowanie) as res_file:
        for line in new_lines:
            res_file.write(line)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Użycie: python skrypt.py plik1 plik2 wynikowy_plik")
    else:
        fileBefore = sys.argv[1]
        fileAfter = sys.argv[2]
        fileResult = sys.argv[3]
        compare_files(fileBefore, fileAfter, fileResult, 'utf-8')
