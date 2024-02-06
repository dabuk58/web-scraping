import sys

def compare_files(fileBefore, fileAfter, fileResult, kodowanie='utf-8'):
    with open(fileBefore, 'r', encoding=kodowanie) as file1, open(fileAfter, 'r', encoding=kodowanie) as file2:
        lines_file2 = list(file1.readlines())
        lines_file1 = list(file2.readlines())

        result = [item for item in lines_file1 if item not in lines_file2]

    with open(fileResult, 'w', encoding=kodowanie) as res_file:
        for line in result:
            res_file.write(line)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Użycie: python skrypt.py plik1 plik2 wynikowy_plik")
    else:
        fileBefore = sys.argv[1]
        fileAfter = sys.argv[2]
        fileResult = sys.argv[3]
        compare_files(fileBefore, fileAfter, fileResult, 'utf-8')
