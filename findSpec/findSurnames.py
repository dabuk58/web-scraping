import subprocess
import shutil
import os
import re
import json

suffix_strings = ['','a','jas','krakow']

webName1 = 'https://www.znanylekarz.pl/'
webName2 = 'https://znajdzlekarza.abczdrowie.pl/'
webName3 = 'https://centrum.med.pl/znajdz-lekarza/'
webName4 = 'https://lekarzebezkolejki.pl/'
webName5 = 'https://znajdzlekarza.pl/ '

result_folder_path = f"result"
compared_folder_path = f"{result_folder_path}/compared"
found_folder_path = f"{result_folder_path}/found"

def remove_tmp_files():
   current_folder = os.getcwd()
   for filename in os.listdir(current_folder):
        if filename.startswith("cleared") or filename.startswith("specFromInput"):
            file_path = os.path.join(current_folder, filename)
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Błąd podczas usuwania pliku {file_path}: {e}")

def create_result_folder():
    folder_path = "result"
    if os.path.exists(folder_path):
        try:
         shutil.rmtree(folder_path)
        except Exception as e:
         print(f"Błąd podczas usuwania folderu {folder_path}: {e}")
    else:
     print(f"Folder o ścieżce {folder_path} nie istnieje.")
    os.mkdir(folder_path)
    os.makedirs(found_folder_path)

def compareHtml():
    os.makedirs(compared_folder_path)
   #compare html files
    for i in range(numberOfInputElements):
     fileBefore = f"result/before/{i}.txt"
     fileAfter = f"result/after/{i}.txt"
     fileDiff = f"{i}.txt"
     command = ['python', 'findSpec/compare.py', fileBefore, fileAfter, fileDiff]
     subprocess.call(command)

def useModel(fileName):
   command = ['python', 'mlModels/modelCities.py', f'result/{fileName}.txt']
   subprocess.call(command)
   with open('wynikCities.txt', 'r') as result_file:
        count_specializations_result = int(result_file.read())

   return count_specializations_result

def find_surnames_by_select(webName):
   readSelect(webName)
   return useModel('fromSelect')

def readSelect(webName):
   js_file = "inputHtmlDiff/readSurnamesSelect.js"
   command = ["node", js_file, webName]
   subprocess.run(command, capture_output=True, text=True)

def readInput(webName):
   js_file = "inputHtmlDiff/readSurnamesInput.js"
   command = ["node", js_file, webName]
   result = subprocess.run(command, capture_output=True, text=True)
   return int(result.stdout.strip())

#######################33
def find_all_spec_from_input_with_compare(webName, input_id):
   js_file = "findSpec/getInputSpec.js"
   command = ["node", js_file, webName, str(input_id), json.dumps(suffix_strings)]
   subprocess.run(command, capture_output=True, text=True)
  
   for suffix in suffix_strings:
      compareAndfindSpecForSuffix(f'result/spec/{suffix}.txt', f'{suffix}Diff', f'{suffix}')

def compareSpec(fileAfter, fileDiff):
   #compare html files
   fileBefore = f"result/before/suffix.txt"
   command = ['python', 'findSpec/compare.py', fileBefore, fileAfter, fileDiff]
   subprocess.call(command)
################################
   
def compareAndfindSpecForSuffix(input_file_path, output_file_path, suffix):
   compareSpec(input_file_path, output_file_path)
   count_specializations_result = useModel(f'compared/' + output_file_path)
   print(f"Suffix dla {suffix}: {count_specializations_result}")


def find_surnames_input():
   count_specializations =0
   input_id = 0
   for i in range(numberOfInputElements):
       #############################
       count_specializations_result = useModel(f'compared/{i}') ##zmienic na model dla nazwisk
       print(f"\nInputId/countSurnames: {i} / {count_specializations_result}\n")
       if count_specializations_result > count_specializations:
        count_specializations = count_specializations_result
        input_id=i  
   return input_id

def merge_and_remove_duplicates():
   merged_lines = set()

   files = [f for f in os.listdir(found_folder_path) if os.path.isfile(os.path.join(found_folder_path, f))]

   for file_name in files:
    file_path = os.path.join(found_folder_path, file_name)
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        cleaned_lines = []
        for line in lines:
            if len(line.split()) <= 3:
               line = line.strip().lower().replace('\t', '\n')  
               line = re.sub(r'(?<!\w)i(?!\w)', '\n', line)  
               line = re.sub(r'[,"]', '\n', line)  
               cleaned_lines.extend(line.split('\n'))

        cleaned_lines = [line.lstrip() + '\n' for line in cleaned_lines if len(line.split()) <= 3]  
        merged_lines.update(cleaned_lines)
        
   with open('marged.txt', 'w', encoding='utf-8') as output:
        output.writelines(sorted(merged_lines))

#######################################################################
web_name = webName2
remove_tmp_files()
create_result_folder()

#search selects
count_surnames_result = find_surnames_by_select(web_name)
if count_surnames_result>2:
   print(f"Nazwiska w select: {count_surnames_result}")
   #use_script(f'wykryte_spec_fromSelect.txt', '000') 
#search inputs
else:
   
   numberOfInputElements = readInput(web_name)
   compareHtml()

   input_id = find_surnames_input()   
#    print(f"Id inputa miast: {input_id}")   
# #    # findAllSpecFromInput(web_name, input_id)
#    find_all_spec_from_input_with_compare(web_name, input_id)
#    merge_and_remove_duplicates()
