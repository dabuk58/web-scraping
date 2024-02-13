import subprocess
import shutil
import os
import re

webName1 = 'https://www.znanylekarz.pl/'
webName2 = 'https://znajdzlekarza.abczdrowie.pl/'
webName3 = 'https://centrum.med.pl/znajdz-lekarza/'
webName4 = 'https://lekarzebezkolejki.pl/'

compared_folder_path = f"result/compared/"
found_spec_folder_path = f"result/foundSpec/"

def removeTmpFiles():
   current_folder = os.getcwd()
   for filename in os.listdir(current_folder):
        if filename.startswith("cleared") or filename.startswith("specFromInput"):
            file_path = os.path.join(current_folder, filename)
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Błąd podczas usuwania pliku {file_path}: {e}")

def createResultFolder():
    folder_path = "result"
    if os.path.exists(folder_path):
        try:
         shutil.rmtree(folder_path)
        except Exception as e:
         print(f"Błąd podczas usuwania folderu {folder_path}: {e}")
    else:
     print(f"Folder o ścieżce {folder_path} nie istnieje.")
    os.mkdir(folder_path)
    os.makedirs(found_spec_folder_path)

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
   command = ['python', 'findSpec/model.py', f'result/{fileName}.txt']
   subprocess.call(command)
   with open('wynik.txt', 'r') as result_file:
        count_specializations_result = int(result_file.read())

   return count_specializations_result

def findSpecBySelect(webName):
   readSelect(webName)
   return useModel('fromSelect')

def readSelect(webName):
   js_file = "inputHtmlDiff/index.js"
   command = ["node", js_file, webName]
   subprocess.run(command, capture_output=True, text=True)

def readInput(webName):
   js_file = "inputHtmlDiff/index2.js"
   command = ["node", js_file, webName]
   result = subprocess.run(command, capture_output=True, text=True)
   return int(result.stdout.strip())

def findAllSpecFromInput(webName, input_id):
   js_file = "findSpec/getInputSpec.js"
   command = ["node", js_file, webName, str(input_id)]
   subprocess.run(command, capture_output=True, text=True)
  
   count_specializations_result = useScript(f'result/spec/olog.txt', '-olog')
   print(f"Suffix dla -olog: {count_specializations_result}") 
   count_specializations_result = useScript(f'result/spec/atra.txt', '-atra')
   print(f"Suffix dla -atra: {count_specializations_result}")
   count_specializations_result = useScript(f'result/spec/chirurg.txt', 'chirurg')
   print(f"Suffix dla chirurg: {count_specializations_result}") 
#######################33
def findAllSpecFromInputWothCompare(webName, input_id):
   js_file = "findSpec/getInputSpec.js"
   command = ["node", js_file, webName, str(input_id)]
   subprocess.run(command, capture_output=True, text=True)
  
   compareSpec(f'result/spec/olog.txt', f'ologDiff.txt')
   count_specializations_result = useScript(f'result/compared/ologDiff.txt', '-olog')
   print(f"Suffix dla -olog: {count_specializations_result}") 
   count_specializations_result = useScript(f'result/spec/atra.txt', '-atra')
   print(f"Suffix dla -atra: {count_specializations_result}")
   count_specializations_result = useScript(f'result/spec/chirurg.txt', 'chirurg')
   print(f"Suffix dla chirurg: {count_specializations_result}")

def compareSpec(fileAfter, fileDiff):
   #compare html files
   fileBefore = f"result/before/0.txt"
   command = ['python', 'findSpec/compare.py', fileBefore, fileAfter, fileDiff]
   subprocess.call(command)
################################

def useScript(file_name, input_id):
   command = ['python', 'findSpec/findSpecBySuffix.py', str(file_name), str(input_id)]
   subprocess.call(command)
   with open('wynik.txt', 'r') as result_file:
        count_specializations_result = int(result_file.read())

   #print(f"Suffix dla {input_id}: {count_specializations_result}")
   return count_specializations_result

def findSpecInput():
   count_specializations =0
   input_id = 0
   for i in range(numberOfInputElements):
       count_specializations_result = useScript(f'result/compared/{i}.txt', i)
       print(f"\nInputId/countSpec: {i} / {count_specializations_result}\n")
       if count_specializations_result > count_specializations:
        count_specializations = count_specializations_result
        input_id=i  
   return input_id

def merge_and_remove_duplicates():
   merged_lines = set()

   files = [f for f in os.listdir(found_spec_folder_path) if os.path.isfile(os.path.join(found_spec_folder_path, f))]

   for file_name in files:
    file_path = os.path.join(found_spec_folder_path, file_name)
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
webName = webName2
removeTmpFiles()

#search selects
count_specializations_result = findSpecBySelect(webName)
if count_specializations_result>5:
   print(f"Usługi w select: {count_specializations_result}")
   useScript(f'wykryte_spec_fromSelect.txt', 'fromSelect') 

#search inputs
else:
   createResultFolder()
   numberOfInputElements = readInput(webName)
   compareHtml()

   input_id = findSpecInput()      
   findAllSpecFromInput(webName, input_id)
   #findAllSpecFromInputWothCompare(webName, input_id)
   merge_and_remove_duplicates()
